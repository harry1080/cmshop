ecWap.pkg("ecWap.prodDetial");


ecWap.prodDetial.timer = null;
ecWap.prodDetial.countAttr = 0;
ecWap.prodDetial.countNumber = 0;
ecWap.prodDetial.initialFinished = false;
ecWap.prodDetial.skuPointMap = {};
ecWap.prodDetial.giftIds = [];
ecWap.prodDetial.giftImgs = [];
ecWap.prodDetial.giftNames = [];
ecWap.prodDetial.couponDataMap = {};
ecWap.prodDetial.isFirstInit = true;
ecWap.prodDetial.giftDialog = null;
ecWap.prodDetial.couponDialog = null;
ecWap.prodDetial.serviceDialog = null;
ecWap.prodDetial.promotionDialog = null;
ecWap.prodDetial.giftHtml = "";
ecWap.prodDetial.giftListArea = "";
ecWap.prodDetial.isTriggerEvent = true;
ecWap.prodDetial.isTriggerFirst = true;


var _preSku = null,
    _skuMap = {},
    _skuShowType = {},
    _skuAttrId2SkuMap = {},
    _skuAttrTypeID = [],
    _skuAttrName = [],
    _skuAttrVallue = {},
    _skuAttrType2ValueIds = {},
    _selectAttrMap = {},
    _attrValue2SkuId = {},
    _type,
    _options = {},
    settimeoutcheck,
    _countSecs = 5,
    _countDown = null,
    _getSkuRushbuyInfoApi = false,


    _arrivalNoticeSend = false,
    _remindSaleSend = false;


ecWap.prodDetial.execute = function (e, c, b) {

    var d = _options[_type || "normal"],
        a = d[e] || _options["default"][e];
    // console.log(a);

    if (b) {
        ecWap.account.getInfo(function () {
            if (a) {

                a.apply(ecWap.prodDetial, c);


                //
                // ecWap.prodDetial.initSkuAttr();

                //注册事件
                ecWap.prodDetial.registerEvents();

                ecWap.prodDetial.selectBySku(ecWap.prodDetial.defaultSku);


                //SKU 是否留空
                // if (ecWap.prodDetial.isSkulistBlank) {
                //     var f = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
                //     ecWap.prodDetial.updateSkuAreaImg(f);
                //     ecWap.prodDetial.updateSwiper(f);
                //     ecWap.prodDetial.initGifts();
                //     ecWap.prodDetial.updateSkuResultArea();
                //     ecWap.prodDetial.registerEvents();
                //     ecWap.prodDetial.queryCouponData(f);
                //     ecWap.prodDetial.updatePromotion(f);
                //     ecWap.prodDetial.updateServiceBox(f)
                // }


            }
        })
    } else {
        if (a) {
            a.apply(ecWap.prodDetial, c)
        }
    }
};
_options["default"] = {};
_options.normal = {

    //渲染清单
    renderInventory: function (e) {
        var g = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
            c = $("#pro-price"),
            d = $("#pro-operation"),
            a = ecWap.account.isPriorityBuy,
            b = ecWap.account.prioritySkuId,
            h = ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku,
            f = "";


        if (!ecWap.prodDetial.initialFinished) {
            ecWap.prodDetial.countNumber += 1
        }

        if (ecWap.prodDetial.timer) {
            clearInterval(ecWap.prodDetial.timer);
            ecWap.prodDetial.timer = null;

            // 底部倒计时显示区域
            $("#mainCountdownArea").hide()
        }


        //
        if (ecWap.prodDetial.status == 3) {
            c.html("该商品已下架");

            ecWap.prodDetial.showDeliAddress();
            return false
        }


        ecWap.prodDetial.updatePriceInfo(g);


        //初始化产品标题
        $("#pro-name").text(g.name);


        //
        $("#quantity").attr({readonly: "readonly"}).val(1);
        if (g.groupType == 1) {
            d.html("");
            ecWap.prodDetial.showDeliAddress();
            return false
        }
        if (h == b && a == "1") {
            $(".pro-property-shoppingCart").hide();
            f = '<section class="pro-property-action-area"><article class="pro-property-action  pro-property-action-0"><a id="prdDetailBuyNow" href="javascript:;" class="button-style-1-big" onclick="_hmt.push([\'_trackEvent\', \'click btn1|skuid\', \'click\', \'记录【立即下单】按钮的点击次数\']);ecWap.prodDetial.buyNow()"><span>立即下单</span></a></article></section>';
            d.html(f);
            $("#quantity").val("1");
            $("#quantity").attr("readOnly", "readOnly");
            $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
            $("#product-addNum").removeClass("minus-disabled").addClass("minus-disabled");
            ecWap.prodDetial.showDeliAddress();
            return false
        } else {
            $("#quantity").val("1");
            $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
            $("#product-addNum").removeClass("minus-disabled")
        }
        $(".pro-property-shoppingCart").show();
        ecWap.prodDetial.buttonsRender(parseInt(g.buttonMode, 10));
        ecWap.prodDetial.showDeliAddress();
        if (ecWap.prodDetial.isSkulistBlank && ecWap.prodDetial.countNumber == 1) {
            ecWap.prodDetial.chooseAddress();
            ecWap.prodDetial.warrantyInit(g.extWarranty, g.accWarranty)
        }
    }
};


ecWap.prodDetial.initSkuAttr = function () {
    _preSku = ecWap.prodDetial.defaultSku;
    var e = "", a, h, b, g;
    for (var d = 0; d < _skuAttrName.length; d++) {
        a = _skuAttrTypeID[d];
        h = _skuAttrName[d];
        var k = _skuAttrVallue[h], f = "";
        e += '<dl class="clearfix"><dt><label>' + h + "</label></dt><dd>";
        for (var c = 0; c < k.length; c++) {
            b = _skuAttrType2ValueIds[a + "-" + k[c]];
            f += '<a href="javascript:;" class="j_skuItem attr' + b.join(" attr") + '" data-attrName="' + h + '" data-attrId="' + b.join(",") + '" data-skuId="' + _attrValue2SkuId[k[c]].join(",") + '"><span>' + k[c] + "</span></a>"
        }
        e += f + "</dd></dl>"
    }
    var l = $(e);
    $("#skuList").append(l)
};


//寻找disableed SKU 属性
ecWap.prodDetial.searchDisabledSkuAttr = function (c, e) {
    var f = e.attr("data-skuId"), a = false;
    for (var b = 0, d = c.length; b < d; b++) {
        if (f.indexOf(c[b] + "") > -1) {
            a = true;
            break
        }
    }
    return a
};


//判断SKU单价是否可用
ecWap.prodDetial.judgeSkuAttrClickable = function (b) {
    var d = [], a = true, c = null;
    $.each(b.find("a.selected"), function () {
        var l = $(this), g = l.text(), h = l.closest("dl").next().find("a");
        if (a) {
            d = _attrValue2SkuId[g];
            $.each(h, function () {
                var i = $(this);
                if (!ecWap.prodDetial.searchDisabledSkuAttr(d, i)) {
                    i.addClass("disabled").removeClass("selected")
                } else {
                    i.removeClass("disabled")
                }
            });
            a = false;
            return
        }
        var k = [], m = _attrValue2SkuId[g];
        for (var f = 0; f < d.length; f++) {
            for (var e = 0; e < m.length; e++) {
                if (d[f] == m[e]) {
                    k.push(d[f])
                }
            }
        }
        d = k;
        if (d.length != 1) {
            if (d.length > 1) {
                $.each(h, function () {
                    var i = $(this);
                    if (!ecWap.prodDetial.searchDisabledSkuAttr(d, i)) {
                        i.addClass("disabled").removeClass("selected")
                    } else {
                        i.removeClass("disabled")
                    }
                })
            }
        } else {
            $.each(h, function () {
                var i = $(this);
                if (!ecWap.prodDetial.searchDisabledSkuAttr(d, i)) {
                    i.addClass("disabled").removeClass("selected")
                } else {
                    i.removeClass("disabled")
                }
            })
        }
    })
};


//单击更新SKU
ecWap.prodDetial.clickToUpdateSku = function (c) {
    var b = null, a = true;
    $.each(c.find("dd"), function () {
        var f = $(this);
        if (f.find(".j_skuItem.selected").length != 1) {
            b = f.find(".j_skuItem").not(f.find(".j_skuItem.disabled")).first();
            if (b.length >= 1) {
                a = false;
                return false
            }
        }
    });
    if (a) {
        var e = $("#skuWeight,.j_skuWeight");
        if (e.length > 0) {
            var d = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku());
            if (d && ecWap.prodDetial.skuPointMap[d.code]) {
                e.removeClass("hide");
                e.html(ecWap.prodDetial.skuPointMap[d.code])
            } else {
                e.addClass("hide")
            }
        }
        ecWap.prodDetial.updateSkuInfo()
    } else {
        if (b) {
            $(b).trigger("click")
        }
    }
};


//初始化配件信息
ecWap.prodDetial.initGifts = function () {
    ecWap.prodDetial.giftIds = [];
    var f = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
    if (!f.giftList || f.giftList.length == 0) {
        $("#gif-prd-area,.j_gif-prd-areawrap").hide();
        $("#giftSkuIds").val("")
    } else {
        if (f.giftList.length > 0) {
            $("#gif-prd-area,.j_gif-prd-areawrap").show();
            var e = f.giftList,
                h = '<th><label>配</label></th><td><div class="match-product"><ul class="clearfix">',
                k = '<table border="0" class="t-product"><tr><th><label>配</label></th><td><ul class="clearfix">',
                g = [], d = "",
                a = '<div class="pro-meta-sku-content pro-meta-sku-choice"><dl class="clearfix"><dt><label>选择</label></dt><dd>';
            for (var c = 0; c < e.length; c++) {
                d += '<div class="choice-product"><ul><li class="clearfix"><p class="p-img" onclick=location.href="/product/' + e[c][0].giftId + ".html#" + e[c][0].giftSkuId + '"><img class="j_giftImgBig" src="' + mediaPath + e[c][0].photoPath + e[c][0].photoName + '"></p><p class="p-name"  onclick=location.href="/product/' + e[c][0].giftId + ".html#" + e[c][0].giftSkuId + '"><span>' + e[c][0].giftName + "</span></p>";
                d += '<p class="p-model">';
                for (var b = 0; b < e[c].length; b++) {
                    if (b == 0) {
                        if (c < 12) {
                            h += '<li><a href=javascript:void(0);><img class="j_giftImg" src="' + mediaPath + e[c][b].photoPath + e[c][b].photoName + '" alt="' + e[c][b].photoName + '" onerror="this.src=\'https://res.vmallres.com/nwap/activity/honor/images/mask.png\'"/></a></li>'
                        }
                        if (c < 14) {
                            k += '<li><a href=javascript:void(0);><img class="j_giftImg" src="' + mediaPath + e[c][b].photoPath + e[c][b].photoName + '" alt="' + e[c][b].photoName + '" onerror="this.src=\'https://res.vmallres.com/nwap/activity/honor/images/mask.png\'"/></a></li>'
                        }
                        if (ecWap.prodDetial.giftIds.length == 0) {
                            g.push(e[c][b].giftSkuId)
                        }
                    }
                    d += '<a href="javascript:;" class="j_checkbox checkbox-text" data-gftid="' + e[c][b].giftId + '" data-skuid="' + e[c][b].giftSkuId + '" data-giftname="' + e[c][b].giftName + '" data-purl="' + mediaPath + e[c][b].photoPath + e[c][b].photoName + '"><span>' + e[c][b].giftColor + "</span></a>"
                }
                d += "</p></li></ul></div>"
            }
            a += d;
            a += "</dd></dl></div>";
            h += '</div><a href="javascript:void(0);" class="btn-next">选择<i class="icon-more-right"></i></a></td>';
            k += "</ul></td></tr></table>";
            ecWap.prodDetial.giftIds = g;
            g = [g.join("-")];
            if ($("#selectExtWarrantyId").val() != "") {
                g.push("")
            }
            if ($("#selectAccWarrantyId").val() != "") {
                g.push("")
            }
            $("#giftSkuIds").val(g.join(","));
            $("#gif-prd-area").html(h);
            ecWap.prodDetial.giftHtmlForSkuDialog = a;
            ecWap.prodDetial.giftListAreaForSkuDialog = k;
            ecWap.prodDetial.giftDialog = new ecWap.slideBox(d, {
                id: "lower",
                className: "ecWap-box-em ecWap-box-lower hide",
                ishtml: true,
                title: "选择",
                height: $(window).height() * 0.7,
                position: "bottom",
                ok_txt: "确认",
                onok: function (i) {
                    ecWap.prodDetial.updateGiftShowArea(ecWap.prodDetial.giftDialog.getBox());
                    i.close()
                },
                close: function (i) {
                    ecWap.prodDetial.updateGiftShowArea(ecWap.prodDetial.giftDialog.getBox());
                    i.close()
                }
            });
            $.each(ecWap.prodDetial.giftDialog.getBox().find(".j_checkbox"), function (j, l) {
                if (ecWap.prodDetial.giftIds.indexOf($(l).attr("data-skuid")) != -1) {
                    $(l).addClass("checkbox-text-checked");
                    $(l).parents("li:first").find(".p-img img").attr("src", $(l).attr("data-purl"));
                    $(l).parents("li:first").find(".p-img").attr("onclick", 'location.href="/product/' + $(l).attr("data-gftid") + ".html#" + $(l).attr("data-skuid") + '"');
                    $(l).parents("li:first").find(".p-name span").text($(l).attr("data-giftname"));
                    $(l).parents("li:first").find(".p-name").attr("onclick", 'location.href="/product/' + $(l).attr("data-gftid") + ".html#" + $(l).attr("data-skuid") + '"')
                }
            });
            $("#gif-prd-area").off("click").on("click", function () {
                _paq.push(["trackLink", "wap-pdp-gifts-click_event", "link", ""]);
                $(".j_addCartbtn,.j_buynowBtn").show();
                ecWap.prodDetial.giftDialog.slideshow()
            });
            ecWap.prodDetial.giftDialog.getBox().find(".j_checkbox").off("click").on("click", function () {
                ecWap.prodDetial.checkGiftItem($(this))
            })
        }
    }
};

//检查配件
ecWap.prodDetial.checkGiftItem = function (a) {
    a.parents(".p-model").find("a").removeClass("checkbox-text-checked");
    a.addClass("checkbox-text-checked");
    a.parents("li:first").find(".p-img img").attr("src", a.attr("data-purl"));
    a.parents("li:first").find(".p-name span").text(a.attr("data-giftname"));
    a.parents("li:first").find(".p-img").attr("onclick", 'location.href="/product/' + a.attr("data-gftid") + ".html#" + a.attr("data-skuid") + '"');
    a.parents("li:first").find(".p-name").attr("onclick", 'location.href="/product/' + a.attr("data-gftid") + ".html#" + a.attr("data-skuid") + '"')
};


//更新配件信息
ecWap.prodDetial.updateGiftShowArea = function (a) {
    var d = [];
    var b = [];
    var c = [];
    $.each(a.find(".j_checkbox.checkbox-text-checked"), function (e, f) {
        d.push($(f).attr("data-skuid"));
        b.push($(f).attr("data-purl"))
    });
    ecWap.prodDetial.giftIds = d;
    ecWap.prodDetial.giftImgs = b;
    d = [d.join("-")];
    $("#giftSkuIds").val(d);
    $.each($("#gif-prd-area").find(".j_giftImg"), function (e, f) {
        $(f).attr("src", ecWap.prodDetial.giftImgs[e])
    })
};


//注册事件
//监听事件
ecWap.prodDetial.registerEvents = function () {

    console.log('registerEvents start');
    $("#currentSku,.j_showSkuBtn").off("click").on("click", function () {
        $(".j_addCartbtn").addClass("button-style-4-big").removeClass("button-style-1-big");
        $(".j_addCartbtn,.j_buynowBtn").show()
    });
    $("#skuList").find(".j_skuItem").off("click").on("click", function (g) {
        var f = $(this), d = $("#skuList").children(), h = f.attr("data-attrId").split(","),
            c = f.attr("data-attrName"), a = [];
        if (f.hasClass("disabled")) {
            return false
        }
        if (g.pageX || g.clientX || g.screenX) {
            ecWap.prodDetial.isTriggerEvent = false
        }
        if (!f.hasClass("selected")) {
            ecWap.prodDetial.enableNumArea()
        }
        for (var b = 0; b < h.length; b++) {
            a.push(_skuAttrId2SkuMap[h[b]])
        }
        _selectAttrMap[c] = a;
        f.addClass("selected").siblings().removeClass("selected");
        ecWap.prodDetial.judgeSkuAttrClickable(d);
        $("#easybuy").hide();


        ecWap.prodDetial.clickToUpdateSku(d);
        if (ecWap.prodDetial.isFromWechat == true) {
            ecWap.wechatshare.ready()
        }
    });
    $("#getCoupon").off("click").on("click", function () {
        _paq.push(["trackLink", "wap-pdp-coupon-click_event", "link", ""]);
        ecWap.prodDetial.couponDialog.slideshow()
    });

    //优惠券信息
    $("#getService").off("click").on("click", function () {
        _paq.push(["trackLink", "wap-pdp-service-click_event", "link", ""]);
        ecWap.prodDetial.serviceDialog.slideshow()
    });


    //提示信息
    $("#getPromotion").off("click").on("click", function () {

        console.log('提示信息click');
        _paq.push(["trackLink", "wap-pdp-tips-click_event", "link", ""]);
        ecWap.prodDetial.promotionDialog.slideshow()
    })
};

