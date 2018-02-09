(function (b) {
    var c = addressDomain + "/data/region/tree/{id}.json?", d = addressDomain + "/data/region/children/{id}.json?",
        a = {
            regionId: "#myAddress-edit-region",
            defaultValue: 0,
            css: null,
            ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
            names: null,
            tips: null,
            type: "FourLevel",
            isReset: false,
            update: false,
            height: b(window).height() * 0.4,
            extendContent: "",
            callback: null
        };
    b.extend({
        regionSelect: function (e) {
            b.extend(a, e);
            addressAeraId = ["provinceVal", "cityVal", "districtVal", "streetVal"];
            _query = function (f, g) {
                f = f + "&_t=" + new Date().getTime() + "&callback=?";
                b.ajax({
                    url: f, type: "GET", dataType: "JSONP", error: function () {
                        ecWap.alert("\u5730\u5740\u67e5\u8be2\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01")
                    }, success: function (h) {
                        if (typeof g === "function") {
                            g(h)
                        }
                    }
                })
            };
            _parseUrl = function (f, g) {
                return f.replace(/{id}/g, g)
            };
            _renderSelect = function (n, i, m) {
                var g, f = "";
                var l = ["<p "], k;
                if (a.ids && n < a.ids.length && (k = a.ids[n])) {
                    l.push('id="' + k + '"')
                }
                l.push(" >\u8bf7\u9009\u62e9</p>");
                var o = b(l.join(""));
                l = [];
                l.push('<ul class="nimade" >');
                for (var h = 0; h < i.length; h++) {
                    g = i[h];
                    if (g.name == "-") {
                        l.push('<li class="ui-border-b"  value="' + g.id + '" id="' + g.id + '">\u5176\u5b83\u5730\u533a</li>')
                    } else {
                        l.push('<li class="ui-border-b"  value="' + g.id + '" id="' + g.id + '">' + ecWap.encodeScript(g.name) + "</li>")
                    }
                    if (g.id == m) {
                        f = g.name
                    }
                }
                l.push("</ul>");
                b(".ulFather").html(l.join(""));
                o.click(function () {
                    if (b(this).attr("value") != undefined) {
                        b(".ulFather").empty();
                        var j = parseInt(b(this).attr("name"));
                        var p = [];
                        for (var q = 0; q < 4; q++) {
                            if (q >= j) {
                                b("#" + a.ids[q].substring(0, a.ids[q].length - 3)).val("")
                            } else {
                                if (q == 1) {
                                    p.push(b("#" + a.ids[q]).text() + "\u5e02")
                                } else {
                                    p.push(b("#" + a.ids[q]).text())
                                }
                            }
                        }
                        if (j == 0) {
                            _reset()
                        } else {
                            _getChildren(j - 1, b(this).prev().attr("value"))
                        }
                        b("#addressSelect").val(p.join(" "))
                    }
                });
                b(".nimade li").each(function (j, p) {
                    b(this).click(function () {
                        var s = b(this);
                        var r = b(this).text();
                        b("#" + a.ids[n]).html(r).attr("value", b(this).val()).attr("name", n);
                        var q = (b("#cityVal").text()) ? b("#cityVal").text() + "\u5e02" : " ";
                        b("#addressSelect").val(b("#provinceVal").text() + " " + q + " " + b("#districtVal").text().replace("\u5176\u5b83\u5730\u533a", "-") + " " + b("#streetVal").text().replace("\u5176\u5b83\u5730\u533a", "-"));
                        if (typeof(a.callback) == "function") {
                            a.callback({
                                index: n,
                                addr: b("#provinceVal").text() + " " + q + " " + b("#districtVal").text().replace("\u5176\u5b83\u5730\u533a", "-") + " " + b("#streetVal").text().replace("\u5176\u5b83\u5730\u533a", "-"),
                                val: s.attr("value")
                            })
                        }
                        b.each(addressAeraId, function (u, w) {
                            var v = b("#" + w), t = b("#" + w.substring(0, w.length - 3));
                            if (typeof(v.attr("value")) == undefined) {
                                t.val("")
                            } else {
                                t.val(v.attr("value"))
                            }
                        });
                        if (a.type == "ThirdLevel" && n == 2) {
                            regionselectBox.close();
                            return false
                        }
                        _getChildren(n, b(this).attr("value"))
                    })
                });
                return [o, f]
            };
            _getChildren = function (f, h) {
                if (isNaN(f)) {
                    return
                }
                var g = parseInt(f) + 1;
                while (g < _selects.length) {
                    _selects[g].remove();
                    _selects.splice(g, 1)
                }
                if (!h) {
                    return
                }
                _query(_parseUrl(d, h), function (j) {
                    if (j.data.length == 0) {
                        regionselectBox.close();
                        return false
                    }
                    f = parseInt(f) + 1;
                    var i = _renderSelect(f, j.data, "")[0];
                    _selects.push(i);
                    _container.append(i);
                    regionselectBox.getBox().find(a.regionId).empty().append(_container);
                    b(".clearfix p").each(function () {
                        b(this).click(function () {
                            if (b(this).attr("value") != undefined) {
                                b(".ulFather").empty();
                                var k = parseInt(b(this).attr("name"));
                                var l = [];
                                for (var m = 0; m < 4; m++) {
                                    if (m >= k) {
                                        b("#" + a.ids[m].substring(0, a.ids[m].length - 3)).val("")
                                    } else {
                                        if (m == 1) {
                                            l.push(b("#" + a.ids[m]).text() + "\u5e02")
                                        } else {
                                            l.push(b("#" + a.ids[m]).text())
                                        }
                                    }
                                }
                                if (k == 0) {
                                    _reset()
                                } else {
                                    _getChildren(k - 1, b(this).prev().attr("value"))
                                }
                                b("#addressSelect").val(l.join(" "))
                            }
                        })
                    })
                })
            };
            _initForThirdLevel = function (f) {
                b("#province,#city,#district,#street").val("");
                var g = "";
                _selects = [];
                _container = b("<header class='clearfix ui-border-b'></header>");
                if (!f.isReset) {
                    regionselectBox = new ecWap.slideBox(f.extendContent + '<div class="form-select-area"><div id="myAddress-edit-region"></div><div class="ulFather"></div></div>', {
                        id: "regionselect",
                        className: "ecWap-box-slideUp",
                        title: "\u9009\u62e9\u5730\u533a",
                        height: f.height,
                        button: false,
                        contentStyle: {top: "10px", bottom: "10px"}
                    });
                    if (!f.update) {
                        regionselectBox.slideshow()
                    }
                }
                f.isReset = false;
                jq_selector = b(f.regionId);
                _query(_parseUrl(c, f.defaultValue), function (q) {
                    var n = [], h, l, o, p = [], k = "", j = true;
                    for (var m = 0; m < q.data.length; m++) {
                        if (q.values) {
                            var r = q.values[m]
                        } else {
                            var r = ""
                        }
                        r = _renderSelect(m, q.data[m], r);
                        o = r[0];
                        if (q.values && m < q.values.length) {
                            if (r[1] == "\u6682\u65f6\u4e0d\u9009") {
                                r[1] = "-"
                            }
                            if (r[1]) {
                                if (m == 1) {
                                    p.push(r[1] + "\u5e02");
                                    b(o).attr({
                                        value: q.values[m],
                                        name: m
                                    }).text(r[1].replace("-", "\u5176\u5b83\u5730\u533a"))
                                } else {
                                    p.push(r[1]);
                                    b(o).attr({
                                        value: q.values[m],
                                        name: m
                                    }).text(r[1].replace("-", "\u5176\u5b83\u5730\u533a"))
                                }
                            } else {
                                j = false
                            }
                            b("#" + o.attr("id").substring(0, o.attr("id").length - 3)).val(q.values[m])
                        }
                        _selects.push(o);
                        _container.append(o)
                    }
                    regionselectBox.getBox().find(f.regionId).empty().append(_container);
                    if (j) {
                        if (p.length == 2) {
                            if (b("#city").val()) {
                                _query(_parseUrl(d, b("#city").val()), function (s) {
                                    if (s.data.length > 0) {
                                        var i = _renderSelect(2, s.data, "")[0];
                                        _selects.push(i);
                                        _container.append(i)
                                    }
                                })
                            }
                        } else {
                            if (p.length == 1) {
                                if (b("#province").val()) {
                                    _query(_parseUrl(d, b("#province").val()), function (s) {
                                        if (s.data.length > 0) {
                                            var i = _renderSelect(1, s.data, "")[0];
                                            _selects.push(i);
                                            _container.append(i)
                                        }
                                    })
                                }
                            }
                        }
                    }
                    b("#addressSelect").val(p.join(" "))
                })
            };
            _initForFourLevel = function (f) {
                b("#province,#city,#district,#street").val("");
                var g = "";
                _selects = [];
                _container = b("<header class='clearfix ui-border-b'></header>");
                if (!f.isReset) {
                    regionselectBox = new ecWap.slideBox(f.extendContent + '<div class="form-select-area"><div id="myAddress-edit-region"></div><div class="ulFather"></div></div>', {
                        id: "regionselect",
                        className: "ecWap-box-slideUp",
                        title: "\u9009\u62e9\u5730\u533a",
                        button: false,
                        contentStyle: {top: "10px", bottom: "10px"}
                    });
                    if (!f.update) {
                        regionselectBox.slideshow()
                    }
                }
                f.isReset = false;
                jq_selector = b(f.regionId);
                _query(_parseUrl(c, f.defaultValue), function (q) {
                    var n = [], h, l, o, p = [], k = "", j = true;
                    for (var m = 0; m < q.data.length; m++) {
                        if (q.values) {
                            var r = q.values[m]
                        } else {
                            var r = ""
                        }
                        r = _renderSelect(m, q.data[m], r);
                        o = r[0];
                        if (q.values && m < q.values.length) {
                            if (r[1] == "\u6682\u65f6\u4e0d\u9009") {
                                r[1] = "-"
                            }
                            if (r[1]) {
                                if (m == 1) {
                                    p.push(r[1] + "\u5e02");
                                    b(o).attr({
                                        value: q.values[m],
                                        name: m
                                    }).text(r[1].replace("-", "\u5176\u5b83\u5730\u533a"))
                                } else {
                                    p.push(r[1]);
                                    b(o).attr({
                                        value: q.values[m],
                                        name: m
                                    }).text(r[1].replace("-", "\u5176\u5b83\u5730\u533a"))
                                }
                            } else {
                                j = false
                            }
                            b("#" + o.attr("id").substring(0, o.attr("id").length - 3)).val(q.values[m])
                        }
                        _selects.push(o);
                        _container.append(o)
                    }
                    regionselectBox.getBox().find(f.regionId).empty().append(_container);
                    if (j) {
                        if (p.length == 3) {
                            if (b("#needL4Addr").val() == "true" || b("#needL4Addr").val() == undefined || b("#needL4Addr").val() == "") {
                                if (b("#district").val()) {
                                    _query(_parseUrl(d, b("#district").val()), function (s) {
                                        if (s.data.length > 0) {
                                            var i = _renderSelect(3, s.data, "")[0];
                                            _selects.push(i);
                                            _container.append(i)
                                        }
                                    })
                                }
                            }
                        } else {
                            if (p.length == 2) {
                                if (b("#city").val()) {
                                    _query(_parseUrl(d, b("#city").val()), function (s) {
                                        if (s.data.length > 0) {
                                            var i = _renderSelect(2, s.data, "")[0];
                                            _selects.push(i);
                                            _container.append(i)
                                        }
                                    })
                                }
                            } else {
                                if (p.length == 1) {
                                    if (b("#province").val()) {
                                        _query(_parseUrl(d, b("#province").val()), function (s) {
                                            if (s.data.length > 0) {
                                                var i = _renderSelect(1, s.data, "")[0];
                                                _selects.push(i);
                                                _container.append(i)
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                    b("#addressSelect").val(p.join(" "))
                })
            };
            _initForDelivery = function (f) {
            };
            _reset = function () {
                a.isReset = true;
                a.defaultValue = 0;
                switch (a.type) {
                    case"ThirdLevel":
                        _initForThirdLevel(a);
                        break;
                    case"FourLevel":
                        _initForFourLevel(a);
                        break;
                    case"Delivery":
                        _initForDelivery(a);
                        break;
                    default:
                        break
                }
            };
            _setValue = function (g) {
                a.defaultValue = g;
                var f = this, h = "_initFor" + a.type;
                setTimeout(function () {
                    this[h]()
                }, 100)
            };
            switch (a.type) {
                case"ThirdLevel":
                    _initForThirdLevel(a);
                    break;
                case"FourLevel":
                    _initForFourLevel(a);
                    break;
                case"Delivery":
                    _initForDelivery(a);
                    break;
                default:
                    _initForFourLevel(a);
                    break
            }
            return this
        }
    })
})(jQuery);
