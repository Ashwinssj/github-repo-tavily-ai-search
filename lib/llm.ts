import { OpenAI } from '@ai-sdk/openai';

export function createLLM() {
  // NVIDIA NIM only configuration
  const baseUrl = process.env.NVIDIA_NIM_BASE_URL;
  const apiKey = process.env.NVIDIA_NIM_API_KEY;

  const openai = new OpenAI({ baseUrl, apiKey, organization: '' });

  return {
    chat: (modelOverride?: string) => {
      let model = process.env.NVIDIA_NIM_MODEL || modelOverride || 'nvidia_nim/nvidia/nemotron-3-super-120b-a12b';
      // Remove nvidia_nim/ prefix if present, as NVIDIA NIM endpoint expects just the model path
      if (model.startsWith('nvidia_nim/')) {
        model = model.substring(11); // Remove 'nvidia_nim/' prefix
      }
      return openai.chat(model);
    }
  };
}