/**
 * Created by kangchenyun on 2016/4/3.
 */

/**
 * 尽量时表单配置、生成、样式、验证几个逻辑之间的耦合度足够低
 * {
        label: '名称',                    // 表单标签
        type: 'input',                   // 表单类型
        validator: function () {...},    // 表单验证规
        rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              // 验证通过提示
        fail: '名称不能为空'               // 验证失败提示
   }
 基于该配置项，实现一套逻辑，可以自动生成表单的展现、交互、验证
 使用你制作的表单工厂，在一个页面上创建两套样式不同的表单
 */


var name = {
    label: "名称",
    type: "input",
    validator: function () {},
    rules: "必填，长度为4-16个字符",
    success: '格式正确',
    fail: '名称不能为空'
};

var password = {
    label: "密码",
    type: "input",
    validator: function () {},
    rules: "必填，数字或字母，长度为8-16个字符",
    success: '格式正确',
    fail: '密码不能为空'
};

var password_confirm = {
    label: "密码验证",
    type: "input",
    validator: function () {},
    rules: "请再次输入密码",
    success: '两次输入一致',
    fail: '两次输入不一致'
};

var email = {
    label: "邮箱",
    type: "input",
    validator: function () {},
    rules: "example@company.domain",
    success: '邮箱格式正确',
    fail: '邮箱格式错误'
};

var phone = {
    label: "手机",
    type: "input",
    validator: function () {},
    rules: "请输入正确的手机号码",
    success: '手机号码格式正确',
    fail: '手机号码格式错误'
};

var submit = {
    label: "验证",
    type: "button",
    validator: function () {},
    success: '表单已提交',
    fail: '表单填写错误，提交失败'
};