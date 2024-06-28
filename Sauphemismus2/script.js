
// define global variables
API_KEY = "Bearer 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";
//API_URL_JOKE = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1";
//API_URL_JOKE = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
API_URL_JOKE = "https://api-inference.huggingface.co/models/google/gemma-7b";
//API_URL_JOKE = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B";
//API_URL_JOKE = "https://api-inference.huggingface.co/models/dbmdz/german-gpt2";

API_URL_KEYWORDS = "https://api-inference.huggingface.co/models/KoichiYasuoka/bert-base-german-upos";


// define the input prompt for the joke generation
const inputPromptArray = [
"amtlich einen umhängen",
"einen in die Brause schütten",
"ein Züchtbier servieren",
"einen in die Fresse schäumen lassen",
"den Kopf umrühren",
"die Wäsche abziehen lassen",
"glimpflich die Säfte mischen",
"einen in die Schüssel rühren",
"einen aufsteigen lassen",
"den Kübel düngen ",
"einen in den Hals schütten",
"die Konserven öffnen",
"ordentlich einen reinlöten",
"wie ein Achtarmiger einen reinorgeln",
"einen hinter die Rüstung römern",
"ein Export importieren",
"einen aus der Fassung befreien",
"den Helm lackieren",
"die Kontakte feucht legen",
"einen Henkel vom Humpen brechen",
"den Biergurt aufbinden",
"einen in die Drahtseile hängen",
"den Maschinenraum fluten", 
"die Batterie abklemmen",
"die Festplatte formatieren",
"die Rinne verzinken",
"die Tapete bekleistern",
"die Rüstung einfetten",
"den Vollkornsprudel ins Feinkostegewölbe schütten",
"einen zwischen die Kiemen peitschen",
"den Ölstand prüfen",
"eine Nierenspülung vornehmen",
"völlig wegjodeln",
"Hopfen und Malz wiederfinden",
"einen hinter die Buche fichten",
"Kaltgetränke zurück ins Fass pressen",
"Krawallbrause hinter die Fresspappe kippen",
"den Propeller verbiegen",
"einen hinter die Borke kiefern",
"einen in die Schrankwand nageln",
"das Blechdach abdecken",
"gemeinschaftlich die Ziege blind machen",
"die Gardienen zuziehen",
"die eigene Laterne austreten",
"die Hirnwindungen entknoten",
"einen Getränkeunfall verursachen",
"ehrenlos wegschachteln",
"auf Kommando Dichtschußß gehen",
"den Absturz kalibrieren",
"die Posaune trompeten",
"den Schinken pökeln",
"die Grenzen verzollen",
"Das Stirnband von innen besticken",
"einen ins Toupé föhnen",
"die Muttern lösen",
"die Muttersprache entwöhnen",
"ein paar Braunglasraketen zünden",
"einen hinter die Tannen harzen",
"das Etui vollstiften",
"den Durchblick vollspachteln",
"den Salamander aus der Hose locken",
"den Köcher vollschießen",
"das Pesthaus entlüften",
"den Stromkreis überbrücken", 
"den Motor überhitzen",
]
const inputLength = inputPromptArray.length;
const inputTemperature = (Math.random() * 0.1) + 0.5; // temperature for generating the joke
const splitChar = "*"; // character to split the generated output into an array
const tokenCount = 500; // desired length of the generated text in tokens


// --------------------------------------------------------------------------------------------
// General functions for generating text and keywords, and setting background images
/**
 * Creates an input prompt by shuffling the elements in the inputPromptArray and concatenating them with an asterisk.
 * @param {Array} inputPromptArray - The array of input prompts.
 * @returns {string} The input prompt string.
 */
function createInputPrompt (inputPromptArray){
  var inputPrompt = "Eine Liste aller Sprüche, die man statt 'einen trinken gehen' sagen könnte: bzw. 'einen trinken gehen' mal anders:";
  // shuffle the inputPromptArray all the time
  inputPromptArray.sort(() => Math.random() - 0.5);
  for (var i = 0; i < inputPromptArray.length; i++){
    inputPrompt += "Hey, wollen wir uns heute Abend " + inputPromptArray[i] + "?" + splitChar;
  }
  return inputPrompt;
}

