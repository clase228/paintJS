const canvas = document.getElementById('jsCanvas');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const clear = document.getElementById('jsClear');
const jsPx = document.getElementById('jsPx');
const ctx = canvas.getContext('2d');
const colors =document.getElementsByClassName('jsColor')
const col =document.querySelectorAll('#jsColor')


jsPx.addEventListener('click', function () {
    console.log(col);
})


const INITIA_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700


canvas.width  =CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = '#fff'
ctx.fillRect(0, 0,CANVAS_SIZE,CANVAS_SIZE)
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIA_COLOR;
ctx.fillStyle = INITIA_COLOR;


let painting = false;
let filling = false


function stopPainting(){
    painting = false;
}


function startPainting(){
    painting = true;
}


function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function onMouseDown(event){
    painting = true;
}


function onMouseUp(event){
    stopPainting();
}


function handleColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}


function handleRangeChange(e) {
    const rangeValue = e.target.value;
    ctx.lineWidth = rangeValue;
    jsPx.innerHTML = rangeValue
}


function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerHTML= 'Заливка'
    }else{
        filling = true;
        mode.innerHTML= 'Кисть';
        
    }
}


function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0,CANVAS_SIZE,CANVAS_SIZE)
    }
    
}


function handleCM(e) {
    e.preventDefault();
}


function handleSaveClick() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image
    link.download = "PainJS[export].png"
    link.click();
}


function handleClear() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 700, 700);
}


if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
} 


Array.from(colors).forEach(color => color.addEventListener(('click') ,handleColor))

if(range){
    range.addEventListener('input',handleRangeChange)
}


if(mode){
    mode.addEventListener('click' ,handleModeClick)
}


if(save){
    save.addEventListener('click', handleSaveClick)
}


if(clear){
    clear.addEventListener('click', handleClear)
}
