ecWap.showError = function (a) {
    if (a.code && a.code == "login") {
        ecWap.alert("登录超时，请重新登录");
        return false
    }
    ecWap.alert(ecWap.encodeScript(a.msg) || "系统繁忙")
};
ecWap.alert = function (b, a) {
    ecWap.box(b, a)
};
ecWap.confirmDialog = function (b, a) {
    ecWap.box(b, {
        isconfirm: true, onok: function (c) {
            if (a) {
                a(c)
            }
        }
    })
};
ecWap.loding = function (a) {
    var b = a ? a : '<div class="ecWap-dialog-content-loading"></div>';
    ecWap.box(b, {showTitle: false, button: false})
};
ecWap.lodingHide = function () {
    ecWap.box.close()
};
ecWap.console = {
    warn: function (a) {
        if (!window.console || !ecWap.debug) {
            return
        }
        console.warn(a)
    }, error: function (a) {
        if (!window.console || !ecWap.debug) {
            return
        }
        console.error(a)
    }, log: function (a) {
        if (!window.console || !ecWap.debug) {
            return
        }
        console.log(a)
    }
};
var log = ecWap.console.log;
ecWap.toggle = function (a, b) {
    $("#" + b).toggle();
    $(a).attr("class", ($(a).hasClass("icon-arrows-top") ? "icon-arrows-down" : "icon-arrows-top"))
};
ecWap.encodeScript = function (a) {
    if (a && "" != a) {
        a = String(a);
        a = a.replace(new RegExp("&", "gm"), "&amp;");
        a = a.replace(new RegExp(">", "gm"), "&gt;");
        a = a.replace(new RegExp("<", "gm"), "&lt;");
        a = a.replace(new RegExp('"', "gm"), "&quot;")
    }
    return a
};
ecWap.scrollTopH = function (a) {
    scroll = $(document).scrollTop();
    var c = 0;
    if (scroll > a) {
        scroll = a
    }
    var b = scroll / a * 1.2;
    if (scroll > a) {
        scroll = a
    }
    if (b > 1) {
        b = 1
    }
    $(".header").css({"backdrop-filter": "blur(" + b * 25 + "px)", background: "rgba(255,255,255," + b + ")"});
    $(".shadow").css({"box-shadow": "rgb(51, 51, 51) 0px -5px " + b * 60 + "px -27px"});
    if (scroll >= parseInt(a * 3 / 4)) {
        $(".icon-message").addClass("icon-message-black");
        $(".icon-login").removeClass("icon-login-white");
        $(".icon-personal").removeClass("icon-personal-white")
    } else {
        $(".icon-message").removeClass("icon-message-black");
        $(".icon-login").addClass("icon-login-white");
        $(".icon-personal").addClass("icon-personal-white")
    }
};
ecWap.toast = function (d, b) {
    var c = b || {}, a = {toastID: "checkValueToast", time: 3000};
    c = $.extend(a, c);
    if ($("#" + c.toastID).length == 0) {
        $('<div class="toast" id="' + c.toastID + '" style="display:none"></div>').appendTo("body")
    }
    $("#" + c.toastID).text(d || "系统繁忙").show().fadeOut(3000)
};



ecWap.pkg("ecWap.account");
ecWap.account = {
    getInfo: function (a) {
        new ecWap.ajax({
            type: "get",
            url: "member.php?act=status",
            timeout: 10000,
            timeoutFunction: function () {
                if (null != a) {
                    a()
                }
            },
            errorFunction: function () {
                if (null != a) {
                    a()
                }
            },
            successFunction: function (b) {
                if (b.success && b.account) {
                    console.log(b);
                    ecWap.account.id = b.account.id;
                    ecWap.account.userId = b.account.userId;
                    ecWap.account.name = b.account.name;
                    ecWap.account.nickName = b.account.nickName;
                    ecWap.account.loginName = b.account.loginName;
                    ecWap.account.email = b.account.email;
                    ecWap.account.mobile = b.account.mobile;
                    ecWap.account.mobileStatus = b.account.mobileStatus;
                    ecWap.account.accountType = b.account.accountType;
                    ecWap.account.isBindMobile = b.isBindMobile;
                    ecWap.account.isPriorityBuy = b.account.isPriorityBuy;
                    ecWap.account.prioritySkuId = b.account.prioritySkuId;
                    ecWap.account.bindedPhoneStatus = b.account.bindedPhoneStatus;
                    ecWap.account.occupation = b.account.occupation;
                    ecWap.account.isFirstLogin = b.isFirstLogin
                }
                if (null != a) {
                    console.log('success');
                    a()
                }
            }
        })
    },
    isLogin: function () {
        return ecWap.account.id && ecWap.account.name
    }
};