//查询优惠券信息
ecWap.prodDetial.queryCouponData = function (b) {
    if ((ecWap.prodDetial.countNumber == ecWap.prodDetial.countAttr || ecWap.prodDetial.isSkulistBlank) && ecWap.prodDetial.isFirstInit) {
        ecWap.prodDetial.isFirstInit = false;
        var a = {};
        a.isFilterRepeat = 0;
        a.isReturnDiscount = 1;
        a.sbom = ecWap.prodDetial.skuCodeArray;
        $.ajax({
            url: amsDomain + "/couponCodeActivity/queryCouponBySboms.json?queryCouponBySbomReqJson=" + encodeURIComponent(JSON.stringify(a)),
            type: "get",
            dataType: "jsonp",
            timeout: 3000,
            jsonpCallback: "flightHandler1",
            success: function (d) {
                if (d.success && d.couponCodeData && d.couponCodeData.length > 0) {
                    for (var e = 0; e < d.couponCodeData.length; e++) {
                        d.couponCodeData[e].beginDate = new Date(d.couponCodeData[e].beginDate).format("yyyy.MM.dd");
                        d.couponCodeData[e].endDate = new Date(d.couponCodeData[e].endDate).format("yyyy.MM.dd")
                    }
                    for (var e = 0; e < ecWap.prodDetial.skuCodeArray.length; e++) {
                        var c = [];
                        $.each(d.couponCodeData, function (f, g) {
                            if (ecWap.prodDetial.skuCodeArray[e] == g.sbomCode) {
                                c.push(g)
                            }
                        });
                        ecWap.prodDetial.couponDataMap[ecWap.prodDetial.skuCodeArray[e]] = c
                    }
                    ecWap.prodDetial.updateCoupons(b)
                }
            }
        })
    } else {
        ecWap.prodDetial.updateCoupons(b)
    }
};
ecWap.prodDetial.updateSkuAreaImg = function (a) {
    if (ecWap.prodDetial.bigImgList.length > 0) {
        $(".j_skuImgShow").attr("src", ecWap.prodDetial.bigImgList[0])
    } else {
        if (a.imgName.length > 0) {
            $(".j_skuImgShow").attr("src", mediaPath + a.imgName[0].path + "/800_800_" + a.imgName[0].name)
        }
    }
};
ecWap.prodDetial.updateSkuResultArea = function () {
    var c = $(".j_skuResult"), a = $(".j_currentSkuInfo"), f = $(".j_currentSkuInfo2"), e = "", b = "",
        g = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
    ecWap.prodDetial.updateSkuAreaImg(g);
    if ($(".j_skuItem.selected").length > 0) {
        $(".j_skuItem.selected").each(function (h, j) {
            e += $(this).html() + " ";
            b += $(this).html() + ", "
        })
    }
    if ($(".j_bundlerBtn.selected").length > 0) {
        e += $(".j_bundlerBtn.selected").html() + " ";
        b += $(".j_bundlerBtn.selected").html() + " "
    }
    c.html(e);
    var d = b.indexOf(",") > 0 ? b.substring(0, b.length - 2) : b;
    a.html(d);
    f.html(e);
    if ($(".j_currSkuInfowrap p").outerHeight() > $(".j_currSkuInfowrap").outerHeight()) {
        $(".j_currSkuInfowrap").addClass("p-long").css("padding-right", $(".j_currSkuInfowrap").find("em").outerWidth())
    } else {
        $(".j_currSkuInfowrap").removeClass("p-long").attr("style", "")
    }
};


//刷新 底部已选显示区域-
ecWap.prodDetial.updateSkuAmtArea = function () {
    $(".j_skuItemAmt").html($("#quantity").val())
};


//刷新 SKU 信息
ecWap.prodDetial.updateSkuInfo = function () {
    var a = ecWap.prodDetial.getSku();
    if (!a) {
        return
    }
    if (_preSku != a || ecWap.prodDetial.countNumber == 1) {

        //保险保险
        ecWap.prodDetial.warrantyInit(_skuMap[a].extWarranty, _skuMap[a].accWarranty)
    }

    _preSku = a;
    sku = _skuMap[a];


    //刷新 SKU 价格信息
    ecWap.prodDetial.updatePriceInfo(sku);


    //更新input-number-box
    $("#quantity").attr({"data-price": sku.price, "data-inventory": sku.inventory, readonly: "readonly"}).val(1);
    $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
    $("#product-addNum").removeClass("minus-disabled");


    $("#specification-sku-" + sku.id).parent().find(".specification-sku").hide();
    $("#specification-sku-" + sku.id).show();


    //更新产品标题名称
    $("#pro-name").text(sku.name);

    ecWap.prodDetial.skuPromWordRender(sku);

    //底部倒计时显示区域
    $("#mainCountdownArea").hide();

    //底部已选显示区域隐藏
    $("#skuResultBottom").hide();

    //刷新 底部已选显示区域-
    ecWap.prodDetial.updateSkuAmtArea();

    //初始化赠品
    ecWap.prodDetial.initGifts();

    //
    ecWap.prodDetial.execute("renderInventory", [true]);


    ecWap.prodDetial.updateSwiper(sku);
    ecWap.prodDetial.queryCouponData(sku);
    ecWap.prodDetial.updateServiceBox(sku);
    ecWap.prodDetial.warrantyInit(sku.extWarranty, sku.accWarranty);
    ecWap.prodDetial.updatePromotion(sku);

    //渲染套餐
    ecWap.prodDetial.bundlerListRender(sku.bundlerList);
    ecWap.prodDetial.updateSkuResultArea()
};


//更新产品副标题里面的促销信息
ecWap.prodDetial.skuPromWordRender = function (c) {
    if ($.trim(c.skuPromWord).length == 0 && $.trim(c.timerPromWord).length == 0) {
        $(".j_promotionBox").hide()
    } else {
        var a = $(".j_pageskuPromWord,.j_skuPromWord");
        a.html("").hide();
        if ($.trim(c.skuPromWord).length > 0) {
            a.html(c.skuPromWord).show()
        } else {
            a.html("").hide()
        }
        var b = $(".j_pagetimerPromWord,.j_timerPromWord");
        b.text("").hide();
        if ($.trim(c.timerPromWord).length > 0) {
            b.removeClass("red");
            if (Date.parse(c.timerPromStarttime) <= Date.now() && Date.now() <= Date.parse(c.timerPromEndtime)) {
                if ($.trim(c.timerPromLink4Wap).length > 0) {
                    if (b.find("a").length == 0) {
                        b.text("").append('<a href="' + c.timerPromLink4Wap + '"><span>' + c.timerPromWord + "</span></a>")
                    } else {
                        b.find("a").attr("href", c.timerPromLink4Wap).html("<span>" + c.timerPromWord + "</span>")
                    }
                    b.find("a").off("click").on("click", function (d) {
                        d.stopPropagation()
                    })
                } else {
                    b.addClass("red").find("a").remove();
                    b.text(c.timerPromWord)
                }
                b.show()
            } else {
                b.text("").hide()
            }
        } else {
            b.text("").hide()
        }

        //更多
        ecWap.prodDetial.promoMorebtnUpdate(c)
    }
};


//更新价格信息
ecWap.prodDetial.updatePriceInfo = function (e) {
    if (e) {
        var f = ecWap.prodDetial.formatPrice(e.price), h = ecWap.prodDetial.formatPrice(e.skuPrice),
            a = $("#pro-deposit,.j_pro-deposit"), b = $("#pro-rushbuy,.j_pro-rushbuy"), i = $(".j_pro-bundler"),
            g = $("#pro-price-type,.j_pro-price-type"), d = $("#pro-prime-price,.j_pro-prime-price"),
            c = $("#pro-price,.j_pro-price");
        if (e.isDepositProduct == "1") {
            a.show();
            b.hide();
            i.hide();
            g.html("");
            d.html("");
            c.html("<small>&yen;</small> " + ecWap.prodDetial.formatPrice(e.depositPrice))
        } else {
            a.hide();
            b.hide();
            i.hide();
            if (e.isProm) {
                g.html("抢购价:");
                b.attr("style", "display:inline-block;")
            } else {
                if (e.groupType == 1) {
                    g.html("团购价:")
                } else {
                    g.html("")
                }
            }

            console.log('e:' + e.priceMode);

            if (e.priceMode == 2 || !f || f <= 0) {

                console.log('esafdas:' + e.priceMode);

                c.html("<small>暂无报价</small>");
                a.hide();
                b.hide();
                d.html("")
            } else {
                console.log('e:' + e.priceMode);
                if ((e.isProm || e.groupType == 1) && (f > h)) {
                    c.html("<small>&yen;</small> " + h);
                    d.html("&yen; " + f)
                } else {
                    c.html("<small>&yen;</small> " + f);
                    d.html("")
                }
            }
        }
    }
};
ecWap.prodDetial.formatPrice = function (c) {
    c = c + "";
    var a = c.indexOf(".");
    if (a > 0) {
        var b = c.substring(a);
        if (b == "00") {
            return parseInt(c.substring(0, a), 10)
        } else {
            return parseFloat(c).toFixed(2)
        }
    } else {
        return parseInt(c, 10)
    }
};
ecWap.prodDetial.promotionListRender = function (c) {
    var b = [];
    if (!c.promotionLst || c.promotionLst.length == 0 || c.promotionLst[0].ruleDescription == "") {
        $("#pro-promotions-area").hide()
    } else {
        $("#pro-promotions-area").show();
        for (var a = 0; a < c.promotionLst.length; a++) {
            if (c.promotionLst[a].isRealNameAuth == "1") {
                b.push('<div class="match-condition clearfix">');
                b.push("<p>" + c.promotionLst[a].ruleDescription + "</p>");
                b.push('<a href="/member/point?is3nd=1">限实名用户参与</a>')
            } else {
                b.push('<div class="clearfix">');
                b.push("<p>" + c.promotionLst[a].ruleDescription + "</p>")
            }
            b.push("</div>")
        }
        $("#orderPromotion").html(b.join(""))
    }
};
ecWap.prodDetial.bundlerListRender = function (b) {
    if (b.length > 0) {
        var d = "", e = "";
        for (var c = 0; c < b.length; c++) {
            d += '<a href="javascript:;" class="j_bundlerBtn" onclick="ecWap.prodDetial.showBundleArea(event,' + (c + 1) + "," + b[c].id + ',this);" ><span>套餐' + (c + 1) + "</span></a>";
            e += '<section class="sc-pro-area order-suit hide" id="bundler_area_' + (c + 1) + '">';
            e += '<div class="pro-suit"><ul>';
            var f = b[c].productList;
            for (var a = 0; a < f.length; a++) {
                e += '<li class="sc-pro-item">';
                e += '<div class="pro-panels">';
                e += '<p class="p-img"><span><img src="' + mediaPath + f[a].photoPath + f[a].photoName + '" alt="' + f[a].skuName + '" /></span></p>';
                e += '<p class="p-name"><span>' + f[a].skuName + "</span></p>";
                e += '<p class="p-price"><em>&yen;&nbsp;' + ecWap.prodDetial.formatPrice(f[a].price) + "</em></p>";
                e += "</div>";
                e += "</li>"
            }
            e += "</ul></div>";
            e += '<div class="clearfix">';
            e += '  <div class="pro-suit-cost-price">';
            e += '     <p class="save"><b class="red">';
            e += '       现价：&yen;&nbsp;<span class="j_bunderPrice">' + ecWap.prodDetial.formatPrice(b[c].salePrice) + "</span></b></p>";
            e += '    <p class="save"><del> &yen;&nbsp;' + ecWap.prodDetial.formatPrice(b[c].originalPrice) + "</del></p>";
            e += '    <p class="save"><b>（购买套餐立省' + (ecWap.prodDetial.formatPrice(b[c].originalPrice - b[c].salePrice)) + "元）</b></p>";
            e += "   </div>";
            e += " </div>";
            e += "</section>"
        }
        d += '<a href="javascript:;" class="j_bundlerBtn j_singleBtn"  onclick="ecWap.prodDetial.showBundleArea(event,-1,\'\',this);"><span>单品</span></a>';
        $("#bundlerList").html(d);
        $("#bundlerListArea").html(e).show();
        $("#bundlerList-section").show();
        if (ecWap.prodDetial.countNumber == ecWap.prodDetial.countAttr || ecWap.prodDetial.isSkulistBlank) {
            $("#bundlerList .j_singleBtn").trigger("click")
        }
    } else {
        $("#bundlerList").html("");
        $("#bundlerListArea").html("").hide();
        $("#bundlerList-section").hide();
        $("#selectbundleid").val("");
        $("#bundleId").val("")
    }
};


//更新优惠券
ecWap.prodDetial.updateCoupons = function (b) {
    if (ecWap.prodDetial.couponDataMap[b.code] && ecWap.prodDetial.couponDataMap[b.code].length > 0) {
        $("#getCoupon").show();
        var a = ecWap.prodDetial.getCouponHtml(ecWap.prodDetial.couponDataMap[b.code]);
        ecWap.prodDetial.couponDialog = new ecWap.slideBox(a, {
            id: "couponMainBox",
            className: "ecWap-box-em ecWap-box-lower",
            ishtml: true,
            title: "领券",
            height: $(window).height() * 0.6,
            position: "bottom",
            ok_txt: "完成",
            onok: function (c) {
                c.close()
            }
        });
        ecWap.prodDetial.couponDialog.getBox().find(".j_getCouponBtn").on("click", function () {
            ecWap.prodDetial.couponAction.forbidRepeatClick(true, ecWap.prodDetial.couponDialog.getBox().find(".j_getCouponBtn"));
            ecWap.prodDetial.couponAction.getCoupon($(this), $(this).attr("activityCode"), $(this).attr("batchCode"))
        });
        $("#getCoupon").show()
    } else {
        $("#getCoupon").hide()
    }
};
ecWap.prodDetial.updateServiceBox = function (f) {
    if (f.skuServiceInfo && f.skuServiceInfo.length > 0) {
        var e = '<div class="service-cont"><ul>';
        var c = "";
        for (var d = 0, b = f.skuServiceInfo.length; d < b; d++) {
            var a = f.skuServiceInfo[d];
            e += '<li><p class="p-service-name clearfix"><span>' + a.title + '</span></p><p class="p-service-intro">' + a.content + "</p></li>";
            c += "<span>" + a.title + "</span>"
        }
        e += "</ul></div>";
        $(".j_pservice").html(c);
        ecWap.prodDetial.serviceDialog = new ecWap.slideBox(e, {
            id: "serviceMainBox",
            className: "ecWap-box-em ecWap-box-lower",
            ishtml: true,
            title: "服务",
            height: $(window).height() * 0.6,
            position: "bottom",
            ok_txt: "关闭",
            onok: function (g) {
                g.close()
            }
        })
    } else {
        $("#getService").hide()
    }
};

//更新提示信息
ecWap.prodDetial.updatePromotion = function (f) {
    if (f.skuPromoInfo && f.skuPromoInfo.length > 0) {
        var e = '<div class="discount-cont"><ul>';
        var c = "";
        for (var d = 0, b = f.skuPromoInfo.length; d < b; d++) {
            var a = f.skuPromoInfo[d];
            e += '<li><i class="icon-discount"></i><p class="p-discount-name">' + a.title + '</p><p class="p-discount-intro">' + a.content + "</p></li>";
            if (d < 4) {
                c += "<span>" + a.title + "</span>"
            }
        }
        e += "</ul></div>";
        $(".j_pdiscount").html(c + '<i class="icon-more-right"></i>');
        ecWap.prodDetial.promotionDialog = new ecWap.slideBox(e, {
            id: "promotionMainBox",
            className: "ecWap-box-em ecWap-box-lower",
            ishtml: true,
            title: "促销",
            height: $(window).height() * 0.6,
            position: "bottom",
            ok_txt: "关闭",
            onok: function (g) {
                g.close()
            }
        })
    } else {
        $("#getPromotion").hide()
    }
};
ecWap.prodDetial.promoMorebtnUpdate = function (c) {
    var b = $(".j_promotionBox");
    b.attr("style", "");
    var a = $(".j_promoHeight").height();
    b.find(".j_iconmore").addClass("icon-more-bottom").removeClass("icon-more-top");
    if (a - b.outerHeight() > 5) {
        b.addClass("p-promotion-more");
        b.find(".j_iconmore").show()
    } else {
        b.removeClass("p-promotion-more");
        b.find(".j_iconmore").hide()
    }
    if ($.trim(c.timerPromWord).length > 0 && Date.parse(c.timerPromStarttime) <= Date.now() && Date.now() <= Date.parse(c.timerPromEndtime) && $.trim(c.timerPromLink4Wap).length > 0) {
        b.off("click").on("click", function () {
            location.href = $.trim(c.timerPromLink4Wap)
        });
        if (a - b.outerHeight() > 5) {
            ecWap.prodDetial.promExpandEventRegister(b.find(".j_iconmore"), b)
        } else {
            b.find(".j_iconmore").off("click")
        }
    } else {
        if (a - b.outerHeight() > 5) {
            ecWap.prodDetial.promExpandEventRegister(b, b)
        } else {
            b.off("click")
        }
    }
};
ecWap.prodDetial.promExpandEventRegister = function (b, a) {
    b.off("click").on("click", function (c) {
        c.stopPropagation();
        var d = a;
        if (d.find(".j_iconmore").hasClass("icon-more-bottom")) {
            d.find(".j_iconmore").removeClass("icon-more-bottom").addClass("icon-more-top");
            d.css({display: "block", "max-height": "none"})
        } else {
            d.find(".j_iconmore").addClass("icon-more-bottom").removeClass("icon-more-top");
            d.attr("style", "")
        }
        _paq.push(["trackLink", "wap-pdp-promotion-click_event", "link", ""])
    })
};

//a,产品id；d,sku属性类型；b属性名称；e
ecWap.prodDetial.addSkuAttr = function (a, d, b, e, f) {
    var h = _skuMap[a];
    if (!h) {
        _skuMap[a] = {attrIds: [e]}
    } else {
        h.attrIds.push(e)
    }
    _skuAttrId2SkuMap[e] = a;
    var g = _skuAttrVallue[b];
    if (!g) {
        _skuAttrName.push(b);
        _skuAttrTypeID.push(d);
        _skuAttrVallue[b] = [f]
    } else {
        if (g.indexOf(f) == -1) {
            g.push(f)
        }
    }
    ecWap.prodDetial.countAttr = _skuAttrName.length + 1;
    var c = _skuAttrType2ValueIds[d + "-" + f];
    if (!c) {
        _skuAttrType2ValueIds[d + "-" + f] = [e]
    } else {
        c.push(e)
    }
    if (!_attrValue2SkuId[f]) {
        _attrValue2SkuId[f] = []
    }
    _attrValue2SkuId[f].push(a)
};
ecWap.prodDetial.setSku = function (a, b) {
    b = b || {};
    b.id = a;
    $.extend((_skuMap[a] || (_skuMap[a] = {})), b)
};
ecWap.prodDetial.getSku = function () {
    var a;
    $.each(_selectAttrMap, function () {
        if (!a) {
            a = this;
            return
        }
        var e = this, d = [];
        for (var c = 0; c < a.length; c++) {
            for (var b = 0; b < e.length; b++) {
                if (a[c] == e[b]) {
                    d.push(a[c])
                }
            }
        }
        a = d
    });
    if (!a || a.length == 0 || a.length > 1) {
        return _preSku
    }
    return a[0]
};
ecWap.prodDetial.getSkuInfo = function (a) {
    return _skuMap[a]
};
ecWap.prodDetial.setSkuShowType = function (a, b) {
    _skuShowType[a] = b
};
ecWap.prodDetial.selectBySku = function (a) {
    var b = _skuMap[a];
    if (!b || !b.attrIds) {
        return
    }
    $("#skuList dl").find(".attr" + b.attrIds.join(",.attr")).trigger("click")
};


