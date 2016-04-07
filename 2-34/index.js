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

/**
 * direction 代表方块将移动的方向
 * pos_top pos_left 对方块进行定位
 * degree 代表当前的方块朝向 向下为0，向左为90，向上为180，向右为270
 */
var direction = "down";
var pos_top = 1;
var pos_left = 1;
var degree = 0;

/**
 * pos 进行边界判断
 * count 进行一步是否完成判断
 * 451 是因为空间边长500，每格边长50，左上角位置为451
 */
function moveForward() {
    var move = document.getElementById("move");
    switch (direction) {
        case "down":
            if (pos_top < 451) {
                var count1 = 0;
                var timer1 = setInterval(function () {
                    pos_top += 1;
                    count1 += 1;

                    if (pos_top >= 451) {
                        clearInterval(timer1);
                    }
                    move.style.top = pos_top + "px";

                    // 一步完成判断
                    if (count1 == 50) {
                        clearInterval(timer1);
                    }
                }, 5);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "up":
            if (pos_top > 1) {
                var count2 = 0;
                var timer2 = setInterval(function () {
                    pos_top -= 1;
                    count2 += 1;

                    if (pos_top <= 1) {
                        clearInterval(timer2);
                    }
                    move.style.top = pos_top + "px";

                    if (count2 == 50) {
                        clearInterval(timer2);
                    }
                }, 5);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "right":
            if (pos_left < 451) {
                var count3 = 0;
                var timer3 = setInterval(function () {
                    pos_left += 1;
                    count3 += 1;

                    if (pos_left >= 451) {
                        clearInterval(timer3);
                    }
                    move.style.left = pos_left + "px";

                    if (count3 == 50) {
                        clearInterval(timer3);
                    }
                }, 5);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
        case "left":
            if (pos_left > 1) {
                var count4 = 0;
                var timer4 = setInterval(function () {
                    pos_left -= 1;
                    count4 += 1;

                    if (pos_left <= 1) {
                        clearInterval(timer4);
                    }
                    move.style.left = pos_left + "px";

                    if (count4 == 50) {
                        clearInterval(timer4);
                    }
                }, 5);
            } else {
                alert("到达边界，请另寻出路");
            }
            break;
    }
}


/* 改变朝向并移动 */
function moveLeft() {
    var move = document.getElementById("move");

    switch (degree) {
        case 0:
            move.className = "";
            move.className = "rotate0-90";
            break;
        case 90:
            break;
        case 180:
            move.className = "";
            move.className = "rotate180-90";
            break;
        case 270:
            move.className = "";
            move.className = "rotate270-90";
            break;
    }
    direction = "left";
    degree = 90;
    setTimeout(moveForward, 500);
}

function moveRight() {
    var move = document.getElementById("move");

    switch (degree) {
        case 0:
            move.className = "";
            move.className = "rotate360-270";
            break;
        case 90:
            move.className = "";
            move.className = "rotate90-270";
            break;
        case 180:
            move.className = "";
            move.className = "rotate180-270";
            break;
        case 270:
            break;
    }
    direction = "right";
    degree = 270;
    setTimeout(moveForward, 500);
}

function moveUp() {
    var move = document.getElementById("move");

    switch (degree) {
        case 0:
            move.className = "";
            move.className = "rotate0-180";
            break;
        case 90:
            move.className = "";
            move.className = "rotate90-180";
            break;
        case 180:
            break;
        case 270:
            move.className = "";
            move.className = "rotate270-180";
            break;
    }
    direction = "up";
    degree = 180;
    setTimeout(moveForward, 500);
}

function moveDown() {
    var move = document.getElementById("move");

    switch (degree) {
        case 0:
            break;
        case 90:
            move.className = "";
            move.className = "rotate90-0";
            break;
        case 180:
            move.className = "";
            move.className = "rotate180-0";
            break;
        case 270:
            move.className = "";
            move.className = "rotate270-360";
            break;
    }
    direction = "down";
    degree = 0;
    setTimeout(moveForward, 500);
}

/* 仅移动 */
function traLeft() {
    direction = "left";
    moveForward();
}

function traRight() {
    direction = "right";
    moveForward();
}

function traTop() {
    direction = "up";
    moveForward();
}

function traBottom() {
    direction = "down";
    moveForward();
}

/**
 * 通过添加临时的类名，利用CSS3提供的 animation/transform 属性实现旋转的动画
 */
function getCommander() {

    // 旋转命令部分
    var go = document.getElementById("go");
    go.onclick = moveForward;

    var tra_left = document.getElementById("tra_left");
    tra_left.onclick = traLeft;

    var tra_right = document.getElementById("tra_right");
    tra_right.onclick = traRight;

    var tra_top = document.getElementById("tra_top");
    tra_top.onclick = traTop;

    var tra_bottom = document.getElementById("tra_bottom");
    tra_bottom.onclick = traBottom;


    // 移动命令部分
    var move_left = document.getElementById("move_left");
    move_left.onclick = moveLeft;

    var move_right = document.getElementById("move_right");
    move_right.onclick = moveRight;

    var move_up = document.getElementById("move_up");
    move_up.onclick = moveUp;

    var move_down = document.getElementById("move_down");
    move_down.onclick = moveDown;
}

window.onload = function () {
    createSpace();
    getCommander();
};