/**
 * Generates text based on the provided input using the GPT model.
 *
 * @param {string} input - The input text to generate from.
 * @param {number} inputCount - The index of the generated text in the output array.
 * @param {number} temperature - The temperature value for controlling randomness in the generated text.
 * @param {number} token_count - The desired length of the generated text in tokens.
 * @param {string} splitChar - The character used to split the generated output into an array.
 * @param {function} followFunction - The function to be called with the generated text.
 * @returns {void}
 */
function generateJoke(input, inputCount, temperature, token_count, splitChar, followFunction){

  query({
    "inputs":
      input,  
    "parameters": {
      //min_length: token_count,
      //max_length: token_count,
      temperature: temperature,
    },
    "options": {
      wait_for_model: true,
      use_cache: false,
    },
  }, API_URL_JOKE
  ).then((response) => {
    output = JSON.stringify(response);
    console.log(output);
    output = output.replace(/\n/g, splitChar);
    output = output.replace(/\\n/gm, splitChar);
    output = output.replace(/[\[\]\{\}\\]/g, "");
    output = output.replace("generated_text:", "");

    var outArray = output.split(splitChar);
    res = outArray[inputCount];
    if(res.length < 5 || res.length > 200 ){ //|| isNaughty(res)){
      generateJoke(input, inputCount, temperature, token_count, splitChar, followFunction);
      return;
    }
    
    console.log(res, "temperature: ", Math.round(temperature * 100) / 100);

    followFunction(outArray[inputCount]);
    
  }).catch((error) => {
    error = JSON.stringify(error);
    window.alert("Whoops, something went wrong: " + error);
  })
}

/**
 * Generates keywords based on the input and calls the followFunction with the generated keywords.
 * @param {Object} input - The input object containing the necessary data for generating keywords.
 * @param {Function} followFunction - The function to be called with the generated keywords.
 */
function generateKeywords(input, followFunction){

  query({
    "inputs":
      input,  
    "parameters": {
      
    },
    "options": {
      wait_for_model: true,
      use_cache: false,
    },
  }, API_URL_KEYWORDS
  ).then((response) => {
    output = JSON.stringify(response);
    output = JSON.parse(output);

    outArray_X = {};
    for (var i = 0; i < output.length; i++) {
      outArray_X[output[i].entity_group] = "";
    }
    for (var i = 0; i < output.length; i++) {
      if (outArray_X[output[i].entity_group] == "")
        outArray_X[output[i].entity_group] = output[i].word;
      else
        outArray_X[output[i].entity_group] += "," + output[i].word;
    }
    
    followFunction(outArray_X);

  }).catch((error) => {window.alert(error)})
  
}

/**
   * Sends a query to the Hugging Face API and returns the result.
   * @param {Object} data - The data to be sent in the request body.
   * @returns {Promise<Object>} - A promise that resolves to the API response.
   */
