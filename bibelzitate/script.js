// generate from input----------------------------------------------------------
async function query(data) {
  const response = await fetch(
    //"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
    //"https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B",
    //"https://api-inference.huggingface.co/models/openai-community/gpt2-xl",
    //"https://api-inference.huggingface.co/models/bigscience/bloom",

    //"https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    
    "https://api-inference.huggingface.co/models/google/gemma-7b",

    //"https://api-inference.huggingface.co/models/benjamin/gpt2-wechsel-german",
    //"https://api-inference.huggingface.co/models/dbmdz/german-gpt2",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

function generate(input, inputCount, temperature, token_count, splitChar, followFunction, too_long){

  query({
    "inputs":
      input,  
    "parameters": {
      //min_length: token_count,
      //max_length: token_count,
      temperature: temperature,
      max_new_tokens: 70,
    },
    "options": {
      use_cache: false,
      wait_for_model: true,
    },
  }).then((response) => {
    console.log(JSON.stringify(response));
    output = JSON.stringify(response);
    output = output.replace(/[\[\]\{\}\\"]/g, "");
    output = output.replace(/\\n/gm, " ");
    output = output.replace("generated_text:", "");

    var outArray = output.split(splitChar);

    if(outArray[inputCount].length > too_long){
      generate(input, inputCount, temperature, token_count, splitChar, followFunction, too_long);
      return;
    }

    followFunction(outArray[inputCount]);

  }).catch((error) => {})
}



// generate from input----------------------------------------------------------
var running = false;
var spruch_g = false;
var autor_g = false;
var background = false;


document.onload = randomBg("Nature+landscape");
document.onload = init();
document.onload = document.getElementById("history").innerHTML = "";



async function randomBg(topic) {
  const width = document.documentElement.clientWidth + 10;
  const height = document.documentElement.clientHeight + 10;
  const orientation = width > height ? 'horizontal' : 'vertical';
  
  console.log(`Fetching image for topic: ${topic}` + " \torientation: " + orientation);
  // replace all spaces with '+' for the API call
  topic = topic.replace(/ /g, '+');

  const response = await fetch(`https://pixabay.com/api/?key=44651696-fb16f33f4e495b9a42868696c&q=${topic}&orientation=${orientation}&image_type=photo&per_page=20`);
  const data = await response.json();
  console.log("fezched image");
  
  // chose a random image from the response (depending on the number of hits)
  const randomIndex = Math.floor(Math.random() * data.hits.length);
  const imageUrl = data.hits[randomIndex].largeImageURL;
  
  const div = background ? document.getElementById("bg1") : document.getElementById("bg2");
  div.style.backgroundImage = `url('${imageUrl}')`;
  div.style.backgroundSize = 'cover'; 
  div.style.backgroundRepeat = 'no-repeat'; 
  div.style.backgroundPosition = 'center';
}

function randomFont(){
  array = ["Sacramento", "Dancing Script", "Tangerine", "Reenie Beanie", "Mrs Saint Delafield", "Coming Soon", "Cedarville Cursive", "Petit Formal Script", "Zeyada", "Just Me Again Down Here"]
  random = Math.floor(Math.random() * array.length);
  return array[random];
}

function init(){

  console.log("init")
  if(running)
    return;
  
  running = true;
  var loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "block";

  randomBg("Nature+landscape");
  console.log("fetched bg")

  var div = document.getElementById("bibelspruch");
  div.style.display = "none";

  generate(
    "Vorallem behüte dein Herz, denn es hat den größten Einfluss auf dein Leben!*Seid niemandem etwas schuldig, außer dass ihr euch untereinander liebt; denn wer den andern liebt, der hat das Gesetz erfüllt.*Der Herr ist nahe denen, die zerbrochenen Herzens sind, und er hilft denen, die zerschlagenen Geistes sind.*Er heilt, die zerbrochenen Herzens sind, und verbindet ihre Wunden.*Glaube, Hoffnung und Liebe, diese drei bleiben. Aber am größten ist die Liebe.*Gelobt sei der Herr täglich. Gott legt uns eine Last auf, aber er hilft uns auch.*Gott ist die Liebe und wer in der Liebe bleibt, der bleibt in Gott und Gott in ihm.*Der Herr ist mein Licht und mein Heil; vor wem sollte ich mich fürchten! Der Herr ist meines Lebens Kraft; vor wem sollte mir grauen!*Ich behalte dein Wort in meinen Herzen damit ich nicht wieder dich sündige.*Ein frohes Herz macht ein glückliches Gesicht; ein gebrochenes Herz betrübt den Geist.Sei mutig und entschlossen! Lass dich nicht einschüchtern, und hab keine Angst! Denn ich, der Herr, dein Gott, bin bei dir, wohin du auch gehst.*",
    10, 0.9, 500, "*", neuerSpruch, 150);

  generate(
    "Jesaia*Jeremia*Baruch*Ezechiel*Daniel*Hosea*Joel*Amos*Obadiah*Jonah*Micah*Nahum*Habakuk*Zephaniah*Haggai*Zacharias*Malachias*Matthäus*Markus*Lukas*Johannes*",
    21, 1.0, 100, "*", neuerAutor, 100);


  if(background)
    card_bg = document.getElementById("bg2");
  else card_bg = document.getElementById("bg1");  
  addCard(
    document.getElementById("spruch").innerHTML,
    document.getElementById("autor").innerHTML,
    document.getElementById("bibelspruch").style.fontFamily,
    card_bg.style.backgroundImage,
  )
}


function neuerSpruch(text){
  var spruch = document.getElementById("spruch");
  spruch.innerHTML = text;

  var div = document.getElementById("bibelspruch");
  div.style.fontFamily = randomFont();
  
  if(autor_g)
    show_new();
  else
    spruch_g = true;
}

function neuerAutor(text){
  var autor = document.getElementById("autor");
  autor.innerHTML = text + " " + (Math.floor(Math.random() * 38) + 1) + ":" + (Math.floor(Math.random() * 38) + 1);
  
  if(spruch_g)
    show_new();
  else
    autor_g = true;
}

function show_new(){
  if(background){
    bg = document.getElementById("bg1");
    nbg = document.getElementById("bg2");
  }
  else{
    bg = document.getElementById("bg2");
    nbg = document.getElementById("bg1");
  }
  bg.style.zIndex = "-10";
  nbg.style.zIndex = "-11";
  nbg.style.backgroundImage = "";
  background = !background;

  var div = document.getElementById("bibelspruch");
  div.style.display = "grid";

  var loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "none";

  spruch_g = false;
  autor_g = false;
  running = false;

}

function addCard(text, author, font, img){
  var div = document.getElementById("history");
  div.innerHTML = "<div class='card' style='background-image:" + img + ";font-family:" + font + ";'><h5 class'card-text'>" + text + "</h5><p class='card-author'>" + author + "</p></div>" + div.innerHTML;
}
