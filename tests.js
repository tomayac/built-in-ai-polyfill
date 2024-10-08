/**
  Copyright 2024 Google LLC
  SPDX-License-Identifier: Apache-2.0
*/

import './polyfill.js';

/* Prompt */

// Negative tests
await self.ai.assistant
  .create({
    systemPrompt: 'foo',
    initialPrompts: [{ role: 'system' }],
  })
  .catch((err) => console.error(err));

await self.ai.assistant
  .create({
    initialPrompts: [{ role: 'user' }, { role: 'system' }],
  })
  .catch((err) => console.error(err));

// Positive tests
const assistant = await self.ai.assistant
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

const assistantSystemOnly = await self.ai.assistant
  .create({
    topK: 1,
    temperature: 0,
    signal: new AbortController().signal,
    systemPrompt: 'foo',
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
console.log(assistantSystemOnly);

const assistantInitialPromptsOnly = await self.ai.assistant
  .create({
    topK: 1,
    temperature: 0,
    signal: new AbortController().signal,
    initialPrompts: [
      { role: 'system', content: 'foo' },
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
console.log(assistantInitialPromptsOnly);

const assistantCapabilities = await self.ai.assistant
  .capabilities()
  .catch((err) => console.error(err));
console.log({
  available: assistantCapabilities.available,
  defaultTopK: assistantCapabilities.defaultTopK,
  maxTopK: assistantCapabilities.maxTopK,
  defaultTemperature: assistantCapabilities.defaultTemperature,
  supportsLanguage: assistantCapabilities.supportsLanguage('de'),
});

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

/* Language Detector */

const capabilities = await self.ai.languageDetector.capabilities();
console.log(capabilities);
console.log(capabilities.canDetect('de'));

const detector = await self.ai.languageDetector.create();
console.log(detector);

await detector.detect('Hallo Welt');
