let startTime, elapsedTime = 0, timerInterval;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function startStop() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            document.getElementById("display").innerHTML = timeToString(elapsedTime);
            document.getElementById("milliseconds").innerHTML = "." + Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, "0");
        }, 10);
        document.getElementById("startStopBtn").innerHTML = "Pause";
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("startStopBtn").innerHTML = "Start";
    }
}

function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("milliseconds").innerHTML = ".00";
    document.getElementById("startStopBtn").innerHTML = "Start";
    document.getElementById("lapsList").innerHTML = "";
}

function recordLap() {
    let lapTime = timeToString(elapsedTime) + "." + Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, "0");
    let li = document.createElement("li");
    li.innerText = `Lap: ${lapTime}`;
    document.getElementById("lapsList").appendChild(li);
}