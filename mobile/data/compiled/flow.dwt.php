<!DOCTYPE html>
<html>
<head>
<meta name="Generator" content="cmShop v1.0.0" />
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php echo $this->_var['page_title']; ?> </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no" />
<link href="<?php echo $this->_var['ectouch_themes']; ?>/images/touch-icon.png" rel="apple-touch-icon-precomposed" />
<link href="<?php echo $this->_var['ectouch_themes']; ?>/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
<link href="<?php echo $this->_var['ectouch_themes']; ?>/js/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="<?php echo $this->_var['ectouch_themes']; ?>/css/build.css?v=20170302" rel="stylesheet" type="text/css" />
<link href="<?php echo $this->_var['ectouch_themes']; ?>/ectouch.css?v=20170302" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/common.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/shopping_flow.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/transport_jquery.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/region.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/utils.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/TouchSlide.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/layermobile/layer_mobile/layer.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/jquery-labelauty.js"></script>
<script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/ectouch.js"></script>
</head>
<body>
<?php if ($this->_var['step'] == "cart"): ?>
<div id="page">
  <header id="header">
    <div class="header_l"> <a class="ico_10" href="index.php"> 返回 </a> </div>
    <h1>购物车</h1>
    <div class="header_r"></div>
  </header>
</div>


  <?php echo $this->smarty_insert_scripts(array('files'=>'showdiv.js')); ?>
