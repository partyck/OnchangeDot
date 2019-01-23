var socket = io.connect();

var elem = (document.compatMode === "CSS1Compat") ?
  document.documentElement :
  document.body;

var height = elem.clientHeight;
var width = elem.clientWidth;

window.onresize = function () {
  console.log("windows resize: W=", width, ' H=', height);
  height = elem.clientHeight;
  width = elem.clientWidth;
  console.log('  outher: offsetLeft=',outer.offsetLeft,' offsetTop=', outer.offsetTop);
  console.log('  CanvasContainer: offsetLeft=',n.offsetLeft,' offsetTop=', n.offsetTop);
};

var D = 2 * Math.PI,
  f = 1E3, //483 HEX
  p = 560,
  dotsQuantity = 600,
  B = 0.96,
  A = [],
  canvas, e, n, outer, q, r, x, y, u, v, w = !1;
var accx, accy, accz;
var posx, posy;

//listen
socket.on('graphic', function (data) {
  console.log('Socket.on');
  accx = data.x;
  accy = data.y;
  accz = data.z;
  toViewPort();
  E2();
});

function toViewPort() {
  console.log('toViewPort');
  var auxx = width / 19.62;
  var auxy = height / 19.62;
  posx = parseInt((accx + 9.8) * auxx, 10);
  posy = parseInt((accy + 9.8) * auxy, 10);
  //    posx = Math.abs(posx - width);
  posy = Math.abs(posy - height);
  console.log('toViewPort: X=',posx,', Y=',posy);
  console.log('    : W=',width,', H=',height);
};

function repaint() {
  console.log('repaint');
  e.globalCompositeOperation = "source-over";
  e.fillStyle = "rgba(8,8,12,0.65)";
  e.fillRect(0, 0, f, p);
  e.globalCompositeOperation = "lighter";
  x = q - u;
  y = r - v;
  u = q;
  v = r;
  for (var d = 0.86 * f, l = 0.125 * f, m = 0.5 * f, t = Math.random, n = Math.abs, o = dotsQuantity; o--;) {
    var h = A[o],
      i = h.x,
      j = h.y,
      a = h.a,
      b = h.b,
      c = i - q,
      k = j - r,
      g = Math.sqrt(c * c + k * k) || 0.001,
      c = c / g,
      k = k / g;
    if (w && g < m) var s = 14 * (1 - g / m),
      a = a + (c * s + 0.5 - t()),
      b = b + (k * s + 0.5 - t());
    g < d && (s = 0.0014 * (1 - g / d) * f, a -= c * s, b -= k * s);
    g < l && (c = 2.6E-4 * (1 - g / l) * f, a += x * c, b += y * c);
    a *= B;
    b *= B;
    c = n(a);
    k = n(b);
    g =
      0.5 * (c + k);
    0.1 > c && (a *= 3 * t());
    0.1 > k && (b *= 3 * t());
    c = 0.45 * g;
    c = Math.max(Math.min(c, 3.5), 0.4);
    i += a;
    j += b;
    i > f ? (i = f, a *= -1) : 0 > i && (i = 0, a *= -1);
    j > p ? (j = p, b *= -1) : 0 > j && (j = 0, b *= -1);
    h.a = a;
    h.b = b;
    h.x = i;
    h.y = j;
    e.fillStyle = h.color;
    e.beginPath();
    e.arc(i, j, c, 0, D, !0);
    e.closePath();
    e.fill()
  }
}

function E2() {
  q = posx - outer.offsetLeft - n.offsetLeft;
  r = posy - outer.offsetTop - n.offsetTop;
  console.log('E2:');
  console.log('q = posx - outer.offsetLeft - n.offsetLeft;');
  console.log(q, ' = ', posx,' - ', outer.offsetLeft, ' - ',n.offsetLeft);
  console.log('  outher: offsetLeft=',outer.offsetLeft,', offsetTop=', outer.offsetTop);
  console.log('  CanvasContainer: offsetLeft=',n.offsetLeft,', offsetTop=', n.offsetTop);
}

function E(d) {
  console.log('E1');
  d = d ? d : window.event;
  //    q = d.clientX - m.offsetLeft - n.offsetLeft;
  //    r = d.clientY - m.offsetTop - n.offsetTop;
  q = posx - m.offsetLeft - n.offsetLeft;
  r = posy - m.offsetTop - n.offsetTop;
}

function F() {
  console.log('F');
  w = !0;
  return !1
}

function G() {
  console.log('G');
  return w = !1
}

function H() {
  console.log('H');
  this.color = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 *
    Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
  this.b = this.a = this.x = this.y = 0;
  this.size = 1
}

window.onload = function () {
  console.log('OnLoad');
  canvas = document.getElementById("mainCanvas");
  if (canvas.getContext) {
    outer = document.getElementById("outer");
    n = document.getElementById("canvasContainer");
    //        ofsetleft = m.offsetLeft - n.offsetLeft;
    //        ofsettop = m.offsetTop - n.offsetTop;
    e = canvas.getContext("2d");
    for (var d = dotsQuantity; d--;) {
      var l = new H;
      l.x = 0.5 * f;
      l.y = 0.5 * p;
      l.a = 34 * Math.cos(d) * Math.random();
      l.b = 34 * Math.sin(d) * Math.random();
      A[d] = l
    }
    q = u = 0.5 * f;
    r = v = 0.5 * p;

    //        document.onmousedown = F;
    //        document.onmouseup = G;  
    //        document.onmousemove = E;

    //this set the interval betwen the animations
    setInterval(repaint, 33);
  } else {
    document.getElementById("output").innerHTML =
      "Sorry, needs a recent version of Chrome, Firefox, Opera, Safari, or Internet Explorer 9.";
  }

}
