var socket = io.connect();
var xTag = document.getElementById('aX'),
  yTag = document.getElementById('aY'),
  zTag = document.getElementById('aZ');
var ax1, ay1, az1;


if (window.DeviceMotionEvent) {
  alert('Sensor de movimiento detectado!');
  window.addEventListener('devicemotion', function (ev) {
    var acc = ev.accelerationIncludingGravity;
    dmHdlr(acc.x, acc.y, acc.z);
    socket.emit('accelerometers', {
      x: acc.x,
      y: acc.y,
      z: acc.z
    });
  }, false);
} else {
  alert("Sensor de movimiento no encontrado");
}

function dmHdlr(aX, aY, aZ) {
  ax1 = parseInt((aX + 9.81) * 13, 10);
  ay1 = parseInt((aY + 9.81) * 13, 10);
  az1 = parseInt((aZ + 9.81) * 13, 10);

  document.getElementById('aX').innerHTML = ax1 ? ax1 : '?';
  document.getElementById('aY').innerHTML = ay1 ? ay1 : '?';
  document.getElementById('aZ').innerHTML = az1 ? az1 : '?';

  cambiarColor(ax1, ay1, az1);

}

function cambiarColor(r, g, b) {
  var obj;
  obj = document.getElementById("cuerpo");
  obj.style.backgroundColor = rgb(r, g, b);
}

function rgb(r, g, b) {
  return 'rgb(' + [(r || 0), (g || 0), (b || 0)].join(',') + ')';
}