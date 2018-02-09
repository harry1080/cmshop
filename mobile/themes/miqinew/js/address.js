Utils.pkg("AddressSys.service");
AddressSys.service.config = {
    url: {
        ADDRESS_ADD: "/member/myAddresses/add.json?",
        ADDRESS_DEL: "/member/myAddresses/{id}.json?",
        ADDRESS_VIEW: "/member/myAddresses/list.json?",
        ADDRESS_UPDATE: "/member/myAddresses/modify/{id}.json?",
        ADDRESS_SET_DEFAULT: "/member/myAddresses/default.json?",
        ADDRESS_GET_DEFAULT: "/member/myAddresses/default.json?"
    }, method: {GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE"}
};
AddressSys.service.add = function (c, b, d) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_ADD;
    a.data = b;
    a.method = AddressSys.service.config.method.POST;
    a.callback = d;
    a.randomFlag = c;
    AddressSys.service.getEncryptData(a)
};
AddressSys.service.del = function (b, c) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_DEL.replace(/{id}/g, b);
    a.method = AddressSys.service.config.method.DELETE;
    a.callback = c;
    a.data = AddressSys.service.utils.buildQueryStr(a);
    AddressSys.service.utils.getJSON(a)
};
AddressSys.service.manager = function (b) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_VIEW;
    a.method = AddressSys.service.config.method.GET;
    a.callback = b;
    a.from = "manager-shoppingConfigList";
    AddressSys.service.getEncryptData(a)
};
AddressSys.service.update = function (b, c, d) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_UPDATE.replace(/{id}/g, b);
    a.method = AddressSys.service.config.method.POST;
    a.callback = d;
    a.data = c;
    AddressSys.service.getEncryptData(a)
};
AddressSys.service.setDefault = function (b, c) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_SET_DEFAULT;
    a.method = AddressSys.service.config.method.PUT;
    a.id = b;
    a.callback = c;
    a.data = AddressSys.service.utils.buildQueryStr(a);
    AddressSys.service.utils.getJSON(a)
};
AddressSys.service.getDefault = function (b) {
    var a = {};
    a.url = AddressSys.service.config.url.ADDRESS_GET_DEFAULT;
    a.method = AddressSys.service.config.method.GET;
    a.callback = b;
    a.from = "getDefault-shoppingConfg";
    AddressSys.service.getEncryptData(a)
};
AddressSys.service.utils = {
    isFunction: function (a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    }, isEmpty: function (a) {
        return ("undefined" == a || null == a || "" == a || 0 == a.length)
    }, loading: function () {
        var a = '<section class="system-loading" id="systemLoadingId"><div class="loading"><span class="icon-loading-big"></span></div></section>';
        $("body").append(a)
    }, loadingComplete: function () {
        $("#systemLoadingId").remove()
    }, buildQueryStr: function (a) {
        var b = {};
        if (AddressSys.service.utils.isEmpty(a)) {
            return b
        }
        if (!AddressSys.service.utils.isEmpty(a.id)) {
            b.id = a.id
        }
        if (!AddressSys.service.utils.isEmpty(a.method)) {
            b._method = a.method
        }
        return b
    }, getJSON: function (b) {
        if (AddressSys.service.utils.isEmpty(b) || AddressSys.service.utils.isEmpty(b.url) || (!AddressSys.service.utils.isFunction(b.callback))) {
            return false
        }
        AddressSys.service.utils.loading();
        var a = addressDomain + b.url + "&_t=" + new Date().getTime() + "&callback=?";
        $.ajax({
            url: a, dataType: "JSONP", data: b.data, timeout: 10000, error: function (c, d) {
                AddressSys.service.utils.loadingComplete();
                if ("timeout" == d) {
                    ecWap.alert("\u8bf7\u6c42\u8d85\u65f6\uff01")
                } else {
                    ecWap.alert("\u83b7\u53d6\u6536\u8d27\u5730\u5740\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5\uff01")
                }
                return false
            }, success: function (c) {
                AddressSys.service.utils.loadingComplete();
                b.callback(c)
            }
        });
        return true
    }
};
