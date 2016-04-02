/**
 * Created by kangchenyun on 2016/4/2.
 */
/**
 * 学校数据存储在数组中
 */
var school = [
    ["北京", "清华大学"],
    ["北京", "北京大学"],
    ["北京", "中国人民大学"],
    ["北京", "北京航天航空大学"],
    ["上海", "复旦大学"],
    ["上海", "上海交通大学"],
    ["上海", "上海财经大学"],
    ["上海", "同济大学"],
    ["陕西", "西安交通大学"],
    ["陕西", "西北工业大学"],
    ["陕西", "西安电子科技大学"],
    ["陕西", "长安大学"],
    ["江苏", "南京大学"],
    ["江苏", "南京航天航空大学"],
    ["江苏", "东南大学"],
    ["江苏", "河海大学"]
];

/**
 * 给省份列表添加数据
 */
function addProvince() {
    var province_list = document.getElementById("province");
    var province_now = undefined;       // 标记当前省份，以免重复添加省份

    for (var i = 0, len = school.length; i < len; i++) {
        var obj = school[i][0];
        if (obj != province_now) {

            var province_item = document.createElement("option");
            province_item.value = obj;
            province_item.innerHTML = obj;
            province_list.appendChild(province_item);

            province_now = obj;
        }
    }
}

/**
 * 根据省份添加大学
 */
function addUniversity() {
    var province = document.getElementById("province").value;
    var university_list = document.getElementById("university");
    university_list.innerHTML = "";

    for (var i = 0, len = school.length; i < len; i++) {
        var obj = school[i];
        if (obj[0] == province) {

            var university_item = document.createElement("option");
            university_item.value = obj[1];
            university_item.innerHTML = obj[1];
            university_list.appendChild(university_item);
        }
    }
}

/**
 * 当省份变化时改变大学列表
 */
function changeUniversity() {
    var province = document.getElementById("province");
    province.onchange = addUniversity;
}

/**
 * 根据单选按钮显示表达
 */
function showForm() {
    var student = document.getElementById("student");
    var graduate = document.getElementById("graduate");
    var not_graduate = document.getElementById("not_graduate");
    
    if (student.checked) {
        not_graduate.style.display = "block";
        graduate.style.display = "none";
    } else {
        not_graduate.style.display = "none";
        graduate.style.display = "block";
    }
}

/**
 * 当单选按钮改变时改变表单
 */
function changeForm() {
    var is_school = document.getElementsByName("is_school");
    var graduate = document.getElementById("graduate");
    graduate.style.display = "none";

    // 给每个单选按钮绑定改变时触发的事件
    for (var i = 0, len = is_school.length; i < len; i++) {
        var obj = is_school[i];
        obj.onchange = showForm;
    }

}

function inti() {
    changeForm();
    addProvince();
    addUniversity();
    changeUniversity();
}

window.onload = function () {
    inti();
};