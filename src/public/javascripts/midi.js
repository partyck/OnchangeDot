// const socket = io.connect('http://192.168.0.4:3000/midi');
const socket = io.connect('http://10.15.214.130:3000/midi');
var antsX, currentKey;
// var instrument = $("#session").html();.
var instrument = document.getElementById("session").textContent;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  rectMode(CENTER);
  currentKey = mouseXToKey();
  antsX = 0;
}

function draw() {
  background(230);
  fill(244, 122, 158);
  rect(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
  fill(237, 34, 93);
  var inverseX = width - mouseX;
  var inverseY = height - mouseY;
  rect(inverseX, height / 2, (inverseY / 2) + 10, (inverseY / 2) + 10);

  sendMidi();
  currentKey = mouseXToKey();
}

function sendMidi() {
  if (instrument === "1") {
    touchScreenKeyboard(mouseXToKey());
  } else {
    accelerometerKnob();
  }
}

function accelerometerKnob() {
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', function (ev) {
      var acc = ev.accelerationIncludingGravity;
      accToMidi(acc.x, acc.y, acc.z);
    }, false);
  } else {
    alert("Sensor de movimiento no encontrado");
  }
}

function accToMidi(accX, accY, accZ) {

  var ax = parseInt((accX + 9.81) * 6.5, 10);
  var ay = parseInt((accY + 9.81) * 6.5, 10);
  // var az = parseInt((accZ + 9.81) * 13, 10);
  if (antsX !== ax) {
    socket.emit('accKnob', {
      instrument: instrument,
      x: ax,
      y: ay
    });
    antsX = ax;
  }

};

function touchScreenKeyboard(newKey) {
  if (currentKey !== newKey) {
    socket.emit('noteUp', {
      key: currentKey,
      speed: 100
    });
    if (newKey !== 0) {
      socket.emit('noteDown', {
        key: newKey,
        speed: 100
      });
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

// function mouseYToSpeed() {
//   let range = mouseY * 100 / width;
//   let speed = parseInt(range, 10);
//   return speed;
// }

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}