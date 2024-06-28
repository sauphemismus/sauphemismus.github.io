// Define global variables
const API_KEY = "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";
const API_URL_JOKE = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1";
const API_URL_KEYWORDS = "https://api-inference.huggingface.co/models/vblagoje/bert-english-uncased-finetuned-pos";

// Buffered joke and background variables
let bufferedJoke = '';
let currentBgUrl = '';
let bufferedBgUrl = '';

// Input data for the joke query
const inputPrompt = "when boys wear beanies*craving adventure 24/7*watching it rain*having the perfect shoes to go with your outfit*playing with your cat*wanting the perfect prom dress*getting a nose ring*trying not to wear the same outfit twice*having a cute hairstyle*being weird*painting your nails pastel colors for the spring time*coffee on chilly fall days*wishing you had enough money to travel the world*loving the warmth of their arms*making pinky promises*going on tumblr too much*loving to spend time with your best friend*christmas treats*soft neck kisses*growing your hair out*lazy fall days*taking your bra off after a long day*popcorn and movies*wanting to get away for a while*wanting cute, small tattoos*netflix and chill*being close to your sister*staying in bed all day*watching it rain*getting along better with guys than girls*making funny faces*";
const inputCount = 31;
const temperature = 0.8;
const splitChar = "*";

const jokeInput = {
  "inputs": inputPrompt,  
  "parameters": {
    temperature: temperature,
  },
  "options": {
    wait_for_model: true,
    use_cache: false,
  },
};

