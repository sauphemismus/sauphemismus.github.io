import { useState, useEffect, useCallback } from 'react';
import { generateText } from '../services/huggingface';

export const useTextBuffer = (theme) => {
  const [buffer, setBuffer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasShownFirstText, setHasShownFirstText] = useState(false);

  // Generate a new text based on theme prompts
  const generateNewText = useCallback(async () => {
    if (!theme || isGenerating) return null;

    setIsGenerating(true);
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

      return cleanText;
    } catch (error) {
      console.error('Error generating text:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [theme, isGenerating]);

  // Initialize buffer on theme change
  useEffect(() => {
    if (theme) {
      setHasShownFirstText(false);
      setCurrentText('');
      setBuffer('');
      
      // Start loading the first text in background
      generateNewText().then(text => {
        if (text) {
          setBuffer(text);
        }
      });
    }
  }, [theme, generateNewText]);

  // Get the next text (current buffer) and generate a new one for buffer
  const getNextText = useCallback(async () => {
    // If no buffer is ready, show loading
    if (!buffer) {
      setIsLoading(true);
      const newText = await generateNewText();
      setIsLoading(false);
      if (newText) {
        setCurrentText(newText);
        setHasShownFirstText(true);
        // Generate next buffer
        generateNewText().then(text => {
          if (text) setBuffer(text);
        });
        return newText;
      }
      return null;
    }

    // Use buffered text and generate new one
    const textToShow = buffer;
    setCurrentText(textToShow);
    setHasShownFirstText(true);
    setBuffer(''); // Clear buffer
    
    // Generate new text for buffer
    generateNewText().then(newText => {
      if (newText) {
        setBuffer(newText);
      }
    });
    
    return textToShow;
  }, [buffer, generateNewText]);

  return {
    currentText,
    getNextText,
    isLoading,
    isGenerating,
    hasBuffer: !!buffer,
    hasShownFirstText
  };
};