<script type="text/javascript">
  <?php $_from = $this->_var['lang']['password_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
    var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </script>
<div class="cart-step" id="J_cartTab">
  <ul>
    <li class="cur">1.购物车列表</li>
    <li>2.确认订单</li>
    <li>3.购买成功</li>
  </ul>
</div>
<div class="blank3"></div>
<?php if ($this->_var['goods_list']): ?>
<section class="wrap" style="padding-bottom:5rem"  >
  <form id="formCart" name="formCart" method="post" action="flow.php">
    <ul class="radius10 itemlist">
      <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
      <li class="new-tbl-type">
        <div class="itemlist_l new-tbl-cell">
          <?php if ($this->_var['goods']['goods_id'] > 0 && $this->_var['goods']['extension_code'] != 'package_buy'): ?>
          <a  href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" target="_blank"> <img class="lazy" src="<?php echo $this->_var['site_url']; ?><?php echo $this->_var['goods']['goods_thumb']; ?>" border="0" title="<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>" /> </a>
          <?php if ($this->_var['goods']['parent_id'] > 0): ?>
          <span style="color:#FF0000">（<?php echo $this->_var['lang']['accessories']; ?>）</span>
          <?php endif; ?>
          <?php if ($this->_var['goods']['is_gift'] > 0): ?>
          <span style="color:#FF0000">（<?php echo $this->_var['lang']['largess']; ?>）</span>
          <?php endif; ?>
          <?php elseif ($this->_var['goods']['goods_id'] > 0 && $this->_var['goods']['extension_code'] == 'package_buy'): ?>
          <a href="javascript:void(0)" onClick="setSuitShow(<?php echo $this->_var['goods']['goods_id']; ?>)" class="f6"><?php echo $this->_var['goods']['goods_name']; ?><span style="color:#FF0000;">（<?php echo $this->_var['lang']['remark_package']; ?>）</span></a>
          <div id="suit_<?php echo $this->_var['goods']['goods_id']; ?>" style="display:none">
            <?php $_from = $this->_var['goods']['package_goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'package_goods_list');if (count($_from)):
    foreach ($_from AS $this->_var['package_goods_list']):
?>
            <a href="goods.php?id=<?php echo $this->_var['package_goods_list']['goods_id']; ?>" target="_blank" class="f6"><?php echo $this->_var['package_goods_list']['goods_name']; ?></a><br />
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
          </div>
          <?php else: ?>
          <?php echo $this->_var['goods']['goods_name']; ?>
          <?php endif; ?>
        </div>
        <div class="desc new-tbl-cell"> <a style="color:#333" href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" target="_blank" class="fragment">
          <h4><?php echo $this->_var['goods']['goods_name']; ?></h4>
          </a>
          <div style="clear:both"> </div>
          <?php if ($this->_var['show_goods_attribute'] == 1): ?>
          <p> <?php echo nl2br($this->_var['goods']['goods_attr']); ?> </p>
          <?php endif; ?>
          <div> <em class="price"><?php echo $this->_var['goods']['goods_price']; ?></em> <span style="jianju">x </span> <span class="txt">
		  <button type="button" class="decrease" onclick="changenum(<?php echo $this->_var['goods']['rec_id']; ?>,-1)">-</button>
            <?php if ($this->_var['goods']['goods_id'] > 0 && $this->_var['goods']['is_gift'] == 0 && $this->_var['goods']['parent_id'] == 0): ?>
            <input class="num" type="text" min="1" max="1000" name="goods_number[<?php echo $this->_var['goods']['rec_id']; ?>]" id="goods_number_<?php echo $this->_var['goods']['rec_id']; ?>" value="<?php echo $this->_var['goods']['goods_number']; ?>" size="4"   onkeyup="changenum(<?php echo $this->_var['goods']['rec_id']; ?>,0)"/>
			<button type="button" class="increase" onclick="changenum(<?php echo $this->_var['goods']['rec_id']; ?>,1)">+</button>
            <?php echo $this->smarty_insert_scripts(array('files'=>'transport.js')); ?>
			<script>
        function changenum(rec_id,diff){
					var num = parseInt(document.getElementById('goods_number_'+rec_id).value);
					var goods_number = num + Number(diff);
					if( goods_number >= 1){
						document.getElementById('goods_number_'+rec_id).value = goods_number;//更新数量
						change_goods_number(rec_id,goods_number);
					}
        }

        function change_goods_number(rec_id, goods_number)
        {
        Ajax.call('flow.php?step=ajax_update_cart', 'rec_id=' + rec_id +'&goods_number=' + goods_number, change_goods_number_response, 'POST','JSON');
        }

        function change_goods_number_response(result)
        {
          if (result.error == 0)
          {
          var rec_id = result.rec_id;
            document.getElementById('total_number').innerHTML = result.total_number;//更新数量
            document.getElementById('goods_subtotal').innerHTML = result.total_desc;//更新小计
            if (document.getElementById('ECS_CARTINFO'))
              {
                  //更新购物车数量
              document.getElementById('ECS_CARTINFO').innerHTML = result.cart_info;
              }
        }
        else if (result.message != '')
          {
          alert(result.message);
          }
        }
      </script>
            <?php else: ?>
            <?php echo $this->_var['goods']['goods_number']; ?>
            <?php endif; ?>
            </span>
            <a onclick="delCart(this)" rel="<?php echo $this->_var['goods']['rec_id']; ?>" lang="<?php echo $this->_var['lang']['drop_goods_confirm']; ?>" style="position:absolute;top:0.5rem;right:0.5rem"> <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>
            </div>
        </div>
      </li>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </ul>
    <input type="hidden" name="step" value="update_cart" />
  </form>
<?php if ($this->_var['favourable_list']): ?>
<?php $_from = $this->_var['favourable_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'favourable');if (count($_from)):
    foreach ($_from AS $this->_var['favourable']):
?>
<form action="flow.php" method="post">
    <section class="order_box padd1 radius10 goodsBuy">
      <table class="ectouch_table" width="100%" border="0" cellspacing="0" cellpadding="5">
        <tr>
          <td width="25%" bgcolor="#ffffff" align="right"><?php echo $this->_var['lang']['label_act_name']; ?></td>
          <td width="75%" bgcolor="#ffffff" align="left"><?php echo $this->_var['favourable']['act_name']; ?></td>
        </tr>
        <tr>
          <td width="15%"  bgcolor="#ffffff" align="right"><?php echo $this->_var['lang']['favourable_period']; ?></td>
          <td width="35%" bgcolor="#ffffff" align="left"><?php echo $this->_var['favourable']['start_time']; ?> --- <?php echo $this->_var['favourable']['end_time']; ?></td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" align="right"><?php echo $this->_var['lang']['favourable_range']; ?></td>
          <td bgcolor="#ffffff" align="left"> <?php echo $this->_var['lang']['far_ext'][$this->_var['favourable']['act_range']]; ?><br />
              <?php echo $this->_var['favourable']['act_range_desc']; ?>
        </tr>
        <tr>
          <td bgcolor="#ffffff" align="right"><?php echo $this->_var['lang']['favourable_amount']; ?></td>
          <td bgcolor="#ffffff" align="left"> <?php echo $this->_var['favourable']['formated_min_amount']; ?> --- <?php echo $this->_var['favourable']['formated_max_amount']; ?></td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" align="right"><?php echo $this->_var['lang']['favourable_type']; ?></td>
          <td bgcolor="#ffffff" align="left">
          <span class="STYLE1"><?php echo $this->_var['favourable']['act_type_desc']; ?></span>
                <?php if ($this->_var['favourable']['act_type'] == 0): ?>
                <?php $_from = $this->_var['favourable']['gift']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'gift');if (count($_from)):
    foreach ($_from AS $this->_var['gift']):
?><br />
                  <input type="checkbox" value="<?php echo $this->_var['gift']['id']; ?>" name="gift[]" />
                  <a href="goods.php?id=<?php echo $this->_var['gift']['id']; ?>" target="_blank" class="f6"><?php echo $this->_var['gift']['name']; ?></a> [<?php echo $this->_var['gift']['formated_price']; ?>]
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
              <?php endif; ?>
          </td>
        </tr>
        <?php if ($this->_var['favourable']['available']): ?>
            <tr>
              <td align="right" bgcolor="#ffffff">&nbsp;</td>
              <td bgcolor="#ffffff" align="left">
                <div class="option">
                 <button class="btn cart radius5" type="image">
                <div class="ico_01"></div>
                加入购物车
                </button>
                 </div>
              </td>
            </tr>
            <?php endif; ?>
      </table>
      <input type="hidden" name="act_id" value="<?php echo $this->_var['favourable']['act_id']; ?>" />
          <input type="hidden" name="step" value="add_favourable" />
    </section>
    </form>
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
<?php endif; ?>
</section>
<footer class="toolbar">
  <p>合计: <em class="price" id="goods_subtotal"><?php echo $this->_var['total']['goods_price']; ?></em></p>
  <a href="flow.php?step=checkout">结算(<em class="num" id="total_number"><?php echo $this->_var['total']['total_number']; ?></em>)</a> </footer>
<?php else: ?>
<section class="wrap"  >
  <div class="empty-cart">
    <div class="ico_13 cart-logo"></div>
    <p class="message">没有宝贝哦，不如去添加宝贝</p>
    <div class="flex"> <a class="c-btn2  flex_in radius5" href="index.php" style=" background:#6bd0a2"> <i class="ico_04_b"></i> 去购物 </a> <a class="c-btn2  flex_in radius5" href="user.php?act=collection_list" style=" margin-left:0.5rem"> 查看收藏夹</a> </div>
  </div>
</section>
<?php endif; ?>
<?php if ($_SESSION['user_id'] > 0): ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'transport.js')); ?>
<script type="text/javascript" charset="utf-8">
        function collect_to_flow(goodsId)
        {
          var goods        = new Object();
          var spec_arr     = new Array();
          var fittings_arr = new Array();
          var number       = 1;
          goods.spec     = spec_arr;
          goods.goods_id = goodsId;
          goods.number   = number;
          goods.parent   = 0;
          Ajax.call('flow.php?step=add_to_cart', 'goods=' + goods.toJSONString(), collect_to_flow_response, 'POST', 'JSON');
        }
        function collect_to_flow_response(result)
        {
          if (result.error > 0)
          {
            // 如果需要缺货登记，跳转
            if (result.error == 2)
            {
              if (confirm(result.message))
              {
                location.href = 'user.php?act=add_booking&id=' + result.goods_id;
              }
            }
            else if (result.error == 6)
            {
              openSpeDiv(result.message, result.goods_id);
            }
            else
            {
              alert(result.message);
            }
          }
          else
          {
            location.href = 'flow.php';
          }
        }
      </script>

