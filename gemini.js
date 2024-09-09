const API_KEY = localStorage.getItem('GEMINI_API_KEY');

export default (prompt, options, callback) => {
  const abortController = new AbortController();
  const signal = options?.signal;
  if (signal) {
    signal.addEventListener('abort', () => abortController.abort());
  }

  const history = options?.history?.map((entry) => {
    return [
      {
        role: 'user',
        parts: [
          {
            text: entry.user,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: entry.assistant,
          },
        ],
      },
    ];
  });

  if (!history.length) {
    history.push({
      role: 'model',
      parts: [
        {
          text: 'You are a helpful assistant',
        },
      ],
    });
  }

  let tokens = 0;
  let answer = '';

  return new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: history
                .concat([
                  {
                    role: 'user',
                    parts: [
                      {
                        text: prompt,
                      },
                    ],
                  },
                ])
                .flat(),
              generationConfig: {
                // stopSequences: ['Title'],
                // maxOutputTokens: 800,
                // topP: 0.8,
                temperature: options.temperature,
                topK: options.topK,
              },
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
            if (!line) {
              continue;
            }
            try {
              const data = JSON.parse(line);
              tokens = data?.usageMetadata?.totalTokenCount;
              if (
                typeof data?.candidates?.[0]?.content?.parts?.[0]?.text !==
                'undefined'
              ) {
                const payload = data.candidates[0].content.parts[0].text;
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
          controller.error(err);
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
