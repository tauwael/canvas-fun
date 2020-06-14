document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let currentDirection = 39;
const leftArrowCode = 37;
const upArrowCode = 38;
const rightArrowCode = 39;
const downArrowCode = 40;

const headSize = {
    height: 20,
    width: 20
}

const appleSize = {
    height: 10,
    width: 10
}

const head = {
    xPos : 5,
    yPos : 5
}

const canvasDimensions = {
    width:800,
    height:500
}

const speed = 5;

let apples = [];

function init(){
    setCanvasSize();
    drawBoard();
    startListeners();
    spawnApples(20);
    repeatOften();
}

function spawnApples(amount){
    for (let i=0; i<amount; i++){
        spawnApple();
    }
}

function setCanvasSize(){
    canvas.width = window.innerWidth*0.75;
    canvas.height = window.innerHeight*0.75;
    canvasDimensions.width = window.innerWidth*0.75;
    canvasDimensions.height = window.innerHeight*0.75;
}

function repeatOften() {
    if (currentDirection === rightArrowCode){
        moveRight();
    } else
    if (currentDirection === leftArrowCode) {
        moveLeft();
    } else
    if (currentDirection === upArrowCode) {
        moveUp();
    } else
    if (currentDirection === downArrowCode) {
        moveDown();
    }
    checkEat();
    drawHead();
    drawApples();
    requestAnimationFrame(repeatOften);
  }

function drawBoard(){
    ctx.strokeStyle = "#C5DCA0"
    ctx.strokeRect(0, 0, 800, 500);
}

function drawHead(){
    ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    ctx.fillStyle = "#C5DCA0";
    ctx.fillRect(head.xPos,head.yPos,headSize.width, headSize.height);
}

function startListeners(){
    document.addEventListener("keydown", processKeydown);
}

function processKeydown(e){
    currentDirection = e.keyCode;
}

function checkLoseCondition(x, y){
    return (x > 0 && x < canvasDimensions.width-20 && y > 0 && y < canvasDimensions.height-20)
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
}

function drawApples(){
    apples.forEach((apple) => {
        ctx.fillStyle = "#eb4034";
        ctx.fillRect(apple.xCoord,apple.yCoord, appleSize.width, appleSize.height);
    });
}

function randomCoord(limit){
    return Math.floor(Math.random() * limit);
}

function checkEat(){
    apples.forEach((apple) => {
        let xLowerLimit = head.xPos+headSize.width > apple.xCoord;
        let xUpperLimit = head.xPos < apple.xCoord;
        let yLowerLimit = head.yPos+headSize.height > apple.yCoord;
        let yUpperLimit = head.yPos < apple.yCoord;
        if (xLowerLimit && xUpperLimit && yLowerLimit && yUpperLimit){
            document.querySelector("#counter").innerHTML = parseInt(document.querySelector("#counter").innerHTML)+1;
            apples.splice(apples.indexOf(apple),1);
        }
    })
}  