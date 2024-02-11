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
      output = output.replace(/\n/g, "<br>");
      output = output.replace(/\\n/gm, " ");
      output = output.replace(/[\[\]\{\}\\"]/g, "");
      output = output.replace("generated_text:", "");
  
      var outArray = output.split(splitChar);
      res = outArray[inputCount];
      if(res.length < 5 || res.length > 200 || isNaughty(res)){
        generate(input, inputCount, temperature, token_count, splitChar, followFunction);
        return;
      }
      followFunction(outArray[inputCount]);
  
    }).catch((error) => {
      error = JSON.stringify(error);
      window.alert("Whoops, something went wrong:<br>" + error);
    })
  }
  
  async function query(data) {
    const response = await fetch(
      //"https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B",
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1",
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
      "inputs":
        input,  
      "parameters": {
        
      },
      "options": {
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
  var spruch_g = false;
  var autor_g = false;
  var background = false;
  
  document.onload = randomBg("nice sunset");
  document.onload = init();
  
  function randomBg(topic){
    width = document.documentElement.clientWidth + 10;
    height = document.documentElement.clientHeight + 10;
    var random = Math.floor(Math.random() * 10000);

    if (background){
      div = document.getElementById("bg1");
    } 
    else {
      div = document.getElementById("bg2");
    }
    div.style.backgroundImage = "url('https://source.unsplash.com/random/" + width + "x" + height + "/?sig=" + random + "/&" + topic + "')";

  }
  
  function randomFont(){
    array = ["Josefin Slab", "Bodoni Moda", "Bitter", "Amatic SC", "Antic Slab", "Yeseva One"]
    random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  function randomTopic(){
    array = ["Humans", "Love", "Sunset", "Beach", "Books", "Stone", "River", "Food", "Wisdom", "lifestyle", "roadtrip","Philosophy"]
    random = Math.floor(Math.random() * array.length);
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
      "Da wird der Hund in der Pfanne verrückt*Jetzt lass mal die Kirche im Dorf*Der frühe Vogel fängt den Wurm*Auch ein blindes Huhn findet mal ein Korn*Einem geschenkten Gaul schaut man nicht ins Maul*Die Katze aus dem Sack lassen*Was der Bauer nicht kennt, frisst er nicht*Drei Bier sind eine Mahlzeit und dann hat man noch nichts getrunken*Lieber 'nen Spatz auf der Hand als ne Taube auf dem Dach*Morgenstund hat Gold im Mund*Müßiggang ist aller Laster Anfang*Liebe geht durch den Magen*Das Auge isst mit*Tübingen ist ein Dorf*Wer schön sein will, muss leiden*Ist die Katze aus dem Haus, tanzen die Mäuse auf dem Tisch*Wer im Glashaus sitzt soll nicht im Dunkeln scheißen*Kleinvieh macht auch Mist*Reden ist Silber, Schweigen ist Gold*Eine Hand wäscht die andere*Unkraut vergeht nicht*Wer den Pfennig nicht ehrt, ist des Talers nicht wert*Pech im Spiel, Glück in der Liebe*Viele Köche verderben den Brei*Lügen haben kurze Beine*Gelegenheit macht Diebe*Der Apfel fällt nicht weit vom Stamm*Wie man in den Wald hineinruft, so schallt es heraus*",
      30, 0.8, 500, "*", neuerSpruch);
  
  
    //generate(
    //  
    //  "Frank Dekelbach*Barbara Tanzilli*Max Feind*Ernest Moore*Ursula Ewland*Judith Anne Vönt*Ralph Berndt*Wilfried Schlotter*Alfred Röthlisberger*Peter Zwerschke*Edith Bölke*Hans-Jürgen Dötsch*Anett Reisinger*Jürgen Brümmendorf*Antonia Hilmar*Simone Godelbrun*Leonie Geidenhart*Dirk Pinzone*Katharina Kirtola*Claudia Salomanov*Roland Huggenbusch*Vera Mitja Hofmeister*Michael Karlheinz Steinbildner*Antje Herrmann*",
    //  24, 0.95, 180, "*", neuerAutor);

    //generate(
    //  "mag gerne Pferde-hat ein Alkoholproblem-lernt gerne Leute kennen-ist im Nebenjob Barkeeper-studiert Philosophie im 3. Semester-ist begeisterter Hobbygärtnerin-hat keine echte Freundin-hat das Gefühl, alles zu können-hat einen Traum-hat das Gefühl, jemand zu lieben, den sie nicht lieben kann-hat ein spannendes Leben-fragt sich immer wieder, ob das Leben genug war-hat Lust auf Geld-hat das Gefühl, alles zu können-ist spät dran-denkt viel über sein Leben nach-ist glücklich, wenn es ihr gut geht-weiß nicht, was das Leben ihm bringen soll-hat eine Leidenschaft für Tischtennis-hat Lust auf jemanden, den er lieben könnte-ist unvoreingenommen-hat viele Güter in seinem Haus-ist zufrieden mit seinen persönlichen Fähigkeiten-schläft häufig-denkt oft über die Welt nach-",
    //  25, 0.85, 360, "-", neuerAutorBio);
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
    //if ("NOUN" in text && "VERB" in text && "ADP" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADP"];
    //if ("NOUN" in text && "VERB" in text && "ADV" in text && "ADJ" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"] + "," + text["ADJ"] ;
    //if ("NOUN" in text && "VERB" in text && "ADV" in text && "ADJ" in text && "ADP" in text)
    //  var keywords = text["NOUN"] + "," + text["VERB"] + "," + text["ADV"] + "," + text["ADJ"] + "," + text["ADP"];


    randomBg(keywords);

  }
  
  
  function neuerSpruch(text){


    var spruch = document.getElementById("spruch");
    spruch.innerHTML = text;
  
    var div = document.getElementById("sprichwort");
    div.style.fontFamily = randomFont();
    
    //if(autor_g)
    //  show_new();
    //else
    //  spruch_g = true;

    show_new();
  }
  
  //function neuerAutor(text){
  //  var autor = document.getElementById("autor");
  //  var year = Math.floor(Math.random() * 2600) - 500;
  //  var age = Math.floor(Math.random() * 80) + 20;
  //  var bc = false;
  //  if (year < 0)
  //    
  //    bc = true;
  //  
  //  autor.innerHTML = text + "<br>(" + (Math.abs(year)) + "-" + (Math.abs(year + age)) + ")";
//
  //  if (bc)
  //    autor.innerHTML += " v.C.";
  //   
  //  if(spruch_g)
  //    show_new();
  //  else
  //    autor_g = true;
  //}

  
  
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

    randomBg(randomTopic());
    var div = document.getElementById("sprichwort");
    div.style.display = "grid";
  
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  
    spruch_g = false;
    autor_g = false;
    running = false;
  
  }
  function isNaughty(str) {
    var naughty = [
       "vergewalt",
      "schwul",
      "lesbisch",
      "fick",
      "schlampe",
      "nutte",
      "wichser",
      "hure",
      "schwuchtel",
      " homo",
      "selbstmord",
      "abtreib",
      "neger",
      "nigger",
      "bimbo",
      "behindert",
      "weib ",
      "bitch",
      "fotze",
      "muschi",
      "hakenkreuz",
      "vergasen",
      "nazi",
      "nationalsozialismus",
      "konzentrationslager",
      "jude",
      "jüdin",
      "jüdisch",
      "hitler",  
      " führer ",
      "hautfarbe",
      "schwarz",
      "weiß",
      "weiss",
      "rassist",
      "sexist",
      " eichel ",
      " sperma ",
      " porn",
      "anschlag",
      "attentat",
      "bombe",
      "gestorben",
      " tot",
      " töten",
      "tod",
      "stirbt",
      "getötet",
      "ermordet",
      "schlaganfall",
      "massaker",       
      "}"
    ];
    str = str.toLowerCase();
    for (var i = 0; i < naughty.length; i++) {
      if (str.includes(naughty[i])) return true;
    }
    return false;
  }