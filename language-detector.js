import { AICreateMonitor } from './polyfill.js';
import {
  AICapabilityAvailability,
} from './constants.js';
import { getLIDModel } from 'fasttext.wasm.js/common'

const lidModel = await getLIDModel({
  wasmPath: '/fastText/fasttext.common.wasm',
  modelPath: '/fastText/models/lid.176.ftz',
});
await lidModel.load();

// AIAssistantFactory Class (as defined earlier)
class AILanguageDetectorFactory {
  constructor() {}

  async create(options = {}) {
    if (options.monitor) {
      const monitor = new AICreateMonitor();
      options.monitor(monitor);
    }
    return new AILanguageDetector(options);
  }

  async capabilities() {
    return new AILanguageDetectorCapabilities();
  }
}

/**
 * AILanguageDetector class
 */
class AILanguageDetector {
  constructor() {}

  async detect(input, options = {}) {
  const {alpha2, possibility} = await lidModel.identify(input);
    return [new LanguageDetectionResult(alpha2, possibility)];
  }

  destroy() {}
}

/**
 * AILanguageDetectorCapabilities class
 */
class AILanguageDetectorCapabilities {
  constructor() {
    this.available = AICapabilityAvailability.READILY;
  }

  canDetect(languageTag) {
    return AICapabilityAvailability.READILY;
  }
}

/**
 * Language Detection Result class
 */
class LanguageDetectionResult {
  constructor(language, confidence) {
    this.detectedLanguage = language;
    this.confidence = confidence;
  }
}

export default AILanguageDetectorFactory;
