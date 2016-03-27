/**
 * Created by 康尘云 on 2016/3/26.
 */

/**
 * 定义存储队列的数组
 */
var sourceData = [84, 42, 32, 62, 67, 12, 34, 45, 67, 12, 99, 34, 34, 12, 87];

/**
 * 给按钮绑定点击事件
 * 调用不同的处理函数
 */
function addBtnBind() {
    var left_i = document.getElementById("left-in");
    var left_o = document.getElementById("left-out");
    var right_i = document.getElementById("right-in");
    var right_o = document.getElementById("right-out");

    left_i.onclick = function () {
        leftIn();
        renderData();
    };
    right_i.onclick = function () {
        rightIn();
        renderData();
    };
    left_o.onclick = function () {
        leftOut();
        renderData();
    };
    right_o.onclick = function () {
        rightOut();
        renderData();
    };
    
    var sort = document.getElementById("sort");
    sort.onclick = function() {
        visualSort();
    }
}

/**
 * 给数值绑定点击事件
 * 调用删除函数
 */
function deleteBind() {
    var container = document.getElementById("display");
    var values = container.getElementsByTagName("span");

    for (var i = 0, len = values.length; i < len; i++) {
        var obj = values[i];
        obj.onclick = function () {
            deleteHandler(this);
            renderData();
        };
    }

}

/**
 * 左侧入函数
 */
function leftIn() {
    var input = document.getElementById("user-input");
    var input_value = input.value;
    if (!input_value.match(/^\d*$/)) {
        alert("请输入数字！");
        input.focus();
        input.value = null;
    } else if (input_value < 10 || input_value > 100) {
        alert("请输入10-100之间的数");
    } else {
        var temp = [];
        temp[0] = parseInt(input_value);
        for (var i = 0, len = sourceData.length; i < len; i++) {
            var obj = sourceData[i];
            temp.push(obj);
        }
        sourceData = temp;
        deleteBind();
    }
}

/**
 * 右侧入函数
 */
function rightIn() {
    var input = document.getElementById("user-input");
    var input_value = input.value;
    if (!input_value.match(/^\d*$/)) {
        alert("请输入数字！");
        input.focus();
        input.value = null;
    } else if (input_value < 10 || input_value > 100) {
        alert("请输入10-100之间的数");
    } else {
        sourceData.push(parseInt(input_value));
        deleteBind();
    }
}

/**
 * 左侧出函数
 */
function leftOut() {
    var temp = [];
    for (var i = 1, len = sourceData.length; i < len; i++) {
        var obj = sourceData[i];
        temp.push(obj);
    }
    sourceData = temp;
}

/**
 * 右侧出函数
 */
function rightOut() {
    var temp = [];
    for (var i = 0, len = sourceData.length; i < len - 1; i++) {
        var obj = sourceData[i];
        temp.push(obj);
    }
    sourceData = temp;
}

/**
 * 删除函数
 */
function deleteHandler(elem) {
    var choose_value = parseInt(elem.innerHTML);
    var temp = [];
    for (var i = 0, len = sourceData.length; i < len; i++) {
        var obj = sourceData[i];
        if (obj === choose_value) {
            alert("你删除的值是：" + choose_value)
        } else {
            temp.push(obj);
        }
    }
    sourceData = temp;
}

/**
 * 展示队列
 */
function renderData() {

    if (sourceData.length > 60) {
        alert("最多可以输入60个数字！")
    } else {
        var display = document.getElementById("display");
        display.innerHTML = null;
        for (var i = 0, len = sourceData.length; i < len; i++) {
            var obj = sourceData[i];
            var elem = document.createElement("span");
            elem.innerHTML = obj;
            elem.style.height = parseInt(obj) * 2 + "px";
            elem.style.left = 16 * i + "px";
            elem.style.backgroundColor = "#0f0";
            display.appendChild(elem);
        }
        deleteBind();
    }
    
}

/**
 * 可视化排序
 */
function visualSort() {
    for (var i = 0, len = sourceData.length; i < len; i++) {
        for (var j = 0, len1 = sourceData.length; j < len1; j++) {
            var obj1 = sourceData[j];
            var obj = sourceData[j + 1];

            if (obj > obj1) {
                var temp = sourceData[j];
                sourceData[j] = sourceData[j + 1];
                sourceData[j + 1] = temp;

                // 可视化部分
                highlight(obj);
            } 
        }
    }
}

/**
 * 初始函数
 */
function init() {
    renderData();
    addBtnBind();
    deleteBind();
}

window.onload = init;