ecWap.pkg("ecWap.product");
ecWap.product.inventory = {
    _data: {}, set: function (b, a) {
        this._data[b] = a
    }, haveInventory: function (a) {
        return this._data[a]
    }
};
ecWap.track99click = function (b) {
    var d;
    if (typeof(b) == "string") {
        d = b
    } else {
        var e = [], a;
        for (var c in b) {
            a = b[c];
            e.push(c + "=" + (ec.util.isArray(a) ? a.join(";") : a))
        }
        d = e.join("&")
    }
    ec.track99click._ozuid = ec.account.id;
    ec.track99click._ozprm = d
};



ecWap.pkg("ecWap.cmb");
ecWap.cmb.getQueryStringByName = function (b) {
    var a = window.location.search.match(new RegExp("[?&]" + b + "=([^&]+)", "i"));
    if (a == null || a.length < 1) {
        return ""
    }
    return a[1]
};
ecWap.canShowIcon = true;
ecWap.showIcon = function (a, b) {
    if (!ecWap.canShowIcon) {
        return
    }
    ecWap.canShowIcon = false;
    setTimeout(function () {
        var d = $(a).attr("id"), c = $("#" + d + "-icon");
        if ($(a).val()) {
            if (!c.hasClass("icon-clear")) {
                if (b) {
                    c.addClass("icon-clear").attr("onclick", "ecWap.clearContent(this," + b + ");")
                } else {
                    c.addClass("icon-clear").attr("onclick", "ecWap.clearContent(this);")
                }
            }
        } else {
            c.removeClass("icon-clear").removeAttr("onclick")
        }
        ecWap.canShowIcon = true
    }, 300)
};
ecWap.hideIcon = function (c, d) {
    var b = $(c).attr("id"), a = $("#" + b + "-icon");
    setTimeout(function () {
        a.removeClass("icon-clear").removeAttr("onclick");
        if (d) {
            d()
        }
    }, 200)
};
ecWap.clearContent = function (a, b) {
    $(a).removeClass("icon-clear").removeAttr("onclick").parent().siblings().find("input").val("").focus();
    if (b) {
        b()
    }
};
ecWap.cmb.getHashStr = function (b, c) {
    if (b.indexOf("#") == -1 || b.indexOf(c + "=") == -1) {
        return ""
    }
    var a = b.substring(b.indexOf("#") + 1);
    var k = a.split("#");
    for (var f = 0; f < k.length; f++) {
        var m = k[f];
        var l = m.split("&");
        var h, g, d;
        for (var e = 0; e < l.length; e++) {
            h = l[e].indexOf("=");
            if (h == -1) {
                continue
            }
            g = l[e].substring(0, h);
            d = l[e].substring(h + 1);
            if (g == c) {
                if (d.indexOf("?")) {
                    d = d.split("?")[0]
                }
                return unescape(d.replace(/\+/g, " "))
            }
        }
    }
    return ""
};
window._gaq = window._gaq || [];
_gaq.push(["_setAccount", (ecWap.debug ? "" : "UA-28046633-2"), "t1"]);
var _hmt = _hmt || [];
var _paq = _paq || [];
ecWap.code = {
    addShare: function (a) {
        a = $.extend({type: "tools", lazy: true}, a);
        document.write('<script type="text/javascript" id="bdshare_js" data="type=' + a.type + '&amp;uid=4505950" ><\/script>');
        document.write('<script type="text/javascript" id="bdshell_js"><\/script>');
        window.bds_config = {bdText: a.title};
        if (a.lazy) {
            ec.ready(function () {
                document.getElementById("bdshell_js").src = "https://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours()
            })
        } else {
            document.getElementById("bdshell_js").src = "https://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours()
        }
    }
};
$(function () {
    if (!/^\/product\/(ord-){0,1}[0-9]{1,}\.html/i.test(location.pathname)) {
        ecWap.account.getInfo(function () {

            console.log('test'+location.pathname);

        })
    }
    $("input[type=checkbox],input[type=radio]").click(function () {
        var c = this.className, i = this;
        this.className = c + " active";
        setTimeout(function () {
            i.className = i.className.replace(" active", "")
        }, 300)
    });
    var j = window.location.search, d = {};
    if (j) {
        var b;
        j = j.substring(1).split("&");
        for (var f = 0; f < j.length; f++) {
            b = j[f].split("=");
            if (b.length == 2) {
                d[b[0]] = b[1]
            }
        }
        switch (d.name) {
            case"loginError":
                log("loginError");
                break
        }
    }
    setTimeout(function () {
        $("#button-area-2").css("position", "fixed").show()
    }, 200);
    var e = false;
    $(window).bind("scroll", function () {
        if (!e) {
            $("#button-area-2").css("position", "fixed");
            e = true
        }
    });
});
