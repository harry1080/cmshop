
var selectedSurplus = '';
var selectedBonus = 0;
var selectedIntegral = 0;
var selectedOOS = null;

var groupBuyShipping = null;
var groupBuyPayment = null;

/* *
 * 改变配送方式
 */
function selectShipping(obj) {
    if(obj==null){return}
    var index=obj.selectedIndex ; // selectedIndex代表的是你所选中项的index
    var optobj = obj.options[index];
    var supportCod = optobj.attributes['supportCod'].value;
    var theForm = obj.form;

    for (var i = 0; i < theForm.elements.length; i++) {

        var elem =  theForm.elements[i];

        if (elem =='select'&&elem.name == 'payment' &&  elem.options[elem.selectedIndex].attributes['is_cod'].value == 1) {
            if (supportCod == 0) {
                elem.disabled = true;
            }
            else {
                elem.disabled = false;
            }
        }
    }
    var needinsure = document.getElementById('need_insure');


    if (optobj.attributes['insure'].value  == 0) {
        needinsure.checked = false;
        needinsure.disabled = false;
    }
    else {
        needinsure.checked = true;
        needinsure.disabled = true;
    }
    Ajax.call('flow.php?step=select_shipping', 'shipping=' + obj.value, orderShippingSelectedResponse, 'GET', 'JSON');
}
function orderShippingSelectedResponse(result) {
    var needinsure = document.getElementById('need_insure');

    if (result.need_insure) {
        try {
            needinsure.checked = true;
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
    }

    var cod_fee = document.getElementById('cod_fee');//货到付款费用
    try {
        if (cod_fee != undefined) {
            cod_fee.innerHTML = result.cod_fee;
        }
    }
    catch (ex) {
        layer.open({
            content: ex.message
            ,btn: '我知道了'
        });
    }

    orderSelectedResponse(result);
}

/* *
 * 改变支付方式
 */
function selectPayment(obj) {
    if(obj==null){return;}
    Ajax.call('flow.php?step=select_payment', 'payment=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}
/* *
 * 团购购物流程 --> 改变配送方式
 */
function handleGroupBuyShipping(obj) {
    if (groupBuyShipping == obj) {
        return;
    }
    else {
        groupBuyShipping = obj;
    }

    var supportCod = obj.attributes['supportCod'].value + 0;
    var theForm = obj.form;

    for (i = 0; i < theForm.elements.length; i++) {
        if (theForm.elements[i].name == 'payment' && theForm.elements[i].attributes['isCod'].value == '1') {
            if (supportCod == 0) {
                theForm.elements[i].checked = false;
                theForm.elements[i].disabled = true;
            }
            else {
                theForm.elements[i].disabled = false;
            }
        }
    }

    if (obj.attributes['insure'].value + 0 == 0) {
        document.getElementById('need_insure').checked = false;
        document.getElementById('need_insure').disabled = true;
    }
    else {
        document.getElementById('need_insure').checked = false;
        document.getElementById('need_insure').disabled = false;
    }

    Ajax.call('group_buy.php?act=select_shipping', 'shipping=' + obj.value, orderSelectedResponse, 'GET');
}

/* *
 * 团购购物流程 --> 改变支付方式
 */
function handleGroupBuyPayment(obj) {
    if (groupBuyPayment == obj) {
        return;
    }
    else {
        groupBuyPayment = obj;
    }

    Ajax.call('group_buy.php?act=select_payment', 'payment=' + obj.value, orderSelectedResponse, 'GET');
}

/* *
 * 改变商品包装
 */
function selectPack(obj) {
    if(obj==null){return;}

    Ajax.call('flow.php?step=select_pack', 'pack=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 改变祝福贺卡
 */
function selectCard(obj) {
    if(obj==null){return;}
    Ajax.call('flow.php?step=select_card', 'card=' + obj.value, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 选定了配送保价
 */
function selectInsure(needInsure) {
    needInsure = needInsure ? 1 : 0;

    Ajax.call('flow.php?step=select_insure', 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 团购购物流程 --> 选定了配送保价
 */
function handleGroupBuyInsure(needInsure) {
    needInsure = needInsure ? 1 : 0;

    Ajax.call('group_buy.php?act=select_insure', 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 回调函数
 */
function orderSelectedResponse(result) {
    if (result.error) {
        //提示
        layer.open({
            content: result.error
            ,skin: 'msg'
            ,time: 5//5秒后自动关闭
        });
        location.href = './';
    }

    try {
        var layer = document.getElementById("ECS_ORDERTOTAL");

        layer.innerHTML = (typeof result == "object") ? result.content : result;

        if (result.payment != undefined) {
            var surplusObj = document.forms['theForm'].elements['surplus'];
            if (surplusObj != undefined) {
                surplusObj.disabled = result.pay_code == 'balance';
            }
        }
    }
    catch (ex) {
        layer.open({
            content: ex.message
            ,btn: '我知道了'
        });
    }
}

/* *
 * 改变余额
 */
function changeSurplus(val) {
    if (selectedSurplus == val) {
        return;
    }
    else {
        selectedSurplus = val;
    }

    Ajax.call('flow.php?step=change_surplus', 'surplus=' + val, changeSurplusResponse, 'GET', 'JSON');
}
/* *
 * 改变余额回调函数
 */
function changeSurplusResponse(obj) {
    if (obj.error) {
        try {
            document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = obj.error;
            document.getElementById('ECS_SURPLUS').value = '0';
            document.getElementById('ECS_SURPLUS').focus();
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
    }
    else {
        try {
            document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = '';
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
        orderSelectedResponse(obj.content);
    }
}

/* *
 * 改变积分
 */
function changeIntegral(val) {
    if (selectedIntegral == val) {
        return;
    }
    else {
        selectedIntegral = val;
    }

    Ajax.call('flow.php?step=change_integral', 'points=' + val, changeIntegralResponse, 'GET', 'JSON');
}

/* *
 * 改变积分回调函数
 */
function changeIntegralResponse(obj) {
    if (obj.error) {
        try {
            layer.open({
                content: obj.error
                ,btn: '我知道了'
            });
            document.getElementById('CM_INTEGRAL').value = '0';
            document.getElementById('CM_INTEGRAL').focus();
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
    }
    else {
        orderSelectedResponse(obj.content);
    }
}

/* *
 * 改变红包
 */
function changeBonus(obj) {
    if(obj==null) return;
    Ajax.call('flow.php?step=change_bonus', 'bonus=' + obj.val, changeBonusResponse, 'GET', 'JSON');
}

/* *
 * 改变红包的回调函数
 */
function changeBonusResponse(obj) {
    if (obj.error) {
        layer.open({
            content: obj.error
            ,btn: '我知道了'
        });
        try {
            document.getElementById('ECS_BONUS').value = '0';
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
    }
    else {
        orderSelectedResponse(obj.content);
    }
}

/**
 * 验证红包序列号
 * @param string bonusSn 红包序列号
 */
function validateBonus(bonusSn) {
    Ajax.call('flow.php?step=validate_bonus', 'bonus_sn=' + bonusSn, validateBonusResponse, 'GET', 'JSON');
}

function validateBonusResponse(obj) {

    if (obj.error) {
        //信息框
        layer.open({
            content: obj.error
            ,btn: '我知道了'
        });
        orderSelectedResponse(obj.content);
        try {
            document.getElementById('ECS_BONUSN').value = '0';
        }
        catch (ex) {
            layer.open({
                content: ex.message
                ,btn: '我知道了'
            });
        }
    }
    else {
        document.getElementById("ECS_BONUS").options[0].selected = true;
        selectedBonus = 0;
        orderSelectedResponse(obj.content);
    }
}

/* *
 * 改变发票的方式
 */
function changeNeedInv() {
    var obj = document.getElementById('ECS_NEEDINV');
    var objType = document.getElementById('ECS_INVTYPE');
    var objPayee = document.getElementById('ECS_INVPAYEE');
    var objContent = document.getElementById('ECS_INVCONTENT');
    var needInv = obj.checked ? 1 : 0;
    var invType = obj.checked ? (objType != undefined ? objType.value : '') : '';
    var invPayee = obj.checked ? objPayee.value : '';
    var invContent = obj.checked ? objContent.value : '';
    objType.disabled = objPayee.disabled = objContent.disabled = !obj.checked;
    if (objType != null) {
        objType.disabled = !obj.checked;
    }

    Ajax.call('flow.php?step=change_needinv', 'need_inv=' + needInv + '&inv_type=' + encodeURIComponent(invType) + '&inv_payee=' + encodeURIComponent(invPayee) + '&inv_content=' + encodeURIComponent(invContent), orderSelectedResponse, 'GET');
}

/* *
 * 改变发票的方式
 */
function groupBuyChangeNeedInv() {
    var obj = document.getElementById('ECS_NEEDINV');
    var objPayee = document.getElementById('ECS_INVPAYEE');
    var objContent = document.getElementById('ECS_INVCONTENT');
    var needInv = obj.checked ? 1 : 0;
    var invPayee = obj.checked ? objPayee.value : '';
    var invContent = obj.checked ? objContent.value : '';
    objPayee.disabled = objContent.disabled = !obj.checked;

    Ajax.call('group_buy.php?act=change_needinv', 'need_idv=' + needInv + '&amp;payee=' + invPayee + '&amp;content=' + invContent, null, 'GET');
}

/* *
 * 改变缺货处理时的处理方式
 */
function changeOOS(obj) {
    if (selectedOOS == obj) {
        return;
    }
    else {
        selectedOOS = obj;
    }

    Ajax.call('flow.php?step=change_oos', 'oos=' + obj.value, null, 'GET');
}

/* *
 * 检查提交的订单表单
 */
function checkOrderForm(frm) {
    var paymentSelected = false;
    var shippingSelected = false;

    // 检查是否选择了支付配送方式
    for (var i = 0; i < frm.elements.length; i++) {
        if (frm.elements[i].name == 'shipping' && frm.elements[i].value!= 0) {
            shippingSelected = true;
        }

        if (frm.elements[i].name == 'payment' && frm.elements[i].value!= 0) {
            paymentSelected = true;
        }
    }
    if (!shippingSelected) {
        layer.open({
            content: flow_no_shipping
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });

        return false;
    }

    if (!paymentSelected) {
        layer.open({
            content: flow_no_payment
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;
    }

    // 检查用户输入的余额
    if (document.getElementById("ECS_SURPLUS")) {
        var surplus = document.getElementById("ECS_SURPLUS").value;
        var error = Utils.trim(Ajax.call('flow.php?step=check_surplus', 'surplus=' + surplus, null, 'GET', 'TEXT', false));

        if (error) {
            try {
                document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = error;
            }
            catch (ex) {
                layer.open({
                    content: ex.message
                    ,btn: '我知道了'
                });
            }
            return false;
        }
    }

    // 检查用户输入的积分
    var integral = document.getElementById("ECS_INTEGRAL");
    if (integral) {
        var error = Utils.trim(Ajax.call('flow.php?step=check_integral', 'integral=' + integral.value, null, 'GET', 'TEXT', false));
        if (error) {
            layer.open({
                content: error
                , btn: '我知道了'
            });
            return false;
        }
    }
    frm.action = frm.action + '?step=done';
    return true;
}

/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm) {

    //收货人姓名不能为空
    if (Utils.isEmpty(frm.elements['consignee'].value)) {
        layer.open({
            content: consignee_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;
    }
    //电话不能为空
    if (Utils.isEmpty(frm.elements['tel'].value)) {
        layer.open({
            content: tele_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;
    }
    else {
        var istel = Utils.isTel(frm.elements['tel'].value);
        if (!istel) {
            layer.open({
                content: mobile_invaild
                , btn: '我知道了'
                , time: 5 //5秒后自动关闭

            });
            return false;
        }
    }


    //国家不能为空
    if (frm.elements['country'] && frm.elements['country'].value == 0) {
        layer.open({
            content: country_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;

    }
    //省不能为空
    if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1) {
        layer.open({
            content: province_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;
    }

    if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1) {
        layer.open({
            content: city_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;

    }

    if (frm.elements['district'] && frm.elements['district'].length > 1) {
        if (frm.elements['district'].value == 0) {
            layer.open({
                content: district_not_null
                , btn: '我知道了'
                , time: 5 //5秒后自动关闭
            });
            return false;

        }
    }


    //if ( ! Utils.isEmail(frm.elements['email'].value))
    //{
    //layer.open({
    //  content: invalid_email
    //  ,btn: '我知道了'
    //});
    //}

    //详细地址不能为空

    if (frm.elements['address'] && Utils.isEmpty(frm.elements['address'].value)) {
        layer.open({
            content: address_not_null
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;

    }

    //邮编不能为空
    if (frm.elements['zipcode'] && frm.elements['zipcode'].value.length > 0 && (!Utils.isNumber(frm.elements['zipcode'].value))) {
        layer.open({
            content: zip_not_num
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;
    }


    if (frm.elements['mobile'] && frm.elements['mobile'].value.length > 0 && (!Utils.isTel(frm.elements['mobile'].value))) {
        layer.open({
            content: mobile_invaild
            , btn: '我知道了'
            , time: 5 //5秒后自动关闭

        });
        return false;

    }
    return true;
}

