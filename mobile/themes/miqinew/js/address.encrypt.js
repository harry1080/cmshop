ecWap.pkg("AddressSys.service");
AddressSys.service.base = 10;
AddressSys.service.getEncryptData = function (a) {
    AddressSys.service.runGetData(a)
};
AddressSys.service.runGetData = function (b) {
    var d, c, a = "GET";
    if (AddressSys.service.utils.isEmpty(b) || AddressSys.service.utils.isEmpty(b.url) || (!AddressSys.service.utils.isFunction(b.callback))) {
        return false
    }
    if (b.data) {
        d = b.url + "t=" + new Date().getTime();
        if (b.randomFlag) {
            d += "&randomFlag=" + b.randomFlag
        }
        $.each(b.data, function (e, f) {
            if (f.name && f.value && f.value != "") {
                d += "&" + f.name + "=" + f.value.replace(/#/g, escape("#"))
            }
        })
    } else {
        d = b.url + "t=" + new Date().getTime()
    }
    if (b.id) {
        d = d + "&id=" + b.id
    }
    if (b.method) {
        a = b.method;
        d = d + "&_method=" + b.method
    }
    $.ajax({
        url: addressDomain + d, dataType: "JSONP", timeout: 10000, type: a, error: function (e, f) {
            AddressSys.service.utils.loadingComplete();
            if ("timeout" == f) {
                ecWap.alert("\u8bf7\u6c42\u8d85\u65f6\uff01")
            }
            return false
        }, success: function (e) {
            AddressSys.service.utils.loadingComplete();
            if (!e.success) {
                ecWap.alert(e.msg);
                $("#addressConfirm").attr("onclick", "ecWap.addressService.add(this)").removeClass("button-style-3-big-disabled").addClass("button-style-3-big");
                return false
            }
            b.callback(e)
        }
    })
};
