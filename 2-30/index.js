/**
 * Created by kangchenyun on 2016/4/2.
 */
function inti() {
    showHint();
    var button = document.getElementById("validator");
    button.onclick = validator;
}

var validator_count = 0;

function validator() {
    validator_count = 0;

    validatorName();
    validatorPass();
    validatorPassConf();
    validatorEmail();
    validatorPhone();

    if (validator_count == 5) {
        alert("提交成功");
    } else {
        alert("提交失败");
    }
}

function validatorName() {
    var input = document.getElementById("name");
    var hint = document.getElementById("name_hint");

    // 将一个中文字符长度算做 2
    var str_len = input.value.replace(/[^\x00-\xff]/g, 'aa').length;
    if (str_len >= 4 && str_len <= 16) {
        input.style.border = "1px solid #45B086";
        hint.innerHTML = "名称格式正确";
        hint.style.color = "#45B086";

        validator_count++;
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

function validatorPass() {
    var input = document.getElementById("password");
    var hint = document.getElementById("password_hint");

    var str_len = input.value.length;
    var re = /\w+/g;
    if (input.value.match(re)) {
        if (str_len >= 8 && str_len <= 16) {
            hint.innerHTML = "密码可用";
            hint.style.color = "#45B086";
            input.style.border = "1px solid #45B086";

            validator_count++;

        } else if (str_len == 0) {
            hint.innerHTML = "密码不能为空";
            hint.style.color = "#f00";
            input.style.border = "1px solid #f00";
        } else {
            hint.innerHTML = "密码长度应为8~16个字符";
            hint.style.color = "#f00";
            input.style.border = "1px solid #f00";
        }
    } else {
        hint.innerHTML = "密码仅允许包含字母和数字";
        hint.style.color = "#f00";
        input.style.border = "1px solid #f00";
    }
}

function validatorPassConf() {
    var password = document.getElementById("password");
    var password_confirm = document.getElementById("password_confirm");
    var hint = document.getElementById("password_confirm_hint");

    if (password.value === password_confirm.value && password_confirm.value) {
        hint.innerHTML = "密码输入一致";
        hint.style.color = "#45B086";
        password_confirm.style.border = "1px solid #45B086";

        validator_count++;

    } else {
        hint.innerHTML = "密码输入不一致";
        hint.style.color = "#f00";
        password_confirm.style.border = "1px solid #f00";
        password.focus();
        password.value = "";
        password_confirm.value = "";
    }

}
function validatorEmail() {
    var input = document.getElementById("email");
    var hint = document.getElementById("email_hint");
    var re = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (input.value.match(re)) {
        hint.innerHTML = "邮箱可用";
        hint.style.color = "#45B086";
        input.style.border = "1px solid #45B086";

        validator_count++;

    } else {
        hint.innerHTML = "邮箱地址错误";
        hint.style.color = "#f00";
        input.style.border = "1px solid #f00";
    }
}
function validatorPhone() {
    var input = document.getElementById("phone");
    var hint = document.getElementById("phone_hint");
    var re = /\d{3}-\d{8}|\d{4}-\{7,8}|\d{11}/;

    if (input.value.match(re)) {
        hint.innerHTML = "手机号码可用";
        hint.style.color = "#45B086";
        input.style.border = "1px solid #45B086";

        validator_count++;

    } else {
        hint.innerHTML = "手机号码不可用";
        hint.style.color = "#f00";
        input.style.border = "1px solid #f00";
    }
}

function showHint() {
    var input_items = document.getElementsByTagName("input");
    for (var i = 0, len = input_items.length; i < len; i++) {
        var obj = input_items[i];

        obj.onfocus = function () {
            var obj_id = this.id;
            var hint_id = obj_id + "_hint";
            var hint = document.getElementById(hint_id);
            hint.style.display = "block";
        };

        obj.onblur = function () {
            switch (this.id) {
                case "name":
                    validatorName();
                    break;
                case "password":
                    validatorPass();
                    break;
                case "password_confirm":
                    validatorPassConf();
                    break;
                case "email":
                    validatorEmail();
                    break;
                case "phone":
                    validatorPhone();
                    break;
            }
        }
    }
}


window.onload = function () {
    inti();
};
