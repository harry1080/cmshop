/**
 * Created by Administrator on 2017/3/8.
 */
jQuery(function($) {
    $(".info").click(function(){
        $('.goodsBuy .fields').slideToggle("fast");
    });
})

function showPic(){
    var data = document.getElementById("slideBox").className;
    var reCat = /ui-gallery/;
    if( reCat.test(data) ){
        document.getElementById("slideBox").className = 'slideBox';
    }else{
        document.getElementById("slideBox").className = 'slideBox ui-gallery';
    }
}
function changenum(diff) {
    var num = parseInt(document.getElementById('goods_number').value);
    var goods_number = num + Number(diff);
    if( goods_number >= 1){
        document.getElementById('goods_number').value = goods_number;//更新数量
        changePrice();
    }
}

/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice()
{
    var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
    var qty = document.forms['ECS_FORMBUY'].elements['number'].value;
    Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
}

/**
 * 接收返回的信息
 */
function changePriceResponse(res)
{
    if (res.err_msg.length > 0)
    {
        alert(res.err_msg);
    }
    else
    {
        document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;

        if (document.getElementById('ECS_GOODS_AMOUNT'))
            document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
    }
}

function tab(id){
    document.getElementById('tabs' + tab_now).className = document.getElementById('tabs' + tab_now).className.replace('current', '');
    document.getElementById('tabs' + id).className = document.getElementById('tabs' + id).className.replace('', 'current');

    tab_now = id;
    if (id == 1) {
        document.getElementById('tab1').className = '';
        document.getElementById('tab2').className = 'hidden';
        document.getElementById('tab3').className = 'hidden';
    }else if (id == 2) {
        document.getElementById('tab1').className = 'hidden';
        document.getElementById('tab2').className = '';
        document.getElementById('tab3').className = 'hidden';
    }else if (id == 3) {
        document.getElementById('tab1').className = 'hidden';
        document.getElementById('tab2').className = 'hidden';
        document.getElementById('tab3').className = '';
    }
}

function showDiv(){
    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('hidDiv').style.display = 'block';
    document.getElementById('cartNum').innerHTML = document.getElementById('goods_number').value;
    document.getElementById('cartPrice').innerHTML = document.getElementById('ECS_GOODS_AMOUNT').innerHTML;
}
function closeDiv(){
    document.getElementById('popDiv').style.display = 'none';
    document.getElementById('hidDiv').style.display = 'none';
}