//显示产品大图
ecWap.prodDetial.showImg = function (a) {
    location.href = location.href + "#";
    ecWap.prodDetial.startShowImg(a)
};
ecWap.prodDetial.startShowImg = function (a) {
    ecWap.prodDetial.showIndex = a;
    var c = "";
    c += '<section class="pro-gallery">';
    c += "<nav>";
    c += '<p><em id="imageIndex">' + (a + 1) + "</em>/" + ecWap.prodDetial.bigImgList.length + "</p>";
    c += "</nav>";
    c += '<article class="slider">';
    c += '<div id="bigslider">';
    c += ' <ul style="width: 100%;" class="swiper-wrapper">';
    for (var b = 0; b < ecWap.prodDetial.bigImgList.length; b++) {
        if (a == b) {
            c += '<li id="' + b + '" class="swiper-slide" style="width: 100%; vertical-align: top;"><a href="javascript:;"><img src="' + ecWap.prodDetial.bigImgList[b] + '" alt="" onerror="this.src=\'' + ecWap.prodDetial.bigDefaultImg + "';\"></a></li>"
        } else {
            c += '<li id="' + b + '" class="swiper-slide"><a href="javascript:;"><img src="' + ecWap.prodDetial.bigImgList[b] + '" alt="" onerror="this.src=\'' + ecWap.prodDetial.bigDefaultImg + "';\"></a></li>"
        }
    }
    c += "</ul>";
    c += "</div>";
    c += "</article>";
    c += "</section>";
    $("#bigImages").html(c);
    $("#bigImages").removeClass("hide");
    $("#bigImages").show();
    $("#bigImages .pro-gallery").css("top", (($(window).height() - $(window).width() * 1.2) / 2) + "px");
    if (ecWap.prodDetial.bigImgList.length > 1) {
        ecWap.prodDetial.bigslide = new Swiper("#bigslider", {
            initialSlide: a,
            centeredSlides: true,
            loop: true,
            onSlideChangeEnd: function (d) {
                $("#imageIndex").html(parseInt($("#bigslider .swiper-slide-active").attr("id")) + 1)
            }
        })
    } else {
        ecWap.prodDetial.bigslide = new Swiper("#bigslider", {
            initialSlide: a,
            centeredSlides: true,
            onSlideChangeEnd: function (d) {
                $("#imageIndex").html(parseInt($("#bigslider .swiper-slide-active").attr("id")) + 1)
            }
        })
    }
    $("#bigImages").off("click").on("click", function (d) {
        $("#bigImages").hide();
        ecWap.prodDetial.bigslide.destroy();
        if ("#" == location.href.substring(location.href.length - 1)) {
            window.history.go(-1)
        }
        $("html,body,#bigImages").css({height: "auto", overflow: "auto"})
    });
    $("html,body,#bigImages").css({height: $(window).height() + "px", "overflow-y": "hidden"})
};
ecWap.prodDetial.changeTab = function (a, b) {

    //a :this ,b tab id 名称
    //如果是当前tab,返回false
    if ($(a).parent().hasClass("current")) {
        return false
    }

    //分享div,先关闭
    $(".header-menu").hide();

    //滚动条置顶
    $(window).scrollTop(0);

    //轮播图隐藏
    $(".tab").hide();

    //tab页显示
    $("#" + b).show();

    //之前选中的tab,取消选中
    $(a).parent().closest("ul").find("li").removeClass("current");

    //当前tab 添加选中样式
    $(a).parent().addClass("current");


    if (b == "basicInfo") {
        ecWap.prodDetial.slide.destroy();
        if ($("#slider li").length > 1) {
            ecWap.prodDetial.slide = new Swiper("#slider", {
                pagination: "#sliderNav",
                paginationType: "fraction",
                paginationFractionRender: function (c, e, d) {
                    return '<span class="' + e + '"></span>/<span class="' + d + '"></span>'
                },
                loop: true,
                centeredSlides: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false
            })
        } else {
            if ($("#slider li").length == 1) {
                ecWap.prodDetial.slide = new Swiper("#slider", {
                    centeredSlides: true,
                    pagination: "#sliderNav",
                    paginationType: "fraction"
                });
                $("#sliderNav").show()
            } else {
                ecWap.prodDetial.slide = new Swiper("#slider", {centeredSlides: true,})
            }
        }
        $(".bottom-area").css("margin-bottom", "3em");
        // ecWap.code.BIClickReport("trackLink", "wap-pdp-basic-load_event", "link", "");
        $("#skuResultBottom").hide()
    } else {
        ecWap.prodDetial.slide.destroy(false);
        $(".bottom-area").css("margin-bottom", "0");
        $("#skuResultBottom").show()
    }
    if (b == "review") {
        $(window).bind("scroll", function () {
            ecWap.remark.loadingMore()
        });
        if ($("#empty").is(":visible") == true) {
            $("#bottom-area").addClass("fixed")
        }
    } else {
        $("#bottom-area").removeClass("fixed");
        $(window).unbind("scroll", function () {
            ecWap.remark.loadingMore()
        })
    }
    if (b == "picDetail") {
        ecWap.prodDetial.showPicDetail()
    }
    //参数
    if (b == "specification") {
        ecWap.prodDetial.showSpecification()
    }
    ecWap.prodDetial.updateMiniBoxByTab()
};
ecWap.prodDetial.updateMiniBoxByTab = function () {
    var c = $(".productNavTab li.current").index(), a = $("#skuResultBottom"),
        //底部倒计时显示区域
        e = $("#mainCountdownArea"),
        b = $("#rushbuyTipBottom"),
        d = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        g = parseInt(d.buttonMode, 10), f = $("#pro-operation");
    if (c == 0) {
        if (g == 1 || g == 3 || g == 7 || g == 9) {
            a.hide()
        }
        if (g == 8) {
            if (f.find(".j_rushbuybtn2").length > 0) {
                b.show()
            }
        } else {
            b.hide()
        }
        if (g == 10) {
            if (f.find(".j_remindsalebtn").length > 0) {
                a.hide()
            }
            if (f.find(".j_buynowBtn").length > 0 || f.find(".j_prdDetailGoodsRemind").length > 0) {
                a.hide()
            }
        }
        if (d.isDepositProduct == "1") {
            if (d.activityStatus == "1") {
                a.hide()
            }
        }
        ecWap.prodDetial.updateHrHeight()
    } else {
        if (g == 2 || g == 4 || g == 5 || g == 6 || g == 11) {
            a.hide();
            e.hide()
        }
        if (g == 1 || g == 3 || g == 7 || g == 9) {
            e.hide()
        }
        if (g == 8) {
            if (f.find(".j_rushbuybtn2").length > 0) {
                b.show()
            }
        } else {
            b.hide()
        }
        ecWap.prodDetial.updateHrHeight()
    }
};
ecWap.prodDetial.showPicDetail = function () {
    var a = "";
    if ($("#prdDetailDisclaimerTemplate").val() != "") {
        a = '<div class="tips"><div class="b">' + $("#prdDetailDisclaimerTemplate").val() + "</div></div>"
    }

    ecWap.ajax({
        type: "GET",
        // url: "prdDetailInfo.json?skuId=" + (ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        url: "goods.php?act=getGoodsDetail&goods_id=" + $('#goods_id').val(),
        timeout: 50000,
        timeoutFunction: function () {
            ecWap.alert("操作超时，请重试！");
            $("#picDetail").html(a);
            return
        },
        errorFunction: function () {
            $("#picDetail").html(a)
        },
        successFunction: function (b) {
            console.log(b);
            if (!b.success) {
                ecWap.alert("请求超时，请稍后重试！");
                $("#picDetail").html(a);
                return
            }
            if (b.prdDetailInfo) {
                $("#picDetail").html('<div id="picDetailContent" class="pro-meta-sku accordion"><div class="accordion-content accordion-content-active"><p class="p-loading"><span>' + (b.prdDetailInfo ? b.prdDetailInfo : "\u56fe\u6587\u8be6\u60c5") + "</span></p></div></div>" + a)
            } else {
                $("#picDetail").html(a)
            }
            // ecWap.code.BIClickReport("trackLink", "wap-pdp-detail-load_event", "link", "")
        }
    })
};


//参数

ecWap.prodDetial.showSpecification = function () {
    var a = "";
    if ($("#prdDetailDisclaimerTemplate").val() != "") {
        a = '<div class="tips"><div class="b">' + $("#prdDetailDisclaimerTemplate").val() + "</div></div>"
    }
    ecWap.ajax({
        type: "GET",
        url: "prdAttributes.json?skuId=" + (ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        timeout: 30000,
        timeoutFunction: function () {
            ecWap.alert("操作超时，请重试！");
            $("#specification").html(html);
            return
        },
        errorFunction: function () {
            $("#specification").html(a)
        },
        successFunction: function (p) {
            if (!p.success) {
                ecWap.alert("请求超时，请稍后重试！");
                $("#specification").html(a);
                return
            }
            if (p.specificationsList && p.specificationsList.length > 0) {
                var m = p.specificationsList[0], l = "", b = m.specifications;
                l += '<div id="specification-sku-' + m.shuId + '" class="specification-sku" >';
                for (var h = 0; h < b.length; h++) {
                    var g = b[h];
                    l += '<section class="specify">';
                    l += "<header>" + g.name + "</header>";
                    l += '<div class="content">';
                    if (g.name == "规格参数") {
                        var n = g.content;
                        if (null != n) {
                            for (var f = 0; f < n.length; f++) {
                                var d = n[f];
                                l += "<h3>" + d.name + "</h3>";
                                l += "<p>";
                                var o = d.content;
                                for (var e = 0; e < o.length; e++) {
                                    var c = o[e];
                                    l += "<span><b>";
                                    l += c.name;
                                    l += "</b>";
                                    l += c.value;
                                    l += "</span>"
                                }
                                l += "</p>"
                            }
                        }
                    } else {
                        if (g.name == "包装清单") {
                            l += '<div class="content2">';
                            l += "<p>";
                            l += (g.value ? g.value : "");
                            l += "</p>";
                            l += "</div>"
                        } else {
                            l += '<div class="content1">';
                            l += "<p>";
                            l += (g.value ? g.value : "");
                            l += "</p>";
                            l += "</div>"
                        }
                    }
                    l += "</div>";
                    l += "</section>"
                }
                l += "</div>";
                l += a;
                $("#specification").html(l)
            } else {
                $("#specification").html(a)
            }
            // ecWap.code.BIClickReport("trackLink", "wap-pdp-specs-load_event", "link", "")
        }
    })
};

//增加产品数量
ecWap.prodDetial.addPrdNum = function () {

    //显示的选择数量，字符转换成10进制数
    var f = parseInt($("#quantity").val(), 10),

        //产品库存，字符转换成10进制数
        e = parseInt($("#quantity").attr("data-inventory"), 10),


        d = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),

        //是否优先购买
        a = ecWap.account.isPriorityBuy,

        c = ecWap.account.prioritySkuId,
        g = ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku;

    if (g == c && a == "1") {
        return false
    } else {
        //设置最大库存
        console.log(f)
        if (f >= 999) {
            $("#product-addNum").removeClass("minus-disabled").addClass("minus-disabled");
            return false
        }

        //数量限制//是否限制，限制的数量
        if (d.limitedStatus == "1" && d.limitedQuantity) {
            var b = [parseInt(d.limitedQuantity, 10), e].sort(function (i, h) {
                return i - h
            })[0]
        } else {
            //如果不限制购买数量直接扔给最大库存
            var b = e
        }

        //inputnum 数值如果小于限制数量（自定义的数量或者最大库存数量）
        if (f < b) {

            if (f == 1) {
                $("#product-delNum").removeClass("minus-disabled")
            } else {
                if (f == 998) {
                    $("#product-addNum").addClass("minus-disabled")
                }
            }
            $("#quantity").val(++f);
            if (f == b) {
                $("#product-addNum").addClass("minus-disabled")
            }
        } else {

            //购买数量达到
            $("#check-number").text("哎哟，购买数达上限啦").show().fadeOut(3000);
            if (!$("#product-addNum").hasClass("minus-disabled")) {
                $("#product-addNum").addClass("minus-disabled")
            }
        }

        //刷新 底部已选显示区域
        ecWap.prodDetial.updateSkuAmtArea();


    }
};

//减少选择的数量
ecWap.prodDetial.delPrdNum = function () {

    console.log('减少数量');
    var a = ecWap.account.isPriorityBuy,
        b = ecWap.account.prioritySkuId,
        d = ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku;
    if (d == b && a == "1") {
        return false
    } else {
        var c = parseInt($("#quantity").val(), 10);
        if (c <= 1) {
            $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
            return false
        } else {
            if (c == 2) {
                $("#product-delNum").addClass("minus-disabled")
            } else {
                if (c == 999) {
                    $("#product-addNum").removeClass("minus-disabled")
                }
            }
        }
        if ($("#product-addNum").hasClass("minus-disabled")) {
            $("#product-addNum").removeClass("minus-disabled")
        }
        $("#quantity").val(--c)
    }
    ecWap.prodDetial.updateSkuAmtArea()
};
ecWap.prodDetial.disableNumArea = function () {
    $(".pro-meta-sku-number").hide()
};
ecWap.prodDetial.enableNumArea = function () {
    $(".pro-meta-sku-number").show()
};
ecWap.prodDetial.showBundleArea = function (l, d, j, i) {
    var h = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
    if (parseInt(h.buttonMode, 10) != 8) {
        if (ecWap.prodDetial.timer) {
            clearInterval(ecWap.prodDetial.timer);
            ecWap.prodDetial.timer = null
        }
        $("#easybuy").hide()
    }
    $(i).parent().find("a").removeClass("selected");
    $(i).addClass("selected");
    var p = "";
    var a = $("#pro-deposit,.j_pro-deposit"), b = $("#pro-rushbuy,.j_pro-rushbuy"), n = $(".j_pro-bundler"),
        m = $(".j_pro-price-type"), g = $("#pro-prime-price,.j_pro-prime-price"), c = $(".j_pro-price,#pro-price"),
        k = $("#skuGiftResult, #skuGiftOperationArea, .j_gif-prd-areawrap");
    if (l.pageX || l.clientX || l.screenX) {
        ecWap.prodDetial.isTriggerEvent = false
    }
    if (d > 0) {
        $(".pro-suit-1").show();
        $("#bundler_area_" + d).parent().find("section").hide();
        $("#bundler_area_" + d).show();
        k.hide();
        a.hide();
        b.hide();
        n.attr("style", "display:inline-block;");
        m.html("");
        g.html("");
        c.html("<small>&yen;</small> " + $("#bundler_area_" + d).find(".j_bunderPrice").text());
        if (parseInt(h.buttonMode, 10) == 10) {
            ecWap.prodDetial.limitTimeBuybtnRender(h)
        } else {
            var o = parseInt(h.buttonMode, 10);
            if (o == 11) {
                ecWap.prodDetial.pcbuybtnRender()
            } else {
                if (o == 2 || o == 4 || o == 5) {
                    ecWap.prodDetial.notSaleBtnRender();
                    ecWap.prodDetial.disableNumArea()
                } else {
                    if (o == 8) {
                    } else {
                        $(".pro-property-shoppingCart").show();
                        if (h.inventory <= 0) {
                            var f = "";
                            if (ecWap.prodDetial.showEasybuy(h)) {
                                $("#easybuy a").attr("href", h.easybuyWapUrl);
                                $("#easybuy").show();
                                f = " pro-property-action-2"
                            }
                            ecWap.prodDetial.arrivalNoticeBtnRender(f);
                            ecWap.prodDetial.disableNumArea()
                        } else {
                            ecWap.prodDetial.buynowBtnRender()
                        }
                    }
                }
            }
        }
        ecWap.prodDetial.chooseAddress();
        $("#warrantEntry").hide();
        $(".j_extWarrantyDetail, .j_accWarrantyDetail").hide();
        $("#extWarrantyDetail, #accWarrantyDetail").attr("href", "javascript:;");
        $("#extArea, #accArea").hide();
        $("#selectExtWarrantyId, #selectAccWarrantyId, #extWarrantyId, #accWarrantyId").val("")
    } else {
        $(".pro-suit-1").hide();
        k.show();
        if ((ecWap.prodDetial.isShowExtendInfo == 1 && ecWap.account.isPriorityBuy != 1) || (ecWap.prodDetial.isShowExtendInfo == 1 && ecWap.account.isPriorityBuy == 1 && ecWap.account.prioritySkuId != ecWap.prodDetial.getSku())) {
            if (h.extWarranty.length > 0 || h.accWarranty.length > 0) {
                ecWap.prodDetial.showMessageForWarrant();
                ecWap.prodDetial.warrantyInit(h.extWarranty, h.accWarranty)
            }
        }
        ecWap.prodDetial.execute("renderInventory", [true])
    }
    $(".j_extunselect,.j_accunselect").trigger("click");
    ecWap.prodDetial.updateSkuResultArea();
    $("#selectbundleid").val(j);
    $("#bundleId").val(j);
    ecWap.prodDetial.updateBtnAreaState();
    ecWap.prodDetial.updateSkuAmtArea()
};
ecWap.prodDetial.updateBtnAreaState = function () {
    var c = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        f = parseInt(c.buttonMode, 10), e = $("#pro-operation"), a = $("#skuResultBottom"),
        //底部倒计时显示区域
        d = $("#mainCountdownArea"),
        b = $("#rushbuyTipBottom");
    if (!e.find(".pro-property-action").hasClass("pro-property-action-disabled")) {
        if (f == 7) {
            e.find(".j_prdDetailAppointment").removeAttr("onclick");
            e.find(".j_prdDetailAppointment").off("click").on("click", function () {
                if ($("#bundlerList a").length > 0 && $("#bundlerList .selected").length < 1) {
                    ecWap.alert("\u8bf7选择\u5355\u54c1\u6216\u8005\u5957\u9910\uff01");
                    return
                }
                location.href = c.wapUrl
            })
        }
    } else {
        if (f == 8 || f == 10) {
            if (e.find(".j_rushbuybtn2").length > 0) {
                b.show()
            } else {
                b.hide()
            }
        }
    }
    ecWap.prodDetial.updateHrHeight();
    ecWap.prodDetial.updateMiniBoxByTab()
};
ecWap.prodDetial.updateHrHeight = function () {
    var a = $("#skuResultBottom"),
        //底部倒计时显示区域
        b = $("#mainCountdownArea");
    if (!a.is(":hidden") || !b.is(":hidden")) {
        $(".j_hr1").addClass("hr-70").removeClass("hr-48")
    } else {
        $(".j_hr1").addClass("hr-48").removeClass("hr-70")
    }
};


