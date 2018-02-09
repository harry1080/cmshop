function $(element) {
    return document.getElementById(element);
}

function $id(element) {
    return document.getElementById(element);
}
//切屏--是按钮，_v是内容平台，_h是内容库
function reg(str) {
    var bt = $id(str + "_b").getElementsByTagName("h2");
    for (var i = 0; i < bt.length; i++) {
        bt[i].subj = str;
        bt[i].pai = i;
        bt[i].style.cursor = "pointer";
        bt[i].onclick = function () {
            $id(this.subj + "_v").innerHTML = $id(this.subj + "_h").getElementsByTagName("blockquote")[this.pai].innerHTML;
            for (var j = 0; j < $id(this.subj + "_b").getElementsByTagName("h2").length; j++) {
                var _bt = $id(this.subj + "_b").getElementsByTagName("h2")[j];
                var ison = j == this.pai;
                _bt.className = (ison ? "" : "h2bg");
            }
        }
    }
    $id(str + "_h").className = "none";
    $id(str + "_v").innerHTML = $id(str + "_h").getElementsByTagName("blockquote")[0].innerHTML;
}

function picturs() {
    var goodsimg = document.getElementById("goodsimg");
    var imglist = document.getElementById("imglist");
    var imgnum = imglist.getElementsByTagName("img");
    for (var i = 0; i < imgnum.length; i++) {
        imgnum[i].onclick = function () {
            var lang = this.getAttribute("lang");
            goodsimg.setAttribute("src", lang);
            for (var j = 0; j < imgnum.length; j++) {
                if (imgnum[j].getAttribute("class") == "onbg" || imgnum[j].getAttribute("className") == "onbg") {
                    imgnum[j].className = "autobg";
                    break;
                }
            }
            this.className = "onbg";
        }
    }
}

function colorStyle(id, color1, color2) {
    var elem = document.getElementById(id);
    if (elem.getAttribute("id") == id) {
        //elem.className = color1;
        if (elem.className == color1)
            elem.className = color2;
        else
            elem.className = color1;
    }
}

function articleSize(size, lineheight) {
    var article = document.getElementById("article");
    article.style.fontSize = size + "px";
    article.style.lineHeight = lineheight + "px";
}

function elems(id, cur) {
    var id = document.getElementById(id).getElementsByTagName("li");
    for (var i = 0; i < id.length; i++) {
        id[0].className = "cur";
        id[i].onmouseover = function () {
            this.className = "";
            for (var j = 0; j < id.length; j++) {
                if ((id[j].getAttribute("class") == cur) || (id[j].getAttribute("className") == cur)) {
                    id[j].className = "";
                    break;
                }
            }
            this.className = cur;
        }
    }
}

//点击切换背景图片效果

function mypicBg() {

    var imglist = document.getElementById("imglist");
    var imgnum = imglist.getElementsByTagName("img");
    for (var i = 0; i < imgnum.length; i++) {
        imgnum[i].onclick = function () {

            for (var j = 0; j < imgnum.length; j++) {
                if (imgnum[j].getAttribute("class") == "onbg" || imgnum[j].getAttribute("className") == "onbg") {
                    imgnum[j].className = "autobg";
                    break;
                }
            }
            this.className = "onbg";
        }
    }
}

/**
 * 用户添加标记的处理函数
 */
function submitTag(frm) {
    try {
        var tag = frm.elements['tag'].value;
        var idx = frm.elements['goods_id'].value;

        if (tag.length > 0 && parseInt(idx) > 0) {
            Ajax.call('user.php?act=add_tag', "id=" + idx + "&tag=" + tag, submitTagResponse, "POST", "JSON");
        }
    }
    catch (e) {
        alert(e);
    }

    return false;
}

function submitTagResponse(result) {
    var div = document.getElementsByClassName('ECS_TAGS');

    if (result.error > 0) {
        alert(result.message);
    }
    else {
        try {
            div.innerHTML = '';
            var tags = result.content;

            for (var i = 0; i < tags.length; i++) {
                div.innerHTML += '<a href="search.php?keywords=' + tags[i].word + '" style="color:#006ace; text-decoration:none; margin-right:5px;">' + tags[i].word + '[' + tags[i].count + ']<\/a>&nbsp;&nbsp; ';
            }
        }
        catch (e) {
            alert(e);
        }
    }
}

/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice() {
    var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
    var qty = document.forms['ECS_FORMBUY'].elements['number'].value;

    Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
}

/**
 * 接收返回的信息
 */
function changePriceResponse(res) {
    if (res.err_msg.length > 0) {
        alert(res.err_msg);
    }
    else {
        document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;

        if (document.getElementById('ECS_GOODS_AMOUNT'))
            document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
    }
}

