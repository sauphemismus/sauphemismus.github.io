// Description: This file contains utility functions that are used in the main script.

export async function randomBg(topic) {
    const width = document.documentElement.clientWidth + 10;
    const height = document.documentElement.clientHeight + 10;
    const orientation = width > height ? 'horizontal' : 'vertical';
    
    console.log(`Fetching image for topic: ${topic}` + " \torientation: " + orientation);
    // replace all spaces with '+' for the API call
    topic = topic.replace(/ /g, '+');
  
    const response = await fetch(`https://pixabay.com/api/?key=44651696-fb16f33f4e495b9a42868696c&q=${topic}&orientation=${orientation}&image_type=photo&per_page=3`);
    const data = await response.json();
    
    // chose a random image from the response (depending on the number of hits)
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const imageUrl = data.hits[randomIndex].largeImageURL;
    
    const div = background ? document.getElementById("bg1") : document.getElementById("bg2");
    div.style.backgroundImage = `url('${imageUrl}')`;
    div.style.backgroundSize = 'cover'; 
    div.style.backgroundRepeat = 'no-repeat'; 
    div.style.backgroundPosition = 'center';
  }

