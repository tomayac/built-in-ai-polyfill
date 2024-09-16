/**
  Copyright 2024 Google LLC
  SPDX-License-Identifier: Apache-2.0
*/

import AIAssistantFactory from './assistant.js';

// Extend WindowOrWorkerGlobalScope
(function extendWindowOrWorkerGlobalScope() {
  if ('ai' in self && 'assistant' in self.ai) {
    return;
  }
  if (typeof self !== 'undefined') {
    Object.defineProperty(self, 'ai', {
      get() {
        return new AI();
      },
      configurable: true,
    });
  }
})();

// AI Class
class AI {
  constructor() {
    this.assistant = new AIAssistantFactory();
  }
}