//添加购物车
ecWap.prodDetial.addCart = function (g) {


    console.log('start----');
    //判断库存
    var n = [ecWap.prodDetial.getSku()],
        //输入数量
        d = parseInt($("#quantity").val(), 10),
        //库存数量
        b = parseInt($("#quantity").attr("data-inventory"), 10),
        e = $(g).attr("data-disabled"),
        h = $("#selectbundleid").val(),
        m = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);


    if (m.limitedStatus == "1" && m.limitedQuantity) {
        var j = [parseInt(m.limitedQuantity, 10), b].sort(function (q, i) {
            return q - i
        })[0]

    } else {
        var j = b
    }
    if (d > j) {
        if (m.limitedStatus == "1" && parseInt(m.limitedQuantity, 10) == j) {
            $("#check-number").text("哎哟，购买数达上限啦").show().fadeOut(3000)
        } else {
            $("#check-number").text("哎哟，库存不足啦").show().fadeOut(3000)
        }
        return false
    }

    if (isNaN(d)) {
        ecWap.alert("请输入商品数量");
        return
    }
    if (ecWap.prodDetial.skuSelect()) {
        if ($("#bundlerList a").length > 0 && $("#bundlerList .selected").length < 1) {
            ecWap.alert("请选择单品或者套餐！");
            return
        }
        if (b < d || b == 0) {
            ecWap.alert("该商品库存不足!");
            return
        }
        if (d == 0) {
            ecWap.alert("请选择商品数量!");
            return
        }
        if (e == 1) {
            return
        }
        $(g).attr("data-disabled", 1);
        var p = [], o = [], c = [];
        if (h > 0) {
            c = [h];
            p.push({bundleId: h, quantity: d, productType: "2"})
        } else {
            o = n;
            var l = [];
            var a = ecWap.prodDetial.giftIds;
            if (a != null && a.length > 0) {
                for (var f = 0; f < a.length; f++) {
                    var k = {};
                    k.sbomCode = a[f];
                    l.push(k)
                }
            }
            if (l && l.length > 0) {
                p.push({skuId: n[0], quantity: d, productType: "1", giftList: l})
            } else {
                p.push({skuId: n[0], quantity: d, productType: "1"})
            }
            if ($("#selectExtWarrantyId").val() != "") {
                p.push({skuId: $("#selectExtWarrantyId").val(), quantity: 1, productType: "6", mainSkuId: n[0]})
            }
            if ($("#selectAccWarrantyId").val() != "") {
                p.push({skuId: $("#selectAccWarrantyId").val(), quantity: 1, productType: "7", mainSkuId: n[0]})
            }
        }


        cartObj.addProductToCart(p, function (r) {
            var i = $("#cartNum").html();
            var q = parseInt(i, 10) + d;
            if (q > 99) {
                $("#cartNum").html("99+").parent("em").addClass("show")
            } else {
                if (q > 0 && q <= 99) {
                    $("#cartNum").html(parseInt(i, 10) + d).parent("em").addClass("show")
                } else {
                    $("#cartNum").parent("em").removeClass("show")
                }
            }
            Utils.report.shoppingCart({opertype: 1, skuIds: o, bundlerIds: c})
        });
        $(g).attr("data-disabled", 0)
    } else {
        ecWap.alert("请选择颜色和制式！");
        return
    }
};
ecWap.prodDetial.extendBuyNow = function () {
    location.href = "/tcs/query?skuIds=" + ecWap.prodDetial.defaultSku
};
ecWap.prodDetial.skuSelect = function () {
    var a = true;
    $("#skuList dl").each(function () {
        if ($(this).find("a").length > 0 && $(this).find(".selected").length < 1) {
            a = false;
            return
        }
    });
    return a
};
ecWap.prodDetial.hidButtonProduct = function () {
    if ($("#prdDetailBuyNow").length > 0) {
        $("#prdDetailBuyNow").attr("onclick", "");
        $("#prdDetailBuyNow").css("background-color", "#AAAAAA").css("border", "1px solid #AAAAAA")
    }
    if ($("#prdDetailBalance").length > 0) {
        $("#prdDetailBalance").attr("onclick", "");
        $("#prdDetailBalance").css("background-color", "#AAAAAA").css("border", "1px solid #AAAAAA")
    }
};
ecWap.prodDetial.redirectBindingPage = function () {
    var a = ecWap.prodDetial.getSku(), b = "/product/" + ecWap.prodDetial.prdId + ".html#" + a;
    window.location.href = "/shoppingCart/bindingPhoneNum?url=" + b;
    return
};


//立即购买
ecWap.prodDetial.buyNow = function () {

    var l = ecWap.prodDetial.getSku(),
        // b = "/product/" + ecWap.prodDetial.prdId + ".html#" + l;
        goods_id = ecWap.prodDetial.prdId;

    // b = encodeURIComponent(encodeURIComponent(b));
    // if (!ecWap.account.id) {
    //     var a = window.navigator.userAgent.toLowerCase();
    //
    //     //如果在微信
    //     if (a.match(/MicroMessenger/i) == "micromessenger") {
    //         // location.href = "/thirdparty/wechat/vcode/ad?url=/product/" + ecWap.prodDetial.prdId + ".html#" + l
    //         location.href = "flow.php";
    //     } else {
    //         location.href = "flow.php";
    //     }
    //     return
    // }
    // if ((ecWap.account.mobileStatus == "0" || ecWap.account.mobileStatus == "") && ecWap.account.isBindMobile == 1) {
    //     window.location.href = "/account/toBindMobile?url=" + b;
    //     return
    // }
    l = [ecWap.prodDetial.getSku()];
    var e = parseInt($("#quantity").val(), 10),
        // i = ecWap.prodDetial.getSkuInfo(l).hasComb,
        c = $("#quantity").attr("data-inventory"),
        g = ecWap.account.isPriorityBuy,
        // k = ecWap.account.prioritySkuId,
        // f = $("#selectbundleid").val(),
        j = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
    if (j.limitedStatus == "1" && j.limitedQuantity) {
        var h = [parseInt(j.limitedQuantity, 10), c].sort(function (n, m) {
            return n - m
        })[0]
    } else {
        var h = c
    }
    if (e > h && g != "1") {
        if (j.limitedStatus == "1" && parseInt(j.limitedQuantity, 10) == h) {
            $("#check-number").text("哎哟，购买数达上限啦").show().fadeOut(3000)
        } else {
            $("#check-number").text("哎哟，库存不足啦").show().fadeOut(3000)
        }
        return false
    }
    if (isNaN(e)) {
        ecWap.alert("请输入商品数量");
        return
    }

    ecWap.ajax({
        type: "POST",
        data: {quick:1,goods_id:ecWap.prodDetial.prdId,number:e},
        url: "flow.php?step=add_to_cart",
        timeout: 10000,
        timeoutFunction: function () {
            ecWap.alert("操作超时，请重试！");
            return;
        },
        successFunction: function (f) {
            console.log(f);
            if (!f.success) {
                ecWap.alert(f.msg);
                return;
            }
            window.location.href = 'flow.php?step=cart';
        }
    })


    // if (ecWap.prodDetial.skuSelect()) {
    //     if ($("#bundlerList a").length > 0 && $("#bundlerList .selected").length < 1) {
    //         ecWap.alert("请选择单品或者套餐！");
    //         return
    //     } else {
    //         if (ecWap.account.bindedPhoneStatus != null && ecWap.account.bindedPhoneStatus == "force") {
    //             ecWap.box("为了您的账户安全，华为商城强烈建议您进行手机帐号的绑定，绑定后，邮箱帐号和手机帐号都可以作为您的登录账户；若不绑定，只能进行浏览操作，不能购买。", {
    //                 id: "agreement",
    //                 isconfirm: true,
    //                 ok_txt: "去绑定",
    //                 cancel_txt: "不绑定",
    //                 onok: function (m) {
    //                     m.close();
    //                     ecWap.prodDetial.redirectBindingPage()
    //                 },
    //                 oncanel: function (m) {
    //                     ecWap.prodDetial.hidButtonProduct();
    //                     m.close()
    //                 }
    //             })
    //         } else {
    //             if (ecWap.account.bindedPhoneStatus != null && ecWap.account.bindedPhoneStatus == "easy") {
    //                 var d = "为了您的账户安全，华为商城强烈建议您进行手机帐号的绑定，绑定后，邮箱帐号和手机帐号都可以作为您的登录账户；若不绑定，";
    //                 if (ecWap.prodDetial.bindDateDtetail != null && ecWap.prodDetial.bindDateDtetail != "") {
    //                     d += "自" + ecWap.prodDetial.bindDateDtetail + "起，"
    //                 }
    //                 d += "只能进行浏览操作，不能购买。";
    //                 ecWap.box(d, {
    //                     id: "agreement",
    //                     isconfirm: true,
    //                     ok_txt: "去绑定",
    //                     cancel_txt: "不绑定",
    //                     onok: function (m) {
    //                         m.close();
    //                         ecWap.prodDetial.redirectBindingPage()
    //                     },
    //                     oncanel: function (m) {
    //                         m.close();
    //                         ecWap.prodDetial.executeBuy()
    //                     }
    //                 })
    //             } else {
    //                 ecWap.prodDetial.executeBuy()
    //             }
    //         }
    //     }
    // } else {
    //     ecWap.alert("请选择颜色和制式！");
    //     return
    // }
};
ecWap.prodDetial.executeBuy = function () {
    var l = ecWap.prodDetial.getSku(), g = [ecWap.prodDetial.getSku()], c = parseInt($("#quantity").val(), 10),
        h = ecWap.prodDetial.getSkuInfo(l).hasComb, f = ecWap.account.isPriorityBuy, k = ecWap.account.prioritySkuId,
        e = $("#selectbundleid").val(), b = [], d = [], j = [], i = e + ":" + c;
    b.push("");
    d.push("0");
    j.push(l + ":" + c);
    if ($("#selectExtWarrantyId").val() != "") {
        g.push($("#selectExtWarrantyId").val());
        j.push($("#selectExtWarrantyId").val() + ":" + c);
        b.push(l);
        d.push("1");
        $("#giftSkuIds").val($("#giftSkuIds").val() + ",")
    }
    if ($("#selectAccWarrantyId").val() != "") {
        g.push($("#selectAccWarrantyId").val());
        j.push($("#selectAccWarrantyId").val() + ":" + c);
        b.push(l);
        d.push("6");
        $("#giftSkuIds").val($("#giftSkuIds").val() + ",")
    }
    $("#skuIdAndQtys").val(j.join(","));
    $("#mainSkuIds").val(b.join(","));
    $("#types").val(d.join(","));
    $("#shopAddressId").val(ecWap.cookie.get("shopAddressID"));
    if (f == "1" && k == l) {
        gid("confirmForm").action = "/order/priority/confirm"
    } else {
        var a = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
        if (e != undefined && e != null && e != "") {
            $("#skuIdAndQtys, #mainSkuIds, #types").val("");
            $("#bundleIdAndQtys").val(i)
        } else {
            $("#bundleIdAndQtys").val("")
        }
        if (h != undefined && h != null && h > 0) {
            if (a.isDepositProduct == "1") {
                $("#isCashProductFlag").val("1")
            }
            $("#count").val(c);
            gid("confirmForm").action = "/product/combInfo-" + l
        } else {
            if (a.isDepositProduct == "1") {
                gid("confirmForm").action = "/order/cash/confirm"
            } else {
                gid("confirmForm").action = "/order/confirm"
            }
        }
    }
    gid("confirmForm").submit()
};
ecWap.prodDetial.hasBuyProduct = function () {
    var a = ecWap.prodDetial.getSku(), e = ecWap.prodDetial.getSkuInfo(a || ecWap.prodDetial.defaultSku),
        b = e.activityId, c = "/product/" + ecWap.prodDetial.prdId + ".html#" + a;
    c = encodeURIComponent(encodeURIComponent(c));
    if (!ecWap.account.id) {
        location.href = "/account/applogin?url=" + c;
        return
    }
    var d = parseInt($("#quantity").val(), 10);
    if (d < 1) {
        ecWap.alert("请输入正确的商品数量！");
        return
    }
    ecWap.ajax({
        type: "GET",
        url: "/order/cash/quality.json?skuId=" + a + "&activityId=" + b + "&quantity=" + d,
        timeout: 10000,
        timeoutFunction: function () {
            ecWap.alert("操作超时，请重试！");
            return
        },
        successFunction: function (f) {
            if (!f.success) {
                ecWap.alert(f.msg);
                return
            }
        }
    })
};

