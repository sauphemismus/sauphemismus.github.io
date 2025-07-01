import { useState } from 'react';
import { generateText } from '../services/huggingface';
import { useTabMemory } from './useTabMemory';

export const useTextBuffer = (theme) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentText, updateTabText } = useTabMemory(theme?.title);

  // Generate a new text based on theme prompts
  const generateNewText = async () => {
    if (!theme || isLoading) return null;

    setIsLoading(true);
    try {
      const randomPrompt = theme.prompts[Math.floor(Math.random() * theme.prompts.length)];
      const fullPrompt = theme.promptPrefix + theme.prompts.slice(0, 5).join('\n') + theme.promptSuffix;
      
      const generatedText = await generateText(theme.model, fullPrompt, 50);
      
      // Clean up the generated text
      let cleanText = generatedText
        .split('\n')[0] // Take only the first line
        .trim()
        .replace(/^["']|["']$/g, '') // Remove quotes at start/end
        .replace(/^\d+\.\s*/, '') // Remove numbering
        .trim();

      // Update tab-specific memory
      updateTabText(cleanText);
      return cleanText;
    } catch (error) {
      console.error('Error generating text:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentText,
    getNextText: generateNewText,
    isLoading
  };
};