<?php endif; ?>
<?php endif; ?>



<?php if ($this->_var['step'] == "consignee"): ?>
<script type="text/javascript">
      region.isAdmin = false;
      <?php $_from = $this->_var['lang']['flow_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
          var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
          
          onload = function() {
            if (!document.all)
            {
              document.forms['theForm'].reset();
            }
          }
          
</script>
<div id="page">
  <header id="header">
    <div class="header_l"> <a class="ico_10" href="javascript:history.go(-1)"> 返回 </a> </div>
    <h1> 收货人信息 </h1>
  </header>
</div>
<div class="cart-step" id="J_cartTab">
  <ul>
    <li>1.购物车列表</li>
    <li class="cur">2.确认订单</li>
    <li>3.购买成功</li>
  </ul>
</div>
<div class="blank3"></div>
<div class="wrap consigneepage">
  
  <?php $_from = $this->_var['consignee_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('sn', 'consignee');if (count($_from)):
    foreach ($_from AS $this->_var['sn'] => $this->_var['consignee']):
?>
  <section class="order_box padd1 radius10" style="padding-top:0;padding-bottom:0;">
    <div class="table_box2 table_box">
      <form style="padding:8px;" action="flow.php" method="post" name="theForm" id="theForm" onSubmit="return checkConsignee(this)">
        <?php echo $this->fetch('library/consignee.lbi'); ?>
      </form>
    </div>
  </section>
  <div class="blank3"></div>
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</div>
<?php endif; ?>


<?php if ($this->_var['step'] == "checkout"): ?>
<script>
        checkout();
        var flow_no_payment = "<?php echo $this->_var['lang']['flow_no_payment']; ?>";
        var flow_no_shipping = "<?php echo $this->_var['lang']['flow_no_shipping']; ?>";
</script>
<div id="page">
  <header id="header">
    <div class="header_l"> <a class="ico_10" href="flow.php"> 返回 </a></div>
    <h1> 确认订单 </h1>
  </header>
</div>
<div class="cart-step" id="J_cartTab">
  <ul>
    <li>1.购物车列表</li>
    <li class="cur">2.确认订单</li>
    <li>3.购买成功</li>
  </ul>
</div>
<div class="blank3"></div>
<section class="wrap">
  <form action="flow.php" method="post" name="theForm" id="theForm" onSubmit="return checkOrderForm(this)">
    <section class="order_box padd1 radius10">
      <div class="in">
        <div class="table_box table_box1">
          <dl>
            <dd><i class="fa fa-user-o" aria-hidden="true"></i>&nbsp;<?php echo $this->_var['lang']['consignee_name']; ?>:</dd>
            <dd><span class="f1"><?php echo htmlspecialchars($this->_var['consignee']['consignee']); ?></span></dd>
            <dd style="float:right"><a href="flow.php?step=consignee"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a></dd>
          </dl>
          <dl>
            <dd><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;<?php echo $this->_var['lang']['consignee_tel']; ?>:</dd>
            <dd><?php echo $this->_var['consignee']['tel']; ?></dd>
          </dl>
          <dl>
            <dd><i class="fa fa-info" aria-hidden="true"></i>&nbsp;&nbsp;<?php echo $this->_var['lang']['detailed_address']; ?>:</dd>
            <dd><?php echo htmlspecialchars($this->_var['consignee']['address']); ?></dd>
          </dl>
        </div>
      </div>
    </section>
    <section class="order_box padd1 radius10">
      <div class="table_box table_box2">
        <?php if ($this->_var['total']['real_goods_count'] != 0): ?>
        <dl>
          <dd class="dd1" style="width:40%"><?php echo $this->_var['lang']['shipping_method']; ?>:</dd>
          <dd class="dd2">
		  <div class="consigneepage">
              <label>
                  <select name="shipping" onchange="selectShipping(this)">
                      <option value="0"><?php echo $this->_var['lang']['please_select']; ?></option>
                        <?php $_from = $this->_var['shipping_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'shipping');if (count($_from)):
    foreach ($_from AS $this->_var['shipping']):
?>
                         <option value="<?php echo $this->_var['shipping']['shipping_id']; ?>" supportCod="<?php echo $this->_var['shipping']['support_cod']; ?>" insure="<?php echo $this->_var['shipping']['insure']; ?>" <?php if ($this->_var['order']['shipping_id'] == $this->_var['shipping']['shipping_id']): ?>selected="selected"<?php endif; ?>><?php echo $this->_var['shipping']['shipping_name']; ?> [<?php echo $this->_var['shipping']['format_shipping_fee']; ?>]</option>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                   </select>
               </label>
            </div>
          </dd>
          <dd class="dd2"><span style="float:right;">*</span></dd>
        </dl>
        <dl style="display:none">
          <dd class="dd1">
             <div class="container">
              <div class="row">
              	<div class="col-md-12">
              	<div class="checkbox checkbox-success">
              		<input id="need_insure" type="checkbox" name="need_insure" value="1" onclick="selectInsure(this.checked)" <?php if ($this->_var['order']['need_insure']): ?>checked="true"<?php endif; ?> <?php if ($this->_var['insure_disabled']): ?>disabled="true"<?php endif; ?> >
              		<label for="need_insure"><?php echo $this->_var['lang']['need_insure']; ?></label>
              	</div>
              </div>
             </div>
            </div>
          </dd>
        </dl>

        <?php else: ?>
           <input name="shipping" type="radio" value = "-1" checked="checked" style="display:none"/>
        <?php endif; ?>

       <?php if ($this->_var['is_exchange_goods'] != 1 || $this->_var['total']['real_goods_count'] != 0): ?>
         <dl>
           <dd class="dd1" style="width:40%"><?php echo $this->_var['lang']['payment_method']; ?></dd>
           <dd class="dd2">
 		    <div class="consigneepage">
               <label>
                   <select name="payment" onchange="selectPayment(this)">
                       <option value="0"><?php echo $this->_var['lang']['please_select']; ?></option>
                          <?php $_from = $this->_var['payment_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'payment');if (count($_from)):
    foreach ($_from AS $this->_var['payment']):
?>
                          <option value="<?php echo $this->_var['payment']['pay_id']; ?>" isCod="<?php echo $this->_var['payment']['is_cod']; ?>" <?php if ($this->_var['order']['pay_id'] == $this->_var['payment']['pay_id']): ?>selected="selected"<?php endif; ?>> <?php echo $this->_var['payment']['pay_name']; ?> [<?php echo $this->_var['payment']['format_pay_fee']; ?>]</option>
                         <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                       </select>
                </label>
             </div>
           </dd>
           <dd class="dd2"><span style="float:right;">*</span></dd>
         </dl>
        <?php else: ?>
            <input name = "payment" type="radio" value = "-1" checked="checked"  style="display:none"/>
        <?php endif; ?>


        <?php if ($this->_var['inv_content_list']): ?>
        <dl>
          <dd class="dd1">是否开票</dd>
          <dd class="dd2">
          <span class="modRadio" >
            <i class="fl"></i><ins>否</ins> </span></dd>
        </dl>
		<div class="dl_box" id="inviype_box" style="margin-bottom:0.5rem; display:none;">
            <dl style="line-height: 40px;">
               <dd class="c333">发票类型</dd>
                <dd>
                <?php if ($this->_var['inv_type_list']): ?>
                    <?php echo $this->_var['lang']['invoice_type']; ?>
                    <select name="inv_type" id="ECS_INVTYPE"  onchange="changeNeedInv()" style="border:1px solid #ccc;">
                    <?php echo $this->html_options(array('options'=>$this->_var['inv_type_list'],'selected'=>$this->_var['order']['inv_type'])); ?></select>
                    <?php endif; ?>
                  </dd>
            </dl>
            <dl>
               <dd class="c333">发票抬头</dd>
                <dd>
                    <input name="inv_payee" type="text" class="input" id="ECS_INVPAYEE" size="20" value="<?php echo $this->_var['order']['inv_payee']; ?>" onblur="changeNeedInv()" />
                </dd>
            </dl>
            <dl>
                 <dd class="c333"> 发票内容</dd>
                   <dd>
                   <select name="inv_content" id="ECS_INVCONTENT" onchange="changeNeedInv()" style="border:1px solid #ccc;">
                        <?php echo $this->html_options(array('values'=>$this->_var['inv_content_list'],'output'=>$this->_var['inv_content_list'],'selected'=>$this->_var['order']['inv_content'])); ?>
                   </select>
                 </dd>
            </dl>
		</div>
		<?php endif; ?>
      </div>
    </section>

    <section class="order_box padd1 radius10" style="padding-top:0.3rem;padding-bottom:0.3rem;">
      <div class="table_box table_box2">
        <?php if ($this->_var['allow_use_bonus']): ?>
          <dl>
            <dd class="dd1"><?php echo $this->_var['lang']['use_bonus']; ?></dd>
            <dd class="dd2">
  		  <div class="consigneepage">
                <label>
                    <select name="bonus" onchange="changeBonus(this)">
                        <option value="0"><?php echo $this->_var['lang']['please_select']; ?></option>
                          <?php $_from = $this->_var['bonus_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'bonus');if (count($_from)):
    foreach ($_from AS $this->_var['bonus']):
?>
                           <option value="<?php echo $this->_var['bonus']['bonus_id']; ?>" <?php if ($this->_var['order']['bonus_id'] == $this->_var['bonus']['bonus_id']): ?>selected="selected"<?php endif; ?>> <?php echo $this->_var['bonus']['type_name']; ?>[<?php echo $this->_var['bonus']['bonus_money_formated']; ?>]</option>
                          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        </select>
                 </label>
              </div>
            </dd>
          </dl>
        <?php endif; ?>

        <?php if ($this->_var['pack_list']): ?>
          <dl>
            <dd class="dd1"><?php echo $this->_var['lang']['goods_package']; ?></dd>
            <dd class="dd2">
  		  <div class="consigneepage">
                <label>
                    <select name="pack" onchange="selectPack(this)">
                        <option value="0"><?php echo $this->_var['lang']['please_select']; ?></option>
                          <?php $_from = $this->_var['pack_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'pack');if (count($_from)):
    foreach ($_from AS $this->_var['pack']):
?>
                           <option value="<?php echo $this->_var['pack']['pack_id']; ?>" <?php if ($this->_var['order']['pack_id'] == $this->_var['pack']['pack_id']): ?>selected="selected"<?php endif; ?>> <?php echo $this->_var['pack']['pack_name']; ?>[<?php echo $this->_var['pack']['format_pack_fee']; ?>]</option>
                          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        </select>
                 </label>
              </div>
            </dd>
          </dl>
        <?php endif; ?>

        <?php if ($this->_var['card_list']): ?>
          <dl>
            <dd class="dd1"><?php echo $this->_var['lang']['goods_card']; ?></dd>
            <dd class="dd2">
  		  <div class="consigneepage">
                <label>
                    <select name="card" onchange="selectCard(this)">
                        <option value="0"><?php echo $this->_var['lang']['please_select']; ?></option>
                          <?php $_from = $this->_var['card_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'card');if (count($_from)):
    foreach ($_from AS $this->_var['card']):
?>
                           <option value="<?php echo $this->_var['card']['card_id']; ?>" <?php if ($this->_var['order']['card_id'] == $this->_var['card']['card_id']): ?>selected="selected"<?php endif; ?>> <?php echo $this->_var['card']['card_name']; ?>[<?php echo $this->_var['card']['format_card_fee']; ?>]</option>
                          <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        </select>
                 </label>
              </div>
            </dd>
          </dl>
        <?php endif; ?>


        <?php if ($this->_var['allow_use_surplus']): ?>
          <dl>
              <dd class="dd1"><?php echo $this->_var['lang']['use_surplus']; ?></dd>
              <dd class="dd2">
                <input name="surplus" type="text" class="inputBg" id="ECS_SURPLUS" size="10" value="<?php echo empty($this->_var['order']['surplus']) ? '0' : $this->_var['order']['surplus']; ?>" onblur="changeSurplus(this.value)" <?php if ($this->_var['disable_surplus']): ?>disabled="disabled"<?php endif; ?>/>
              </dd>
           </dl>
          <dl>
              <dd class="dd1"><?php echo $this->_var['lang']['your_surplus']; ?></dd>
              <dd class="dd2"><?php echo empty($this->_var['your_surplus']) ? '0' : $this->_var['your_surplus']; ?></dd>
          </dl>
        <?php endif; ?>



         <?php if ($this->_var['allow_use_integral']): ?>
          <dl>
              <dd class="w50"><?php echo $this->_var['lang']['use_integral']; ?></dd>
              <dd class="w50">
                <input style="text-align:center" name="integral" type="text" class="input" id="CM_INTEGRAL" onblur="changeIntegral(this.value)" value="<?php echo empty($this->_var['order']['integral']) ? '0' : $this->_var['order']['integral']; ?>" size="10" />
              </dd>
           </dl>
          <dl>
              <dd class="dd1"><?php echo $this->_var['lang']['can_use_integral']; ?></dd>
              <dd class="dd2"><?php echo empty($this->_var['your_integral']) ? '0' : $this->_var['your_integral']; ?> <?php echo $this->_var['points_name']; ?> </dd>
          </dl>
           <dl>
                <dd class="dd1"><?php echo $this->_var['lang']['noworder_can_integral']; ?></dd>
                <dd class="dd2"><?php echo $this->_var['order_max_integral']; ?><?php echo $this->_var['points_name']; ?></dd>
           </dl>
           <?php endif; ?>

          <dl>
              <dd class="dd1">留言备注</dd>
              <dd class="dd2">
                <input placeholder="请输入订单备注" name="inv_payee" type="text" size="20"/>
              </dd>
          </dl>
      </div>
    </section>

    <section class="order_box padd1 radius10">
      <div class="table_box table_box3">
        <dl>
          <dd class="dd1"><?php echo $this->_var['lang']['goods_list']; ?></dd>
          <dd class="dd2"></dd>
          <dd class="dd3">
           <?php if ($this->_var['allow_edit_cart']): ?>
           <a href="flow.php"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;</a>
           <?php endif; ?>
          </dd>
        </dl>
        <dl>
            <dd class="dd1">产品列表</dd>
            <dd class="dd2" style="text-align:left">数量</dd>
            <dd class="dd3">价格</dd>
        </dl>
        <?php $_from = $this->_var['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
        <dl>
          <dd class="dd1">
            <?php if ($this->_var['goods']['goods_id'] > 0 && $this->_var['goods']['extension_code'] == 'package_buy'): ?>
            <a href="javascript:void(0)" onClick="setSuitShow(<?php echo $this->_var['goods']['goods_id']; ?>)" ><?php echo $this->_var['goods']['goods_name']; ?><span style="color:#FF0000;">（<?php echo $this->_var['lang']['remark_package']; ?>）</span></a>
            <?php else: ?>
            <a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" target="_blank" ><?php echo $this->_var['goods']['goods_name']; ?></a>
            <?php if ($this->_var['goods']['parent_id'] > 0): ?>
            <span style="color:#FF0000">（<?php echo $this->_var['lang']['accessories']; ?>）</span>
            <?php elseif ($this->_var['goods']['is_gift']): ?>
            <span style="color:#FF0000">（<?php echo $this->_var['lang']['largess']; ?>）</span>
            <?php endif; ?>
            <?php endif; ?>
            <?php if ($this->_var['goods']['is_shipping']): ?>(<span style="color:#FF0000"><?php echo $this->_var['lang']['free_goods']; ?></span>)<?php endif; ?>
          </dd>
          <dd class="dd2 c999"> x <?php echo $this->_var['goods']['goods_number']; ?> </dd>
          <dd class="dd3"> <?php echo $this->_var['goods']['formated_subtotal']; ?> </dd>
        </dl>

        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

        <?php echo $this->fetch('library/order_total.lbi'); ?> </div>
        <input type="submit" name="submit" value="提交订单" class="c-btn3"/>

    </section>

    <input type="hidden" name="step" value="done" />
  </form>
</section>
<?php endif; ?>


<?php if ($this->_var['step'] == "done"): ?>


<header id="header">
    <div class="header_l"><a class="ico_10" href="index.php">返回</a></div>
    <h1> 订单提交成功 </h1>
</header>
<div class="cart-step" id="J_cartTab">
    <ul>
        <li>1.购物车列表</li>
        <li>2.确认订单</li>
        <li class="cur">3.购买成功</li>
    </ul>
</div>
<div class="blank3"></div>
<section class="order_box padd1 radius10">
<div class="table_box table_box3">
    <dl>
        <dd><?php echo $this->_var['lang']['remember_order_number']; ?>:</dd>
        <dd><?php echo $this->_var['order']['order_sn']; ?></dd>
    </dl>
    <?php if ($this->_var['order']['shipping_name']): ?>
    <dl>
        <dd><?php echo $this->_var['lang']['select_shipping']; ?>:</dd>
        <dd><?php echo $this->_var['order']['shipping_name']; ?></dd>
    </dl>
    <?php endif; ?>

    <?php if ($this->_var['order']['shipping_name']): ?>
    <dl>
        <dd><?php echo $this->_var['lang']['select_payment']; ?>:</dd>
        <dd><strong><?php echo $this->_var['order']['pay_name']; ?></strong></dd>
    </dl>
    <?php endif; ?>

    <dl>
        <dd><?php echo $this->_var['lang']['order_amount']; ?>:</dd>
        <dd><strong><?php echo $this->_var['total']['amount_formated']; ?></strong></dd>
    </dl>


    <?php if ($this->_var['virtual_card']): ?>
    <dl>
        <?php echo $this->_var['vgoods']['goods_name']; ?>
    </dl>
    <?php $_from = $this->_var['virtual_card']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vgoods');if (count($_from)):
    foreach ($_from AS $this->_var['vgoods']):
?>
    <?php $_from = $this->_var['vgoods']['info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'card');if (count($_from)):
    foreach ($_from AS $this->_var['card']):
?>
    <?php if ($this->_var['card']['card_sn']): ?>
    <dl>
        <dd><?php echo $this->_var['lang']['card_sn']; ?>:</dd>
        <dd><?php echo $this->_var['card']['card_sn']; ?></dd>
    </dl>
    <?php endif; ?>

    <?php if ($this->_var['card']['card_password']): ?>
    <dl>
        <dd><?php echo $this->_var['lang']['card_password']; ?>:</dd>
        <dd><?php echo $this->_var['card']['card_password']; ?></dd>
    </dl>
    <?php endif; ?>

    <?php if ($this->_var['card']['end_date']): ?>
    <dl>
        <dd><?php echo $this->_var['lang']['end_date']; ?>:</dd>
        <dd><?php echo $this->_var['card']['end_date']; ?></dd>
    </dl>
    <?php endif; ?>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    <?php endif; ?>
</div>
</section>
    <?php if ($this->_var['pay_online']): ?>
        <?php echo $this->_var['pay_online']; ?>
    <?php endif; ?>
<?php endif; ?>

<?php if ($this->_var['step'] == "ok"): ?>

<header id="header">
    <div class="header_l"> <a class="ico_10" href="index.php"> 返回 </a> </div>
    <h1> </h1>
</header>
<div class="cart-step" id="J_cartTab">
  <ul>
    <li>1.购物车列表</li>
    <li>2.确认订单</li>
    <li class="cur">3.购买成功</li>
  </ul>
</div>
<div class="blank3"></div>
<section class="order_box padd1 radius10">
    <div class="table_box table_box3">

        <?php if ($this->_var['order']['shipping_name']): ?>
        <dl>
            <dd><?php echo $this->_var['lang']['select_shipping']; ?>:</dd>
            <dd><?php echo $this->_var['order']['shipping_name']; ?></dd>
        </dl>
        <?php endif; ?>

        <?php if ($this->_var['pay_online']): ?>
        
        <dl class="text-center">
            <dd><?php echo $this->_var['pay_online']; ?></dd>
        </dl>
        <?php endif; ?>
    </div>
</section>
<?php if ($this->_var['virtual_card']): ?>
<section class="order_box padd1 radius10">
    <div class="table_box table_box3">
        <?php $_from = $this->_var['virtual_card']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'vgoods');if (count($_from)):
    foreach ($_from AS $this->_var['vgoods']):
?>
        <dl class="text-center">
            <dd><?php echo $this->_var['vgoods']['goods_name']; ?></dd>
        </dl>
        <?php $_from = $this->_var['vgoods']['info']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'card');if (count($_from)):
    foreach ($_from AS $this->_var['card']):
?>
        <?php if ($this->_var['card']['card_sn']): ?>
        <dl>
            <dd><?php echo $this->_var['lang']['card_sn']; ?>:</dd>
            <dd><?php echo $this->_var['card']['card_sn']; ?></dd>
        </dl>
        <?php endif; ?>

        <?php if ($this->_var['card']['card_password']): ?>
        <dl>
            <dd><?php echo $this->_var['lang']['card_password']; ?>:</dd>
            <dd><?php echo $this->_var['card']['card_password']; ?></dd>
        </dl>
        <?php endif; ?>

        <?php if ($this->_var['card']['end_date']): ?>
        <dl>
            <dd><?php echo $this->_var['lang']['end_date']; ?>:</dd>
            <dd><?php echo $this->_var['card']['end_date']; ?></dd>
        </dl>
        <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div>
</section>
<?php endif; ?>
<?php endif; ?>


<?php if ($this->_var['step'] == "login"): ?>
<div id="page">
  <header id="header">
    <div class="header_l"> <a class="ico_10" onClick="javascript:history.go(-1)"> 返回 </a> </div>
    <h1> 登录/注册 </h1>
  </header>
</div>
<div class="cart-step" id="J_cartTab">
  <ul>
    <li>1.购物车列表</li>
    <li class="cur">2.确认订单</li>
    <li>3.购买成功</li>
  </ul>
</div>
<div class="blank2"></div>

<section class="wrap">
 <?php echo $this->smarty_insert_scripts(array('files'=>'utils.js,user.js')); ?>
  <script type="text/javascript">
        <?php $_from = $this->_var['lang']['flow_login_register']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
          var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

        
        function checkLoginForm(frm) {
          if (Utils.isEmpty(frm.elements['username'].value)) {
            alert(username_not_null);
            return false;
          }

          if (Utils.isEmpty(frm.elements['password'].value)) {
            alert(password_not_null);
            return false;
          }

          return true;
        }

        
  </script>
  
  <div id="leftTabBox" class="loginBox">
    <div class="hd"> <span>登录后可体验更多服务</span>
      <ul>
         <li<?php if ($this->_var['action'] == 'login'): ?> class="on"<?php endif; ?>><a>登录</a></li>
         <li<?php if ($this->_var['action'] == 'register'): ?> class="on"<?php endif; ?>><a>注册</a></li>
      </ul>
    </div>
    <div class="bd" id="tabBox1-bd" <?php if ($this->_var['action'] == 'register'): ?> style="display:none"<?php endif; ?>>
      <ul>
      <div class="table_box">
          <form action="flow.php?step=login" method="post" name="loginForm" id="loginForm" onsubmit="return checkLoginForm(this)">
            <dl>
              <dd>
                <input placeholder="<?php echo $this->_var['lang']['username']; ?>/<?php echo $this->_var['lang']['mobile']; ?>/<?php echo $this->_var['lang']['email']; ?>" name="username" type="text"  class="inputBg" id="username" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="<?php echo $this->_var['lang']['label_password']; ?>"  name="password" type="password" class="inputBg" />
              </dd>
            </dl>
            <dl>
            <dd>
             <div class="container">
              <div class="row">
              	<div class="col-md-12">
              	<div class="checkbox checkbox-success">
              		<input id="remember" class="styled" type="checkbox" value="1" name="remember">
              		<label for="remember">一个月内免登录</label>
              	</div>
              </div>
             </div>
            </div>
            </dd>
            </dl>
            <dl>
              <dd>
                 <input type="submit" name="login" class="c-btn3" value="<?php echo $this->_var['lang']['forthwith_login']; ?>" />
                 <?php if ($this->_var['anonymous_buy'] == 1): ?>
                <br/>
                 <input type="button" value="<?php echo $this->_var['lang']['direct_shopping']; ?>" class="c-btn3" onclick="location.href='flow.php?step=consignee&amp;direct_shopping=1'" />
                 <?php endif; ?>
                 <input name="act" type="hidden" value="signin" />
              </dd>
            </dl>
          </form>
          <dl>
            <dd> <a href="user.php?act=get_password" class="f6">忘记密码?点击找回</a></dd>
          </dl>
        </div>
      </ul>
      </div>
        <div class="bd"<?php if ($this->_var['action'] == 'login'): ?> style="display:none"<?php endif; ?>>
          <ul style="height:25rem">
      	<?php if ($this->_var['enabled_sms_signin'] == 1): ?>
        <form action="user.php" method="post" name="formUser" onsubmit="return register2();">
          <input type="hidden" name="flag" id="flag" value="register" />
          <div class="table_box">
            <dl>
              <dd>
                <input placeholder="请输入手机号码" class="inputBg" name="mobile" id="mobile_phone" type="text" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请输入帐号密码" class="inputBg" name="password" id="mobile_pwd" type="password" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请输入验证码" class="inputBg" name="mobile_code" id="mobile_code" type="text" />
              </dd>
              <dd>
              <input id="zphone" name="sendsms" type="button" value="获取手机验证码" onClick="sendSms();" class="c-btn3" />
              </dd>
            </dl>
            <dl>
              <dd>
                   <div class="container">
                        <div class="row">
                          <div class="col-md-12">
                            <div class="checkbox checkbox-success">
                            	<input id="agreement" class="styled" type="checkbox" value="1" checked="checked" name="agreement">
                            		<label for="agreement">我已看过并同意《<a href="article.php?cat_id=-1">用户协议</a>》</label>
                            </div>
                          </div>
                     </div>
                    </div>
              </dd>
            </dl>
            <dl>
              <dd>
                <input name="act" type="hidden" value="act_register" />
                <input name="enabled_sms" type="hidden" value="1" />
                <input type="hidden" name="back_act" value="<?php echo $this->_var['back_act']; ?>" />
                <input name="Submit" type="submit" value="下一步" class="c-btn3" />
              </dd>
            </dl>
          </div>
        </form>
        <?php else: ?>
        <form action="user.php" method="post" name="formUser" onsubmit="return register();">
          <input type="hidden" name="flag" id="flag" value="register" />
          <div class="table_box">
            <dl>
              <dd>
                <input placeholder="请输入用户名" class="inputBg" name="username" id="username" type="text" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请输入电子邮箱" class="inputBg" name="email" id="email" type="text" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请输入登录密码" class="inputBg" name="password" id="password1" type="password" />
              </dd>
            </dl>
            <dl>
              <dd>
                <input placeholder="请重新输入一遍密码" class="inputBg" name="confirm_password" id="confirm_password" type="password" />
              </dd>
            </dl>
            <?php if ($this->_var['enabled_captcha']): ?>
            <dl>
              <dd>
                <input placeholder="请输入验证码" class="inputBg" name="captcha" id="captcha" type="text" />
              </dd>
              <dd>
              <img src="captcha.php?<?php echo $this->_var['rand']; ?>" alt="captcha" style="height:34px;vertical-align: middle; margin-left:5px;" onClick="this.src='captcha.php?'+Math.random()" />
              </dd>
            </dl>
            <?php endif; ?>
            <dl>
              <dd>
                 <div class="container">
                    <div class="row">
                       <div class="col-md-12">
                       <div class="checkbox checkbox-success">
                        <input id="agreement" class="styled" type="checkbox" value="1" checked="checked" name="agreement">
                        <label for="agreement">我已看过并同意《<a href="article.php?cat_id=-1">用户协议</a>》</label>
                        </div>
                     </div>
                   </div>
               </div>
              </dd>
            </dl>
            <dl>
              <dd>
                <input name="act" type="hidden" value="act_register" />
                <input name="enabled_sms" type="hidden" value="0" />
                <input type="hidden" name="back_act" value="<?php echo $this->_var['back_act']; ?>" />
                <input name="Submit" type="submit" value="下一步" class="c-btn3" />
              </dd>
            </dl>
          </div>
        </form>
        <?php endif; ?>
        <?php if ($this->_var['need_rechoose_gift']): ?>
        <?php echo $this->_var['lang']['gift_remainder']; ?>
        <?php endif; ?>
      </ul>
    </div>
  </div>
  <script type="text/javascript" src="<?php echo $this->_var['ectouch_themes']; ?>/js/sms.js"></script>
</section>

<script type="text/javascript">
jQuery(function($){
	$('.hd ul li').click(function(){
		var index = $('.hd ul li').index(this);
		$(this).addClass('on').siblings('li').removeClass('on');
		$('.loginBox .bd:eq('+index+')').show().siblings('.bd').hide();
	})
})
</script>

<?php endif; ?>

<div class="blank3"></div>
<div style="width:1px; height:1px; overflow:hidden"><?php $_from = $this->_var['lang']['p_y']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'pv');if (count($_from)):
    foreach ($_from AS $this->_var['pv']):
?><?php echo $this->_var['pv']; ?><?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?></div>
</body>
<script type="text/javascript">
var process_request = "<?php echo $this->_var['lang']['process_request']; ?>";
<?php $_from = $this->_var['lang']['passport_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
var username_exist = "<?php echo $this->_var['lang']['username_exist']; ?>";
var compare_no_goods = "<?php echo $this->_var['lang']['compare_no_goods']; ?>";
var btn_buy = "<?php echo $this->_var['lang']['btn_buy']; ?>";
var is_cancel = "<?php echo $this->_var['lang']['is_cancel']; ?>";
var select_spe = "<?php echo $this->_var['lang']['select_spe']; ?>";
</script>
</html>