ecWap.prodDetial.remindSale = function (c) {
    var a = ecWap.prodDetial.getSku(), b = "/product/" + ecWap.prodDetial.prdId + ".html#" + a;
    b = encodeURIComponent(encodeURIComponent(b));
    if (!ecWap.account.id) {
        location.href = "/account/applogin?url=" + b;
        return
    }
    if ($("#bundlerList a").length > 0 && $("#bundlerList .selected").length < 1) {
        ecWap.alert("请选择单品或者套餐！");
        return
    }
    if (ecWap.account.mobileStatus != "1") {
        window.location.href = "/account/toBindMobile?url=" + b
    } else {
        var a = ecWap.prodDetial.getSku();
        if (!_remindSaleSend) {
            _remindSaleSend = true;
            ecWap.ajax({
                type: "POST",
                url: "/product/honor/remind/add.json?taskCode=" + c + "&skuId=" + a,
                timeout: 10000,
                timeoutFunction: function () {
                    _remindSaleSend = false;
                    ecWap.alert("操作超时，请重试！", false);
                    return
                },
                successFunction: function (d) {
                    if (!d.success) {
                        _remindSaleSend = false;
                        ecWap.box(d.msg, {
                            ishtml: false,
                            showTitle: true,
                            title: "开售提醒",
                            isconfirm: false
                        });
                        return
                    }
                    _remindSaleSend = true;
                    ecWap.toast(d.msg)
                }
            })
        }
    }
};
ecWap.prodDetial.arrivalNotice = function () {
    var a = ecWap.prodDetial.getSku(), b = "/product/" + ecWap.prodDetial.prdId + ".html#" + a;
    b = encodeURIComponent(encodeURIComponent(b));
    if (!ecWap.account.id) {
        location.href = "/account/applogin?url=" + b;
        return
    }
    if ($("#bundlerList a").length > 0 && $("#bundlerList .selected").length < 1) {
        ecWap.alert("请选择单品或者套餐！");
        return
    }
    if (ecWap.account.mobileStatus != "1") {
        window.location.href = "/account/toBindMobile?url=" + b
    } else {
        ecWap.prodDetial.arrivalNoticeMobile()
    }
};
ecWap.prodDetial.arrivalNoticeMobile = function () {
    if (!_arrivalNoticeSend) {
        _arrivalNoticeSend = true;
        ecWap.ajax({
            type: "GET",
            url: "/product/arrivalMobile.json?skuId=" + ecWap.prodDetial.getSku(),
            timeout: 10000,
            timeoutFunction: function () {
                ecWap.alert("操作超时，请重试！", false);
                _arrivalNoticeSend = false;
                return
            },
            successFunction: function (a) {
                if (!a.success) {
                    ecWap.alert(a.msg);
                    _arrivalNoticeSend = false;
                    return
                }
                ecWap.toast("到货通知已设置");
                _arrivalNoticeSend = true
            }
        })
    } else {
        ecWap.alert("到货通知已设置")
    }
};
ecWap.prodDetial.changeRemarkTag = function (b, a) {
    $("#" + b + "-area").parent().closest(".content").find("ul").hide();
    $("#" + b + "-area").show();
    $(a).parent().closest("ul").find("li").removeClass("current");
    $(a).parent().addClass("current")
};
ecWap.prodDetial.getActivityUrl = function (d) {
    var c = "";
    if (d == undefined || d == null || d.length <= 21) {
        c = "/";
        return c
    }
    var b = "", a = d.split(".");
    if (a == undefined || a == null || a.length < 4) {
        c = "/";
        return c
    }
    b = a[0];
    switch (b) {
        case"https://sale":
            c = d.replace(b, "https://msale");
            break;
        case"https://mm":
            c = d.replace(b, "https://mt");
            break;
        default:
            c = "/";
            break
    }
    return c
};
ecWap.prodDetial.editPrdNum = function (c) {
    var f = $(c), d = $.trim(parseInt(f.val(), 10)), a = ecWap.account.isPriorityBuy, b = ecWap.account.prioritySkuId,
        e = ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku;
    if (f.val() != "") {
        if (isNaN(d) || !(/^[0-9]+/.test(d)) || d == "0") {
            f.val(1);
            $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
            $("#product-addNum").removeClass("minus-disabled")
        } else {
            if (d <= 1) {
                if (!(e == b && a == "1")) {
                    $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
                    $("#product-addNum").removeClass("minus-disabled");
                    f.val(1)
                }
            } else {
                if (d >= 999) {
                    $("#product-addNum").removeClass("minus-disabled").addClass("minus-disabled");
                    $("#product-delNum").removeClass("minus-disabled");
                    f.val(999)
                } else {
                    f.val(d);
                    $("#product-delNum").removeClass("minus-disabled");
                    $("#product-addNum").removeClass("minus-disabled")
                }
            }
        }
    }
    f.blur(function () {
        if (isNaN(f.val()) || !(/^[0-9]+/.test(f.val())) || f.val() == "0") {
            f.val(1);
            $("#product-delNum").removeClass("minus-disabled").addClass("minus-disabled");
            $("#product-addNum").removeClass("minus-disabled")
        }
    });
    ecWap.prodDetial.updateSkuAmtArea()
};
ecWap.prodDetial.limitTimeWillstartBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-disabled  ' + c + '" ><a href="javascript:;" class="j_willstartbtn button-style-1-big" ><span>\u6d3b\u52a8\u5373\u5c06\u5f00\u59cb</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.buynowBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action" ><a id="prdDetailAddCart" href="javascript:;" class="j_addCartbtn button-style-4-big" onclick="_hmt.push([\'_trackEvent\', \'click btn2|skuid\', \'click\', \'\u8bb0\u5f55\u3010\u52a0\u5165\u8d2d\u7269\u8f66\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570\']);ecWap.prodDetial.addCart(this)"><span>\u52a0\u5165\u8d2d\u7269\u8f66</span></a><a id="prdDetailBuyNow" href="javascript:;" class="j_buynowBtn button-style-1-big" onclick="_hmt.push([\'_trackEvent\', \'click btn1|skuid\', \'click\', \'\u8bb0\u5f55\u3010\u7acb\u5373\u8d2d\u4e70\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570\']);ecWap.prodDetial.buyNow()"><span>\u7acb\u5373\u8d2d\u4e70</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.remindsaleBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        d = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        a = '<section class="pro-property-action-area"><article class="pro-property-action ' + c + "\" ><a onclick=\"_hmt.push(['_trackEvent', 'click btn3|skuid', 'click', '\u8bb0\u5f55\u3010\u5f00\u552e\u63d0\u9192\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570']);ecWap.prodDetial.remindSale('" + d.saleAlertCode + '\')"  href="javascript:;" class="j_remindsalebtn button-style-1-big"><span>\u5f00\u552e\u63d0\u9192</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.arrivalNoticeBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action ' + c + "\" ><a href=\"javascript:;\" class=\"j_prdDetailGoodsRemind button-style-1-big\" onclick=\"_hmt.push(['_trackEvent', 'click btn4|skuid', 'click', '\u8bb0\u5f55\u3010\u5230\u8d27\u901a\u77e5\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570']);ecWap.prodDetial.arrivalNotice()\"><span>\u5230\u8d27\u901a\u77e5</span></a></article></section>";
    b.html(a)
};
ecWap.prodDetial.saleEndBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action ' + c + '" ><a href="javascript:;" class="j_saleendbtn button-style-1-big-disabled" ><span>活动已结束</span></a></aritcle></section>';
    b.html(a)
};
ecWap.prodDetial.pcbuybtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-disabled pro-property-action-p"><p class="p-center">所选定制商品仅支持在PC端购买</p></article></section>';
    b.html(a)
};
ecWap.prodDetial.isloadingBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-0' + c + '" ><a href="javascript:;" class="button-style-1-big-disabled"><span>正在加载...</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.makeAppointBtnRender = function (c) {
    if (!c) {
        c = ""
    }
    var b = $("#pro-operation"),
        d = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        a = '<section class="pro-property-action-area"><article class="pro-property-action' + c + "\" ><a href=\"javascript:;\" class=\"j_prdDetailAppointment button-style-1-big\" onclick=\"_hmt.push(['_trackEvent', 'click btn5|skuid', 'click', '\u8bb0\u5f55\u3010\u7acb\u5373\u9884\u7ea6\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570']);\"><span>\u7acb\u5373\u9884\u7ea6</span></a></article></section>";
    b.html(a)
};
ecWap.prodDetial.rushbuyQuickBtnRender = function () {
    var b = $("#pro-operation"),
        c = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
        a = "<section class=\"pro-property-action-area\"><article class=\"pro-property-action\" ><a href=\"javascript:;\" class=\"button-style-1-big\" onclick=\"_hmt.push(['_trackEvent', 'click btn6|skuid', 'click', '\u8bb0\u5f55\u3010\u53c2\u4e0e\u62a2\u8d2d\u3011\u6309\u94ae\u7684\u70b9\u51fb\u6b21\u6570']);location.href='" + c.wapUrl + "'\"><span>\u53c2\u4e0e\u62a2\u8d2d</span></a></article></section>";
    b.html(a)
};
ecWap.prodDetial.notSaleOnMobileBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-disabled pro-property-action-p"><p class="p-center">该商品暂不支持在手机端购买</p></article></section>';
    b.html(a)
};
ecWap.prodDetial.notSaleBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-disabled pro-property-action-p"><p class="p-center">该商品暂不售卖</p></article></section>';
    b.html(a)
};
ecWap.prodDetial.depositPayBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action" ><a id="prdDetailBalance" href="javascript:;" class="j_paydepositbtn button-style-1-big" onclick="ecWap.prodDetial.hasBuyProduct()"><span>\u652f\u4ed8\u8ba2\u91d1</span></a></aritcle></section>';
    b.html(a)
};
ecWap.prodDetial.outOfStockBtnRender = function (c) {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action' + c + '" ><a href="javascript:;" class="j_outofstock button-style-1-big-disabled"><span>暂时缺货</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.rushbuyBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-0" ><a href="javascript:;" onclick="ecWap.prodDetial.rushBuy();" class="j_rushbuybtn button-style-1-big"><span>立即申购</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.rushbuyDisableBtnRender = function () {
    var b = $("#pro-operation"),
        a = '<section class="pro-property-action-area"><article class="pro-property-action pro-property-action-0 pro-property-action-disabled" ><a href="javascript:;" class="j_rushbuybtn2 button-style-1-big"><span>立即申购</span></a></article></section>';
    b.html(a)
};
ecWap.prodDetial.limitTimeBuybtnRender = function (h) {
    var d = $("#pro-operation"), g = "", c = h.startTime.replace(/-/g, "/"), b = new Date(c).getTime(), f = "";
    if (((b - ecWap.prodDetial.nowTime) / 1000) > 1) {
        if (((b - ecWap.prodDetial.nowTime) / 1000) > h.product_rush_countdown * 60 * 60) {
            if (h.is_show_reminder == 1) {
                var e = "";
                if (ecWap.prodDetial.showEasybuy(h)) {
                    $("#easybuy a").attr("href", h.easybuyWapUrl);
                    $("#easybuy").show();
                    e = " pro-property-action-2"
                }
                ecWap.prodDetial.remindsaleBtnRender(e)
            } else {
                var e = "";
                if (ecWap.prodDetial.showEasybuy(h)) {
                    $("#easybuy a").attr("href", h.easybuyWapUrl);
                    $("#easybuy").show();
                    e = " pro-property-action-2"
                }
                ecWap.prodDetial.limitTimeWillstartBtnRender(e);


                //底部倒计时显示区域
                $("#mainCountdownArea").show();
                ecWap.Countdown(c, ecWap.prodDetial.nowTime, "pro_detail_time")
            }
        } else {
            var e = "";
            if (ecWap.prodDetial.showEasybuy(h)) {
                $("#easybuy a").attr("href", h.easybuyWapUrl);
                $("#easybuy").show();
                e = " pro-property-action-2"
            }
            ecWap.prodDetial.limitTimeWillstartBtnRender(e);

            //底部倒计时显示区域
            $("#mainCountdownArea").show();
            ecWap.Countdown(c, ecWap.prodDetial.nowTime, "pro_detail_time")
        }
        ecWap.prodDetial.timer = setInterval(function () {
            if (((b - ecWap.prodDetial.nowTime) / 1000) <= h.product_rush_countdown * 60 * 60) {
                if (((b - ecWap.prodDetial.nowTime) / 1000) >= (h.product_rush_countdown * 60 * 60 - 1)) {
                    var i = "";
                    if (ecWap.prodDetial.showEasybuy(h)) {
                        $("#easybuy a").attr("href", h.easybuyWapUrl);
                        $("#easybuy").show();
                        i = " pro-property-action-2"
                    }
                    ecWap.prodDetial.limitTimeWillstartBtnRender(i);

                    //底部倒计时显示区域
                    $("#mainCountdownArea").show();
                    ecWap.Countdown(c, ecWap.prodDetial.nowTime, "pro_detail_time")
                }
            } else {
                if (h.is_show_reminder == 1) {
                    var i = "";
                    if (ecWap.prodDetial.showEasybuy(h)) {
                        $("#easybuy a").attr("href", h.easybuyWapUrl);
                        $("#easybuy").show();
                        i = " pro-property-action-2"
                    }
                    ecWap.prodDetial.remindsaleBtnRender(i)
                } else {
                    var i = "";
                    if (ecWap.prodDetial.showEasybuy(h)) {
                        $("#easybuy a").attr("href", h.easybuyWapUrl);
                        $("#easybuy").show();
                        i = " pro-property-action-2"
                    }
                    ecWap.prodDetial.limitTimeWillstartBtnRender(i);


                    //底部倒计时显示区域
                    $("#mainCountdownArea").show();
                    ecWap.Countdown(c, ecWap.prodDetial.nowTime, "pro_detail_time")
                }
            }
            if (!ecWap.Countdown(c, ecWap.prodDetial.nowTime, "pro_detail_time")) {
                ecWap.prodDetial.buynowBtnRender();

                //    //底部倒计时显示区域
                $("#mainCountdownArea,#easybuy").hide();
                clearInterval(ecWap.prodDetial.timer);
                ecWap.prodDetial.timer = null
            }
        }, 1000)
    } else {
        var a = h.end_time;
        if (Date.now() > Date.parse(a)) {
            var e = "";
            if (ecWap.prodDetial.showEasybuy(h)) {
                $("#easybuy a").attr("href", h.easybuyWapUrl);
                $("#easybuy").show();
                e = " pro-property-action-2"
            }
            ecWap.prodDetial.saleEndBtnRender(e)
        } else {
            if (h.inventory <= 0) {
                var e = "";
                if (ecWap.prodDetial.showEasybuy(h)) {
                    $("#easybuy a").attr("href", h.easybuyWapUrl);
                    $("#easybuy").show();
                    e = " pro-property-action-2"
                }
                ecWap.prodDetial.arrivalNoticeBtnRender(e);
                ecWap.prodDetial.disableNumArea()
            } else {
                ecWap.prodDetial.buynowBtnRender();
                $("#mainCountdownArea,#easybuy").hide()
            }
        }
    }
};
ecWap.prodDetial.buttonsRender = function (c) {
    var f = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku), a = $("#pro-price"),
        b = $("#pro-operation"), e = "";
    if (f.isDepositProduct == "1") {
        if (f.activityStatus == "1") {
            if (f.inventory > 0) {
                ecWap.prodDetial.depositPayBtnRender();
                ecWap.prodDetial.showDeliAddress();
                ecWap.prodDetial.updateBtnAreaState();
                return false
            } else {
                var d = "";
                if (ecWap.prodDetial.showEasybuy(f)) {
                    $("#easybuy a").attr("href", f.easybuyWapUrl);
                    $("#easybuy").show();
                    d = " pro-property-action-2"
                }
                ecWap.prodDetial.arrivalNoticeBtnRender(d);
                ecWap.prodDetial.disableNumArea();
                ecWap.prodDetial.showDeliAddress();
                ecWap.prodDetial.updateBtnAreaState();
                return false
            }
        }
        if (f.activityStatus == "2") {
            var d = "";
            if (ecWap.prodDetial.showEasybuy(f)) {
                $("#easybuy a").attr("href", f.easybuyWapUrl);
                $("#easybuy").show();
                d = " pro-property-action-2"
            }
            ecWap.prodDetial.limitTimeWillstartBtnRender(d);
            ecWap.prodDetial.showDeliAddress();
            ecWap.prodDetial.updateBtnAreaState();
            return false
        } else {
            if (f.activityStatus == "3") {
                var d = "";
                if (ecWap.prodDetial.showEasybuy(f)) {
                    $("#easybuy a").attr("href", f.easybuyWapUrl);
                    $("#easybuy").show();
                    d = " pro-property-action-2"
                }
                ecWap.prodDetial.saleEndBtnRender(d);
                ecWap.prodDetial.showDeliAddress();
                ecWap.prodDetial.updateBtnAreaState();
                return false
            }
        }
    }
    switch (c) {
        case 11:
            ecWap.prodDetial.pcbuybtnRender();
            $(".pro-property-shoppingCart").hide();
            break;
        case 10:
            ecWap.prodDetial.limitTimeBuybtnRender(f);
            break;
        case 9:
            var d = "";
            if (ecWap.prodDetial.showEasybuy(f)) {
                $("#easybuy a").attr("href", f.easybuyWapUrl);
                $("#easybuy").show();
                d = " pro-property-action-2"
            }
            ecWap.prodDetial.remindsaleBtnRender(d);
            break;
        case 8:
            if (ecWap.prodDetial.productType == "4") {
                ecWap.prodDetial.rushbuyQuickBtnRender()
            } else {
                if (_getSkuRushbuyInfoApi) {
                    ecWap.prodDetial.showRush()
                } else {
                    $(".pro-property-shoppingCart").hide();
                    ecWap.prodDetial.isloadingBtnRender()
                }
            }
            break;
        case 7:
            var d = "";
            if (ecWap.prodDetial.showEasybuy(f)) {
                $("#easybuy a").attr("href", f.easybuyWapUrl);
                $("#easybuy").show();
                d = " pro-property-action-2"
            }
            ecWap.prodDetial.makeAppointBtnRender(d);
            break;
        case 6:
            ecWap.prodDetial.notSaleOnMobileBtnRender();
            $(".pro-property-shoppingCart").hide();
            break;
        case 2:
        case 4:
        case 5:
            ecWap.prodDetial.notSaleBtnRender();
            $(".pro-property-shoppingCart").hide();
            ecWap.prodDetial.disableNumArea();
            break;
        case 3:
        case 1:
            if (f.inventory <= 0) {
                var d = "";
                if (ecWap.prodDetial.showEasybuy(f)) {
                    $("#easybuy a").attr("href", f.easybuyWapUrl);
                    $("#easybuy").show();
                    d = " pro-property-action-2"
                }
                ecWap.prodDetial.arrivalNoticeBtnRender(d);
                ecWap.prodDetial.disableNumArea();
                break
            }
        default:
            ecWap.prodDetial.buynowBtnRender();
            break
    }
    ecWap.prodDetial.updateBtnAreaState()
};
ecWap.prodDetial.chooseAddress = function () {
    var b = ["1", "3", "6"].indexOf(ecWap.prodDetial.productType);
    if (b == -1 && $("#isVirtual").val() != 1) {
        var a = true
    } else {
        var a = false
    }
    if (!ecWap.prodDetial.isTriggerEvent || ecWap.prodDetial.isTriggerFirst) {
        ecWap.prodDetial.isTriggerFirst = false;
        ecWap.prodDetial.isTriggerEvent = true;
        $.ajax({
            type: "GET",
            url: provinceIpDomain + "/product/realInventory.json?skuids=" + (ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku),
            dataType: "jsonp",
            timeout: 10000,
            success: function (c) {
                if (c.success && c.skuInventoryList.length > 0) {
                    if (c.skuInventoryList[0].hasInventory && ecWap.prodDetial.isDisplayDelevery == 1 && a && $("#prdDetailAddCart").length > 0) {
                        if (ecWap.cookie.get("selectedAddress") && ecWap.cookie.get("selectedAddress").split("|")[2]) {
                            ecWap.prodDetial.initForArrival({
                                defaultValue: ecWap.cookie.get("selectedAddress").split("|")[2],
                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                names: ["province_input", "city_input", "district_input", "street_input"],
                                tips: ["请选择省份", "请选择区", "请选择乡镇/街道"],
                                arrival: true
                            });
                            ecWap.prodDetial.estimateTime(ecWap.cookie.get("selectedAddress").split("|")[2])
                        } else {
                            if (ecWap.account.id) {
                                AddressSys.service.getDefault(function (d) {
                                    if (d.success && d.shoppingConfg && d.shoppingConfg.district) {
                                        ecWap.prodDetial.initForArrival({
                                            defaultValue: d.shoppingConfg.district,
                                            ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                            names: ["province_input", "city_input", "district_input", "street_input"],
                                            tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                            arrival: true
                                        });
                                        ecWap.prodDetial.estimateTime(d.shoppingConfg.district)
                                    } else {
                                        if (ecWap.cookie.get("ipaddress")) {
                                            ecWap.prodDetial.initForArrival({
                                                defaultValue: ecWap.cookie.get("ipaddress").split("|")[2],
                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                arrival: true
                                            });
                                            ecWap.prodDetial.estimateTime(ecWap.cookie.get("ipaddress").split("|")[2])
                                        } else {
                                            ecWap.prodDetial.getAddressByIP()
                                        }
                                    }
                                })
                            } else {
                                if (ecWap.cookie.get("ipaddress")) {
                                    ecWap.prodDetial.initForArrival({
                                        defaultValue: ecWap.cookie.get("ipaddress").split("|")[2],
                                        ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                        names: ["province_input", "city_input", "district_input", "street_input"],
                                        tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                        arrival: true
                                    });
                                    ecWap.prodDetial.estimateTime(ecWap.cookie.get("ipaddress").split("|")[2])
                                } else {
                                    ecWap.prodDetial.getAddressByIP()
                                }
                            }
                        }
                    } else {
                        $("#productArrival").hide()
                    }
                } else {
                    $("#productArrival").hide()
                }
            },
            error: function () {
                $(".arrived-tips").text("暂时无法给出预计到货时间，如有疑问联系客服");
                $("#productArrival").hide();
                return false
            }
        })
    }
};
ecWap.prodDetial.estimateTime = function (a) {
    if (a) {
        productDistrictId = a
    } else {
        productDistrictId = 3873
    }
    if ($("#pro-price").text().indexOf("¥") != -1) {
        $.ajax({
            type: "GET",
            url: provinceIpDomain + "/order/estimateTime.json",
            dataType: "jsonp",
            timeout: 10000,
            data: {d: productDistrictId, p: $("#pro-price").text().split("¥")[1], i: null},
            jsonpCallback: "jsonpEstimate",
            success: function (b) {
                if (b.success) {
                    var e = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                    var d = new Date().getHours();
                    var g;
                    var f = new Date();
                    var c;
                    f.setHours(23);
                    if (d > 22) {
                        c = f.getTime() + ((b.info.deliveryTime + 24) * 60 * 60 * 1000)
                    } else {
                        c = f.getTime() + (b.info.deliveryTime * 60 * 60 * 1000)
                    }
                    f.setTime(c);
                    g = e[f.getDay()];
                    $(".arrived-tips").text("23:00点前完成支付，预计送达时间" + (f.getMonth() + 1) + "\u6708" + f.getDate() + "日（" + g + "）")
                } else {
                    $(".arrived-tips").text("暂时无法给出预计到货时间，如有疑问联系客服")
                }
            },
            error: function (b) {
                $(".arrived-tips").text("暂时无法给出预计到货时间，如有疑问联系客服");
                return false
            }
        })
    } else {
        $(".arrived-tips").text("暂时无法给出预计到货时间，如有疑问联系客服")
    }
};
ecWap.prodDetial.getAddressByIP = function () {
    $.ajax({
        type: "GET",
        url: provinceIpDomain + "/ip/location.json",
        dataType: "jsonp",
        timeout: 10000,
        success: function (a) {
            if (a.success && a.address.province) {
                $.ajax({
                    url: addressDomain + "/matchRegion.json",
                    dataType: "JSONP",
                    timeout: 10000,
                    data: {
                        provinceName: a.address.province,
                        cityName: a.address.city,
                        districtName: a.address.district
                    },
                    error: function (b, c) {
                        ecWap.prodDetial.initForArrival({
                            defaultValue: 3873,
                            ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                            names: ["province_input", "city_input", "district_input", "street_input"],
                            tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                            arrival: true
                        });
                        ecWap.prodDetial.estimateTime(3873);
                        return false
                    },
                    success: function (b) {
                        if (b.success && b.districtId) {
                            ecWap.cookie.set("ipaddress", b.provinceId + "|" + b.cityId + "|" + b.districtId, {
                                expires: 1 / 12,
                                path: "/",
                                domain: ".vmall.com"
                            });
                            ecWap.prodDetial.initForArrival({
                                defaultValue: b.districtId,
                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                names: ["province_input", "city_input", "district_input", "street_input"],
                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                arrival: true
                            });
                            ecWap.prodDetial.estimateTime(b.districtId)
                        } else {
                            if (b.success && b.cityId) {
                                $.ajax({
                                    type: "GET",
                                    url: addressDomain + "/data/region/children/" + b.cityId + ".json?callback=?",
                                    dataType: "jsonp",
                                    timeout: 10000,
                                    error: function () {
                                        ecWap.prodDetial.initForArrival({
                                            defaultValue: 3873,
                                            ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                            names: ["province_input", "city_input", "district_input", "street_input"],
                                            tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                            arrival: true
                                        });
                                        ecWap.prodDetial.estimateTime(3873)
                                    },
                                    success: function (c) {
                                        if (c.data.length > 0) {
                                            ecWap.cookie.set("ipaddress", b.provinceId + "|" + b.cityId + "|" + c.data[0].id, {
                                                expires: 1 / 12,
                                                path: "/",
                                                domain: ".vmall.com"
                                            });
                                            ecWap.prodDetial.initForArrival({
                                                defaultValue: c.data[0].id,
                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                arrival: true
                                            });
                                            ecWap.prodDetial.estimateTime(c.data[0].id)
                                        } else {
                                            ecWap.prodDetial.initForArrival({
                                                defaultValue: 3873,
                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                arrival: true
                                            });
                                            ecWap.prodDetial.estimateTime(3873)
                                        }
                                    }
                                })
                            } else {
                                if (b.success && b.provinceId) {
                                    $.ajax({
                                        type: "GET",
                                        url: addressDomain + "/data/region/children/" + b.provinceId + ".json?callback=?",
                                        dataType: "jsonp",
                                        timeout: 10000,
                                        error: function () {
                                            ecWap.prodDetial.initForArrival({
                                                defaultValue: 3873,
                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                arrival: true
                                            });
                                            ecWap.prodDetial.estimateTime(3873)
                                        },
                                        success: function (c) {
                                            if (c.data.length > 0) {
                                                $.ajax({
                                                    type: "GET",
                                                    url: addressDomain + "/data/region/children/" + c.data[0].id + ".json?callback=?",
                                                    dataType: "jsonp",
                                                    timeout: 10000,
                                                    success: function (d) {
                                                        if (d.data.length > 0) {
                                                            ecWap.cookie.set("ipaddress", b.provinceId + "|" + c.data[0].id + "|" + d.data[0].id, {
                                                                expires: 1 / 12,
                                                                path: "/",
                                                                domain: ".vmall.com"
                                                            });
                                                            ecWap.prodDetial.initForArrival({
                                                                defaultValue: d.data[0].id,
                                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                                arrival: true
                                                            });
                                                            ecWap.prodDetial.estimateTime(d.data[0].id)
                                                        } else {
                                                            ecWap.prodDetial.initForArrival({
                                                                defaultValue: 3873,
                                                                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                                names: ["province_input", "city_input", "district_input", "street_input"],
                                                                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                                arrival: true
                                                            });
                                                            ecWap.prodDetial.estimateTime(3873)
                                                        }
                                                    }
                                                })
                                            } else {
                                                ecWap.prodDetial.initForArrival({
                                                    defaultValue: 3873,
                                                    ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                                    names: ["province_input", "city_input", "district_input", "street_input"],
                                                    tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                                    arrival: true
                                                });
                                                ecWap.prodDetial.estimateTime(3873)
                                            }
                                        }
                                    })
                                } else {
                                    ecWap.prodDetial.initForArrival({
                                        defaultValue: 3873,
                                        ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                                        names: ["province_input", "city_input", "district_input", "street_input"],
                                        tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                                        arrival: true
                                    });
                                    ecWap.prodDetial.estimateTime(3873)
                                }
                            }
                        }
                    }
                })
            } else {
                ecWap.prodDetial.initForArrival({
                    defaultValue: 3873,
                    ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                    names: ["province_input", "city_input", "district_input", "street_input"],
                    tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                    arrival: true
                });
                ecWap.prodDetial.estimateTime(3873);
                return false
            }
        },
        error: function (a) {
            ecWap.prodDetial.initForArrival({
                defaultValue: 3873,
                ids: ["provinceVal", "cityVal", "districtVal", "streetVal"],
                names: ["province_input", "city_input", "district_input", "street_input"],
                tips: ["请选择省份", "请选择城市", "请选择区", "请选择乡镇/街道"],
                arrival: true
            });
            ecWap.prodDetial.estimateTime(3873);
            return false
        }
    })
};
ecWap.prodDetial.getSkuPoint = function (a) {
    ecWap.ajax({
        url: ucDomain + "/point/queryPointWeight.json?callback=?&" + a,
        dataType: "JSONP",
        timeout: 2000,
        successFunction: function (b) {
            var g = $("#skuWeight,.j_skuWeight");
            if (b.resultCode == "200") {
                for (var e = 0, d = ecWap.prodDetial.skuCodeArray.length; e < d; e++) {
                    var c = ecWap.prodDetial.skuCodeArray[e];
                    if (b.pointWeightMap[c] != undefined) {
                        if (b.pointWeightMap[c] == 0) {
                            ecWap.prodDetial.skuPointMap[c] = ""
                        } else {
                            if (b.pointWeightMap[c] == 1) {
                                ecWap.prodDetial.skuPointMap[c] = '<span class="s-border">\u8d2d\u4e70\u9001\u79ef\u5206</span>'
                            } else {
                                ecWap.prodDetial.skuPointMap[c] = '<span class="s-border">\u6d3b\u52a8\u9001\u79ef\u5206</span>'
                            }
                        }
                    } else {
                        if (!ecWap.prodDetial.isConsignment && ecWap.prodDetial.productType != "3") {
                            ecWap.prodDetial.skuPointMap[c] = '<span class="s-border">\u8d2d\u4e70\u9001\u79ef\u5206</span>'
                        } else {
                            ecWap.prodDetial.skuPointMap[c] = ""
                        }
                    }
                    if (g.length > 0) {
                        var f = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku());
                        if (f && ecWap.prodDetial.skuPointMap[f.code] != undefined) {
                            g.show();
                            g.html(ecWap.prodDetial.skuPointMap[f.code])
                        } else {
                            g.hide()
                        }
                    }
                }
            } else {
                if (g.length > 0) {
                    g.addClass("hide")
                }
            }
        }
    })
};
ecWap.prodDetial.warrantyInit = function (a, h) {
    var d = '<div class="insurance-cont"><dl id="extArea" class="clearfix pchoice-insurance"> <dt> <label>\u5ef6\u4fdd</label> </dt> <dd id="extWarrantyList"> </dd> <div class="clearfix"><a href="javascript:;" class="j_extWarrantyDetail" id="extWarrantyDetail">\u8be6\u60c5 &gt;</a></div> </dl> <dl id="accArea" class="clearfix pchoice-insurance"> <dt> <label>\u788e\u5c4f\u4fdd</label> </dt> <dd id="accWarrantyList"> </dd> <div class="clearfix"><a href="javascript:;" class="j_accWarrantyDetail" id="accWarrantyDetail">\u8be6\u60c5 &gt;</a></div> </dl> </div>';
    ecWap.prodDetial.warrantDialog = new ecWap.slideBox(d, {
        id: "warrantDialogBox",
        className: "ecWap-box-em ecWap-box-lower",
        ishtml: true,
        title: "选择保障服务",
        height: $(window).height() * 0.6,
        position: "bottom",
        ok_txt: "\u786e\u5b9a",
        onok: function (i) {
            ecWap.prodDetial.showMessageForWarrant();
            i.close()
        },
        close: function (i) {
            ecWap.prodDetial.showMessageForWarrant();
            i.close()
        }
    });
    $("#ecWap-box-bg-warrantDialogBox").click(function () {
        ecWap.prodDetial.warrantDialog.close();
        ecWap.prodDetial.showMessageForWarrant()
    });
    $("#selectExtWarrantyId, #selectAccWarrantyId").val("");
    $("#extWarrantyId, #accWarrantyId").val("");
    $("#extWarrantyDetail, #accWarrantyDetail").attr("href", "javascript:;").hide();
    ecWap.prodDetial.showMessageForWarrant();
    if (a.length <= 0 && h.length <= 0) {
        $("#warrantEntry").hide()
    } else {
        $("#warrantEntry").show()
    }
    if ((ecWap.prodDetial.isShowExtendInfo == 1 && ecWap.account.isPriorityBuy != 1) || (ecWap.prodDetial.isShowExtendInfo == 1 && ecWap.account.isPriorityBuy == 1 && ecWap.account.prioritySkuId != ecWap.prodDetial.getSku())) {
        if (a.length > 0) {
            var j = "";
            if ($("#extWarrantyId").val() == "") {
                j = "selected"
            }
            var b = '<a href="javascript:;" class="j_extunselect ' + j + '" onclick="ecWap.prodDetial.extUnSelect();"><span>无需延保</span></a>';
            for (var c = 0; c < a.length; c++) {
                var f = "";
                if ($("#extWarrantyId").val() == a[c].skuId) {
                    f = "selected";
                    $("#extWarrantyDetail").show();
                    $("#extWarrantyDetail").attr("href", "/product/" + a[c].prdId + ".html#" + a[c].skuId)
                } else {
                    $("#extWarrantyDetail").hide()
                }
                b += '<a href="javascript:;" class="j_extwarrantyitem ' + f + '" onclick="ecWap.prodDetial.WarrantySelect(1,' + a[c].prdId + "," + a[c].skuId + ',this);" ><span class="j_warrprice">&nbsp;&yen;' + a[c].skuPrice + '</span><span class="j_warrname">' + a[c].skuName + "</span></a>"
            }
            $("#extWarrantyList").html(b);
            $("#extArea").show()
        } else {
            $("#extWarrantyList").html("");
            $("#extArea").hide()
        }
        if (h.length > 0) {
            var g = "";
            if ($("#accWarrantyId").val() == "") {
                g = "selected"
            }
            var e = '<a href="javascript:;" class="j_accunselect ' + g + '"onclick="ecWap.prodDetial.accUnSelect();"><span>无需碎屏保</span></a>';
            for (var c = 0; c < h.length; c++) {
                var f = "";
                if ($("#accWarrantyId").val() == h[c].skuId) {
                    f = "selected";
                    $("#accWarrantyDetail").show();
                    $("#accWarrantyDetail").attr("href", "/product/" + h[c].prdId + ".html#" + h[c].skuId)
                } else {
                    $("#accWarrantyDetail").hide()
                }
                e += '<a href="javascript:;" class="j_accwarrantyitem ' + f + '" onclick="ecWap.prodDetial.WarrantySelect(6,' + h[c].prdId + "," + h[c].skuId + ',this);" ><span class="j_warrprice">&nbsp;&yen;' + h[c].skuPrice + '</span><span class="j_warrname">' + h[c].skuName + "</span></a>"
            }
            $("#accWarrantyList").html(e);
            $("#accArea").show()
        } else {
            $("#accWarrantyList").html("");
            $("#accArea").hide()
        }
    } else {
        $("#warrantEntry").hide();
        $("#selectExtWarrantyId, #selectAccWarrantyId").val("");
        $("#extWarrantyId, #accWarrantyId").val("");
        $("#extWarrantyDetail, #accWarrantyDetail").attr("href", "javascript:;").hide()
    }
    $("#warrantEntry").off("click").on("click", function () {
        ecWap.prodDetial.warrantDialog.slideshow()
    })
};
ecWap.prodDetial.showMessageForWarrant = function () {
    if ($("#selectExtWarrantyId").val() != "" && $("#selectAccWarrantyId").val() != "") {
        $("#guaranteeMessage").hide()
    } else {
        $("#guaranteeMessage").show()
    }
    var c = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
    if ($("#selectExtWarrantyId").val() == "") {
        $("#extMessage").hide()
    } else {
        for (var b = 0; b < c.extWarranty.length; b++) {
            if (c.extWarranty[b].skuId == $("#selectExtWarrantyId").val()) {
                $("#extMessage span:first").html(c.extWarranty[b].skuName);
                $("#extMessage span:last").html("&nbsp;&yen;" + c.extWarranty[b].skuPrice);
                $("#extMessage").show();
                break
            }
        }
    }
    if ($("#selectAccWarrantyId").val() == "") {
        $("#accMessage").hide()
    } else {
        for (var a = 0; a < c.accWarranty.length; a++) {
            if (c.accWarranty[a].skuId == $("#selectAccWarrantyId").val()) {
                $("#accMessage span:first").html(c.accWarranty[a].skuName);
                $("#accMessage span:last").html("&nbsp;&yen;" + c.accWarranty[a].skuPrice);
                $("#accMessage").show();
                break
            }
        }
    }
};
ecWap.prodDetial.WarrantySelect = function (a, c, b, d) {
    $(d).parent().find("a").removeClass("selected");
    $(d).addClass("selected");
    if (a == "1") {
        $("#selectExtWarrantyId").val(b);
        $("#extWarrantyId").val(b);
        $("#extWarrantyDetail").show();
        $("#extWarrantyDetail").attr("href", "/product/" + c + ".html#" + b)
    } else {
        $("#selectAccWarrantyId").val(b);
        $("#accWarrantyId").val(b);
        $("#accWarrantyDetail").show();
        $("#accWarrantyDetail").attr("href", "/product/" + c + ".html#" + b)
    }
};
ecWap.prodDetial.extUnSelect = function () {
    var a = $(".j_extunselect");
    if (!a.hasClass("selected")) {
        $(".j_extwarrantyitem").removeClass("selected");
        a.addClass("selected");
        $("#selectExtWarrantyId").val("");
        $("#extWarrantyId").val("");
        $(".j_extWarrantyDetail").hide();
        $("#extWarrantyDetail").attr("href", "javascript:;")
    }
};
ecWap.prodDetial.accUnSelect = function () {
    var a = $(".j_accunselect");
    if (!a.hasClass("selected")) {
        $(".j_accwarrantyitem").removeClass("selected");
        a.addClass("selected");
        $("#selectAccWarrantyId").val("");
        $("#accWarrantyId").val("");
        $(".j_accWarrantyDetail").hide();
        $("#accWarrantyDetail").attr("href", "javascript:;")
    }
};
ecWap.prodDetial.initSwiper = function () {
    if ($("#slider li").length > 1) {
        ecWap.prodDetial.slide = new Swiper("#slider", {
            pagination: "#sliderNav",
            paginationType: "fraction",
            paginationFractionRender: function (a, c, b) {
                return '<span class="' + c + '"></span>/<span class="' + b + '"></span>'
            },
            loop: true,
            centeredSlides: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false
        })
    } else {
        if ($("#slider li").length == 1) {
            ecWap.prodDetial.slide = new Swiper("#slider", {
                centeredSlides: true,
                pagination: "#sliderNav",
                paginationType: "fraction"
            });
            $("#sliderNav").show()
        } else {
            ecWap.prodDetial.slide = new Swiper("#slider", {centeredSlides: true})
        }
    }
};


