const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const getRandomBackgroundImage = async (keywords) => {
  try {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'horizontal' : 'vertical';
    
    // Clean and prepare search terms - support both string and array input
    let searchTerms = [];
    
    if (typeof keywords === 'string') {
      // Handle comma-separated keywords like "word1,word2,word3"
      searchTerms = keywords
        .split(',')
        .map(term => term.toLowerCase().replace(/[^\w\s]/g, '').trim())
        .filter(term => term.length > 0);
    } else if (Array.isArray(keywords)) {
      searchTerms = keywords
        .map(term => term.toLowerCase().replace(/[^\w\s]/g, '').trim())
        .filter(term => term.length > 0);
    } else {
      searchTerms = ['abstract'];
    }
    
    console.log(`Searching Pixabay for keywords: [${searchTerms.join(', ')}]`);
    
    // Try multiple search strategies with decreasing keyword count
    const searchStrategies = [
      searchTerms.join('+'), // All keywords combined
      searchTerms.slice(0, 2).join('+'), // First 2 keywords
      searchTerms[0], // First keyword only
      'nature', // Safe fallback
      'abstract' // Final fallback
    ].filter(search => search && search.length > 0);
    
    for (const search of searchStrategies) {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${search}&orientation=${orientation}&image_type=photo&per_page=20&category=all&safesearch=true&min_width=800&min_height=600`
        );
        
        if (!response.ok) {
          console.warn(`API call failed for "${search}":`, response.status);
          continue;
        }
        
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
          // Choose a random image from the response
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const imageUrl = data.hits[randomIndex].largeImageURL;
          console.log(`Found ${data.hits.length} images for "${search}", using:`, imageUrl);
          return imageUrl;
        } else {
          console.warn(`No images found for "${search}"`);
        }
      } catch (searchError) {
        console.warn(`Error searching for "${search}":`, searchError);
        continue;
      }
    }
    
    // If all searches fail, return null (will use gradient fallback)
    console.error('All Pixabay searches failed');
    return null;
    
  } catch (error) {
    console.error('Error fetching background image:', error);
    return null;
  }
};

export const getRandomTopic = (topics) => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
};
