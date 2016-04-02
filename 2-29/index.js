/**
 * Created by kangchenyun on 2016/4/2.
 */
function inti() {
    var button = document.getElementById("validator");
    button.onclick = validator;
}

function validator() {
    var input = document.getElementById("user_input");
    var hint = document.getElementById("hint");

    // 将一个中文字符长度算做 2
    var str_len = input.value.replace(/[^\x00-\xff]/g, 'aa').length;
    if (str_len >= 4 && str_len <= 16) {
        hint.innerHTML = "名称格式正确";
        hint.style.color = "#45B086";
        input.style.border = "1px solid #45B086";
    } else {
        if (str_len == 0) {
            hint.innerHTML = "姓名不能为空";
        } else {
            hint.innerHTML = "姓名长度应为4~16个字符";
        }
        hint.style.color = "#f00";
        input.style.border = "1px solid #f00";
    }
}

window.onload = function () {
    inti();
};
