document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const leftArrowCode = 37;
const upArrowCode = 38;
const rightArrowCode = 39;
const downArrowCode = 40;

const headSize = {
    height: 20,
    width: 20
}

const appleSize = {
    height: 20,
    width: 20
}

const head = {
    xPos : 5,
    yPos : 5
}

const canvasDimensions = {
    width:800,
    height:500
}

const speed = 10;

let apples = [];

function init(){
    drawBoard();
    drawHead();
    startListeners();
    for (let i=0; i<20; i++){
        spawnApple();
    }
}

function drawBoard(){

    ctx.strokeStyle = "#C5DCA0"
    ctx.strokeRect(0, 0, 800, 500);

}

function drawHead(){
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    ctx.fillStyle = "#C5DCA0";
    ctx.fillRect(head.xPos,head.yPos,headSize.width, headSize.height);
    drawApples();
}

function startListeners(){
    document.addEventListener("keydown", processKeydown);
}

function processKeydown(e){
    if (e.keyCode == downArrowCode){
        moveDown();
    }
    if (e.keyCode == upArrowCode){
        moveUp();
    }
    if (e.keyCode == leftArrowCode){
        moveLeft();
    }
    if (e.keyCode == rightArrowCode){
        moveRight();
    }
    drawHead();
}

function checkLoseCondition(x, y){
    return (x > 0 && x < 800-20 && y > 0 && y < 500-20)
}

function moveDown(){
    let newYpos = head.yPos + speed;
    if (checkLoseCondition(head.xPos, newYpos)) {
        head.yPos = newYpos;
    } else {
        console.log("you lose!");
    }
}

function moveUp(){
    let newYpos = head.yPos - speed;
    if (checkLoseCondition(head.xPos, newYpos)) {
        head.yPos = newYpos;
    } else {
        console.log("you lose!");
    }
}

function moveLeft(){
    let newXpos = head.xPos - speed;
    if (checkLoseCondition(newXpos, head.yPos)) {
        head.xPos = newXpos;
    } else {
        console.log("you lose!");
    }
}

function moveRight(){
    let newXpos = head.xPos + speed;
    if (checkLoseCondition(newXpos, head.yPos)) {
        head.xPos = newXpos;
    } else {
        console.log("you lose!");
    }
}

function spawnApple(){
    let xCoord = randomCoord(canvasDimensions.width);
    let yCoord = randomCoord(canvasDimensions.height);
    apples.push({xCoord: xCoord, yCoord: yCoord});
    drawApples();
}

function drawApples(){
    apples.forEach((apple) => {
        ctx.fillStyle = "#eb4034";
        ctx.fillRect(apple.xCoord,apple.yCoord, appleSize.width, appleSize.height);
    })

}

function randomCoord(limit){
    return Math.floor(Math.random() * limit);
}