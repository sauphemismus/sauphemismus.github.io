// Configuration for keyword search behavior
export const SEARCH_CONFIG = {
  // Set to false to use only single keywords (like current implementation)
  // Set to true to use multiple keywords (like old faktemismus system)
  USE_MULTIPLE_KEYWORDS: true,
  
  // Maximum number of keywords to combine in search
  MAX_KEYWORD_COMBINATIONS: 3,
  
  // Debug logging for keyword extraction
  DEBUG_KEYWORDS: true
};
