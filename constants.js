// Enumerations
const AIAssistantPromptRole = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
};

const AICapabilityAvailability = {
  READILY: 'readily',
  AFTER_DOWNLOAD: 'after-download',
  NO: 'no',
};

const MAX_TOKENS = 4096;
const DEFAULT_TEMPERATURE = 0.8;
const DEFAULT_TOPK = 3;
const MAX_TOPK = 128;

export {
  AIAssistantPromptRole,
  AICapabilityAvailability,
  MAX_TOKENS,
  DEFAULT_TEMPERATURE,
  DEFAULT_TOPK,
  MAX_TOPK,
};
