import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const generateText = async (model, prompt, maxTokens = 100) => {
  try {
    const output = await client.textGeneration({
      model: model,
      inputs: prompt,
      provider: "auto",
      parameters: {
        max_new_tokens: maxTokens,
        temperature: 0.7,
        repetition_penalty: 1.1,
        return_full_text: false
      }
    });
    
    return output.generated_text.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
};

export const analyzePartOfSpeech = async (text) => {
  try {
    const output = await client.tokenClassification({
      model: "vblagoje/bert-english-uncased-finetuned-pos",
      inputs: text,
      provider: "hf-inference",
    });
    
    // Extract keywords based on part-of-speech tags
    const keywords = output
      .filter(token => ['NOUN', 'ADJ', 'VERB'].includes(token.entity))
      .map(token => token.word)
      .filter(word => word.length > 2);
    
    return [...new Set(keywords)]; // Remove duplicates
  } catch (error) {
    console.error('Error analyzing part of speech:', error);
    return [];
  }
};
