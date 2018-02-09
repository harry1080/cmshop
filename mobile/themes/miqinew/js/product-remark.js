ecWap.pkg("ecWap.remark");
ecWap.remark.loaded = false;

//是否开启评论功能
ecWap.remark.isEvaluateOn = true;
ecWap.remark.extraType = 1;


//获取产品信息
ecWap.remark.getProductInformation = function (b) {
    var c = Array();
    var a = {};
    c.orderCode = b;
    a.data = c;
    a.url = remarkDomain + "/remark/addUserRemarkJsonView.json?";
    a.callback = function (d) {
        if (d.success) {
            if (ecWap.evaluate.util.isEmpty(d.noData) || d.noData == false) {
                ecWap.evaluate.initialization(d)
            } else {
                ecWap.alert("抱歉，您不能对该商品进行评价，原因是：<br/>1.同一订单中的相同商品，只能评价一次<br/>2.购买时间已超过30天<br/>3.商品已退货成功", {
                    onok: function (e) {
                        e.close();
                        window.location.href = "/member/evaluateOrder"
                    }
                })
            }
        } else {
            if ($("#prdAndServiceEvaluateBtn")) {
                $("#prdAndServiceEvaluateBtn").hide()
            }
            ecWap.alert("服务器闹脾气了，请尝试重新提交吧", {
                onok: function (e) {
                    e.close();
                    window.location.href = "/member/evaluateOrder"
                }
            })
        }
    };
    ecWap.remark.util.getJSON(a)
};

//刷新评论列表
ecWap.remark.rmsRefreshEvaluateList = function (c, b, a) {
    $(c).parent().closest("ul").find("li").removeClass("current");
    $(c).parent().addClass("current");
    ecWap.remark.extraType = a;
    ecWap.remark.loaded = true;
    ecWap.remark.rmsQueryPrdRemarkDataList(b, 1, true)
};


//评论中获取产品信息
ecWap.remark.rmsGetProductInformation = function (b) {
    var c = Array();
    var a = {};
    c.orderCode = b;
    a.data = c;
    a.url = rmsDomain + "/comment/addComment.json?";
    a.callback = function (d) {
        if (d != null && d.resultCode == "0") {
            if (d.data != null && d.data.products != null && d.data.products.length > 0) {
                ecWap.evaluate.rmsInitialization(d.data)
            } else {
                ecWap.alert("抱歉，您不能对该商品进行评价，原因是：<br/><br/>1.同一订单中的相同商品，只能评价一次<br/>2.购买时间已超过30天<br/>3.商品已退货成功", {
                    onok: function (e) {
                        e.close();
                        window.location.href = "/member/evaluateOrder"
                    }
                })
            }
        } else {
            if ($("#prdAndServiceEvaluateBtn")) {
                $("#prdAndServiceEvaluateBtn").hide()
            }
            ecWap.alert("服务器闹脾气了，请尝试重新提交吧", {
                onok: function (e) {
                    e.close();
                    window.location.href = "/member/evaluateOrder"
                }
            })
        }
    };
    ecWap.remark.util.getJSON(a)
};

//展示评论信息
ecWap.remark.showEvaluateInfo = function (c, a) {
    var d = Array();
    var b = {};
    d.commentId = c;
    d.pid = a;
    b.data = d;
    b.url = rmsDomain + "/comment/getUserCommentDetail.json?";
    b.callback = function (e) {
        if (e != null && e.resultCode == 0) {
            if (e.data != null && e.data.productId != null && e.data.productId != "" && e.data.productId != undefined) {
                ecWap.evaluate.rmsUpdInitialization(e.data)
            } else {
                ecWap.alert("抱歉，您不能对该商品进行评价，原因是：<br/><br/>1.同一订单中的相同商品，只能评价一次<br/>2.购买时间已超过30天<br/>3.商品已退货成功", {
                    onok: function (f) {
                        f.close();
                        window.location.href = "/member/evaluateOrder"
                    }
                })
            }
        } else {
            if ($("#prdAndServiceEvaluateBtn")) {
                $("#prdAndServiceEvaluateBtn").hide()
            }
            ecWap.alert("服务器闹脾气了，请尝试重新提交吧", {
                onok: function (f) {
                    f.close();
                    window.location.href = "/member/evaluateOrder"
                }
            })
        }
    };
    ecWap.remark.util.getJSON(b)
};


//提交评论数据
ecWap.remark.submitProductReviews = function (e) {
    var c = new Array();
    for (var b in e) {
        c[b] = e[b]
    }
    var d = {};
    d.data = c;
    d.url = remarkDomain + "/remark/addUserRemark.json?";
    d.callback = function (a) {
        if (a.success) {
            ecWap.alert("评价发表成功！稍后你将获得20点会员经验值。", {
                onok: function (f) {
                    f.close();
                    window.location.href = "/member/evaluateOrder"
                }
            })
        } else {
            ecWap.alert(a.msg)
        }
    };
    ecWap.remark.util.getJSON(d)
};

