/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value;
    city = city.replace(/^\s+|\s+$/g, "");

    if (city.match(/^[\u4e00-\u9fa5a-zA-Z]+$/g)) {
        var value = document.getElementById("aqi-value-input").value;
        value = value.replace(/^\s+|\s+$/, "");

        if (value.match(/\d/) && value.indexOf(".") == -1) {
            if (value < 9999) {
                aqiData[city] = value;
            } else {
                alert("空气质量指数需小于 9999");
            }
        } else {
            alert("空气质量指数需为整数");
        }

    } else {
        alert("城市名需为中英文字符");
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table");

    // 渲染数据时，清空表格之前先保留下表头部分
    var remain_part = table.getElementsByTagName("tr")[0];
    table.innerHTML = null;
    table.appendChild(remain_part);

    for (var i in aqiData) {

        // 这个验证是因为删除时，删除了城市的空气指数
        // 当空气指数为null时，不渲染该城市数据
        if (aqiData[i]) {
            var row = document.createElement("tr");
            var city = document.createElement("td");
            var value = document.createElement("td");
            var button = document.createElement("button");
            city.innerHTML = i;
            value.innerHTML = aqiData[i];
            button.innerHTML = "删除";
            button.onclick = function () {

                // 传递button元素，以便查找其对应的城市
                delBtnHandle(this);
            };

            row.appendChild(city);
            row.appendChild(value);
            row.appendChild(button);
            table.appendChild(row);
        }
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(button) {
    // do sth.

    // 找到button的父节点，父节点的第一个子节点包含城市
    // 如果该城市与集合中的一个城市名相同，则将空气指数设为null
    var button_parent = button.parentNode;
    var city = button_parent.firstChild.innerHTML;
    for (var i in aqiData) {
        if (i == city) {
            aqiData[i] = null;
        }
    }

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn = document.getElementById("add-btn");
    add_btn.onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var table = document.getElementById("aqi-table");
    var del_btn = table.getElementsByTagName("button");
    for (var i = 0, len = del_btn.length; i < len; i++) {
        var obj = del_btn[i];
        obj.onclick = function () {
            delBtnHandle(this);
        }
    }

}

window.onload = init;
