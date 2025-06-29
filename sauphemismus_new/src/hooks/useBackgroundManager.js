import { useState, useEffect, useCallback } from 'react';
import { getRandomBackgroundImage, getRandomTopic } from '../services/pixabay';
import { analyzePartOfSpeech } from '../services/huggingface';

export const useBackgroundManager = (theme) => {
  const [backgroundImages, setBackgroundImages] = useState(['', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Load initial background
  useEffect(() => {
    if (theme && theme.backgroundTopics) {
      const topic = getRandomTopic(theme.backgroundTopics);
      loadBackgroundImage(topic, 0);
    }
  }, [theme]);

  const loadBackgroundImage = useCallback(async (topic, index) => {
    try {
      const imageUrl = await getRandomBackgroundImage(topic);
      if (imageUrl) {
        setBackgroundImages(prev => {
          const newImages = [...prev];
          newImages[index] = imageUrl;
          return newImages;
        });
      }
    } catch (error) {
      console.error('Error loading background image:', error);
    }
  }, []);

  const changeBackground = useCallback(async (generatedText = null) => {
    if (isChanging) return;
    
    setIsChanging(true);
    const nextIndex = activeIndex === 0 ? 1 : 0;
    
    let topic;
    
    if (generatedText && theme.title === 'justgptthings') {
      // For justgptthings, analyze the generated text for keywords
      try {
        const keywords = await analyzePartOfSpeech(generatedText);
        if (keywords.length > 0) {
          // Use the first keyword or combine with theme topics
          topic = keywords[0];
        } else {
          // Fallback to theme topics
          topic = getRandomTopic(theme.backgroundTopics);
        }
      } catch (error) {
        console.error('Error analyzing text for background:', error);
        topic = getRandomTopic(theme.backgroundTopics);
      }
    } else {
      // For other themes, use predefined topics
      topic = getRandomTopic(theme.backgroundTopics);
    }
    
    console.log('Loading background for topic:', topic);
    await loadBackgroundImage(topic, nextIndex);
    
    // Smooth transition
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setIsChanging(false);
    }, 100);
  }, [activeIndex, isChanging, theme, loadBackgroundImage]);

  return {
    backgroundImages,
    activeIndex,
    changeBackground,
    isChanging
  };
};
