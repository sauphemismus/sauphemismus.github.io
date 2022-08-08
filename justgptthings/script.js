// generate from input----------------------------------------------------------

function generate(input, inputCount, temperature, token_count, splitChar, followFunction){

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
      output = output.replace("\n", "*");
      output = output.replace(/\\n/gm, " ");
      output = output.replace(/[\[\]\{\}\\"]/g, "");
      output = output.replace("generated_text:", "");
  
      var outArray = output.split(splitChar);
      followFunction(outArray[inputCount]);
  
    }).catch((error) => {})
  }
  
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B",
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
  var bio_g = false;
  var img_count = 0;
  var last_topic = "";
  
  
  document.onload = randomBg("test sunset");
  document.onload = init();
  
  
  
  function randomBg(topic){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
   

    
    
  
    //var new_topic = topic.split(" ");
    var random = Math.floor(Math.random() * 200);
    //topic = new_topic[random];
    var topic = randomTopic();
    
    

    div = document.getElementById("bg_div");
    //topic = topic.split(" ");
    
   
    //div.innerHTML = '<img id="background" src="https://picsum.photos/' + width + '/' + height + '?random=' + random + '">';
    // https://source.unsplash.com/random/900×700/?fruit
    div.innerHTML = '<img id="background" src="https://source.unsplash.com/random/' + width + 'x' + height + '/?' + topic + '?sig=' + random + '">';
    
  }
  
  function randomFont(){
    array = ["UCUcharlesscript"]
    random = Math.floor(Math.random() * array.length);

    
    return UCU;
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
  
    generate(
      "when boys wear beanies*cravin adventure 24/7*watching it rain*having the perfect shoes to go with your outfit*playing with your cat*wanting the perfect prom dress*getting a nose ring*trying not to wear the same outfit twice*having a cute hairstyle*being weird*painting your nails pastel colors for the spring time*coffee on chilly fall days*wishing you had enough money to travel the world*loving the warmth of their arms*making pinky promises*going on tumblr too much*loving to spend time with your best friend*christmas treats*soft neck kisses*growing your hair out*lazy fall days*taking your bra off after a long day*popcorn and movies*wanting to get away for a while*wanting cute, small tattoos*netflix and chill*being close to your sister*staying in bed all day*watching it rain*getting along better with guys than girls*making funny faces*",
      31, 1.0, 220, "*", neuerSpruch);
  
    neuerAutor();

    
  }
  
  
  function neuerSpruch(text){
    var spruch = document.getElementById("spruch");
    
  
    var div = document.getElementById("sprichwort");

    if (text.endsWith(" "))
      text = text.substring(0, text.length - 1);
    

    spruch.innerHTML = text +".";

    
    if(autor_g)
      show_new();
    else
      spruch_g = true;
  }
  
  function neuerAutor(){
    var autor = document.getElementById("autor");
   
    const bangersFont = new FontFace('UCU Fuck it', 'url(UCUcharlesscript.ttf)');
    bangersFont.load().then(function (loadedFont) {
      document.fonts.add(loadedFont)
      autor.style.fontFamily = '"UCU Fuck it"';
    }).catch(function (error) {
      console.log('Failed to load font: ' + error)
    })
    
    autor.innerHTML = "justgptthings";
     
    if(spruch_g)
      show_new();
    else
      autor_g = true;
  }

  //function neuerAutorBio(text){
  //  var autor = document.getElementById("autor");
  //
  //  autor.innerHTML += ", " + text;
  //  
  //}
  
  function show_new(){
    randomBg(document.getElementById("spruch").innerHTML);
    var div = document.getElementById("sprichwort");
    div.style.display = "grid";
  
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  
    spruch_g = false;
    autor_g = false;
    running = false;
  
  }