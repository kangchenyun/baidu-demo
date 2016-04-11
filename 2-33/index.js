/**
 * Created by kangchenyun on 2016/4/3.
 */

/**
 * 生成100个小格子
 */
function createSpace() {
    var wrap = document.getElementById("wrap");
    for (var i = 0; i < 10; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < 10; j++) {
            var data = document.createElement("td");
            row.appendChild(data);
        }
        wrap.appendChild(row);
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
                pos_top += 50;
                move.style.top = pos_top + "px";
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "up":
            if (pos_top > 1) {
                pos_top -= 50;
                move.style.top = pos_top + "px";
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "right":
            if (pos_left < 451) {
                pos_left += 50;
                move.style.left = pos_left + "px";
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "left":
            if (pos_left > 1) {
                pos_left -= 50;
                move.style.left = pos_left + "px";
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
