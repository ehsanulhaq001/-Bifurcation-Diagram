const cnv = document.querySelector("canvas");
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;
cnv.style.backgroundColor = "#1f2532";
document.body.style.backgroundColor = "#000";
const ctx = cnv.getContext("2d");

// X[n+1] = rX[n](1-X[n])

let x0 = 0.4;
let limit = 5;
let scale = 1000;
let N = 100;
let accuracy = 1000;

function X(n, i) {
  if (n == 0) return x0;
  let Xn_1 = X(n - 1, i);
  let ret = i * Xn_1 * (1 - Xn_1);
  console.log(i, ret);
  if (n > 40) {
    pointAt((cnv.width / limit) * i, cnv.height - scale * Xn_1, n);
  }
  return ret;
}

function draw() {
  setBackground(10);
  ctx.beginPath();
  ctx.moveTo(0, cnv.height);
  ctx.lineTo(0, 0);
  ctx.moveTo(0, cnv.height);
  ctx.lineTo(cnv.width, cnv.height);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  for (let i = 0; i < 4; i += 1 / accuracy)
    pointAt((cnv.width / limit) * i, cnv.height - scale * X(N, i), 20);
}

draw();

function pointAt(x, y, n) {
  ctx.beginPath();
  ctx.arc(x, y, 0.1, 0, 2 * Math.PI, 1);
  ctx.strokeStyle = `rgba(0, 255, 0, ${n / 20})`;
  ctx.stroke();
}

function setBackground(n) {
  ctx.beginPath();
  for (let i = 1; i < n; i++) {
    ctx.moveTo(0, (cnv.height * i) / n);
    ctx.lineTo(cnv.width, (cnv.height * i) / n);
    ctx.moveTo((cnv.width * i) / n, 0);
    ctx.lineTo((cnv.width * i) / n, cnv.height);
  }
  ctx.strokeStyle = "rgb(10, 60, 60)";
  ctx.stroke();
}