//
ecWap.prodDetial.updateSwiper = function (d) {
    var c = [];
    if (d.imgName) {
        if (d.imgName.length > 0) {
            $("#sliderNav").show();
            var a = 0;
            ecWap.prodDetial.bigImgList = [];
            c.push("<li class=\"swiper-slide\" style=\"width: 100%; vertical-align: top;\" onclick=\"_paq.push(['trackLink', 'wap-pdp-focus-click_event', 'link', '']); ecWap.prodDetial.showImg(" + a + ')"><img src="' + mediaPath + d.photoPath + d.photoName + '"/></li>');
            ecWap.prodDetial.bigImgList.push(mediaPath + d.photoPath + d.photoName);
            for (var b = 0; b < d.imgName.length; b++) {
                a += 1;
                c.push("<li class=\"swiper-slide\" onclick=\"_paq.push(['trackLink', 'wap-pdp-focus-click_event', 'link', '']); ecWap.prodDetial.showImg(" + a + ')"><img src="' + mediaPath + d.imgName[b].path + d.imgName[b].name + '"/></li>');
                ecWap.prodDetial.bigImgList.push(mediaPath + d.imgName[b].path + "/800_800_" + d.imgName[b].name)
            }
            $("#slider ul").html(c.join(""))
        } else {
            $("#sliderNav").hide();
            var a = 0;
            ecWap.prodDetial.bigImgList = [];
            c.push("<li class=\"swiper-slide\" style=\"width: 100%; vertical-align: top;\" onclick=\"_paq.push(['trackLink', 'wap-pdp-focus-click_event', 'link', '']); ecWap.prodDetial.showImg(" + a + ')"><img src="' + mediaPath + d.photoPath + d.photoName + '"/></li>');
            ecWap.prodDetial.bigImgList.push(mediaPath + d.photoPath + d.photoName);
            $("#slider ul").html(c.join(""))
        }
    }
    ecWap.prodDetial.slide.destroy(true, true);
    ecWap.prodDetial.initSwiper()
};


