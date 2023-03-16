let symbolSize = 10;
let symbolChar = "𓂇";
let symbolImg;
let saveMsg = "PRESS UP ARROW TO SAVE IMAGE";
let video; // declare video as a global variable

function preload() {
  symbolImg = createSymbolImg(symbolChar, symbolSize);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(windowWidth / 2, windowHeight / 2);
  video.hide();

  textAlign(CENTER, CENTER);
  textSize(symbolSize * 0.75);
  textFont('Arial');
}

function draw() {
  background(0);
  
  // check if video is undefined before using it
  if (video) {
    video.loadPixels();
    for (let x = 0; x < video.width; x += symbolSize) {
      for (let y = 0; y < video.height; y += symbolSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let g = video.pixels[index + 1];
        let b = video.pixels[index + 2];
        let bright = (r + g + b) / 3;

        tint(r, g, b);
        image(symbolImg, x * 2, y * 2, symbolSize * 2, symbolSize * 2);
      }
    }
  }
  
  // Display save message
  fill(255);
  noStroke();
  textSize(20);
  text(saveMsg, width / 2, height - 30);
}

function createSymbolImg(symbolChar, symbolSize) {
  let symbolBuffer = createGraphics(symbolSize, symbolSize);
  symbolBuffer.clear();
  symbolBuffer.textAlign(CENTER, CENTER);
  symbolBuffer.textSize(symbolSize * 0.75);
  symbolBuffer.fill(255);
  symbolBuffer.text(symbolChar, symbolSize / 2, symbolSize / 2);
  return symbolBuffer.get();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    saveCanvas("theshoe-filter", "jpg");
  }
}
