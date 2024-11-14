const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

let interval = 0;
let score = 0;
let health = 3;

const aimSize = 200;
let aimX = (canvas.width - aimSize) / 2;
let aimY = (canvas.height - aimSize) / 2;
const aimImage = new Image();
aimImage.src = 'images/aim.png'

const backgroundImage = new Image();
backgroundImage.src = 'images/board-bg.jpg'

const healthSize = 80;
const healthPadding = 10;
const healthOffset = 30;

const fullHealthImage = new Image();
fullHealthImage.src = 'images/full_heart.png'
const emptyHealthImage = new Image();
emptyHealthImage.src = 'images/empty_heart.png'

const textOffsetTop = 110;
const textOffsetRight = 370;
const fontSize = 100;

const zombies = [];
const maxZombieScale = 2;
const maxZombieDx = 5;
const maxZombieY = canvas.height / 4;

const zombieImage = new Image();
zombieImage.src = 'images/walkingdead.png'
const frameWidth = 200;
const frameHeight = 312;
const totalFrames = 10;

let leftPressed = false;

function generateZombie() {
    let zombie = {x: 0, y: 0, dx: 0.5, scale: 0.2, frame: 0, t: 0};
    zombie.x = canvas.width;
    zombie.y = canvas.height - (Math.random() * maxZombieY);
    zombie.scale += Math.random() * maxZombieScale;
    zombie.dx += Math.random() * maxZombieDx;
    zombies.push(zombie);
}

generateZombie();

function drawZombie(zombie) {
    const frameX = zombie.frame*frameWidth ;
    const frameY = 0;

    const xSize = frameWidth*zombie.scale;
    const ySize = frameHeight*zombie.scale;
    const dt = Math.max(8.5 - zombie.dx, 2);

    if (zombie.t > dt){
        zombie.t = 0;
        zombie.frame = (zombie.frame + 1) % totalFrames;
    }

    ctx.drawImage(zombieImage, frameX, frameY, frameWidth, frameHeight, zombie.x, zombie.y -ySize, xSize, ySize);

    zombie.x -= zombie.dx;
    zombie.t ++;
}

function drawZombies() {
    zombies.forEach(zombie => drawZombie(zombie));
}

function drawAim() {
    ctx.drawImage(aimImage, aimX, aimY, aimSize, aimSize);
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
}

function drawHealth() {
    const healthY = healthOffset;
    for (let i = 0 ; i < 3 ; i++){
        const healthX = i*(healthSize + healthPadding) + healthOffset;
        
        if (health - i > 0) {
            ctx.drawImage(fullHealthImage, healthX, healthY, healthSize, healthSize);
        } 
        else {
            ctx.drawImage(emptyHealthImage, healthX, healthY, healthSize, healthSize);
        }
    }
}

function drawScore() {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = "#ffffff";
    const displayScore = score.toString().padStart(6, '0');
    ctx.fillText(`${displayScore}`, canvas.width - textOffsetRight, textOffsetTop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawZombies();
    drawAim();
    drawHealth();
    drawScore();

    requestAnimationFrame(draw);
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    const relativeY = e.clientY - canvas.offsetTop;

    if (relativeX > 0 && relativeX < canvas.width) {
      aimX = relativeX - aimSize / 2;
    }
    if (relativeY > 0 && relativeY < canvas.height) {
      aimY = relativeY - aimSize / 2;
    }
}   

draw()
document.addEventListener("mousemove", mouseMoveHandler);