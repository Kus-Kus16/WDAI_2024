const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spawner;
let score;
let health;
let spawnRate;
let zombies = new Set();

let leftPressed = false;

const aimSize = 200;
let aimX = (canvas.width - aimSize) / 2;
let aimY = (canvas.height - aimSize) / 2;
const aimImage = new Image();
aimImage.src = 'images/aim.png';

const backgroundImage = new Image();
backgroundImage.src = 'images/board-bg.jpg';

const maxHealth = 3;
const healthSize = 80;
const healthPadding = 10;
const healthOffset = 30;

const fullHealthImage = new Image();
fullHealthImage.src = 'images/full_heart.png';
const emptyHealthImage = new Image();
emptyHealthImage.src = 'images/empty_heart.png';

const fontSize = 100;
const textOffsetTop = 80;
let textOffsetRight = 200;

const maxZombieScale = 2;
const maxZombieDx = 5;
const maxZombieY = canvas.height / 4;

const zombieImage = new Image();
zombieImage.src = 'images/walkingdead.png';
const frameWidth = 200;
const frameHeight = 312;
const totalFrames = 10;

const buttonHeight = 100;
const buttonWidth = 400;

const sadMusic = new Audio('images/sad-music.mp3');
sadMusic.loop = true;
sadMusic.volume = 0.5;

const mainMusic = new Audio('images/CrazyDave.mp3');
mainMusic.loop = true;
mainMusic.volume = 0.3;

function generateZombie() {
    let zombie = {x: 0, y: 0, dx: 0.5, scale: 0.2, frame: 0, t: 0};
    zombie.x = canvas.width;
    zombie.y = canvas.height - (Math.random() * maxZombieY);
    zombie.scale += Math.random() * maxZombieScale;
    zombie.dx += Math.random() * maxZombieDx;
    zombies.add(zombie);

    spawnRate = Math.max(spawnRate - 1, 1);
    console.log(spawnRate);

    clearInterval(spawner);
    spawner = setInterval(generateZombie, spawnRate);
}

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

    ctx.drawImage(zombieImage, frameX, frameY, frameWidth, frameHeight, zombie.x, zombie.y - ySize, xSize, ySize);

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
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawHealth() {
    const healthY = healthOffset;

    for (let i = 0 ; i < maxHealth ; i++){
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
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    let displayScore = Math.abs(score).toString().padStart(6, '0');

    if (score < 0) {
        displayScore = "-" + displayScore;
        textOffsetRight = 217;
    }
    else {
        textOffsetRight = 200;
    }

    ctx.fillText(`${displayScore}`, canvas.width - textOffsetRight, textOffsetTop);
}

function drawMenu() {
    ctx.beginPath();
    ctx.rect(0, canvas.height / 3, canvas.width, canvas.height / 3);
    ctx.fillStyle = "#af260b80";
    ctx.fill();
    ctx.closePath();

    // ctx.beginPath();
    // ctx.rect(canvas.width / 2 - buttonWidth / 2, canvas.height / 2 - buttonHeight / 2, buttonWidth, buttonHeight);
    // ctx.fillStyle = "#ffffff";
    // ctx.fill();
    // ctx.closePath();

    ctx.beginPath();
    const radius = 20; 
    ctx.moveTo(canvas.width / 2 - buttonWidth / 2 + radius, canvas.height / 2 - buttonHeight / 2);
    ctx.arcTo(canvas.width / 2 + buttonWidth / 2, canvas.height / 2 - buttonHeight / 2, canvas.width / 2 + buttonWidth / 2, canvas.height / 2 + buttonHeight / 2, radius);
    ctx.arcTo(canvas.width / 2 + buttonWidth / 2, canvas.height / 2 + buttonHeight / 2, canvas.width / 2 - buttonWidth / 2, canvas.height / 2 + buttonHeight / 2, radius);
    ctx.arcTo(canvas.width / 2 - buttonWidth / 2, canvas.height / 2 + buttonHeight / 2, canvas.width / 2 - buttonWidth / 2, canvas.height / 2 - buttonHeight / 2, radius);
    ctx.arcTo(canvas.width / 2 - buttonWidth / 2, canvas.height / 2 - buttonHeight / 2, canvas.width / 2 + buttonWidth / 2, canvas.height / 2 - buttonHeight / 2, radius);
    ctx.fillStyle = "#ffffff"; 
    ctx.fill();
    ctx.closePath();

    ctx.font = "50px Arial";
    ctx.fillStyle = "#af260b";
    ctx.fillText("Retry", canvas.width / 2, canvas.height / 2);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawZombies();
    drawHealth();
    drawScore();
    if (health <= 0) drawMenu();
    drawAim();

    zombiesCollisionDetection();

    requestAnimationFrame(draw);
}

function zombiesCollisionDetection() {
    for (let zombie of zombies){      
        const xRight = zombie.x + frameWidth*zombie.scale;

        if (xRight < 0) {            
            health --;
            zombies.delete(zombie);

            if (health === 0) {
                gameEnd();
            }

            return;
        }

    }
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

function mouseClickHandler(e) {
    const clickX = e.clientX - canvas.offsetLeft;
    const clickY = e.clientY - canvas.offsetTop;

    let lastZombie = null;

    for (let zombie of zombies) {    
        const xSize = frameWidth*zombie.scale;
        const ySize = frameHeight*zombie.scale;

        if (clickX > zombie.x  && clickX < zombie.x + xSize &&
             clickY < zombie.y && clickY > zombie.y - ySize ) {

            lastZombie = zombie;
        }

    };

    if (lastZombie != null){
        zombies.delete(lastZombie);
        score += 20;
    }
    else {
        score -= 5;
    }

}

function retryHandler(e) {
    const clickX = e.clientX - canvas.offsetLeft;
    const clickY = e.clientY - canvas.offsetTop;

    if (clickX > canvas.width / 2 - buttonWidth / 2 &&
        clickX < canvas.width / 2 - buttonWidth / 2 + buttonWidth &&
        clickY > canvas.height / 2 - buttonHeight / 2 &&
        clickY < canvas.height / 2 - buttonHeight / 2 + buttonHeight) {
        gameStart();
    }

}

function gameStart() {
    console.log("newgame");

    sadMusic.pause();
    sadMusic.currentTime = 0;
    mainMusic.play();
    
    spawner = setInterval(generateZombie, 1000);
    spawnRate = 1000;
    score = 0;
    health = maxHealth;

    canvas.removeEventListener('click', retryHandler);
    canvas.addEventListener('click', mouseClickHandler);
    
    draw();
}

function gameEnd(){
    mainMusic.pause();
    mainMusic.currentTime = 0;
    sadMusic.play();

    clearInterval(spawner);
    zombies.clear();
    
    canvas.removeEventListener('click', mouseClickHandler);
    canvas.addEventListener('click', retryHandler);

}

canvas.addEventListener("mousemove", mouseMoveHandler);
gameStart();