async function query(data, api_url) {
  const response = await fetch(
    api_url,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}  

/**
 * Sets a random background image for the specified topic.
 * @param {string} topic - The topic for the background image.
 */
async function randomBg(topic) {
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


/**
 * Generates a random background based on the keywords extracted from the given text.
 * @param {object} text - The text object containing different parts of speech as keys and corresponding words as values.
 */
function keywords2Bg(text){

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

  // delete "Abend" and "heute" from keywords
  keywords = keywords.replace("Abend,", "");
  keywords = keywords.replace("heute,", "");
  // generate and set random background
  randomBg(keywords);

}  

function randomFont(){
  array = ["Josefin Slab", "Bodoni Moda", "Bitter", "Amatic SC", "Antic Slab", "Yeseva One"]
  random = Math.floor(Math.random() * array.length);
  return array[random];
}

// --------------------------------------------------------------------------------------------
// Version 1 of the button handling and joke generation


/**
 * Handles the button click event.
 */
function onButtonClick(){
  if(running)
    return;
  
  running = true;
  var loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "block";

  var div = document.getElementById("joke_wrapper");
  div.style.display = "none";
  //div.style.fontFamily = randomFont();

  generateJoke(
    createInputPrompt(inputPromptArray),
    inputLength, 
    inputTemperature, 
    tokenCount, 
    splitChar, 
    updateJoke);
  
}


/**
 * Generates the next joke (joke_gen) and updates the display to show the new joke (joke_show)
 * @param {string} input_joke - The new joke.
 */
function updateJoke(input_joke){
  joke_show = joke_gen;
  joke_gen = input_joke;
  // generate an extra joke at first call
  if (joke_show == ""){
    generateJoke(
      createInputPrompt(inputPromptArray),
      inputLength, 
      inputTemperature, 
      tokenCount,
      splitChar,
      updateJoke);
      return
  }


  var joke = document.getElementById("joke");
  if (joke_show.endsWith(" "))
    joke_show = joke_show.substring(0, joke_show.length - 1);
  if (!joke_show.endsWith(".") && !joke_show.endsWith("!") && !joke_show.endsWith("?")) {
    joke_show += ".";
  }
  joke.innerHTML = joke_show
  joke.style.fontFamily = randomFont();
  
  console.log("joke_show:", joke_show, "length:", joke_show.length)
  
  
  toggleBackgroundAndShowNew();

}


/**
 * Toggles the background and shows a new topic.
 */
function toggleBackgroundAndShowNew() {
  if (background) {
    bg = document.getElementById("bg1");
    nbg = document.getElementById("bg2");
  } else {
    bg = document.getElementById("bg2");
    nbg = document.getElementById("bg1");
  }
  bg.style.zIndex = "-10";
  nbg.style.zIndex = "-11";
  nbg.style.backgroundImage = "";
  background = !background;

  new_topic = generateKeywords(joke_gen, keywords2Bg);
  var div = document.getElementById("joke_wrapper");
  div.style.display = "grid";

  var loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "none";

  running = false;
}

// --------------------------------------------------------------------------------------------
// end of version 1

// generate from input----------------------------------------------------------
var running = false; // is the joke generation running?
var background = false; // false: bg1 is shown, true: bg2 is shown
var joke_gen = ""; // this is the joke that is stored in the background
var joke_show = ""; // this is the joke that is shown on the website

var author = document.getElementById("author");
  const bangersFont = new FontFace('UCUCharlesScript', 'url(UCUcharlesscript.ttf)');
  bangersFont.load().then(function (loadedFont) {
    document.fonts.add(loadedFont)
    author.style.fontFamily = '"UCUCharlesScript"';
  });

document.onload = randomBg("nice sunset");
document.onload = onButtonClick();

// --------------------------------------------------------------------------------------------
// Version 2 of the button handling and joke generation
// in version 1, the timeline was:
// 1. button click, 2.  hide current joke and show loader, 3. start generate joke_gen, 4. wait for joke_gen to finish, 5. show joke_show and show new BG and hide loader, 6. update joke_show to joke_gen for next iteration
// this leads to a delay between the button click and the joke_show display, because we wait for the joke_gen to be generated and finished.
// But we can also generate the joke_gen while the joke_show is displayed, and then update the joke_show to joke_gen when the joke_gen is finished. 
// Then, when the button is clicked, we can immediately show the joke_show and start generating the joke_gen in the background.
// This is implemented in version 2.
// so the timeline is:
// 1. button click, 2. show joke_show and start generate joke_gen in the background, 3. wait for joke_gen to finish, 4. update joke_show to joke_gen for next iteration

// We DO NOT take the code from version 1, we write new functions, but we can of course reuse the general functions above.
// we can use one function for the onload event when the webste first loads, and a separate function for the joke generation and display update.
// So when the website is loaded, we can immediately show the joke_show and start generating the joke_gen in the background.
// Then, when the button is clicked, we can immediately show the joke_show and start generating the joke_gen in the background.

// for that to work, we need to get 2 jokes right at the beginning, so we can show the first joke immediately and start generating the second joke in the background.
// we can then update the joke_show to the joke_gen when the joke_gen is finished.

// --------------------------------------------------------------------------------------------
// var joke_buffer = ""; // this is the joke that is stored in the background
// var joke_show = ""; // this is the joke that is shown on the website
// var running = false; // is the joke generation running?
// var bg_buffer = ""; // this is the background that is stored in the background
// var bg_show = ""; // this is the background that is shown on the website


