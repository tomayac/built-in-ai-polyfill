const y = localStorage.getItem('GEMINI_API_KEY'),
  b = (l, a, f) => {
    const s = new AbortController(),
      c = a?.signal;
    c && c.addEventListener('abort', () => s.abort());
    const o = a?.history?.map((t) => {
      if (t.role === 'system') {
        a.systemPrompt = {
          role: 'system',
          parts: [
            {
              text: t.content,
            },
          ],
        };
        return;
      }
      return {
        role: t.role === 'assistant' ? 'model' : 'user',
        parts: [
          {
            text: t.content,
          },
        ],
      };
    });
    o.length ||
      o.push({
        role: 'model',
        parts: [
          {
            text: 'You are a helpful assistant',
          },
        ],
      });
    let i = 0,
      d = '';
    return new ReadableStream({
      async start(t) {
        try {
          const e = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${y}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                system_instruction: a.systemPrompt,
                contents: o
                  .concat([
                    {
                      role: 'user',
                      parts: [
                        {
                          text: l,
                        },
                      ],
                    },
                  ])
                  .flat(),
                generationConfig: {
                  // stopSequences: ['Title'],
                  // maxOutputTokens: 800,
                  // topP: 0.8,
                  temperature: Math.min(a.temperature, 2),
                  topK: a.topK,
                },
              }),
              signal: s.signal,
            }
          );
          if (!e.ok || e.status !== 200) throw new Error(await e.text());
          const u = e.body,
            p = new TextDecoder();
          for await (const g of u) {
            const h = p.decode(g).split(`
`);
            for (let n of h)
              if (((n = n.replace(/data:\s*/g, '').trim()), !!n))
                try {
                  const r = JSON.parse(n);
                  if (
                    ((i = r?.usageMetadata?.totalTokenCount),
                    typeof r?.candidates?.[0]?.content?.parts?.[0]?.text < 'u')
                  ) {
                    const m = r.candidates[0].content.parts[0].text;
                    (d += m), t.enqueue(m);
                  }
                } catch (r) {
                  throw r;
                }
          }
        } catch (e) {
          e.name !== 'AbortError' && t.error(e);
        } finally {
          f({
            tokens: i,
            prompt: l,
            answer: d,
          }),
            t.close();
        }
      },
      cancel() {
        s.abort();
      },
    });
  };
export { b as default };
