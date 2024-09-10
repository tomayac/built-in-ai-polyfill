const API_KEY = localStorage.getItem('OPENAI_API_KEY');

export default (prompt, options, callback) => {
  const abortController = new AbortController();
  const signal = options?.signal;
  if (signal) {
    signal.addEventListener('abort', () => abortController.abort());
  }

  const history = options?.history?.map((entry) => {
    return {
      role: entry.role,
      content: entry.content,
    };
  });

  if (!history.length) {
    history.push({
      role: 'system',
      content: 'You are a helpful assistant',
    });
  }

  let tokens = 0;
  let answer = '';

  return new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              stream: true,
              stream_options: {
                include_usage: true,
              },
              temperature: Math.min(options.temperature, 2.0),
              messages: history
                .concat([
                  {
                    role: 'user',
                    content: prompt,
                  },
                ])
                .flat(),
            }),
            signal: abortController.signal,
          }
        );

        if (!response.ok || response.status !== 200) {
          throw new Error(await response.text());
        }

        const stream = response.body;
        const decoder = new TextDecoder();

        for await (const chunk of stream) {
          const lines = decoder.decode(chunk).split('\n');
          for (let line of lines) {
            line = line.replace(/data:\s*/g, '').trim();
            if (!line || line === '[DONE]') {
              continue;
            }
            try {
              const data = JSON.parse(line);
              tokens = data?.usage?.total_tokens;
              if (typeof data?.choices?.[0]?.delta?.content !== 'undefined') {
                const payload = data.choices[0].delta.content;
                answer += payload;
                controller.enqueue(payload);
              }
            } catch (err) {
              throw err;
            }
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          throw err;
        }
      } finally {
        callback({
          tokens,
          prompt,
          answer,
        });
        controller.close();
      }
    },
    cancel() {
      abortController.abort();
    },
  });
};
