// generate from input----------------------------------------------------------

function generate(input, inputCount, temperature, token_count, splitChar, followFunction, too_long){

  query({
    inputs:
      input,  
    parameters: {
      min_length: token_count,
      max_length: token_count,
      temperature: temperature,
    },
    options: {
      wait_for_model: true,
      use_cache: false,
    },
  }).then((response) => {
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

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

// generate from input----------------------------------------------------------
var running = false;
var spruch_g = false;
var autor_g = false;
var background = false;


document.onload = randomBg();
document.onload = init();
document.onload = document.getElementById("history").innerHTML = "";



function randomBg(){
  ratio = window.devicePixelRatio || 1;
  width = window.screen.width * ratio;
  height = window.screen.height * ratio;
  var random = Math.floor(Math.random() * 10000);
  
  if(background)
    div = document.getElementById("bg1");
  else div = document.getElementById("bg2");
  div.style.backgroundImage = "url('https://source.unsplash.com/random/" + width + "x" + height + "/?nature,&" + random + "')";
}

function randomFont(){
  array = ["Sacramento", "Dancing Script", "Tangerine", "Reenie Beanie", "Mrs Saint Delafield", "Coming Soon", "Cedarville Cursive", "Petit Formal Script", "Zeyada", "Just Me Again Down Here"]
  random = Math.floor(Math.random() * array.length);
  return array[random];
}

function init(){
  if(running)
    return;
  
  running = true;
  var loader = document.getElementsByClassName("loader")[0];
  loader.style.display = "block";

  randomBg();

  var div = document.getElementById("bibelspruch");
  div.style.display = "none";

  generate(
    "Vorallem behüte dein Herz, denn es hat den größten Einfluss auf dein Leben!*Seid niemandem etwas schuldig, außer dass ihr euch untereinander liebt; denn wer den andern liebt, der hat das Gesetz erfüllt.*Der Herr ist nahe denen, die zerbrochenen Herzens sind, und er hilft denen, die zerschlagenen Geistes sind.*Er heilt, die zerbrochenen Herzens sind, und verbindet ihre Wunden.*Glaube, Hoffnung und Liebe, diese drei bleiben. Aber am größten ist die Liebe.*Gelobt sei der Herr täglich. Gott legt uns eine Last auf, aber er hilft uns auch.*Gott ist die Liebe und wer in der Liebe bleibt, der bleibt in Gott und Gott in ihm.*Der Herr ist mein Licht und mein Heil; vor wem sollte ich mich fürchten! Der Herr ist meines Lebens Kraft; vor wem sollte mir grauen!*Ich behalte dein Wort in meinen Herzen damit ich nicht wieder dich sündige.*Ein frohes Herz macht ein glückliches Gesicht; ein gebrochenes Herz betrübt den Geist.Sei mutig und entschlossen! Lass dich nicht einschüchtern, und hab keine Angst! Denn ich, der Herr, dein Gott, bin bei dir, wohin du auch gehst.*",
    10, 0.8, 500, "*", neuerSpruch, 150);

  generate(
    "Jesaia*Jeremia*Baruch*Ezechiel*Daniel*Hosea*Joel*Amos*Obadiah*Jonah*Micah*Nahum*Habakuk*Zephaniah*Haggai*Zacharias*Malachias*Matthäus*Markus*Lukas*Johannes*",
    21, 1.5, 100, "*", neuerAutor, 100);


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
