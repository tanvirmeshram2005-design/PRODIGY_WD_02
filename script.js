let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

// Helper function to format time into 00:00:00:00
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    clearInterval(timerInterval); // Prevents timer from speeding up if Start is clicked twice
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10); // Updates every 10 milliseconds for smooth movement
}

function pause() {
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    print("00:00:00:00");
    lapsList.innerHTML = "";
}

function lap() {
    if (elapsedTime > 0) {
        let li = document.createElement("li");
        let lapCount = lapsList.childElementCount + 1;
        li.innerHTML = `<span>Lap ${lapCount}</span> <span>${timeToString(elapsedTime)}</span>`;
        lapsList.prepend(li); // Adds the newest lap to the top
    }
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);