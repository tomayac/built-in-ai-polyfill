import {
  AIAssistantPromptRole,
  AICapabilityAvailability,
  MAX_TOKENS,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOPK,
  MAX_TOPK,
} from './constants.js';

// import askAssistant from './ai-providers/cloud/chatgpt.js';
import askAssistant from './ai-providers/local/mediapipe-llm.js';
//import askAssistant from './ai-providers/cloud/gemini.js';

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

// AIAssistantFactory Class (as defined earlier)
class AIAssistantFactory {
  async create(options = {}) {
    if (options.monitor) {
      const monitor = new AICreateMonitor();
      options.monitor(monitor);
    }
    return new AIAssistant(options);
  }

  async capabilities() {
    return new AIAssistantCapabilities();
  }
}

// AIAssistant Class (as defined earlier)
class AIAssistant extends EventTarget {
  #history;

  constructor(options = {}) {
    super();

    // Only assign if value exists, otherwise leave it undefined
    if (options.systemPrompt) {
      this.systemPrompt = options.systemPrompt;
    }

    if (options.initialPrompts) {
      this.initialPrompts = options.initialPrompts;
    }

    if (options.oncontextoverflow) {
      this.oncontextoverflow = options.oncontextoverflow;
    }

    this.topK = options.topK || DEFAULT_TOPK;
    this.temperature = options.temperature || DEFAULT_TEMPERATURE;

    this.maxTokens = MAX_TOKENS;
    this.tokensLeft = MAX_TOKENS;
    this.tokensSoFar = 0;

    this.#history = [];

    // Validate prompts
    if (
      this.systemPrompt &&
      this.initialPrompts &&
      Array.isArray(this.initialPrompts)
    ) {
      for (const initialPrompt of this.initialPrompts) {
        if (initialPrompt?.role === AIAssistantPromptRole.SYSTEM) {
          throw new Error(
            'System prompt cannot be part of the array if systemPrompt is specified.'
          );
        }
      }
    }

    // Ensure system prompt comes first
    if (this.initialPrompts && Array.isArray(this.initialPrompts)) {
      let i = 0;
      let containsSystemPrompt = false;
      for (const initialPrompt of this.initialPrompts) {
        if (initialPrompt?.role === AIAssistantPromptRole.SYSTEM) {
          containsSystemPrompt = true;
          break;
        }
        i++;
      }
      if (containsSystemPrompt && i > 0) {
        throw new Error(
          'System prompt must be first element of the initialPrompt array.'
        );
      }
    }

    // Add systemPrompt and initialPrompts to history if they exist
    if (this.systemPrompt) {
      this.#history.push({
        role: AIAssistantPromptRole.SYSTEM,
        content: this.systemPrompt,
      });
    }
    if (this.initialPrompts) {
      this.#history.push(...this.initialPrompts);
    }
  }

  updateTokensAndHistory(data) {
    this.tokensLeft = this.maxTokens - data.tokens;
    this.tokensSoFar = data.tokens;

    this.#history.push(
      {
        role: AIAssistantPromptRole.USER,
        content: data.prompt,
      },
      {
        role: AIAssistantPromptRole.ASSISTANT,
        content: data.answer,
      }
    );
  }

  async prompt(input, options = {}) {
    options.history = this.#history;

    options.temperature = options.temperature ?? this.temperature;
    options.topK = options.topK ?? this.topK;
    options.signal = options.signal ?? new AbortController().signal;

    const stream = await askAssistant(input, options, (data) =>
      this.updateTokensAndHistory(data)
    );
    let response = '';
    for await (const chunk of stream) {
      response += chunk;
    }
    return response;
  }

  promptStreaming(input, options = {}) {
    options.history = this.#history;

    options.temperature = options.temperature ?? this.temperature;
    options.topK = options.topK ?? this.topK;
    options.signal = options.signal ?? new AbortController().signal;

    return askAssistant(input, options, (answer) =>
      this.updateTokensAndHistory(answer)
    );
  }

  async countPromptTokens(input, options = {}) {
    // ToDo
    return input.length;
  }

  async clone() {
    return new AIAssistant({
      systemPrompt: this.systemPrompt,
      initialPrompts: this.initialPrompts,
      topK: this.topK,
      temperature: this.temperature,
      oncontextoverflow: this.oncontextoverflow,
    });
  }

  destroy() {
    this.#history = [];
    // This doesn't really do anything.
  }
}

// AIAssistantCapabilities Class (as defined earlier)
class AIAssistantCapabilities {
  constructor() {
    this.available = AICapabilityAvailability.READILY;
    this.defaultTopK = DEFAULT_TOPK;
    this.maxTopK = MAX_TOPK;
    this.defaultTemperature = DEFAULT_TEMPERATURE;
  }

  supportsLanguage(languageTag) {
    // ToDo
    return AICapabilityAvailability.READILY;
  }
}

// AICreateMonitor Class
class AICreateMonitor extends EventTarget {
  constructor() {
    super();
    this.ondownloadprogress = null;
  }
}
