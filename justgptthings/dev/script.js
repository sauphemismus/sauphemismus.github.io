// generate from input----------------------------------------------------------

function generate(input, inputCount, temperature, token_count, splitChar, followFunction){

    query({
      "inputs":
        input,  
      "parameters": {
        min_length: token_count,
        max_length: token_count,
        temperature: temperature,
      },
      "options": {
        wait_for_model: true,
        use_cache: false,
      },
    }).then((response) => {
      output = JSON.stringify(response);
      output = output.replace(/\n/g, splitChar);
      output = output.replace(/\\n/gm, splitChar);
      output = output.replace(/[\[\]\{\}\\"]/g, "");
      output = output.replace("generated_text:", "");
      
  
      var outArray = output.split(splitChar);
      res = outArray[inputCount];
      if(res.length < 5 || res.length > 200 ){ //|| isNaughty(res)){
        generate(input, inputCount, temperature, token_count, splitChar, followFunction);
        return;
      }
      followFunction(outArray[inputCount]);
      
  
    }).catch((error) => {
      window.alert("Whoopsy, something went wrong\nTry again later...\n" + error);
    })
  }
  
  async function query(data) {
    const response = await fetch(
      //"https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B",
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
      //"https://api-inference.huggingface.co/models/google/gemma-7b",

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


  function generateMVP(input, followFunction){

    query2({
      inputs:
        input,  
      parameters: {
        
      },
      options: {
        wait_for_model: true,
        use_cache: false,
      },
    }).then((response) => {
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
  
  async function query2(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/vblagoje/bert-english-uncased-finetuned-pos",
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
  var background = false;

  var spruch_gen = "";
  var spruch_show = "";
  // autor
  var autor = document.getElementById("autor");
    const bangersFont = new FontFace('UCU Fuck it', 'url(../UCUcharlesscript.ttf)');
    bangersFont.load().then(function (loadedFont) {
      document.fonts.add(loadedFont)
      autor.style.fontFamily = '"UCU Fuck it"';
    });
  autor.innerHTML = "justgptthings";


  document.onload = randomBg("nice sunset");
  document.onload = init();


  //function randomBg(topic){
  //  width = document.documentElement.clientWidth + 10;
  //  height = document.documentElement.clientHeight + 10;
  //  var random = Math.floor(Math.random() * 10000);
//
  //  if (background){
  //    div = document.getElementById("bg1");
  //  } 
  //  else {
  //    div = document.getElementById("bg2");
  //  }
  //  div.style.backgroundImage = "url('https://source.unsplash.com/random/" + width + "x" + height + "/?sig=" + random + "/&" + topic + "')";
//
  //}
  async function randomBg(topic) {
    const width = document.documentElement.clientWidth + 10;
    const height = document.documentElement.clientHeight + 10;
    const orientation = width > height ? 'landscape' : 'portrait';
    if (Math.abs(width - height) < 100) {
      orientation = 'squarish';
    }
  
    console.log(`Fetching image for topic: ${topic}`);
    // replace all spaces with '+' for the API call
    topic = topic.replace(/ /g, '+');
  
    const response = await fetch(`https://pixabay.com/api/?key=44651696-fb16f33f4e495b9a42868696c&q=${topic}&orientation=${orientation}&image_type=photo&per_page=3`);
    const data = await response.json();
    const imageUrl = data.hits[0].largeImageURL;
  
    const div = background ? document.getElementById("bg1") : document.getElementById("bg2");
    div.style.backgroundImage = `url('${imageUrl}')`;
    div.style.backgroundSize = 'cover'; // Stellt sicher, dass das Bild den gesamten Bereich abdeckt
    div.style.backgroundRepeat = 'no-repeat'; // Verhindert die Wiederholung des Bildes
  }
  
  function randomTopic(){
    array = ["lifestyle", "van-life", "coffee", "aesthetic", "holding-hands-in-the-sun", "tumblr", "fall", "pumpkin-spice", "mood", "pinterest"];
    random = Math.floor(Math.random() * array.length);
    if (last_topic == array[random])
      randomTopic();
    else
      last_topic = array[random];
    return array[random];
  }
  function init(){
    if(running)
      return;
    
    running = true;
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "block";
  
    var div = document.getElementById("sprichwort");
    div.style.display = "none";
    
    var temp = parseFloat(document.getElementById("num").value);
    temp += 0.0;
    
  
    generate(
      "when boys wear beanies*craving adventure 24/7*watching it rain*having the perfect shoes to go with your outfit*playing with your cat*wanting the perfect prom dress*getting a nose ring*trying not to wear the same outfit twice*having a cute hairstyle*being weird*painting your nails pastel colors for the spring time*coffee on chilly fall days*wishing you had enough money to travel the world*loving the warmth of their arms*making pinky promises*going on tumblr too much*loving to spend time with your best friend*christmas treats*soft neck kisses*growing your hair out*lazy fall days*taking your bra off after a long day*popcorn and movies*wanting to get away for a while*wanting cute, small tattoos*netflix and chill*being close to your sister*staying in bed all day*watching it rain*getting along better with guys than girls*making funny faces*",
      31, temp, 220, "*", neuerSpruch);
    
  }
  function keywords2BG(text){

    if ("NOUN" in text)
      var keywords = text["NOUN"];
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
    if ("NOUN" in text && "VERB" in text && "ADV" in text)
      var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"];
    if ("NOUN" in text && "VERB" in text && "ADJ" in text)
      var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADJ"];
    
    randomBg(keywords);

  }
  function neuerSpruch(text){
    spruch_show = spruch_gen;
    spruch_gen = text;
    // generate an extra spruch at first call
    if (spruch_show == ""){
      generate(
        "when boys wear beanies*craving adventure 24/7*watching it rain*having the perfect shoes to go with your outfit*playing with your cat*wanting the perfect prom dress*getting a nose ring*trying not to wear the same outfit twice*having a cute hairstyle*being weird*painting your nails pastel colors for the spring time*coffee on chilly fall days*wishing you had enough money to travel the world*loving the warmth of their arms*making pinky promises*going on tumblr too much*loving to spend time with your best friend*christmas treats*soft neck kisses*growing your hair out*lazy fall days*taking your bra off after a long day*popcorn and movies*wanting to get away for a while*wanting cute, small tattoos*netflix and chill*being close to your sister*staying in bed all day*watching it rain*getting along better with guys than girls*making funny faces*",
        31, 1.0, 220, "*", neuerSpruch);
        return
    }

    var spruch = document.getElementById("spruch");
    if (spruch_show.endsWith(" "))
      spruch_show = spruch_show.substring(0, spruch_show.length - 1);


    endings = [".", "!", "?", "..", "!!", "??", "...", "!!!", "???"];
    if (endings.some(s => spruch_show.endsWith(s))){
      spruch.innerHTML = spruch_show;
    }
    else{
      spruch.innerHTML = spruch_show + ".";
    }
      
    
    show_new();
    
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

    new_topic = generateMVP(spruch_gen, keywords2BG);
    var div = document.getElementById("sprichwort");
    div.style.display = "grid";
  
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  
    running = false;
  
  }

  function edit(){
    var spruch = document.getElementById("spruch");
    let edited_spruch = prompt("Edit the thing:", spruch.innerHTML);
    spruch.innerHTML = edited_spruch;
  }

  