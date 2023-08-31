var matrix = document.getElementById("background-matrix");
var ctx = matrix.getContext("2d");

matrix.height = window.innerHeight;
matrix.width = window.innerWidth;

var alphabets =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
alphabets = alphabets.split("");

var font_size = 10;
var columns = matrix.width / font_size;
var drops = [];
for (var x = 0; x < columns; x++) drops[x] = 1;

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, matrix.width, matrix.height);
  ctx.fillStyle = "green";
  ctx.font = font_size + "px arial";
  for (var i = 0; i < drops.length; i++) {
    var text = alphabets[Math.floor(Math.random() * alphabets.length)];
    ctx.fillText(text, i * font_size, drops[i] * font_size);
    if (drops[i] * font_size > matrix.height && Math.random() > 0.975)
      drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw, 60);
