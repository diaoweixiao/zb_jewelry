/**
 * Created by hp on 2018/3/5.
 */
// 绑定省份
function bindProvince(callback) {
    $.ajax({
        url: "/Province/ProvinceList",
        type: "get",
        cache: false,
        success: function (data) {
            if (data.Success) {
                var pObj = $("#sltProvince");
                pObj.find("option").remove();
                var html = "<option value='0'>请选择</option>";
                $(data.Data).each(function (k, v) {
                    html += "<option value='" + v.ProvinceID + "'>" + v.Name + "</option>";
                });

                pObj.append(html);

                callback && callback();
            }
        }
    });
}

// 绑定城市
function bindCity(provinceId, callback) {
    if (!provinceId) {
        return;
    }

    $.ajax({
        url: "/Province/CityList",
        type: "get",
        cache: false,
        data: { provinceId: provinceId },
        success: function (data) {
            if (data.Success) {
                var cObj = $("#sltCity");
                cObj.find("option").remove();
                var html = "<option value='0'>请选择</option>";
                $(data.Data).each(function (k, v) {
                    html += "<option value='" + v.CityID + "'>" + v.Name + "</option>";
                });

                cObj.append(html);
                callback && callback();
            }
        }
    });
}

// 绑定县
function bindDistrict(cityId, callback) {
    if (!cityId) {
        return;
    }

    $.ajax({
        url: "/Province/DistrictList",
        type: "get",
        cache: false,
        data: { cityId: cityId },
        success: function (data) {
            if (data.Success) {
                var dObj = $("#sltDistrict");
                dObj.find("option").remove();

                var html = "<option value='0'>请选择</option>";
                $(data.Data).each(function (k, v) {
                    html += "<option value='" + v.DistrictID + "'>" + v.Name + "</option>";
                });

                dObj.append(html);

                callback && callback();
            }
        }
    });
}

// 验证码发送倒计时
function codeCountDown(o, wait) {
    if (wait <= 0) {
        $(o).removeClass("disable").prop("disabled", false).val("发送验证码");
    } else {
        if (!$(o).hasClass("disable")) {
            $(o).addClass("disable").prop("disabled", "disabled");
        }
        $(o).val("重新获取(" + wait + ")");
        wait--;
        setTimeout(function () {
            codeCountDown(o, wait);
        }, 1000);
    }
}

// 获取图形验证码
//function getImgCode(obj) {
//    var time = new Date().getTime();
//    $(obj).prop("src", "/common/getimgcode?" + time);
//}

// 是否邮箱
function isEmail(email) {
    return /^([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\\.][a-z]{2,5}([\\.][a-z]{2})?$/.test(email);
}

// 是否手机
function isMobile(mobile) {
    return /^(0|86|17951)?(13[0-9]|17[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(mobile);
}

// 是否账号
function isAccount(account) {
    return /^[0-9a-zA-Z\s]+$/.test(account);
}

// 发送短信验证码
//function sendSmsEmailCode(account, imgCode, callback) {
//    if (!isMobile(account) && !isEmail(account)) {
//        callback && callback({ Success: false, Code: -999, Msg: "格式不正确" });
//        return;
//    }
//
//    sendReq("/Common/GetSmsOrEmailCode", { strAccount: account, strImgCode: imgCode }, function (result) {
//        callback && callback(result);
//    });
//}

// 发送请求
function sendReq(url, param, callback, failCallback) {
    $.ajax({
        type: "post",
        url: url + "?" + (new Date().getTime()),
        data: param,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function (result) {
            callback && callback(result);
        },
        error: function (e) {
            failCallback && failCallback();
        }
    });
}

// 获取URL中的request参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
    { return decodeURIComponent(r[2]); }
    else
    { return ""; }
}
