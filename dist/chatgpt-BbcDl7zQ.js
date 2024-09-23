const y = localStorage.getItem("OPENAI_API_KEY"), w = (c, n, u) => {
  const r = new AbortController(), i = n?.signal;
  i && i.addEventListener("abort", () => r.abort());
  const s = n?.history?.map((e) => ({
    role: e.role,
    content: e.content
  }));
  s.length || s.push({
    role: "system",
    content: "You are a helpful assistant"
  });
  let l = 0, d = "";
  return new ReadableStream({
    async start(e) {
      try {
        const t = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${y}`
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              stream: !0,
              stream_options: {
                include_usage: !0
              },
              temperature: Math.min(n.temperature, 2),
              messages: s.concat([
                {
                  role: "user",
                  content: c
                }
              ]).flat()
            }),
            signal: r.signal
          }
        );
        if (!t.ok || t.status !== 200)
          throw new Error(await t.text());
        const f = t.body, p = new TextDecoder();
        for await (const m of f) {
          const g = p.decode(m).split(`
`);
          for (let o of g)
            if (o = o.replace(/data:\s*/g, "").trim(), !(!o || o === "[DONE]"))
              try {
                const a = JSON.parse(o);
                if (l = a?.usage?.total_tokens, typeof a?.choices?.[0]?.delta?.content < "u") {
                  const h = a.choices[0].delta.content;
                  d += h, e.enqueue(h);
                }
              } catch (a) {
                throw a;
              }
        }
      } catch (t) {
        if (t.name !== "AbortError")
          throw t;
      } finally {
        u({
          tokens: l,
          prompt: c,
          answer: d
        }), e.close();
      }
    },
    cancel() {
      r.abort();
    }
  });
};
export {
  w as default
};
