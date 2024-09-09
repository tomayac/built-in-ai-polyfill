//import askChatGPT from './chatgpt.js';
import askGemini from "./gemini.js";

// Extend WindowOrWorkerGlobalScope
(function extendWindowOrWorkerGlobalScope() {
  if ("ai" in self && "assistant" in self.ai) {
    return;
  }
  if (typeof self !== "undefined") {
    Object.defineProperty(self, "ai", {
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
    this.systemPrompt = options.systemPrompt || null;
    this.initialPrompts = options.initialPrompts || null;
    this.topK = options.topK || 3;
    this.temperature = options.temperature || 0.8;
    this.oncontextoverflow = options.oncontextoverflow || null;

    this.maxTokens = 4096;
    this.tokensLeft = this.maxTokens;
    this.tokensSoFar = 0;

    this.#history = [];

    if (
      this.systemPrompt &&
      this.initialPrompts &&
      Array.isArray(this.initialPrompts)
    ) {
      for (const initialPrompt of this.initialPrompts) {
        if (initialPrompt?.role === AIAssistantPromptRole.SYSTEM) {
          throw new Error(
            "System prompt cannot be part of the array if systemPrompt is specified.",
          );
        }
      }
    }

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
          "System prompt must be first element of the initialPrompt array.",
        );
      }
    }
  }

  updateTokensAndHistory(data) {
    this.tokensLeft = this.maxTokens - data.tokens;
    this.tokensSoFar = data.tokens;

    this.#history.push({
      user: data.prompt,
      assistant: data.answer,
    });
  }

  async prompt(input, options = {}) {
    options.history = this.#history;

    options.temperature = options.temperature ?? this.temperature;
    options.topK = options.topK ?? this.topK;
    options.signal = options.signal ?? new AbortController().signal;

    const stream = await askGemini(input, options, (data) =>
      this.updateTokensAndHistory(data),
    );
    let response = "";
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

    return askGemini(input, options, (answer) =>
      this.updateTokensAndHistory(answer),
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
    // This doesn't really do anything.
  }
}

// AIAssistantCapabilities Class (as defined earlier)
class AIAssistantCapabilities {
  constructor() {
    this.available = AICapabilityAvailability.READILY;
    this.defaultTopK = 3;
    this.maxTopK = 128;
    this.defaultTemperature = 0.8;
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

// Enumerations
const AIAssistantPromptRole = {
  SYSTEM: "system",
  USER: "user",
  ASSISTANT: "assistant",
};

const AICapabilityAvailability = {
  READILY: "readily",
  AFTER_DOWNLOAD: "after-download",
  NO: "no",
};
