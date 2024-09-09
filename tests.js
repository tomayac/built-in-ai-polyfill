import './polyfill.js';

// Negative tests
await window.ai.assistant
  .create({
    systemPrompt: 'foo',
    // @ts-expect-error - System prompt cannot be part of the array if systemPrompt is specified.
    initialPrompts: [{ role: 'system' }],
  })
  .catch((err) => console.error(err));

await window.ai.assistant
  .create({
    // @ts-expect-error - System prompt must be first element of the initialPrompt array.
    initialPrompts: [{ role: 'user' }, { role: 'system' }],
  })
  .catch((err) => console.error(err));

// Positive tests
const assistant = await window.ai.assistant
  .create({
    topK: 1,
    temperature: 0,
    signal: new AbortController().signal,
    systemPrompt: 'foo',
    initialPrompts: [
      { role: 'assistant', content: 'foo' },
      { role: 'user', content: 'foo' },
    ],
    monitor(m) {
      m.addEventListener('downloadprogress', (e) => {
        console.log(e.loaded, e.total);
      });
    },
    oncontextoverflow(e) {
      console.error(e);
    },
  })
  .catch((err) => console.error(err));
console.log(assistant);

const assistantCapabilities = await window.ai.assistant
  .capabilities()
  .catch((err) => console.error(err));
console.table(
  assistantCapabilities.available,
  assistantCapabilities.defaultTopK,
  assistantCapabilities.maxTopK,
  assistantCapabilities.defaultTemperature,
  assistantCapabilities.supportsLanguage('de')
);

assistant.addEventListener('contextoverflow', (e) => {
  console.error(e);
});

const promptTokens = await assistant.countPromptTokens('foo', {
  signal: new AbortController().signal,
});
console.log(promptTokens);

const assistantResult = await assistant
  .prompt('foo', { signal: new AbortController().signal })
  .catch((err) => console.error(err));
console.log(assistantResult);

try {
  const stream = assistant.promptStreaming('foo', {
    signal: new AbortController().signal,
  });
  for await (const chunk of stream) {
    console.log(chunk);
  }
} catch (err) {
  console.error(err);
}

const assistantClone = await assistant.clone();
console.log(assistantClone);

assistant.destroy();
