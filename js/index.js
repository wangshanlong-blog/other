var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');

var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');


var rainthroughnum = upupooConfig.density.value*10 + 10;
var speedRainTrough = 25;
var RainTrough = [];

var rainnum = upupooConfig.density.value*10 + 10;
var rain = [];

var w = canvas1.width = canvas2.width  = window.innerWidth;//= canvas3.width
var h = canvas1.height = canvas2.height = window.innerHeight;//  =canvas3.height
window.addEventListener('resize', function() {
  w = canvas1.width = canvas2.width  = window.innerWidth;//= canvas3.width
  h = canvas1.height = canvas2.height  = window.innerHeight;//= canvas3.height
});

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function clearcanvas1() {
  ctx1.clearRect(0, 0, w, h);
}

function clearcanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}


function createRainTrough() {
  for (var i = 0; i < rainthroughnum; i++) {
    RainTrough[i] = {
      x: random(0, w),
      y: random(0, h),
      length: Math.floor(random(1, 830)),
      opacity: Math.random() * 0.2,
      xs: random(-2, 2),
      ys: random(10, 20)
    };
  }
}

function createRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10
    };
  }
}

function drawRainTrough(i) {
ctx1.beginPath();
var grd = ctx1.createLinearGradient(0, RainTrough[i].y, 0, RainTrough[i].y + RainTrough[i].length);
grd.addColorStop(0, "rgba(255,255,255,0)");
grd.addColorStop(0, "rgba(255,255,255," + RainTrough[i].opacity + ")");

ctx1.fillStyle = grd;
ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
ctx1.fill();
}

function drawRain(i) {
  ctx2.beginPath();
  ctx2.moveTo(rain[i].x, rain[i].y);
  ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
  //雨滴颜色  #101
  ctx2.strokeStyle = 'rgba('+parseInt("0x"+upupooConfig.color.value.slice(1,3))+','+parseInt("0x"+upupooConfig.color.value.slice(3,5))+','+parseInt("0x"+upupooConfig.color.value.slice(5,7))+','+upupooConfig.transparent.value*0.01+')';
  //雨滴大小  #101
  // 宽度  px
  ctx2.lineWidth = upupooConfig.size.value/10*0.38 +1;
  //雨滴形状   #101
  // 值  ：  
  // 圆形  round
  // 方形  rect
	ctx2.lineCap = 'round';
  ctx2.stroke();
}


function animateRainTrough() {
  clearcanvas1();
  for (var i = 0; i < rainthroughnum; i++) {
    if (RainTrough[i].y >= h) {
      RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
    } else {
      RainTrough[i].y += speedRainTrough;
    }
    drawRainTrough(i);
  }
}

function animateRain() {
  clearcanvas2();
  for (var i = 0; i < rainnum; i++) {
    rain[i].x += rain[i].xs;
    rain[i].y += rain[i].ys;
    if (rain[i].x > w || rain[i].y > h) {
      rain[i].x = Math.random() * w;
      rain[i].y = -20;
    }
    drawRain(i);
  }
}



function init() {
createRainTrough();
createRain();
  window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
animateRainTrough();
animateRain();

requestAnimationFrame(animloop);
}
animloop();