/**
  Copyright 2024 Google LLC
  SPDX-License-Identifier: Apache-2.0
*/

import AIAssistantFactory from './assistant.js';
import AILanguageDetectorFactory from './language-detector.js';

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
    this.languageDetector = new AILanguageDetectorFactory();
  }
}

// AICreateMonitor Class
class AICreateMonitor extends EventTarget {
  constructor() {
    super();
    this.ondownloadprogress = null;
  }
}

export { AICreateMonitor };