//查询用户查询评论数据
ecWap.remark.queryUserRemarkData = function (h, f, g) {
    var c = f;
    var b = g;
    var d = h;
    var a = new Array();
    a.pageNumber = f;
    a.pageSize = g;
    a.dateType = h;
    var e = {};
    e.data = a;
    e.url = remarkDomain + "/remark/queryUserRemarkData.json?";
    e.callback = function (k) {
        console.log(k);
        if (k.success) {
            var i = k.prdRemarkList;
            ecWap.order.showRemarkListData(i);
            var j = k.page;
            if (j.pageNumber < j.totalPage) {
                c = j.pageNumber + 1;
                ecWap.remark.queryUserRemarkData(d, c, b)
            } else {
                $("#systemLoadingId").hide();
                if ($("#review").find("li").length < 1) {
                    $("#bottom-area").addClass("fixed");
                    $("#loadingId").html("");
                    $("#systemEmpty").show();
                    $("#loadingId").removeClass("more-loading").addClass("p-loading")
                } else {
                    totalPercent.html("已加载全部商品！");
                    $("#loadingId").removeClass("p-loading").addClass("more-loading")
                }
            }
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
    };
    ecWap.remark.util.getJSON(e)
};
ecWap.remark.getRemarkListLength = function (a) {
    return $("#" + a).find(".myReview-ul").find("li").length
};
ecWap.remark.rmsQueryUserRemarkData = function (e, d, j, c) {
    var b = ("areview" == c ? (rmsDomain + "/comment/getUserCommentProduct.json?") : (rmsDomain + "/comment/getNoCommentsPrdList.json?"));
    var g = d;
    var f = j;
    var h = e;
    var a = new Array();
    a.pageNum = d;
    a.pageSize = j;
    var i = {};
    i.data = a;
    i.url = b;
    i.callback = function (m) {
        ecWap.order.scrollEvent = false;
        if (m != null && m.resultCode == "0") {
            if (m.data == null) {
                ecWap.order.constant.page[h].pageNumber = d;
                ecWap.order.constant.page[h].pageSize = j;
                if (ecWap.order.constant.page[h].totalRow < 1 && ecWap.remark.getRemarkListLength(c) == 0) {
                    $("#loadingId").html("");
                    $("#systemEmpty").show();
                    $(".system-empty-title>span").html("没有" + ("areview" == c ? "已" : "待") + "评价商品");
                    $("#loadingId").removeClass("more-loading").addClass("p-loading");
                    $("#bottom-area").addClass("fixed")
                } else {
                    $("#systemEmpty").hide();
                    $("#loadingId").html("已加载全部评论！");
                    $("#loadingId").removeClass("p-loading").addClass("more-loading")
                }
            } else {
                var l = m.data.page;
                ecWap.order.constant.page[h].pageNumber = ("areview" == c ? l.pageNumber : l.pageNum);
                ecWap.order.constant.page[h].pageSize = l.pageSize;
                ecWap.order.constant.page[h].totalPage = l.totalPage;
                ecWap.order.constant.page[h].totalRow = l.totalRow;
                if ("areview" == c) {
                    var k = [];
                    if (m.data != null && m.data.commentList != null) {
                        $.each(m.data.commentList, function (n, o) {
                            o.sbomName = o.skuName;
                            k.push(o)
                        })
                    }
                    ecWap.order.showRmsListData(k, c)
                } else {
                    ecWap.order.showRmsListData(m.data.commentProducts, c)
                }
                if (ecWap.order.constant.page[h].pageNumber < ecWap.order.constant.page[h].totalPage) {
                    $("#loadingId").html("上拉加载更多评论");
                    $("#loadingId").removeClass("p-loading").addClass("more-loading")
                } else {
                    if (ecWap.order.constant.page[h].totalRow < 1 && ecWap.remark.getRemarkListLength(c) == 0) {
                        $("#loadingId").html("");
                        $("#systemEmpty").show();
                        $(".system-empty-title>span").html("没有" + ("areview" == c ? "已" : "待") + "评价商品");
                        $("#loadingId").removeClass("more-loading").addClass("p-loading");
                        $("#bottom-area").addClass("fixed")
                    } else {
                        $("#systemEmpty").hide();
                        $("#loadingId").html("已加载全部评论！");
                        $("#loadingId").removeClass("p-loading").addClass("more-loading")
                    }
                }
            }
        } else {
            if (m != null && m.resultCode == 42003) {
                window.location.href = "/account/applogin?url=" + encodeURIComponent(encodeURIComponent("/member/evaluateOrder"))
            } else {
                $("#loadingId").html("");
                $("#systemEmpty").show();
                $("#loadingId").removeClass("more-loading").addClass("p-loading");
                if (m.msg != null && m.msg != "" && m.msg != "undefined") {
                    ecWap.alert(m.msg, false)
                } else {
                    ecWap.alert("获取" + (("areview" == c) ? "已评价" : "待评价") + "列表失败，请稍后重试！", false)
                }
            }
        }
        $("#systemLoadingId").hide()
    };
    ecWap.remark.util.getJSON(i)
};
ecWap.remark.arrayToStr = function (a) {
    if (!ecWap.remark.util.isEmpty(a)) {
        return a.join(",")
    }
    return ""
};
ecWap.remark.queryUserOrderRemarkStatus = function (e, b) {
    var a = new Array();
    var d = "";

    //评论打开
    if (ecWap.remark.isEvaluateOn) {
        a.orderCode = ecWap.remark.arrayToStr(e);
        d = rmsDomain + "/comment/getOrderCommentStatus.json?"
    } else {
        a.orderCode = e;
        d = remarkDomain + "/remark/queryUserOrderRemarkStatus.json?";
        a.dataType = b
    }
    var c = {};
    c.data = a;
    c.url = d;
    c.callback = function (k) {
        var f = (ecWap.remark.isEvaluateOn ? (k != null && k.resultCode == 0) : (k.success && !ecWap.remark.util.isEmpty(k)));
        if (f) {
            var n = new Array();
            var h = new Array();
            var m = (ecWap.remark.isEvaluateOn ? k.data : k.RemarkStatus);
            var g = "";
            var l = "";
            $.each(m, function (i, o) {
                g = o.orderCode;
                l = (ecWap.remark.isEvaluateOn ? o.status : o.remarkStatus);
                if ("1" == l) {
                    if ($.inArray(g, h) == -1) {
                        h.push(g)
                    }
                    if (!n[g]) {
                        n[g] = new Array()
                    }
                    n[g].push(g)
                }
            });
            if (h.length > 0) {
                for (var j = 0; j < e.length; j++) {
                    if ($.inArray(e[j], h) != -1) {
                        ecWap.order.addRemarkBtn(e[j]);
                        $("#order-detail-btn").show()
                    }
                }
            }
        }
    };
    ecWap.remark.util.getJSON(c)
};


//查询产品评价数量
ecWap.remark.queryPrdRemarkCnt = function (b) {
    var a = new Array();
    a.pid = b;
    var c = {};
    c.data = a;
    c.url = remarkDomain + "/remark/queryPrdinfoEvaluateScore.json?";
    c.callback = function (d) {
        if (d.success && !ecWap.remark.util.isEmpty(d)) {
            $("#totalRecord").html(d.prdRemarkNum.totalPrdCount);
            //系统提示空数据
            $("#empty").hide();
            if (d.prdRemarkNum.totalPrdCount == 0) {
                $("#review").html('<section class="system-empty" id="empty"><header class="h"><i class="icon-list-empty"></i><p class="system-empty-title"><span>该商品暂无评价</span></p></header></section>')
            }
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
    };
    ecWap.remark.util.getJSON(c)
};


//查询产品评价等级
ecWap.remark.queryPrdRemarkLevel = function (b) {
    var a = new Array();
    a.pid = b;
    var c = {};
    c.data = a;
    c.url = remarkDomain + "/remark/queryEvaluateScore.json?";
    c.callback = function (i) {
        var d = i.remarkLabelList, e = i.remarkLevelList, g = i.remarkPerNumLst;
        if (!ecWap.remark.util.isEmpty(e)) {
            $("#totalPercent").html(e[0].percent);
            var h = e[0].times + e[1].times + e[2].times
        } else {
            var h = 0
        }
        if (h == 0) {
            $("#review").html('<section class="system-empty" id="empty"><header class="h"><i class="icon-list-empty"></i><p class="system-empty-title"><span>该商品暂无评价</span></p></header></section>')
        } else {
            $("#scoreArea").show();


            $("#evaluateRateID").show()
        }
        if (!ecWap.remark.util.isEmpty(d)) {
            var f = '<p class="p-label">';
            $.each(d, function (j, k) {
                f += "<label><span>" + k.labelName + "</span></label>"
            });
            f += "</p>";
            $("#remarkLabelDiv").html(f);
            $("#evaluateRateID").show()
        } else {
            $("#remarkLabelDiv").hide()
        }
        if (i.success && !ecWap.remark.util.isEmpty(g)) {
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
        // ecWap.code.BIClickReport("trackLink", "wap-pdp-comment-load_event", "link", "")
    };
    ecWap.remark.util.getJSON(c)
};
ecWap.remark.rmsQueryPrdRemarkDataList = function (d, f, c) {
    $("#empty").hide();
    var a = 3;
    var b = new Array();

    //产品id,product id
    b.pid = d;


    b.pageNum = f;
    b.pageSize = 20;
    b.extraType = ecWap.remark.extraType;

    var e = {};
    e.data = b;
    // e.url = rmsDomain + "/comment/getCommentList.json?";
    e.url = "goods.php?act=getCommentList&";
    e.callback = function (m) {

        // console.log(JSON.stringify(m));
        console.log(m);
        if (f == 1) {
            var l = m.data;
            if (!ecWap.remark.util.isEmpty(l)) {
                //好评率
                var g = (ecWap.remark.util.isEmpty(l.goodRate) ? 0 : l.goodRate);

                console.log(g);

                //好评度分数
                $("#totalPercent").html(g * 100);

                //好评、一般、差评个数
                var k = l.goodCount + l.normalCount + l.badCount


            } else {
                //
                var k = 0
            }
            if (k == 0) {
                $("#review").html('<section class="system-empty" id="empty"><header class="h"><i class="icon-list-empty"></i><p class="system-empty-title"><span>该商品暂无评价</span></p></header></section>')
            } else {

                //评价的个数不为空的话，显示和好评度得分
                $("#scoreArea").show();

                //评价率
                $("#evaluateRateID").show();

                //评价的类型
                $("#evaluateTypeID").show()

            }

            //评论标签
            var h = (l == null ? null : l.hotTags);
            if (!ecWap.remark.util.isEmpty(h)) {
                var j = '<p class="p-label">';
                $.each(h, function (n, o) {
                    j += "<label><span>" + o.tagName + "</span></label>"
                });
                j += "</p>";
                $("#remarkLabelDiv").html(j);

                //评论
                $("#evaluateRateID").show()
            } else {
                $("#remarkLabelDiv").hide()
            }
            var i = (l == null ? null : l.comments);
            // ecWap.code.BIClickReport("trackLink", "wap-pdp-comment-load_event", "link", "")
        }


        //产品评论列表
        ecWap.remark.rmsPrdRemarkList(a, m, c);



        if ($("#all-area").find("li").length < 1) {
            $("#reviewContentId").hide();
            $("#empty").show()
        } else {
            $("#reviewContentId").show()
        }
        ecWap.remark.loaded = false
    };
    if (!ecWap.remark.page[a].isLoad || 1 != f || c) {
        $("#loading").html('<p class="icon-loading"><span></span></p>');
        ecWap.remark.util.getJSON(e)
    } else {
        if ($("#all-area").find("li").length < 1) {
            $("#reviewContentId").hide();
            $("#empty").show()
        }
    }
};
ecWap.remark.rmsPrdRemarkList = function (a, f, c) {
    if (f != null && f.resultCode == "0") {
        ecWap.remark.page[a].isLoad = true;
        var e = (f.data == null ? null : f.data.page);
        if (e != null) {
            ecWap.remark.page[a].firstRow = e.firstRow;
            ecWap.remark.page[a].pageSize = e.pageSize;
            ecWap.remark.page[a].totalRow = e.totalRow;
            ecWap.remark.page[a].totalPage = e.totalPage;
            ecWap.remark.page[a].pageNumber = e.pageNum
        }
        if (c) {
            $("#all-area").empty()
        }
        var g = (f.data == null ? null : f.data.comments);
        if (!ecWap.remark.util.isEmpty(g)) {
            var b = f.data.pid;
            var d = "";
            $.each(g, function (h, i) {
                ecWap.remark["bigImgList" + h] = [];
                d += '<li class="j_remarkItem' + h + '"><div class="info clearfix" ><p class="fl">';
                if (i.headImage != null && i.headImage != "" && i.headImage != "null" && i.headImage != undefined) {
                    d += '<i><img src="' + i.headImage + '"/></i>'
                } else {
                    d += '<i><img src="' + imagePath + 'defaultface_user_after.png"/></i>'
                }
                d += "<span><b><em>" + i.userName + '</em></b></span></p><p class="fr"><b class="star-area j_stararea"><s style="width:' + (i.score * 20) + '%;"></s></b></p></div><div class="word j_word">' + ecWap.encodeScript(i.content) + "</div>";
                var k = i.images;
                if (!ecWap.remark.util.isEmpty(k)) {
                    d += '<div class="review-img list">';
                    d += '<div class="swiper-container swiper-container-horizontal swiper-container-free-mode">';
                    d += '<div class="swiper-wrapper choiceness-content">';
                    $.each(k, function (l, m) {
                        d += '<div class="swiper-slide"><a href="javascript:;"><img src="' + m.small + '" class="j_showBigImg" itemidx="' + h + '" index="' + l + '" /></a></div>';
                        ecWap.remark["bigImgList" + h].push(m.large)
                    });
                    d += "</div></div></div>"
                }
                d += '<div class="time"><time>' + ecWap.remark.timeYYYYmmdd(i.creationTime) + '</time><span class="laud-area" id="likeSpan_' + i.commentId + '" onclick="ecWap.remark.addLikes(' + b + "," + i.commentId + ',0);"><i></i><em id="likesCount_' + i.commentId + '">' + i.likes + "</em></span></div>";
                var j = i.replies;
                if (j.length > 0) {
                    $.each(j, function (l, m) {
                        d += '<div class="reply"><div class="reply-cont"><span>' + m.replyerName + "\uff1a</span>" + ecWap.encodeScript(m.replyContent) + '</div><span class="laud-area" id="rlikeSpan_' + m.replyId + '" onclick="ecWap.remark.addLikes(' + b + "," + i.commentId + ",1," + m.replyId + ');"><i></i><em>\u8d5e\u5ba2\u670d </em><em id="rlikesCount_' + m.replyId + '">' + m.likes + "</em></span></div>"
                    })
                }
                d += "</li>"
            });
            $("#all-area").append(d);
            $(".j_showBigImg").on("click", function () {
                var h = $(this).attr("itemidx");
                var i = parseInt($(this).attr("index"), 10);
                ecWap.remark.startShowImg(i, ecWap.remark["bigImgList" + h], "#bigImages2", function () {
                    $(".j_stararea").html($(".j_remarkItem" + h).find(".j_stararea").html());
                    $("#evaluateInfo").html($(".j_remarkItem" + h).find(".j_word").text())
                })
            })
        }
        if (ecWap.remark.page.hasMoreRemark(a)) {
            $("#loading").html('<p class="icon-loading"><span></span></p>')
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
    } else {
        $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
    }
    ecWap.remark.loaded = false
};
ecWap.remark.timeYYYYmmdd = function (b) {
    if (b == null) {
        return b
    }
    if (new Date(b) != "Invalid Date") {
        return new Date(b).format("yyyy.MM.dd")
    } else {
        var a = b.split(" ");
        if (a != null && a.length > 0 && a[0] != null) {
            return a[0].replace(/-/g, ".")
        }
    }
};
ecWap.remark.queryPrdRemarkContent = function (d, a, c) {
    var b = new Array();
    b.pid = d;
    var e = {};
    e.data = b;
    e.remarkLevel = a;
    e.url = remarkDomain + "/remark/queryEvaluate.json?pageNumber=" + c + "&remarkLevel=" + a + "&";
    e.callback = function (g) {
        if (g.success) {
            var h = g.remarkList;
            ecWap.remark.page[a].isLoad = g.success;
            ecWap.remark.page[a].firstRow = g.page.firstRow;
            ecWap.remark.page[a].pageSize = g.page.pageSize;
            ecWap.remark.page[a].totalRow = g.page.totalRow;
            ecWap.remark.page[a].totalPage = g.page.totalPage;
            ecWap.remark.page[a].pageNumber = g.page.pageNumber;
            if (!ecWap.remark.util.isEmpty(h)) {
                var f = "";
                $.each(h, function (i, j) {
                    f += '<li><div class="info clearfix" ><p class="fl"><i><img src="' + imagePath + 'defaultface_user_after.png"/></i><span><b><em>' + j.custName + '</em></b></span></p><p class="fr"><b class="star-area"><s style="width:' + (j.score * 20) + '%;"></s></b></p></div><div class="word">' + j.content + '</div><div class="time"><time>' + [j.createDate.split(":")[0], j.createDate.split(":")[1]].join(":").replace(/-/g, ".") + "</time></div>";
                    var k = j.msgReplyList;
                    if (k.length > 0) {
                        $.each(k, function (l, m) {
                            f += '<div class="reply"><div class="reply-cont"><span>' + m.replyerName + "回复：</span>" + ecWap.encodeScript(m.replyContent) + "</div></div>"
                        })
                    }
                    f += "</li>"
                });
                $("#all-area").append(f);
                $("#reviewContentId").show()
            }
            if (ecWap.remark.page.hasMoreRemark(a)) {
                $("#loading").html('<p class="icon-loading"><span></span></p>')
            } else {
                $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
            }
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
        ecWap.remark.loaded = false
    };
    if (!ecWap.remark.page[a].isLoad || 1 != c) {
        $("#loading").html('<p class="icon-loading"><span></span></p>');
        ecWap.remark.util.getJSON(e)
    }
};
ecWap.remark.queryPrdDetailRemarkLevel = function (b) {
    var a = new Array();
    a.pid = b;
    var c = {};
    c.data = a;
    c.url = remarkDomain + "/remark/queryEvaluateScore.json?";
    c.callback = function (h) {
        if (!h.success) {
        } else {
            var d = h.remarkLabelList, e = h.remarkLevelList;
            if (!ecWap.remark.util.isEmpty(e)) {
                var g = e[0].times + e[1].times + e[2].times;
                $("#totalwRecord").html("（" + g + "条)")
            } else {
                var g = 0
            }
            if (!ecWap.remark.util.isEmpty(d)) {
                var f = "";
                $.each(d, function (i, j) {
                    f += '<a href="javascript:;"><span><em>（' + j.times + ")</em>" + j.labelName + "</span></a>"
                });
                $("#remarkLabelwDiv").html(f)
            } else {
                $("#remarkLabelwDiv").hide()
            }
            if (g > 0) {
                ecWap.remark.queryPrdDetailRemarkContent(b)
            }
        }
    };
    ecWap.remark.util.getJSON(c)
};
ecWap.remark.rmsQueryPrdDetailRemarkLevel = function (b) {
    var a = new Array();
    a.pid = b;
    a.extraType = 1;
    a.pageSize = 1;
    var c = {};
    c.data = a;
    c.url = rmsDomain + "/comment/getCommentList.json?";
    c.callback = function (h) {
        if (h != null && h.resultCode == "0") {
            var m = h.data;
            if (!ecWap.remark.util.isEmpty(m)) {
                var k = m.goodCount + m.normalCount + m.badCount;
                $("#totalwRecord").html("（" + k + "条)")
            } else {
                var k = 0
            }
            if (m != null && !ecWap.remark.util.isEmpty(m.hotTags)) {
                var l = "";
                $.each(m.hotTags, function (n, o) {
                    l += '<a href="javascript:;"><span><em>（' + o.count + ")</em>" + o.tagName + "</span></a>"
                });
                $("#remarkLabelwDiv").html(l)
            } else {
                $("#remarkLabelwDiv").hide()
            }
            if (k > 0) {
                var e = m.comments;
                if (!ecWap.remark.util.isEmpty(e)) {
                    var d = "", j = e[0];
                    d += '<li><div class="info clearfix" ><p class="fl">';
                    if (j.headImage != null && j.headImage != "" && j.headImage != "null" && j.headImage != undefined) {
                        d += '<i><img src="' + j.headImage + '"/></i>'
                    } else {
                        d += '<i><img src="' + imagePath + 'defaultface_user_after.png"/></i>'
                    }
                    d += "<span><b><em>" + j.userName + "</em><time>" + ecWap.remark.timeYYYYmmdd(j.creationTime) + '</time></b></span></p><p class="fr"><span class="laud-area" onclick="$(\'#prdDetailreview\').click();"><i></i><em>' + j.likes + '</em></span></p></div><div class="word">' + ecWap.encodeScript(j.content) + "</div>";
                    var f = j.images;
                    if (!ecWap.remark.util.isEmpty(f)) {
                        d += '<div class="review-img cont-box">';
                        d += '<div class="swiper-container swiper-container-horizontal swiper-container-free-mode">';
                        d += '<div class="swiper-wrapper choiceness-content">';
                        $.each(f, function (n, o) {
                            d += '<div class="swiper-slide"><a href="javascript:;" onclick="$(\'#prdDetailreview\').click()"><img src="' + o.small + '"></a></div>'
                        });
                        d += "</div></div></div>"
                    }
                    var g = j.replies;
                    if (!ecWap.remark.util.isEmpty(g)) {
                        $.each(g, function (n, o) {
                            d += '<div class="reply"><div class="reply-cont"><span>' + o.replyerName + "\uff1a</span>" + ecWap.encodeScript(o.replyContent) + "</div></div>"
                        })
                    }
                    d += "</li>";
                    $("#all-areaw").append(d);
                    $("#all-areaw").parents(".pro-meta-area-review").show()
                }
                var i = new Swiper(".cont-box .swiper-container", {
                    slidesPerView: 3.47,
                    paginationClickable: true,
                    freeMode: true,
                    watchSlidesProgress: true
                })
            }
        }
    };
    ecWap.remark.util.getJSON(c)
};
ecWap.remark.addLikes = function (c, e, f, a) {
    var b = new Array();
    b.pid = c;
    b.commentId = e;
    if (f == 1) {
        b.replyId = a
    }
    b.type = f;
    var d = {};
    d.data = b;
    d.url = rmsDomain + "/comment/like.json?";
    d.callback = function (g) {
        if (g != null && g.resultCode == 0) {
            if (f == 0) {
                var h = (parseInt($("#likesCount_" + e).text()) + 1);
                $("#likesCount_" + e).text(h);
                $("#likeSpan_" + e).removeAttr("onclick");
                $("#likeSpan_" + e).addClass("checked")
            } else {
                var h = (parseInt($("#rlikesCount_" + a).text()) + 1);
                $("#rlikesCount_" + a).text(h);
                $("#rlikeSpan_" + a).removeAttr("onclick");
                $("#rlikeSpan_" + a).addClass("checked")
            }
        } else {
            if (g != null && g.resultCode == 42003) {
                window.location.href = "/account/applogin?url=" + encodeURIComponent(encodeURIComponent("/product/" + ecWap.prodDetial.prdId + ".html#" + ecWap.prodDetial.getSku()))
            } else {
                if (g != null && g.resultCode == 60008) {
                    if (f == 0) {
                        $("#likeSpan_" + e).removeAttr("onclick");
                        $("#likeSpan_" + e).addClass("checked")
                    } else {
                        $("#rlikeSpan_" + a).removeAttr("onclick");
                        $("#rlikeSpan_" + a).addClass("checked")
                    }
                }
            }
        }
    };
    ecWap.remark.util.getJSON(d)
};
ecWap.remark.validateBindPhone = function (c, b, a) {
    $.ajax({
        type: "GET",
        url: "/member/order/evaluate.json",
        data: {orderInfo: b},
        dataType: "json",
        timeout: 10000,
        error: function (d, e) {
            ecWap.alert("服务器闹脾气了，请尝试重新提交吧");
            return false
        },
        success: function (d) {
            if (d.isAccountReal == "false") {
                var e = "依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号绑定，感谢您的理解及支持！ 新版《华为商城用户协议》已上线，将更有利于保护您的个人隐私。";
                ecWap.box(e, {
                    ishtml: false,
                    showTitle: true,
                    title: "请完成手机绑定",
                    className: "ecWap-box",
                    isconfirm: true,
                    ok_txt: "绑定手机",
                    oncanel: function (f) {
                        f.close()
                    },
                    onok: function (f) {
                        f.close();
                        window.location.href = "/shoppingCart/bindingPhoneNum?url=" + encodeURIComponent(encodeURIComponent(a))
                    }
                });
                return false
            } else {
                if (!d.success && ecWap.remark.util.isEmpty(d.userId)) {
                    window.location.href = "/account/applogin?url=" + encodeURIComponent(encodeURIComponent(a))
                } else {
                    window.location.href = c
                }
            }
        }
    })
};
ecWap.remark.updateRemarkBefore = function (b, c, a) {
    $.ajax({
        type: "GET",
        url: "/member/order/evaluate.json",
        data: {orderInfo: a},
        dataType: "json",
        timeout: 10000,
        error: function (d, e) {
            ecWap.alert("服务器闹脾气了，请尝试重新提交吧");
            return false
        },
        success: function (d) {
            if (!d.success && ecWap.remark.util.isEmpty(d.userId)) {
                window.location.href = "/account/applogin?url=" + encodeURIComponent(encodeURIComponent("/member/evaluateOrder"))
            } else {
                window.location.href = b
            }
        }
    });
    if (c && c.stopPropagation) {
        c.stopPropagation()
    } else {
        window.event.cancelBubble = true
    }
    return false
};
ecWap.remark.queryPrdDetailRemarkContent = function (b) {
    var a = new Array();
    a.pid = b;
    var c = {};
    c.data = a;
    c.remarkLevel = 3;
    c.url = remarkDomain + "/remark/queryEvaluate.json?pageNumber=1&remarkLevel=3&";
    c.callback = function (e) {
        if (e.success) {
            var h = e.remarkList;
            if (!ecWap.remark.util.isEmpty(h)) {
                var d = "", f = h[0];
                d += '<li><div class="info clearfix" ><p class="fl"><i><img src="' + imagePath + 'defaultface_user_after.png"/></i><span><b><em>' + f.custName + "</em><time>" + [f.createDate.split(":")[0], f.createDate.split(":")[1]].join(":").replace(/-/g, ".") + '</time></b></span></p><p class="fr"><b class="star-area"><s style="width:' + (f.score * 20) + '%;"></s></b></p></div><div class="word">' + f.content + "</div>";
                var g = f.msgReplyList;
                if (!ecWap.remark.util.isEmpty(g)) {
                    $.each(g, function (i, j) {
                        d += '<div class="reply"><div class="reply-cont"><span>' + j.replyerName + "回复：</span>" + ecWap.encodeScript(j.replyContent) + "</div></div>"
                    })
                }
                d += "</li>";
                $("#all-areaw").append(d);
                $("#all-areaw").parents(".pro-meta-area-review").show()
            }
        }
    };
    ecWap.remark.util.getJSON(c)
};
ecWap.remark.page = {
    0: {pageNumber: 1, pageSize: 10, totalPage: 0, firstRow: 0, totalRow: 0, isLoad: false},
    1: {pageNumber: 1, pageSize: 10, totalPage: 0, firstRow: 0, totalRow: 0, isLoad: false},
    2: {pageNumber: 1, pageSize: 10, totalPage: 0, firstRow: 0, totalRow: 0, isLoad: false},
    3: {pageNumber: 1, pageSize: 10, totalPage: 0, firstRow: 0, totalRow: 0, isLoad: false},
    hasMoreRemark: function (a) {
        return ecWap.remark.page[a].pageNumber < ecWap.remark.page[a].totalPage
    }
};
ecWap.remark.util = {
    isFunction: function (a) {
        return Object.prototype.toString.call(a) === "[object Function]"
    }, isEmpty: function (a) {
        return ("undefined" == a || null == a || "" == a || 0 == a.length)
    }, bulidParamStr: function (f) {
        var e = f.data;
        var g = "";
        for (var d in e) {
            if ((typeof e[d] == "function") && d == "remove") {
                continue
            }
            if (ecWap.remark.isArray(e[d])) {
                for (var c in e[d]) {
                    g += "&" + d + "=" + e[d][c]
                }
            } else {
                g += "&" + d + "=" + e[d]
            }
        }
        return g
    }, getJSON: function (b) {
        if (ecWap.remark.util.isEmpty(b) || ecWap.remark.util.isEmpty(b.url) || (!ecWap.remark.util.isFunction(b.callback))) {
            return null
        }
        var a = b.url + "t=" + new Date().getTime() + ecWap.remark.util.bulidParamStr(b) + "&callback=?";
        $.ajax({
            url: a,
            dataType: "JSONP",
            data: b.data,
            timeout: 30000,
            error: function (c, d)
            {
                if (a.indexOf("/getUserCommentProduct.json") > -1 || a.indexOf("/getNoCommentsPrdList.json") > -1) {
                    ecWap.order.scrollEvent = false
                }
                if ($("#systemLoadingId")) {
                    $("#systemLoadingId").hide()
                }
                if ("timeout" == d) {
                    ecWap.alert("请求超时！")
                }
                return false
            },
            success: function (c) {
                b.callback(c)
            }
        })
    }
};
ecWap.remark.loadingMore = function () {
    var a = 3;
    if (!ecWap.remark.loaded && $(window).scrollTop() + $(window).height() == $(document).height()) {
        if (ecWap.remark.page.hasMoreRemark(a)) {
            var b = ecWap.remark.page[a].pageNumber + 1;
            ecWap.remark.loaded = true;
            if (ecWap.remark.isEvaluateOn) {
                ecWap.remark.rmsQueryPrdRemarkDataList(ecWap.prodDetial.prdId, b)
            } else {
                ecWap.remark.queryPrdRemarkContent(ecWap.prodDetial.prdId, a, b)
            }
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
    }
};
ecWap.remark.loadingMoreRemarks = function (a) {
    var a = 3;
    if (!ecWap.remark.loaded && $(window).scrollTop() + $(window).height() == $(document).height()) {
        if (ecWap.remark.page.hasMoreRemark(a)) {
            var b = ecWap.remark.page[a].pageNumber + 1;
            ecWap.remark.loaded = true;
            if (ecWap.remark.isEvaluateOn) {
                ecWap.remark.rmsQueryPrdRemarkDataList(ecWap.prodDetial.prdId, b)
            } else {
                ecWap.remark.queryPrdRemarkContent(ecWap.prodDetial.prdId, a, b)
            }
        } else {
            $("#loading").html('<p class="p-loading"><span>已加载全部评论</span></p>')
        }
    }
};
ecWap.remark.isArray = function (a) {
    return Object.prototype.toString.call(a) === "[object Array]"
};
ecWap.remark.startShowImg = function (c, b, a, g) {
    if (b.length > 0) {
        var f = "";
        var e = $(a);
        f += '<header class="back">';
        f += '<a href="javascript:;" onclick="javascript:;"></a>';
        f += '<em><span id="imageIndex">' + (c + 1) + "</span> / " + b.length + "</em>";
        f += "</header>";
        f += '<article class="big-img-list">';
        f += '<div id="bigslider" class="swiper-container-horizontal">';
        f += '<ul class="swiper-wrapper">';
        for (var d = 0; d < b.length; d++) {
            if (c == d) {
                f += '<li itemid="' + d + '" class="swiper-slide" style="width: 100%; vertical-align: top;"><img src="' + b[d] + '" onerror="this.src=\'' + ecWap.bigDefaultImg + "';\" /></li>"
            } else {
                f += '<li itemid="' + d + '" class="swiper-slide"><img src="' + b[d] + '" onerror="this.src=\'' + ecWap.bigDefaultImg + "';\" /></li>"
            }
        }
        f += "</ul>";
        f += "</div>";
        f += "</article>";
        f += '<div class="big-img-cont">';
        f += '<div class="big-img-star"><b class="star-area j_stararea"><s style="width:60%;"></s></b></div>';
        f += '<div class="content">';
        f += '<p id="evaluateInfo"></p>';
        f += "</div>";
        f += "</div>";
        e.html(f).show();
        if (b.length > 1) {
            ecWap.remark.bigslide = new Swiper("#bigslider", {
                initialSlide: c,
                centeredSlides: true,
                loop: true,
                onSlideChangeEnd: function (h) {
                    $("#imageIndex").html(parseInt($("#bigslider .swiper-slide-active").attr("itemid")) + 1)
                }
            })
        } else {
            ecWap.remark.bigslide = new Swiper("#bigslider", {initialSlide: 0, centeredSlides: true, loop: false})
        }
        if (typeof(g) == "function") {
            g()
        }
        e.off("click").on("click", function (h) {
            e.hide();
            b = [];
            ecWap.remark.bigslide.destroy();
            if ("#" == location.href.substring(location.href.length - 1)) {
                window.history.go(-1)
            }
            $("html,body,selector").css({height: "auto", overflow: "auto"})
        });
        $("html,body,selector").css({height: $(window).height() + "px", "overflow-y": "hidden"})
    }
};
