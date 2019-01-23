const socket = io.connect();
var antsX, antsY, currentKey;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  rectMode(CENTER);
  currentKey = mouseXToKey();
}

function draw() {
  background(230);
  fill(244, 122, 158);
  rect(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
  fill(237, 34, 93);
  var inverseX = width - mouseX;
  var inverseY = height - mouseY;
  rect(inverseX, height / 2, (inverseY / 2) + 10, (inverseY / 2) + 10);

  sendMidi(mouseXToKey());
  currentKey = mouseXToKey();
  antsX = mouseX;
  antsY = mouseY;
}

function sendMidi(newKey) {
  if (currentKey !== newKey) {
    socket.emit('noteUp', { key: currentKey });
    if (newKey !== 0) {
      socket.emit('noteDown', { key: newKey });
    }
  }
}

function mouseXToKey() {
  if (mouseIsPressed) {
    let range = mouseX * 12 / width;
    let key = parseInt(range + 60, 10);
    return key;
  } else {
    return 0;
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}