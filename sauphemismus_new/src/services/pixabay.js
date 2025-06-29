const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export const getRandomBackgroundImage = async (topic) => {
  try {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'horizontal' : 'vertical';
    
    // Replace spaces with '+' for the API call
    const searchTopic = topic.replace(/ /g, '+');
    
    const response = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchTopic}&orientation=${orientation}&image_type=photo&per_page=20&category=all&safesearch=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch background image');
    }
    
    const data = await response.json();
    
    if (data.hits.length === 0) {
      // Fallback to a generic topic if no results
      return getRandomBackgroundImage('abstract');
    }
    
    // Choose a random image from the response
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    return data.hits[randomIndex].largeImageURL;
  } catch (error) {
    console.error('Error fetching background image:', error);
    // Return a fallback gradient if API fails
    return null;
  }
};

export const getRandomTopic = (topics) => {
  const randomIndex = Math.floor(Math.random() * topics.length);
  return topics[randomIndex];
};
