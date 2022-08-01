async function createNBubbles(n, index) {
  var div = document.getElementById("bubbles" + index);

  for (var i = 0; i < n; i++) {
    var width = Math.random() * 3;
    var x = Math.random() * 100;
    var y = Math.random() * 50;
    var speed = Math.random() + 3;
    div.innerHTML += `<div class="bubble" style="width: ${width}em; left: ${x}%; bottom: -${y}%; animation-duration: ${speed}s;"></div>`;
  }
  
  setTimeout(function () {
    div.innerHTML = "";
  }
  , 4000);
}

function sparkle() {
  var a = Math.floor(Math.random() * 5) + 5;
  var b = Math.floor(Math.random() * 5) + 5;
  var c = Math.floor(Math.random() * 5) + 5;
  createNBubbles(a, 1);
  createNBubbles(b, 2);
  createNBubbles(c, 3);s
}

