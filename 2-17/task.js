/**
 * Created by kangchenyun on 2016/3/24.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,  
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
// 用于给柱形图添加颜色
var rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {

    // 三个显示区域，根据选择，不同显示
    var display_day = document.getElementById("display-day");
    var display_week = document.getElementById("display-week");
    var display_month = document.getElementById("display-month");

    if (pageState.nowGraTime === "day") {

        // 根据选择，只显示一个区域
        display_day.style.display = "block";
        display_week.style.display = "none";
        display_month.style.display = "none";

        // 先清空内容，但保留legend
        var legend_day = display_day.getElementsByTagName("legend")[0];
        display_day.innerHTML = null;
        display_day.appendChild(legend_day);

        // 计数用来循环添加颜色
        var count_day = 0;
        for (var i_day in chartData) {

            // 添加title
            var elem_day = document.createElement("div");
            elem_day.title = i_day + " " + chartData[i_day];

            // 计算换算高度及位置
            elem_day.style.height = chartData[i_day] * 300 / 500;
            // + 30，是为了控制图形位置；8 则是根据样式表的宽度
            elem_day.style.left = 8 * count_day + 30;

            // 分配一个彩虹色
            count_day++;
            var color_index_day = count_day % 7;
            elem_day.style.backgroundColor = rainbow[color_index_day];

            display_day.appendChild(elem_day);
        }
    } else if (pageState.nowGraTime === "week") {

        display_day.style.display = "none";
        display_week.style.display = "block";
        display_month.style.display = "none";

        var legend_week = display_week.getElementsByTagName("legend")[0];
        display_week.innerHTML = null;
        display_week.appendChild(legend_week);
        var count_week = 0;
        for (var i_week in chartData) {
            var elem_week = document.createElement("div");
            elem_week.title = i_week + " " + chartData[i_week];

            elem_week.style.height = chartData[i_week] * 300 / 500;
            elem_week.style.left = 30 * count_week + 30;

            count_week++;
            var color_index_week = count_week % 7;
            elem_week.style.backgroundColor = rainbow[color_index_week];

            display_week.appendChild(elem_week);
        }
    } else {

        display_day.style.display = "none";
        display_week.style.display = "none";
        display_month.style.display = "block";

        var legend_month = display_month.getElementsByTagName("legend")[0];
        display_month.innerHTML = null;
        display_month.appendChild(legend_month);
        var count_month = 0;
        for (var i_month in chartData) {
            var elem_month = document.createElement("div");
            elem_month.title = i_month + " " + chartData[i_month];

            elem_month.style.height = chartData[i_month] * 300 / 500;
            elem_month.style.left = 60 * count_month + 30;

            count_month++;
            var color_index_month = count_month % 7;
            elem_month.style.backgroundColor = rainbow[color_index_month];

            display_month.appendChild(elem_month);
        }
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {

    // 确定是否选项发生了变化
    var radio = document.getElementsByName("gra-time");

    for (var i = 0, len = radio.length; i < len; i++) {
        var obj = radio[i];
        if (obj.checked) {

            // 将时间粒度赋值
            pageState.nowGraTime = obj.value;
        }
    }

    // 设置对应数据
    initAqiChartData();

    // 调用图表渲染函数
    renderChart();

}


/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    var select = document.getElementById("city-select");
    var city = select.value;
    if (city !== pageState["nowSelectCity"]) {
        pageState["nowSelectCity"] = city;
    }

    // 设置对应数据
    initAqiChartData();

    // 调用图表渲染函数
    renderChart();
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementsByName("gra-time");
    for (var i = 0, len = radio.length; i < len; i++) {
        var obj = radio[i];
        obj.onclick = graTimeChange;
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById("city-select");
    for (var i in aqiSourceData) {
        var option = document.createElement("option");
        option.innerHTML = i;
        select.appendChild(option);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    select.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    chartData = aqiSourceData[pageState["nowSelectCity"]];

    if (pageState.nowGraTime === "week") {

        // temp 为处理数据临时存储位置
        // week 为 title 属性准备
        var temp = {};
        var count = 1;
        var week = 1;
        var sum = 0;

        for (var i in chartData) {
            count++;
            sum += chartData[i];
            if (count == 7) {
                temp["第" + week + "周"] = Math.round(sum / 7);
                week++;
                count = 1;
                sum = 0;
            }
        }
        chartData = temp;
    } else if (pageState.nowGraTime === "month") {
        var temp2 = {};
        var count2 = 1;
        var month = 1;
        var sum2 = 0;

        for (var j in chartData) {
            count2++;
            sum2 += chartData[j];
            if (count2 == 30) {
                temp2[month + "月"] = Math.round(sum2 / 30);
                month++;
                count2 = 1;
                sum2 = 0;
            }
        }
        chartData = temp2;
    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

window.onload = init;