//显示邮寄地址
ecWap.prodDetial.showDeliAddress = function () {
    if (ecWap.prodDetial.countNumber == ecWap.prodDetial.countAttr || ecWap.prodDetial.isSkulistBlank) {
        ecWap.prodDetial.initialFinished = true;
        var a = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
        ecWap.prodDetial.skuPromWordRender(a);
        ecWap.prodDetial.chooseAddress();
        if (ecWap.prodDetial.productType != "4") {
            if (parseInt(a.buttonMode, 10) == 8) {
                if (ecWap.prodDetial.rushbuySkuIds.indexOf(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku) != -1) {
                    ecWap.prodDetial.isloadingBtnRender();
                    $(".pro-property-shoppingCart").hide()
                }
            }
            ecWap.prodDetial.rush()
        }
    } else {
        if (ecWap.prodDetial.initialFinished) {
            ecWap.prodDetial.chooseAddress()
        }
    }
};
ecWap.prodDetial.rush = function () {
    _getSkuRushbuyInfoApi = false;
    if (_countDown == null) {
        _countDown = setInterval(function () {
            _countSecs--;
            if (_countSecs == 0) {
                clearInterval(_countDown);
                _countDown = null;
                var a = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku() || ecWap.prodDetial.defaultSku);
                if (parseInt(a.buttonMode, 10) == 8 && !_getSkuRushbuyInfoApi) {
                    ecWap.prodDetial.rushbuyBtnRender();
                    $(".pro-property-shoppingCart").hide();
                    $("#easybuy").hide();
                    ecWap.prodDetial.updateBtnAreaState()
                }
            }
        }, 1000)
    }
    ecWap.prodDetial.bhtml = "";
    $.ajax({
        url: rbDomain + "/getSkuRushbuyInfo.json?skuIds=" + ecWap.prodDetial.rushbuySkuIds + "&time=" + (new Date().getTime()),
        type: "get",
        dataType: "jsonp",
        timeout: 30000,
        success: function (a) {
            if (a.success) {
                ecWap.prodDetial.skuRushBuyInfoList = a.skuRushBuyInfoList;
                ecWap.prodDetial.nowTimeForRush = a.currentTime;
                if (ecWap.prodDetial.rushbuySkuIds.indexOf(ecWap.prodDetial.getSku()) != -1 && !_getSkuRushbuyInfoApi) {
                    ecWap.prodDetial.showRush();
                    ecWap.prodDetial.updateBtnAreaState()
                }
                _getSkuRushbuyInfoApi = true
            } else {
                ecWap.prodDetial.skuRushBuyInfoList = [];
                _getSkuRushbuyInfoApi = false
            }
        },
        error: function () {
            ecWap.prodDetial.skuRushBuyInfoList = [];
            _getSkuRushbuyInfoApi = false
        }
    })
};
ecWap.prodDetial.showRush = function () {
    if (ecWap.prodDetial.skuRushBuyInfoList) {
        $.each(ecWap.prodDetial.skuRushBuyInfoList, function (f, e) {
            if (e.skuId == ecWap.prodDetial.getSku()) {
                var j = ecWap.prodDetial.getSku(), c = ecWap.prodDetial.getSkuInfo(ecWap.prodDetial.getSku()), a = [],
                    k = a.join(",");
                ecWap.prodDetial.rushUrl = encodeURIComponent(encodeURIComponent("/product/" + ecWap.prodDetial.prdId + ".html#" + j));
                $.each(c.giftList, function (l, m) {
                    for (var l = 0; l < m.length; l++) {
                        a.push(m[l].giftSkuId)
                    }
                });
                clearInterval(_countDown);
                _countDown = null;
                if (e.isRushBuySku == false || e.endTime < ecWap.prodDetial.nowTimeForRush) {
                    var b = "";
                    if (ecWap.prodDetial.showEasybuy(c)) {
                        $("#easybuy a").attr("href", c.easybuyWapUrl);
                        $("#easybuy").show();
                        b = " pro-property-action-2"
                    }
                    $(".pro-property-shoppingCart").show();
                    ecWap.prodDetial.outOfStockBtnRender(b)
                } else {
                    if (!ecWap.account.id) {
                        if (e.isRushBuySku == true && e.startTime > ecWap.prodDetial.nowTimeForRush) {
                            if ((e.startTime - ecWap.prodDetial.nowTimeForRush) / 1000 > 0) {
                                ecWap.prodDetial.downTimeForRush(e, false, c)
                            } else {
                                ecWap.prodDetial.rushbuyBtnRender();
                                $(".pro-property-shoppingCart").hide();
                                $("#easybuy").hide()
                            }
                        } else {
                            if (e.isRushBuySku == true && e.skuStatus == 2 && e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                ecWap.prodDetial.rushbuyDisableBtnRender();
                                $(".pro-property-shoppingCart").hide();
                                $("#easybuy").hide()
                            } else {
                                if (e.isRushBuySku == true && e.skuStatus == 1 && e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                    ecWap.prodDetial.rushbuyBtnRender();
                                    $(".pro-property-shoppingCart").hide();
                                    $("#easybuy").hide()
                                } else {
                                    if (e.isRushBuySku == true && e.skuStatus == 0 && e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                        var b = " pro-property-action-0";
                                        if (ecWap.prodDetial.showEasybuy(c)) {
                                            $("#easybuy a").attr("href", c.easybuyWapUrl);
                                            $("#easybuy").show();
                                            b = ""
                                        }
                                        ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + b + '" ><a href="javascript:;" class="j_selloutbtn button-style-1-big-disabled"><span>\u5df2\u552e\u5b8c</span></a></article></section>';
                                        $(".pro-property-shoppingCart").hide();
                                        $("#pro-operation").html(ecWap.prodDetial.bhtml)
                                    }
                                }
                            }
                        }
                    } else {
                        if (e.isRushBuySku == true) {
                            if (e.skuStatus == 0) {
                                if (e.startTime > ecWap.prodDetial.nowTimeForRush) {
                                    var b = "";
                                    if (ecWap.prodDetial.showEasybuy(c)) {
                                        $("#easybuy a").attr("href", c.easybuyWapUrl);
                                        $("#easybuy").show();
                                        b = " pro-property-action-2"
                                    }
                                    $(".pro-property-shoppingCart").show();
                                    ecWap.prodDetial.outOfStockBtnRender(b);
                                    return false
                                }
                                var b = " pro-property-action-0";
                                if (ecWap.prodDetial.showEasybuy(c)) {
                                    $("#easybuy a").attr("href", c.easybuyWapUrl);
                                    $("#easybuy").show();
                                    b = ""
                                }
                                ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + b + '" ><a href="javascript:;" class="j_selloutbtn button-style-1-big-disabled"><span>\u5df2\u552e\u5b8c</span></a></article></section>';
                                $(".pro-property-shoppingCart").hide();
                                $("#pro-operation").html(ecWap.prodDetial.bhtml);
                                return false
                            }
                            if (e.skuStatus == 2) {
                                ecWap.prodDetial.rushbuyDisableBtnRender();
                                $(".pro-property-shoppingCart").hide();
                                $("#easybuy").hide();
                                return false
                            }
                            if (e.qids) {
                                var h = e.qids
                            } else {
                                var h = 0
                            }
                            if (ecWap.cookie.get("isqueue-" + e.activityId + "-" + ecWap.cookie.get("uid"))) {
                                var g = ecWap.cookie.get("isqueue-" + e.activityId + "-" + ecWap.cookie.get("uid"));
                                var d = ecWap.cookie.get("isqueue-" + e.activityId + "-" + ecWap.cookie.get("uid"));
                                if ((h == 0 || (h != 0 && g == 1)) && e.startTime > ecWap.prodDetial.nowTimeForRush) {
                                    ecWap.prodDetial.downTimeForRush(e, true, c)
                                } else {
                                    if ((h == 0 || (h != 0 && g == 1)) && e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                        ecWap.prodDetial.rushbuyBtnRender();
                                        $(".pro-property-shoppingCart").hide();
                                        $("#easybuy").hide()
                                    } else {
                                        if (h != 0 && g == 2) {
                                            var b = " pro-property-action-0";
                                            if (ecWap.prodDetial.showEasybuy(c)) {
                                                $("#easybuy a").attr("href", c.easybuyWapUrl);
                                                $("#easybuy").show();
                                                b = ""
                                            }
                                            ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + b + ' pro-property-action-p" ><p class="p-center">\u60a8\u4e0d\u7b26\u5408\u672c\u6b21\u8d2d\u4e70\u6761\u4ef6</p></article></section>';
                                            $("#pro-operation").html(ecWap.prodDetial.bhtml);
                                            $(".pro-property-shoppingCart").hide()
                                        }
                                    }
                                }
                            } else {
                                $.ajax({
                                    url: yyDomain + "/ivy/isqueue.jsp?uid=" + ecWap.cookie.get("uid") + "&qid=" + h,
                                    dataType: "jsonp",
                                    jsonpCallback: "callbackqueue",
                                    success: function (i) {
                                        ecWap.cookie.set("isqueue-" + e.activityId + "-" + ecWap.cookie.get("uid"), i.isqueue, {
                                            expires: (e.endTime - ecWap.prodDetial.nowTime) / (1000 * 24 * 60 * 60),
                                            path: "/",
                                            domain: ".vmall.com"
                                        });
                                        ecWap.cookie.set("queueSign-" + e.activityId + "-" + ecWap.cookie.get("uid"), i.queueSign, {
                                            expires: (e.endTime - ecWap.prodDetial.nowTime) / (1000 * 24 * 60 * 60),
                                            path: "/",
                                            domain: ".vmall.com"
                                        });
                                        if ((h == 0 || (h != 0 && i.isqueue == 1)) && e.startTime > ecWap.prodDetial.nowTimeForRush) {
                                            ecWap.prodDetial.downTimeForRush(e, true, c)
                                        } else {
                                            if ((h == 0 || (h != 0 && i.isqueue == 1)) && e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                                ecWap.prodDetial.rushbuyBtnRender();
                                                $(".pro-property-shoppingCart").hide();
                                                $("#easybuy").hide()
                                            } else {
                                                if (h != 0 && i.isqueue == 2) {
                                                    var l = " pro-property-action-0";
                                                    if (ecWap.prodDetial.showEasybuy(c)) {
                                                        $("#easybuy a").attr("href", c.easybuyWapUrl);
                                                        $("#easybuy").show();
                                                        l = ""
                                                    }
                                                    ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + l + ' pro-property-action-p" ><p class="p-center">\u60a8\u4e0d\u7b26\u5408\u672c\u6b21\u8d2d\u4e70\u6761\u4ef6</p></article></section>';
                                                    $("#pro-operation").html(ecWap.prodDetial.bhtml);
                                                    $(".pro-property-shoppingCart").hide()
                                                }
                                            }
                                        }
                                        ecWap.prodDetial.updateBtnAreaState()
                                    },
                                    error: function () {
                                        if (e.startTime > ecWap.prodDetial.nowTimeForRush) {
                                            ecWap.prodDetial.downTimeForRush(e, true, c)
                                        } else {
                                            if (e.startTime <= ecWap.prodDetial.nowTimeForRush && e.endTime >= ecWap.prodDetial.nowTimeForRush) {
                                                ecWap.prodDetial.rushbuyBtnRender();
                                                $(".pro-property-shoppingCart").hide();
                                                $("#easybuy").hide();
                                                ecWap.prodDetial.updateBtnAreaState()
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
                return false
            }
        })
    }
};
ecWap.prodDetial.rushBuy = function () {
    var d = [], a = ecWap.prodDetial.getSku(), c = ecWap.prodDetial.getSkuInfo(a);
    if ($("#selectExtWarrantyId").val() != "") {
        d.push($("#selectExtWarrantyId").val())
    }
    if ($("#selectAccWarrantyId").val() != "") {
        d.push($("#selectAccWarrantyId").val())
    }
    if (ecWap.account.id) {
        location.href = c.wapUrl + "?mainSku=" + a + "&accessoriesSkus=" + d.join(",") + "&backUrl=" + encodeURIComponent(location.origin + location.pathname + "#" + a)
    } else {
        var b = window.navigator.userAgent.toLowerCase();
        if (b.match(/MicroMessenger/i) == "micromessenger") {
            location.href = "/thirdparty/wechat/vcode/ad?url=" + encodeURIComponent(location.pathname + "#" + a)
        } else {
            location.href = "/account/applogin?url=" + encodeURIComponent(encodeURIComponent(location.pathname + "#" + a))
        }
    }
};
ecWap.prodDetial.downTimeForRush = function (e, b, d) {
    var c = " pro-property-action-0";
    if (ecWap.prodDetial.showEasybuy(d)) {
        $("#easybuy a").attr("href", d.easybuyWapUrl);
        $("#easybuy").show();
        c = ""
    }
    if (b) {
        ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + c + ' pro-property-action-disabled" ><a href="javascript:;" class="j_willstartbtn button-style-1-big"><span>\u5373\u5c06\u5f00\u59cb</span></a></article></section>'
    } else {
        var a = window.navigator.userAgent.toLowerCase();
        if (a.match(/MicroMessenger/i) == "micromessenger") {
            ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + c + ' pro-property-action-logout" ><a href="/thirdparty/wechat/vcode/ad?url=' + decodeURIComponent(ecWap.prodDetial.rushUrl) + '" class="j_loginaheadtime button-style-1-big"><span>\u63d0\u524d\u767b\u5f55</span></a></article></section>'
        } else {
            ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + c + ' pro-property-action-logout" ><a href="/account/applogin?url=' + ecWap.prodDetial.rushUrl + '" class="j_loginaheadtime button-style-1-big"><span>\u63d0\u524d\u767b\u5f55</span></a></article></section>'
        }
    }
    $("#pro_detail_time").html("<span>" + new Date(e.startTime).format("MM\u6708dd\u65e5 HH:mm") + '\u5f00\u552e  \u5012\u8ba1\u65f6\uff1a<em id ="hour"></em>&nbsp;\u65f6&nbsp;<em id ="minutes"></em>&nbsp;\u5206&nbsp;<em id ="seconds"></em>&nbsp;\u79d2&nbsp;</span>');
    $("#pro-operation").html(ecWap.prodDetial.bhtml);
    $("#mainCountdownArea").show();
    ecWap.CountdownForRush(e.startTime, ecWap.prodDetial.nowTimeForRush, "pro_detail_time");
    $(".pro-property-shoppingCart").hide();
    if (ecWap.prodDetial.timer) {
        clearInterval(ecWap.prodDetial.timer);
        ecWap.prodDetial.timer = null
    }
    ecWap.prodDetial.timer = setInterval(function () {
        if (e.startTime - ecWap.prodDetial.nowTimeForRush > 0) {
            var g = " pro-property-action-0";
            if (ecWap.prodDetial.showEasybuy(d)) {
                $("#easybuy a").attr("href", d.easybuyWapUrl);
                $("#easybuy").show();
                g = ""
            }
            if (b) {
                ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + g + ' pro-property-action-disabled" ><a href="javascript:;" class="j_willstartbtn button-style-1-big"><span>\u5373\u5c06\u5f00\u59cb</span></a></article></section>'
            } else {
                var f = window.navigator.userAgent.toLowerCase();
                if (f.match(/MicroMessenger/i) == "micromessenger") {
                    ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + g + ' pro-property-action-logout" ><a href="/thirdparty/wechat/vcode/ad?url=' + decodeURIComponent(ecWap.prodDetial.rushUrl) + '" class="j_loginaheadtime button-style-1-big"><span>\u63d0\u524d\u767b\u5f55</span></a></article></section>'
                } else {
                    ecWap.prodDetial.bhtml = '<section class="pro-property-action-area"><article class="pro-property-action' + g + ' pro-property-action-logout" ><a href="/account/applogin?url=' + ecWap.prodDetial.rushUrl + '" class="j_loginaheadtime button-style-1-big"><span>\u63d0\u524d\u767b\u5f55</span></a></article></section>'
                }
            }
            $("#pro_detail_time").html("<span>" + new Date(e.startTime).format("MM\u6708dd\u65e5 HH:mm") + '\u5f00\u552e  \u5012\u8ba1\u65f6\uff1a<em id ="hour"></em>&nbsp;\u65f6&nbsp;<em id ="minutes"></em>&nbsp;\u5206&nbsp;<em id ="seconds"></em>&nbsp;\u79d2&nbsp;</span>');
            $("#pro-operation").html(ecWap.prodDetial.bhtml);
            $("#mainCountdownArea").show();
            ecWap.prodDetial.nowTimeForRush += 1000;
            ecWap.CountdownForRush(e.startTime, ecWap.prodDetial.nowTimeForRush, "pro_detail_time")
        }
        if (!ecWap.CountdownForRush(e.startTime, ecWap.prodDetial.nowTimeForRush, "pro_detail_time")) {
            ecWap.prodDetial.rushbuyBtnRender();
            clearInterval(ecWap.prodDetial.timer);
            ecWap.prodDetial.timer = null;
            $(".pro-property-shoppingCart").hide();
            $("#easybuy").hide();
            $("#mainCountdownArea").hide();
            ecWap.prodDetial.skuResultBottomShowAndClickable()
        }
    }, 1000);
    ecWap.prodDetial.updateBtnAreaState()
};
ecWap.prodDetial.easybuyInTime = function (c, b) {
    var d = new Date(c).getTime(), a = new Date(b).getTime();
    if (isNaN(new Date(c))) {
        d = new Date(c.replace(/-/g, "/")).getTime()
    }
    if (isNaN(new Date(b))) {
        a = new Date(b.replace(/-/g, "/")).getTime()
    }
    if (((a - ecWap.prodDetial.nowTime) / 1000) > 0 && ((ecWap.prodDetial.nowTime - d) / 1000) > 0) {
        return true
    }
    return false
};
ecWap.prodDetial.showEasybuy = function (a) {
    if (a && a.isEasybuy == "1" && ecWap.account.isPriorityBuy != 1 && ecWap.prodDetial.easybuyInTime(a.easybuyStartTime, a.easybuyEndTime)) {
        return true
    } else {
        return false
    }
};
function checkedTimerPromWord() {
    if (ecWap.defaultPrdSkutimerPromStarttime != null && ecWap.defaultPrdSkutimerPromStarttime != "" && ecWap.defaultPrdSkutimerPromEndtime != null && ecWap.defaultPrdSkutimerPromEndtime != "") {
        var c = new Date;
        var a = ecWap.defaultPrdSkutimerPromStarttime;
        var b = ecWap.defaultPrdSkutimerPromEndtime;
        if ((Date.parse(a) <= Date.parse(c)) && (Date.parse(c) <= Date.parse(b))) {
            $(".j_pagetimerPromWord").show()
        } else {
            $(".j_pagetimerPromWord").hide()
        }
    }
}
function getBackUri() {
    var a = "/product/";
    a = a + ecWap.prodDetial.prdId + ".html";
    document.getElementById("backUri").value = a
}
ecWap.prodDetial.share = function () {
    var a = window;
    if (!ecWap.prodDetial.isBlackListBrowser(navigator.appVersion)) {
        a = window.open("http://v.t.sina.com.cn/share/share.php")
    }
    ecWap.prodDetial.weiboshare(a)
};
ecWap.prodDetial.isBlackListBrowser = function (a) {
    return (a.indexOf("baidu") != -1 || a.indexOf("QQ/") != -1 || a.indexOf("LieBaoFast") != -1 || a.indexOf("MxBrowser") != -1 || a.indexOf("MicroMessenger") != -1 || a.indexOf("360 A") != -1 || a.indexOf("MQQBrowser") != -1)
};
ecWap.prodDetial.weiboshare = function (e) {
    var d = wapDomain + "?goods.php" + ecWap.prodDetial.prdId + ".html",
        b = "http://v.t.sina.com.cn/share/share.php?appkey=23431084",
        a = ["&url=", encodeURIComponent(d), "&title=", encodeURIComponent($("#pro-name").text()), "&content=utf-8", "&pic=", encodeURIComponent(ecWap.prodDetial.bigImgList[0])].join("");

    function c() {
        e.location.href = [b, a].join("")
    }

    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(c, 0)
    } else {
        c()
    }
};
ecWap.prodDetial.getCouponHtml = function (e) {
    var j = '<div class="coupons-cont"><ul>';
    for (var f = 0, d = e.length; f < d; f++) {
        var h = e[f], c = "button-vip-benefit-get j_getCouponBtn", a = "\u7acb\u5373\u9886\u53d6", b = "",
            g = "<span>&yen </span><em>" + h.amount + "</em> \u4f18\u60e0\u5238";
        switch ("" + h.state) {
            case"-1":
                c = "button-vip-benefit-had";
                a = "\u5df2\u9886\u5b8c";
                break;
            case"1":
                c = "button-vip-benefit-get j_getCouponBtn";
                a = "\u7acb\u5373\u9886\u53d6";
                break;
            case"2":
                c = "button-vip-benefit-had";
                a = "\u5df2\u9886\u53d6";
                break;
            case"3":
                c = "button-vip-benefit-begin";
                a = "\u5373\u5c06\u5f00\u59cb";
                break;
            case"4":
                c = "button-vip-benefit-disabled";
                a = "\u5df2\u7ed3\u675f";
                break;
            default:
                c = "button-vip-benefit-get j_getCouponBtn";
                a = "\u7acb\u5373\u9886\u53d6"
        }
        if (h.discount && h.discount != 0 && h.deliveryFree == 0) {
            b = "coupons-discount";
            g = "<em>" + ecWap.prodDetial.transDiscount(h.discount * 10) + "</em><span>\u6298</span> \u4f18\u60e0\u5238"
        }
        if ((((h.amount == 0 && !h.discount) || (!h.amount && h.discount == 0)) && h.deliveryFree == 1) || ((h.amount != 0 || h.discount != 0) && h.deliveryFree == 1)) {
            b = "coupons-noPostage";
            g = "\u514d\u90ae\u5238"
        }
        j += '<li><div class="coupons-item ' + b + '"><div class="coupons-box"><p class="p-name">' + g + '</p><p class="p-desc"><span>' + h.batchName + '</span></p><p class="p-date"><span>\u6709\u6548\u671f\uff1a' + h.beginDate + " - " + h.endDate + '</span></p><p class="p-button"><a href="javascript:;" class="' + c + '" batchCode="' + h.batchCode + '"  activityCode="' + h.activityCode + '"><span>' + a + "</span></a></p></div></div></li>"
    }
    j += "</ul></div>";
    return j
};
ecWap.prodDetial.transDiscount = function (b) {
    var a = (b.toString()).indexOf(".");
    if (a != -1) {
        return b.toFixed(1)
    } else {
        return b
    }
};
ecWap.prodDetial.couponAction = {
    Domain: {WAP: wapDomain, AMS: amsDomain},
    Url: {
        LOGIN: "/account/applogin?url=",
        BIND_PHONE: "/shoppingCart/bindingPhoneNum?url=",
        AUTHENTICATE: "/auth/index?c_url=",
        PICK_COUPON: "/couponCodeActivity/receive.json"
    },
    promptInfo: {
        coupnMsg: {
            9200: "被你的热情吓到了，容我缓缓",
            9201: "被你的热情吓到了，容我缓缓",
            9202: "被你的热情吓到了，容我缓缓",
            9203: "被你的热情吓到了，容我缓缓",
            9204: "别着急，活动还没开始呦",
            9205: "来晚了，活动结束啦",
            9206: "",
            9207: "亲，您的等级不满足活动条件哦",
            9208: "亲，绑定手机后才能领取哦",
            9209: "亲，绑定手机后才能领取哦",
            9210: "亲，绑定手机后才能领取哦",
            9211: "亲，绑定手机后才能领取哦",
            9212: "亲，您已领过啦",
            9213: "亲，您暂不符合领取优惠券的签到要求哦",
            9214: "亲，优惠券已领完啦",
            9215: "亲，您的签到值不足",
            9216: "亲，您的积分不足",
            9217: "粉丝太热情，此优惠券被领完了噢",
            9218: "亲，还没到领取时间哟",
            other: "被你的热情吓到了，容我缓缓"
        }
    },
    isEmpty: function (a) {
        return ("undefined" == a || null == a || "" == a || 0 == a.length)
    },
    buildQueryStr: function (a) {
        var b = {};
        if (ecWap.prodDetial.couponAction.isEmpty(a)) {
            return b
        }
        if (!ecWap.prodDetial.couponAction.isEmpty(a.activityCode)) {
            b.activityCode = a.activityCode
        }
        if (!ecWap.prodDetial.couponAction.isEmpty(a.batchCode)) {
            b.batchCode = a.batchCode
        }
        if (!ecWap.prodDetial.couponAction.isEmpty(a.batchCode)) {
            b.receiveChannel = a.receiveChannel
        }
        return b
    },
    getJSON: function (b) {
        if (ecWap.prodDetial.couponAction.isEmpty(b) || ecWap.prodDetial.couponAction.isEmpty(b.url)) {
            return null
        }
        var a = ecWap.prodDetial.couponAction.Domain.AMS + b.url + "?t=" + new Date().getTime() + "&";
        $.ajax({
            url: a, dataType: "JSONP", data: b.data, timeout: 10000, error: function (c, d) {
                ecWap.prodDetial.couponAction.forbidRepeatClick(false);
                ecWap.box("被你的热情吓到了，容我缓缓", {
                    id: "couponBox",
                    width: 80
                });
                return false
            }, success: function (c) {
                ecWap.prodDetial.couponAction.forbidRepeatClick(false);
                b.callback(b.jqobj, c)
            }
        })
    },
    getCoupon: function (d, b, c) {
        var a = {};
        a.url = ecWap.prodDetial.couponAction.Url.PICK_COUPON;
        a.activityCode = b;
        a.batchCode = c;
        a.receiveChannel = 2;
        a.callback = ecWap.prodDetial.couponAction.getCouponCallback;
        a.data = ecWap.prodDetial.couponAction.buildQueryStr(a);
        a.jqobj = d;
        ecWap.prodDetial.couponAction.getJSON(a)
    },
    getCouponCallback: function (c, b) {
        ecWap.prodDetial.isFirstInit = true;
        var a = "";
        if (b && b.success) {
            if (b.wapReviceSuccTip != null && b.wapReviceSuccTip != "") {
                a = b.wapReviceSuccTip
            } else {
                a = "领取优惠券成功"
            }
            if (b.state != "1") {
                switch ("" + b.state) {
                    case"-1":
                        c.attr("class", "button-vip-benefit-had");
                        c.find("span").text("已领完");
                        break;
                    case"2":
                        c.attr("class", "button-vip-benefit-had");
                        c.find("span").text("已领取");
                        break;
                    case"3":
                        c.attr("class", "button-vip-benefit-begin");
                        c.find("span").text("即将开始");
                        break;
                    case"4":
                        c.attr("class", "button-vip-benefit-disabled");
                        c.find("span").text("已结束");
                        break
                }
                c.off("click")
            }
        } else {
            a = b.msg;
            if (b.code == "9208") {
                ecWap.box(a, {
                    ishtml: false,
                    showTitle: true,
                    className: "ecWap-box ecWap-box-coupon",
                    isconfirm: true,
                    ok_txt: "去绑定",
                    oncanel: function (d) {
                        d.close()
                    },
                    onok: function () {
                        window.location = ecWap.prodDetial.couponAction.Domain.WAP + ecWap.prodDetial.couponAction.Url.BIND_PHONE + encodeURIComponent(encodeURIComponent("/product/" + ecWap.prodDetial.prdId + ".html#" + ecWap.prodDetial.getSku()))
                    }
                });
                return false
            } else {
                if (b.code == "9209") {
                    ecWap.box(a, {
                        ishtml: false,
                        showTitle: true,
                        className: "ecWap-box ecWap-box-coupon",
                        isconfirm: true,
                        ok_txt: "去认证",
                        oncanel: function (d) {
                            d.close()
                        },
                        onok: function () {
                            window.location = ecWap.prodDetial.couponAction.Domain.WAP + ecWap.prodDetial.couponAction.Url.AUTHENTICATE + ecWap.prodDetial.couponAction.Domain.WAP + encodeURIComponent("/product/" + ecWap.prodDetial.prdId + ".html#" + ecWap.prodDetial.getSku())
                        }
                    });
                    return false
                } else {
                    if (b.code == "9206") {
                        window.location = ecWap.prodDetial.couponAction.Domain.WAP + ecWap.prodDetial.couponAction.Url.LOGIN + encodeURIComponent(encodeURIComponent("/product/" + ecWap.prodDetial.prdId + ".html#" + ecWap.prodDetial.getSku()));
                        return false
                    }
                }
            }
            if (b.state != "1") {
                switch ("" + b.state) {
                    case"-1":
                        c.attr("class", "button-vip-benefit-had");
                        c.find("span").text("\u5df2\u9886\u5b8c");
                        break;
                    case"2":
                        c.attr("class", "button-vip-benefit-had");
                        c.find("span").text("\u5df2\u9886\u53d6");
                        break;
                    case"3":
                        c.attr("class", "button-vip-benefit-begin");
                        c.find("span").text("\u5373\u5c06\u5f00\u59cb");
                        break;
                    case"4":
                        c.attr("class", "button-vip-benefit-disabled");
                        c.find("span").text("\u5df2\u7ed3\u675f");
                        break
                }
                c.off("click")
            }
        }
        ecWap.box(a, {id: "couponBox", width: 80})
    },
    getErrorInfo: function (a, b) {
        var c = ecWap.prodDetial.couponAction.promptInfo[a];
        if (b && c.hasOwnProperty(b.code)) {
            return c[b.code]
        } else {
            return c.other
        }
    },
    forbidRepeatClick: function (d, a) {
        if (d) {
            var f = a.parents(".coupons-cont"), e = f.height(), c = f.width(), b = "";
            f.css("position", "relative");
            b += '<div id="clickMask" style="height:' + e + "px;width:" + c + 'px;position:absolute;z-index:1000;top:0;left:0;"></div>';
            f.append(b)
        } else {
            $("#clickMask").remove()
        }
    }
};
ecWap.prodDetial.parseUrl = function (a, b) {
    return a.replace(/{id}/g, b)
};
ecWap.prodDetial.rememberAddrId = 0;
ecWap.prodDetial.initForArrival = function (c) {
    ecWap.prodDetial.addrSlidebox = null;
    var f = addressDomain + "/data/region/tree/{id}.json?", g = addressDomain + "/data/region/children/{id}.json?",
        b = {}, a, e = function (h, j, k) {
            var i;
            if (j && (i = b[h])) {
                return k(i)
            }
            if (a) {
                a.abort()
            }
            h = h + "&_t=" + new Date().getTime() + "&callback=?";
            a = $.getJSON(h, function (l) {
                if (j) {
                    b[h] = l
                }
                k(l)
            })
        };
    selectAddressRadio = function (h) {
        ecWap.cookie.set("selectedAddress", $(h).attr("data-selectedaddress"), {
            expires: 30,
            path: "/",
            domain: ".vmall.com"
        });
        ecWap.cookie.set("shopAddressID", $(h).attr("data-shopconfigid"), {
            expires: 30,
            path: "/",
            domain: ".vmall.com"
        });
        $("#addressSelect").text($(h).attr("data-selectname"));
        ecWap.prodDetial.estimateTime(ecWap.cookie.get("selectedAddress").split("|")[2]);
        ecWap.prodDetial.rememberAddrId = ecWap.cookie.get("selectedAddress").split("|")[2];
        $(h).find("input").prop("checked", true);
        ecWap.prodDetial.addrSlidebox.close()
    };
    renderSelect = function (p, l, o) {
        var i, h = "";
        var n = ["<div "], m;
        if (c.ids && p < c.ids.length && (m = c.ids[p])) {
            n.push('id="' + m + '"')
        }
        if (c.names && p < c.names.length && (m = c.names[p])) {
            n.push('name="' + m + '"')
        }
        if (c.css && p < c.css.length && (m = c.css[p])) {
            n.push('class="' + m + '"')
        }
        n.push(" style='display:none;'></div>");
        var q = $(n.join(""));
        n = [];
        for (var k = 0; k < l.length; k++) {
            i = l[k];
            if (i.name == "-") {
                n.push('<li value="' + i.id + '"><span>\u5176\u5b83\u5730\u533a</span></li>')
            } else {
                n.push('<li value="' + i.id + '"><span>' + ecWap.encodeScript(i.name) + "</span></li>")
            }
            if (i.id == o) {
                h = i.name
            }
        }
        q.html(n.join(""));
        return [q, h]
    };
    ecWap.prodDetial.oldVal = [];
    ecWap.prodDetial.oldValText = [];
    ecWap.prodDetial.oldAddress = {};
    var d = "";
    _selects = [];
    _container = $("<div class='ol_linkSelect_region' />");
    e(ecWap.prodDetial.parseUrl(f, c.defaultValue), true, function (q) {
        var n = [], h, l, o, p = [], k = "", j = true;
        for (var m = 0; m < q.data.length; m++) {
            if (q.values) {
                var r = q.values[m]
            } else {
                var r = ""
            }
            r = renderSelect(m, q.data[m], r);
            o = r[0];
            switch (m) {
                case 0:
                    ecWap.prodDetial.oldAddress.province = r[0];
                    break;
                case 1:
                    ecWap.prodDetial.oldAddress.city = r[0];
                    break;
                case 2:
                    ecWap.prodDetial.oldAddress.district = r[0];
                    break;
                case 3:
                    ecWap.prodDetial.oldAddress.street = r[0];
                    break;
                default:
                    break
            }
            if (q.values && m < q.values.length) {
                if (r[1] == "暂时不选") {
                    r[1] = "-"
                }
                $("#" + o.attr("id").split("_")[0]).val(q.values[m]).attr("data-text", r[1]);
                ecWap.prodDetial.oldVal.push(q.values[m]);
                ecWap.prodDetial.oldValText.push(r[1]);
                if (r[1]) {
                    if (m == 1) {
                        p.push(r[1] + "市")
                    } else {
                        p.push(r[1])
                    }
                } else {
                    j = false
                }
            }
            _selects.push(o);
            _container.append(o)
        }
        if (j) {
            k = p[0] + " " + p[1] + " " + p[2]
        }
        if (k.indexOf("undefined") != -1) {
            $("#productArrival").hide()
        } else {
            $("#productArrival").show();
            $("#addressSelect").text(k)
        }
        if (c.arrival && ecWap.account.id) {
            AddressSys.service.manager(function (s) {
                if (s.success && s.shoppingConfigList.length > 0) {
                    var i = '<article class="ecWap-dialog-content"><p class="tips-warn-red"><span class="tips-especial">&nbsp;\u201c&nbsp;\u9884\u8ba1\u9001\u8fbe\u65f6\u95f4&nbsp;\u201d&nbsp;\u529f\u80fd\u5904\u4e8e\u8bd5\u8fd0\u8425\uff0c\u53ef\u80fd\u4f1a\u7565\u6709\u504f\u5dee\uff0c\u6700\u7ec8\u4ee5\u5b9e\u9645\u5230\u8d27\u65f6\u95f4\u4e3a\u51c6\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u60a8\u8054\u7cfb\u5546\u57ce\u5ba2\u670d\u3002\u611f\u8c22\u60a8\u5bf9\u534e\u4e3a\u5546\u57ce\u7684\u652f\u6301\u548c\u7406\u89e3\uff01</span></p></article><div class="related-select-address"><ul>';
                    $.each(s.shoppingConfigList, function (t, u) {
                        if (u.provinceName == "暂时不选") {
                            u.provinceName = "-"
                        }
                        if (u.cityName == "暂时不选") {
                            u.cityName = "-"
                        }
                        if (u.districtName == "暂时不选") {
                            u.districtName = "-"
                        }
                        i += '<li defaultFlag="' + u.defaultFlag + '" data-shopconfigid="' + u.id + '" data-selectedaddress="' + u.province + "|" + u.city + "|" + u.district + '" data-selectname="' + ecWap.encodeScript(u.provinceName) + " " + ecWap.encodeScript(u.cityName) + " " + ecWap.encodeScript(u.districtName) + '" onclick="selectAddressRadio(this); "><label class="radiobox"><input name="groupA" type="radio"><i></i></label><span>' + ecWap.encodeScript(u.provinceName) + ecWap.encodeScript(u.cityName) + ecWap.encodeScript(u.districtName) + ecWap.encodeScript((u.streetName ? u.streetName : "")) + ecWap.encodeScript(u.address) + "</span></li>"
                    });
                    i += "</ul></div>";
                    ecWap.prodDetial.addrSlidebox = new ecWap.slideBox(i, {
                        title: "选择所在地区",
                        className: "ecWap-box-em ecWap-box-lower ecWap-box-addaddress",
                        height: $(window).height() * 0.6,
                        ishtml: true,
                        isconfirm: false,
                        ok_txt: "添加新地址",
                        onok: function (t) {
                            t.close();
                            ecWap.prodDetial.showAddrSelect(c)
                        }
                    });
                    if (ecWap.cookie.get("selectedAddress") && ecWap.cookie.get("selectedAddress").length > 0) {
                        ecWap.prodDetial.addrSlidebox.getBox().find("li").each(function () {
                            if ($(this).data("selectedaddress") == ecWap.cookie.get("selectedAddress")) {
                                $(this).trigger("click");
                                return false
                            }
                        })
                    } else {
                        ecWap.prodDetial.addrSlidebox.getBox().find("li").each(function () {
                            if ($(this).attr("defaultFlag") == "1") {
                                $(this).trigger("click");
                                return false
                            }
                        })
                    }
                }
            })
        }
        $("#addressSelect").off("click").click(function () {
            if (c.arrival && ecWap.account.id) {
                AddressSys.service.manager(function (i) {
                    if (i.success && i.shoppingConfigList.length > 0 && ecWap.prodDetial.addrSlidebox) {
                        ecWap.prodDetial.addrSlidebox.slideshow()
                    } else {
                        ecWap.prodDetial.showAddrSelect(c)
                    }
                })
            } else {
                ecWap.prodDetial.showAddrSelect(c)
            }
        })
    })
};
ecWap.prodDetial.showAddrSelect = function (a) {
    if (ecWap.prodDetial.rememberAddrId != 0) {
        a.defaultValue = ecWap.prodDetial.rememberAddrId
    }
    $.regionSelect({
        defaultValue: a.defaultValue,
        extendContent: '<p class="tips-warn-red"><span class="tips-especial">&nbsp;\u201c&nbsp;\u9884\u8ba1\u9001\u8fbe\u65f6\u95f4&nbsp;\u201d&nbsp;\u529f\u80fd\u5904\u4e8e\u8bd5\u8fd0\u8425\uff0c\u53ef\u80fd\u4f1a\u7565\u6709\u504f\u5dee\uff0c\u6700\u7ec8\u4ee5\u5b9e\u9645\u5230\u8d27\u65f6\u95f4\u4e3a\u51c6\uff0c\u5982\u6709\u7591\u95ee\u8bf7\u60a8\u8054\u7cfb\u5546\u57ce\u5ba2\u670d\u3002\u611f\u8c22\u60a8\u5bf9\u534e\u4e3a\u5546\u57ce\u7684\u652f\u6301\u548c\u7406\u89e3\uff01</span></p>',
        type: "ThirdLevel",
        height: $(window).height() * 0.6,
        callback: function (b) {
            $("#addressSelect").text(b.addr);
            if (b.index == 2) {
                ecWap.cookie.set("selectedAddress", $("#provinceVal").attr("value") + "|" + $("#cityVal").attr("value") + "|" + $("#districtVal").attr("value"), {
                    expires: 30,
                    path: "/",
                    domain: ".vmall.com"
                });
                ecWap.prodDetial.rememberAddrId = ecWap.cookie.get("selectedAddress").split("|")[2];
                ecWap.prodDetial.estimateTime(ecWap.cookie.get("selectedAddress").split("|")[2])
            }
        }
    });
    $("#ecWap-box-regionselect").addClass("ecWap-box-addaddress")
};
