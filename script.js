var whatsapp_btn = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
  width="24" height="24"
  viewBox="0 0 24 24"
  style=" fill:#083c44;">    <path d="M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z"></path></svg>`;

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
function generate() {
  document.getElementById("info-toggle").checked = true;
  document.getElementsByClassName("loader")[0].style.display = "block";
  var output = "";
  query({
    inputs:
      "Sich ordentlich einen reinzulöten \nSich wie ein achtarmiger einen reinzuorgeln \nSich einen hinter die Rüstung römern \nSich ein Export zu importieren  \nSich einen aus seiner Fassung zu befreien \nSich einen durch den Bauch zu werfen \nSich einen hinter die Brust gleiten zu lassen \nSich einen an die Decke zu werfen \nSich einen über die Taille zu streichen \nSich als einen Knacker zu bezeichnen \nSich selbst zweimal glimpflich durchzuspielen \nSich einen bis zum Saum zu rabbanatisieren \nSich einen Silbergeldschein in den Zeigefinger zu stecken \nSich mitleidig behandeln zu lassen \nSich gegen die süße Brause schütteln zu lassen \nSich beinahe einen zu pummeln \nSich einen steinernen Doktor zu adeln \nSich ein Züchtbier zu servieren \nSich eine harmonische Anderthalbe zu vollfüllen \nSich an die eigene Schwiegermuschel zu binden \nSich einen ans dunkelgrünes Palfaun aufzustapfen \nSich durch die Donnerprobe zermatschen zu lassen \nSich im Crackerspace empfangen zu lassen \nSich in ein Langwasser übertaumeln zu lassen \nSich den Spiegelfregen in die Fresse schäumen zu lassen \nSich einen auf die Arschkante zu werfen",
    parameters: {
      min_length: 500,
      max_length: 500,
      temperature: Math.random() * 0.1 + 0.8,
    },
    options: {
      wait_for_model: true,
      use_cache: false,
    },
  }).then((response) => {
    output = JSON.stringify(response);
    var outArray = output.split("\\n");
    var rand = Math.floor(Math.random() * outArray.length);
    var sauphemismus = outArray[26];
    var nice = 69;
    if (sauphemismus.length > nice || sauphemismus.length < 3) {
      generate();
      return;
    }
    var sauphemismus =
      sauphemismus.substring(0, 1).toLowerCase() +
      sauphemismus.substring(1, sauphemismus.length - 1);
    document.getElementsByClassName("loader")[0].style.display = "none";
    //update history
    try {
      var history = document.getElementById("history");
      var last_sauphi = document.getElementById("sauphemismus").innerHTML;
      last_sauphi = last_sauphi.replace("...", "");
      history.innerHTML +=
        '<li><a href="whatsapp://send?text=https://sauphemismus.github.io/%0a%0aHey, bock heute Abend ' +
        last_sauphi +
        '">Bock heute Abend ' +
        last_sauphi +
        "</a></li>";
      history_FIFO();
      document.getElementById("toggle-history").style.display = "flex";
    } catch (e) {}
    document.getElementById("query").innerHTML =
      '<h1 id="sauphemismus">...' + sauphemismus + "?</h1>";
    document.getElementById(
      "share"
    ).innerHTML = `<button class="button2" style="border-bottom: 0.2em solid #083c44;" onclick="location.href='whatsapp://send?text=https://sauphemismus.github.io/%0a%0aHey, bock heute Abend ${sauphemismus}?';" id="whatsapp">
      ${whatsapp_btn}
      <p>Teilen</p>  
        </button>`;
  });
}
function history_FIFO() {
  var list = document.getElementById("history");
  var items = list.getElementsByTagName("li");
  var i = items.length;
  if (i > 3) list.removeChild(items[0]);
  return;
}
function toggle_history() {
  var arrow_left = document.getElementsByClassName("arrow-left")[0];
  var arrow_right = document.getElementsByClassName("arrow-right")[0];
  var list = document.getElementById("history");
  if (list.style.display == "none") {
    list.style.display = "flex";
    arrow_left.style.transform = "rotate(-45deg)";
    arrow_right.style.transform = "rotate(45deg)";
  } else {
    list.style.display = "none";
    arrow_left.style.transform = "rotate(45deg)";
    arrow_right.style.transform = "rotate(-45deg)";
  }
}
