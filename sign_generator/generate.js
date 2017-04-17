const inch = 72; // 72 dpi

var draw = SVG('sign').size(40 * inch, 28 * inch)
var rect = draw.rect(2 * inch, 3 * inch).move(50, 50).attr({
  fill: '#f06'
})

document.getElementById('download').addEventListener("click", function() {
  initialize(); // run svg-crowbar
});
