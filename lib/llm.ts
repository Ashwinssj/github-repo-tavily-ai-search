import { OpenAI } from '@ai-sdk/openai';

export function createLLM(useSpecific = false) {
  const useNVIDIANim = process.env.USE_NVIDIA_NIM === 'true';
  const baseUrl = useNVIDIANim
    ? process.env.NVIDIA_NIM_BASE_URL
    : useSpecific
      ? process.env.SPECIFIC_API_BASE
      : process.env.OPENAI_API_BASE;
  const apiKey = useNVIDIANim
    ? process.env.NVIDIA_NIM_API_KEY
    : useSpecific
      ? process.env.SPECIFIC_API_KEY
      : process.env.OPENAI_API_KEY;

  const openai = new OpenAI({ baseUrl, apiKey, organization: '' });

  return {
    chat: (modelOverride?: string) => {
      let model;
      if (useNVIDIANim) {
        // Get the model from env var, override, or default
        model = process.env.NVIDIA_NIM_MODEL || modelOverride || 'nvidia/nemotron-3-super-120b-a12b';
        // Remove nvidia_nim/ prefix if present, as NVIDIA NIM endpoint may expect just the model path
        if (model.startsWith('nvidia_nim/')) {
          model = model.substring(11); // Remove 'nvidia_nim/' prefix
        }
      } else if (useSpecific) {
        model = modelOverride || process.env.SPECIFIC_API_MODEL || 'llama3-70b-8192'; // default from writer
      } else {
        model = modelOverride || process.env.OPENAI_API_MODEL || 'gpt-4-turbo';
      }
      return openai.chat(model);
    }
  };
}