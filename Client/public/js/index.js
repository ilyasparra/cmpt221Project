// allows for the initial screen to have the fading in and out text
let opacity = 0;
let intervalID = 0;
let changeBy = 0.05;

window.addEventListener("keydown", spaceClicked, false)

function spaceClicked(evt) {
    if (evt.keyCode == "32") {
        window.location.replace("/home");
    }
}

window.onload = fadeIn;

function fadeIn() {
    setInterval(show, 100);
}

function show() {
    let fText = document.getElementById("fadingText");
    if (opacity >= 1) {
        changeBy = -0.05;
    } else if (opacity <= 0.1) {
        changeBy = 0.05;

    }
    opacity = opacity + changeBy;
    fText.style.opacity = opacity
}

document.getElementById("fadingText").addEventListener("click", function () {
    sendBack();
});

function sendBack() {
    window.location.replace("/home");
}