// Function to send a query to the Hugging Face API and return the result
async function query(data, apiUrl) {
    const response = await fetch(
        apiUrl,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

// Function to fetch a joke from the API with optional data
async function fetchJoke(data) {
    try {
        const response = await query(data, API_URL_JOKE);
        const formattedJoke = formatJokeResponse(response);
        return formattedJoke;
    } catch (error) {
        console.error('Error fetching joke:', error);
        return null;
    }
}

// Function to fetch keywords from the API for a given joke
async function fetchKeywords(joke) {
    try {
        const response = await query({ "inputs": joke }, API_URL_KEYWORDS);
        return formattedResponse = formatKeywordsResponse(response);
    } catch (error) {
        console.error('Error fetching keywords:', error);
        return null;
    }
}

// Function to fetch a random background image based on keywords
async function fetchRandomBg(topic) {
  const width = document.documentElement.clientWidth + 10;
  const height = document.documentElement.clientHeight + 10;
  const orientation = width > height ? 'horizontal' : 'vertical';
  
  console.log(`Fetching image for topic: ${topic}` + " \torientation: " + orientation);
  // replace all spaces with '+' for the API call
  topic = topic.replace(/ /g, '+');


  // Fetch the image URL
  try {
    const response = await fetch(`https://pixabay.com/api/?key=44651696-fb16f33f4e495b9a42868696c&q=${topic}&orientation=${orientation}&image_type=photo&per_page=3`);
    const data = await response.json();
  
    // chose a random image from the response (depending on the number of hits)
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const imageUrl = data.hits[randomIndex].largeImageURL;
    return imageUrl;
  } catch (error) {
      console.error('Error fetching random background:', error);
      return null;
  }
  
  // chose a random image from the response (depending on the number of hits)
  const randomIndex = Math.floor(Math.random() * data.hits.length);
  const imageUrl = data.hits[randomIndex].largeImageURL;
  
  const div = background ? document.getElementById("bg1") : document.getElementById("bg2");
  div.style.backgroundImage = `url('${imageUrl}')`;
  div.style.backgroundSize = 'cover'; 
  div.style.backgroundRepeat = 'no-repeat'; 
  div.style.backgroundPosition = 'center';
    
}

// Function to set the background image for the webpage
function setBackground(url) {
    const bgElement = document.getElementById('background');
    bgElement.style.backgroundImage = `url('${url}')`;
    bgElement.style.zIndex = '-10'; // Set z-index of the current background

    // Update the z-index of the buffered background to be higher than the current background
    const bufferedBgElement = document.getElementById('buffered-background');
    bufferedBgElement.style.zIndex = '-20'; // Set z-index of the buffered background

    // After setting the current background, display the buffered background behind it
    bufferedBgElement.style.backgroundImage = `url('${bufferedBgUrl}')`;
    bufferedBgElement.style.display = 'block'; // Display the buffered background
}

// Function to set the background image for the buffered joke
function setBufferBackground(url) {
    const bufferedBgElement = document.getElementById('buffered-background');
    bufferedBgElement.style.backgroundImage = `url('${url}')`;
}

// Function to clean up and format the joke response object into a displayable string
function formatJokeResponse(response) {
    let joke = response;

    joke = JSON.stringify(joke, null, 2);
    joke = joke.replace(/\n/g, splitChar);
    joke = joke.replace(/\\n/gm, splitChar);
    joke = joke.replace(/[\[\]\{\}\\"]/g, "");
    joke = joke.replace(/  /g, " ");
    joke = joke.replace("generated_text:", "");
    joke = joke.trim();
    joke = joke.split(splitChar);
    joke = joke.filter((line) => line.trim() !== "");
    joke = joke[inputCount];

    return joke;
}

// Function to clean up and format the keywords response object into an array of strings
function formatKeywordsResponse(response) {
    let keywords = response;

    keywords = JSON.stringify(keywords, null, 2);
    keywords = JSON.parse(keywords);

    outArray_X = {};
    for (var i = 0; i < keywords.length; i++) {
      outArray_X[keywords[i].entity_group] = "";
    }
    for (var i = 0; i < keywords.length; i++) {
      if (outArray_X[keywords[i].entity_group] == "")
        outArray_X[keywords[i].entity_group] = keywords[i].word;
      else
        outArray_X[keywords[i].entity_group] += "," + keywords[i].word;
    }

    console.log(outArray_X);

    result = selectKeywords(outArray_X);
    console.log(result);

    return result;
}

function selectKeywords(text) {

  if ("NOUN" in text)
    var keywords = text["NOUN"];
  else if ("PROPN" in text)
    var keywords = text["PROPN"];
  else if ("VERB" in text)
    var keywords = text["VERB"];
  else if ("ADJ" in text)
    var keywords = text["ADJ"];
  else if ("ADV" in text)
    var keywords = text["ADV"];
  else if ("ADP" in text)
    var keywords = text["ADP"];

  if ("NOUN" in text && "VERB" in text)
    var keywords = text["NOUN"] + "," + text["VERB"]; 
  else if ("PROPN" in text && "VERB" in text)
    var keywords = text["PROPN"] + "," + text["VERB"];

  if ("NOUN" in text && "VERB" in text && "ADV" in text)
    var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"];
  else if ("PROPN" in text && "VERB" in text && "ADV" in text)
    var keywords = text["PROPN"] + "," + text["VERB"] + "," + text["ADV"];

  if ("NOUN" in text && "VERB" in text && "ADJ" in text)
    var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADJ"];
  else if ("PROPN" in text && "VERB" in text && "ADJ" in text)
    var keywords = text["PROPN"] + "," + text["VERB"] + "," + text["ADJ"];

  // if no keywords found, use default
  if (keywords == "")
    keywords = "nice sunset";

  return keywords;
}

// Function to set background for a joke
async function setJokeBackground(joke) {
    const keywords = await fetchKeywords(joke);
    const bgUrl = await fetchRandomBg(keywords);
    currentBgUrl = bgUrl; // Update the current background URL
    setBackground(bgUrl);
}

// Function to preload background for a joke in the buffer
async function preloadBufferBackground(joke) {
    const keywords = await fetchKeywords(joke);
    const bgUrl = await fetchRandomBg(keywords);
    bufferedBgUrl = bgUrl; // Update the buffered background URL
    setBufferBackground(bgUrl);
}

// Function to display a joke
function displayJoke(joke) {
    const jokeElement = document.getElementById('joke');
    jokeElement.textContent = joke;
}

// Function to handle button click event
async function handleButtonClick() {
  if (bufferedJoke) {
      displayJoke(bufferedJoke);
      setBackground(currentBgUrl); // Set the current background again
      if (bufferedBgUrl) {
          setBufferBackground(bufferedBgUrl); // Set the buffered background if it's loaded
      }
  }

  const newJoke = await fetchJoke(jokeInput);
  await setJokeBackground(newJoke);
  bufferedJoke = newJoke;
  await preloadBufferBackground(newJoke); // Preload background for the new joke in the buffer
}

// Function to initialize the page
async function initializePage() {
    const [initialJoke, bufferedInitialJoke] = await Promise.all([fetchJoke(jokeInput), fetchJoke(jokeInput)]);
    displayJoke(initialJoke);
    await setJokeBackground(initialJoke);
    bufferedJoke = bufferedInitialJoke;
    // Initially hide the buffered background
    document.getElementById('buffered-background').style.display = 'none';
    await preloadBufferBackground(bufferedInitialJoke); // Preload background for the initial buffered joke
    const button = document.getElementById('button');
    button.addEventListener('click', handleButtonClick);
}

// Call the initialization function when the page loads
window.addEventListener('load', initializePage);
