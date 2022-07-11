const canvas = document.querySelector("#canvas");
const control = document.querySelector(".control");
const saveBtn = document.querySelector('.save-btn')
const resultImg = document.querySelector('.result-img')
const c = canvas.getContext('2d');


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

  c.fillStyle = "rgb(200,0,0)";
  c.fillRect (10, 10, 50, 50);

  c.fillStyle = "rgba(0, 0, 200, 0.5)";
  c.fillRect (30, 30, 50, 50);

  const imgStamp = new Image()
  imgStamp.src = './shiri.png'
  
  let drawingMode = false; // drawing on when it's true
  let brush = "color"; //color or image
  let colorValue =  'white'


function clickHandler(event){
  c.beginPath()
  c.strokeStyle="#FFF";
 // event.layerX >> canvas & event.clientX >> browser
  c.fillRect(event.layerX-15,event.layerY-15,10,10,);
  c.fillRect(event.layerX-15,event.layerY+15,15,15);
  c.fillRect(event.layerX+15,event.layerY-15,5,5);
  c.fillRect(event.layerX+15,event.layerY+15,3,3);
  c.arc(event.layerX,event.layerY,6,0,Math.PI*2,false);
  c.lineWidth = 5
  c.stroke()
}
function downHandler(){
  drawingMode = true;
}
function upHandler(){
  drawingMode = false;
}

function setColor(event){
  brush = event.target.getAttribute('data-type')
  colorValue = event.target.getAttribute('data-color')
  c.fillStyle = colorValue
  console.log(brush)
}

function drawingHandler(event){ 
 if(!drawingMode) return;
  switch(brush){
    case  'color': 
    c.beginPath()
 // event.layerX >> canvas & event.clientX >> browser
    c.arc(event.layerX,event.layerY,10,0,Math.PI*2,false);
    c.fill(); 
    break;
    case  'image': 
 // event.layerX >> canvas & event.clientX >> browser
    c.drawImage(imgStamp,event.layerX,event.layerY,30,60);
    break;
  }
}

function createImage(){
  const url = canvas.toDataURL('image/png');
  console.log('url', url)
  const imgElem = new Image()
  imgElem.src = url;
  resultImg.appendChild(imgElem)

}

canvas.addEventListener('dblclick', clickHandler)
canvas.addEventListener("mousedown",downHandler)
canvas.addEventListener("mousemove", drawingHandler)
canvas.addEventListener("mouseup", upHandler)
control.addEventListener('click', setColor);
saveBtn.addEventListener('click',createImage)