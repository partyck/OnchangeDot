const socket = io.connect();
const session = document.getElementById("session").textContent;
let accX, accY, accZ;
let Xbefore, Ybefore, Zbefore;
let isIos;
let font, fontSize = 30;

function preload() {
  font = loadFont('assets/Code.ttf');
}

function setup() {
  getMobileOperatingSystem();
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  rectMode(CENTER);
  textFont(font);
  textSize(fontSize);
  if (!window.DeviceMotionEvent) {
    alert("Sensor de movimiento no encontrado");
  }
}

function draw() {
  window.addEventListener('devicemotion', ev => {
    var acc = ev.accelerationIncludingGravity;
    if (!isIos) {
      accX = acc.x;
      accY = acc.y;
      accZ = acc.z;
    } else {
      accX = acc.x * -1;
      accY = acc.y * -1;
      accZ = acc.z * -1;
    }
  }, false);
  sendData();
  printBackground();
  printOSLabel();

  if (mouseIsPressed) {
    fill(244, 122, 158);
    rect(mouseX, height / 2, mouseY / 2 + 10, mouseY / 2 + 10);
    fill(237, 34, 93);
    var inverseX = width - mouseX;
    var inverseY = height - mouseY;
    rect(inverseX, height / 2, (inverseY / 2) + 10, (inverseY / 2) + 10);
  }
}

function printBackground() {
  var red = parseInt((accX + 9.81) * 13, 10);
  var green = parseInt((accY + 9.81) * 13, 10);
  var blue = parseInt((accZ + 9.81) * 13, 10);
  background(red, green, blue);
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    isIos = false;
    return "Android";
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    isIos = true;
    return "iOS";
  }
  alert('tu dispositivo no es ios o android');
}

function printOSLabel() {
  let device = 'dispositivo desconocido';
  if (isIos) {
    device = 'iOS';
  } else {
    device = 'Android';
  }
  text(device, 20, 20);
}

function sendData() {
  // var aX = parseInt((accX + 9.82) * 100 / 19.60, 10);
  // var aY = parseInt((accY + 9.82) * 100 / 19.60, 10);
  // var aZ = parseInt((accZ + 9.82) * 100 / 19.60, 10);
  socket.emit('acc', {
    session: session,
    x: accX,
    y: accY,
    z: accZ
  });
};

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
// socket.on('scene', data => {
//   background(230);
//   strokeWeight(2);
//   debugger;
//   draw = draw2;
// });


// function draw2() {
//   if (mouseIsPressed) {
//     stroke(255);
//   }
//   else {
//     stroke(237, 34, 93);
//   }
//   line(mouseX - 66, mouseY, mouseX + 66, mouseY);
//   line(mouseX, mouseY - 66, mouseX, mouseY + 66);
// }