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
      output = output.replace(/[\[\]\{\}\\"]/g, "");
      output = output.replace(/\\n/gm, " ");
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
  
  
  document.onload = randomBg();
  document.onload = init();
  
  
  
  function randomBg(){
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    random = Math.floor(Math.random() * 10000);
    
    div = document.getElementById("bg_div");
  
    div.innerHTML = '<img id="background" src="https://picsum.photos/' + width + '/' + height + '?random=' + random + '">';
  }
  
  function randomFont(){
    array = ["Caveat", "Kalam", "Mali", "Neucha"]
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
  
  
    generate(
      "Frank Dekelbach*Barbara Tanzilli*Max Feind*Ernest Moore*Ursula Ewland*Judith Anne Vönt*Ralph Berndt*Wilfried Schlotter*Alfred Röthlisberger*Peter Zwerschke*Edith Bölke*Hans-Jürgen Dötsch*Anett Reisinger*Jürgen Brümmendorf*Antonia Hilmar*Simone Godelbrun*Leonie Geidenhart*Dirk Pinzone*Katharina Kirtola*Claudia Salomanov*Roland Huggenbusch*Vera Mitja Hofmeister*Michael Karlheinz Steinbildner*Antje Herrmann*",
      24, 1.0, 180, "*", neuerAutor);
  }
  
  
  function neuerSpruch(text){
    var spruch = document.getElementById("spruch");
    spruch.innerHTML = text;
  
    var div = document.getElementById("sprichwort");
    div.style.fontFamily = randomFont();
    
    if(autor_g)
      show_new();
    else
      spruch_g = true;
  }
  
  function neuerAutor(text){
    var autor = document.getElementById("autor");
    var year = Math.floor(Math.random() * 80) + 5;
    autor.innerHTML = text + ", " + (year) ;
    
    if(spruch_g)
      show_new();
    else
      autor_g = true;
  }
  
  function show_new(){
    randomBg();
    var div = document.getElementById("sprichwort");
    div.style.display = "grid";
  
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
  
    spruch_g = false;
    autor_g = false;
    running = false;
  
  }
