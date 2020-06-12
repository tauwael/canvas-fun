document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function init(){
    drawBoard();
}

function drawBoard(){

    ctx.strokeStyle = "#C5DCA0"
    ctx.strokeRect(0, 0, 800, 500);
}