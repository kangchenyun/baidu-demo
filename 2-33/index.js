/**
 * Created by kangchenyun on 2016/4/3.
 */

/**
 * 生成100个小格子
 */
function createSpace() {
    var wrap = document.getElementById("wrap");
    for (var i = 0; i < 100; i++) {
        var span = document.createElement("span");
        wrap.appendChild(span);
    }
}


var direction = "down";
var pos_top = 1;
var pos_left = 1;
var inti_deg = 0;


function moveForward() {
    var move = document.getElementById("move");
    switch (direction) {
        case "down":
            if (pos_top < 451) {
                var count1 = 0;
                var timer1 = setInterval(function () {
                    pos_top += 2;
                    count1 += 2;
                    move.style.top = pos_top + "px";
                    if (count1 == 50) {
                        clearInterval(timer1);
                    }
                }, 10);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "up":
            if (pos_top > 1) {
                var count2 = 0;
                var timer2 = setInterval(function () {
                    pos_top -= 2;
                    count2 += 2;
                    move.style.top = pos_top + "px";
                    if (count2 == 50) {
                        clearInterval(timer2);
                    }
                }, 10);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "right":
            if (pos_left < 451) {
                var count3 = 0;
                var timer3 = setInterval(function () {
                    pos_left += 2;
                    count3 += 2;
                    move.style.left = pos_left + "px";
                    if (count3 == 50) {
                        clearInterval(timer3);
                    }
                }, 10);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "left":
            if (pos_left > 1) {
                var count4 = 0;
                var timer4 = setInterval(function () {
                    pos_left -= 2;
                    count4 += 2;
                    move.style.left = pos_left + "px";
                    if (count4 == 50) {
                        clearInterval(timer4);
                    }
                }, 10);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
    }
}

function turnLeft() {
    if (inti_deg == 0) {
        inti_deg = 360;
    }
    inti_deg -= 90;
    var move = document.getElementById("move");
    switch (inti_deg) {
        case 270:
            move.style.transform = "Rotate(270deg)";
            direction = "right";
            break;
        case 180:
            move.style.transform = "Rotate(180deg)";
            direction = "up";
            break;
        case 90:
            move.style.transform = "Rotate(90deg)";
            direction = "left";
            break;
        case 0:
            move.style.transform = "Rotate(0deg)";
            direction = "down";
            break;
    }
}

function turnRight() {
    if (inti_deg == 360) {
        inti_deg = 0;
    }
    inti_deg += 90;
    var move = document.getElementById("move");
    switch (inti_deg) {
        case 90:
            move.style.transform = "Rotate(90deg)";
            direction = "left";
            break;
        case 180:
            move.style.transform = "Rotate(180deg)";
            direction = "up";
            break;
        case 270:
            move.style.transform = "Rotate(270deg)";
            direction = "right";
            break;
        case 360:
            move.style.transform = "Rotate(0deg)";
            direction = "down";
            break;
    }
}

function turnBack() {
    inti_deg += 180;
    if (inti_deg >= 360) {
        inti_deg -= 360;
    }
    var move = document.getElementById("move");
    switch (inti_deg) {
        case 90:
            move.style.transform = "Rotate(90deg)";
            direction = "left";
            break;
        case 180:
            move.style.transform = "Rotate(180deg)";
            direction = "up";
            break;
        case 270:
            move.style.transform = "Rotate(270deg)";
            direction = "right";
            break;
        case 0:
            move.style.transform = "Rotate(0deg)";
            direction = "down";
            break;
    }
}

function getCommander() {
    var go = document.getElementById("go");
    go.onclick = moveForward;

    var left = document.getElementById("tunlef");
    left.onclick = turnLeft;

    var right = document.getElementById("tunrig");
    right.onclick = turnRight;

    var back = document.getElementById("tunbac");
    back.onclick = turnBack;
}

function inti() {
    createSpace();
    getCommander();
}

window.onload = function () {
    inti();
};
