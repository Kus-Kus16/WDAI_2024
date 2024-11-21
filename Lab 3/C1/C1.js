const timer = document.getElementById("timer");
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

let startTime;
let pauseTime = 0;
let interval = null;

function start() {
    if (!interval) {
        startTime = new Date().getTime();
        interval = setInterval(update, 1000);
    }
}

function stop() {
    if (interval) {
        clearInterval(interval);
        pauseTime += new Date().getTime() - startTime;;
        interval = null;
    }
}

function reset() {
    stop();
    pauseTime = 0;
    timer.innerHTML = "0s";
}

function update() {
    const currentTime = new Date().getTime();
    let displayTime = new Date(currentTime - startTime + pauseTime);

    const minutes = displayTime.getMinutes();
    const seconds = displayTime.getSeconds(); 

    displayTime = seconds + "s";
    if (minutes > 0) {
        displayTime = minutes + "min " + displayTime;
    };

    timer.innerHTML = displayTime;          
}