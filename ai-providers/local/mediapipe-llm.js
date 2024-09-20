/**
  Copyright 2024 Google LLC
  SPDX-License-Identifier: Apache-2.0
*/

import {
  FilesetResolver,
  LlmInference,
} from 'mediapipe-llm/mediapipe-llm.esm.js';
import { fileOpen } from 'browser-fs-access';

let modelBlobURL;
let genAI;
let llmInference;

let oldTemperature = 0;
let oldTopK = 0;

const initializeLLM = async (options) => {
  if (oldTemperature === options.temperature && oldTopK === options.topK) {
    return;
  }
  oldTemperature = options.temperature;
  oldTopK = options.topK;
  llmInference = await LlmInference.createFromOptions(genAI, {
    baseOptions: {
      modelAssetPath: modelBlobURL,
    },
    topK: options.topK,
    temperature: options.temperature,
    randomSeed: Math.round(Math.random() * 1000),
  });
};

const loadModel = async () => {
  document.removeEventListener('click', loadModel, { once: true });
  document.removeEventListener('keydown', loadModel, { once: true });
  const blob = await fileOpen({
    extensions: ['.bin'],
    mimeTypes: ['application/octet-stream'],
    description: 'LLM model files',
  });
  modelBlobURL = URL.createObjectURL(blob);

  genAI = await FilesetResolver.forGenAiTasks(
    '@mediapipe/tasks-genai//wasm'
  );
};

// Event listeners to load model on click or keydown
document.addEventListener('click', loadModel, { once: true });
document.addEventListener('keydown', loadModel, { once: true });

export default (prompt, options, callback) => {
  const abortController = new AbortController();
  const signal = options?.signal;
  if (signal) {
    signal.addEventListener('abort', () => abortController.abort());
  }

  let history =
    options?.history?.map((entry) => {
      if (entry.role === 'system') {
        options.systemPrompt = `<start_of_turn>system
${entry.content}<end_of_turn>`;
        return;
      }
      return `<start_of_turn>${entry.role === 'user' ? 'user' : 'model'}
${entry.content}<end_of_turn>`;
    }) || [];

  if (!history.length) {
    history.push(`<start_of_turn>system
You are a helpful assistant<end_of_turn>`);
  }

  let tokens = 0;
  let answer = '';

  return new ReadableStream({
    async start(controller) {
      await initializeLLM(options);
      history.push(`<start_of_turn>user
${prompt}<end_of_turn>`);
      llmInference.generateResponse(
        history.join('\n'),
        (partialResult, done) => {
          answer += partialResult;
          controller.enqueue(partialResult);
          if (done) {
            callback({
              tokens,
              prompt,
              answer,
            });
            controller.close();
          }
        }
      );
    },
    cancel() {
      abortController.abort();
    },
  });
};
