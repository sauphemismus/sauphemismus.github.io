import { useState, useEffect } from 'react';

// Global state for tab-specific content
const tabMemory = {};

export const useTabMemory = (themeId) => {
  const [currentText, setCurrentText] = useState('');

  // Load text for current tab when themeId changes
  useEffect(() => {
    if (themeId && tabMemory[themeId]) {
      setCurrentText(tabMemory[themeId]);
    } else {
      setCurrentText('');
    }
  }, [themeId]);

  // Function to update text for current tab
  const updateTabText = (text) => {
    if (themeId) {
      tabMemory[themeId] = text;
      setCurrentText(text);
    }
  };

  // Function to clear text for current tab
  const clearTabText = () => {
    if (themeId) {
      delete tabMemory[themeId];
      setCurrentText('');
    }
  };

  return {
    currentText,
    updateTabText,
    clearTabText
  };
};
