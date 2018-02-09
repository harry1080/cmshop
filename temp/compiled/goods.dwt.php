<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />

<title><?php echo $this->_var['page_title']; ?></title>


<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link href="<?php echo $this->_var['ecs_css_path']; ?>" rel="stylesheet" type="text/css" />
<link href="/js/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="themes/ecmoban_tianmao2016/js/action.js"></script>
<script type="text/javascript" src="themes/ecmoban_tianmao2016/js/mzp-packed-me.js"></script>
    <style>
        #goodsInfo .textInfo li {
            padding: 12px 8px;
        }
    </style>
</head>
<body>
<?php echo $this->fetch('library/page_header.lbi'); ?>
<?php echo $this->fetch('library/ur_here.lbi'); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'common.js')); ?>
<div class="block clearfix">
    <div class="AreaL">
        
        
            <?php echo $this->fetch('library/history.lbi'); ?>
        
    </div>
    <div class="AreaR">
        
        <div id="goodsInfo" class="clearfix">

            
            <div class="imgInfo">
                <a href="<?php echo $this->_var['pictures']['0']['img_url']; ?>" id="zoom1" class="MagicZoom MagicThumb" title="<?php echo $this->_var['goods']['goods_style_name']; ?>">
                    <?php if ($this->_var['goods']['goods_img']): ?>
                    <img src="<?php echo $this->_var['pictures']['0']['img_url']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>" width="360px;" height="360px"/>

                        <?php else: ?>
                        <img src="<?php echo $this->_var['goods']['goods_thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods']['goods_name']); ?>" width="360px;" height="360px"/>

                    <?php endif; ?>
                </a>
                <div class="blank5"></div>

                <div style="text-align:center; position:relative; width:100%;">
                    <?php if ($this->_var['prev_good']): ?>
                    <a href="<?php echo $this->_var['prev_good']['url']; ?>"><img style="position: absolute; left:0;" alt="prev" src="themes/ecmoban_tianmao2016/images/up.gif" /></a>
                    <?php endif; ?>
                    <a href="javascript:;" onclick="window.open('gallery.php?id=<?php echo $this->_var['goods']['goods_id']; ?>'); return false;"><img alt="zoom" src="themes/ecmoban_tianmao2016/images/zoom.gif" /></a>
                    <?php if ($this->_var['next_good']): ?>
                    <a href="<?php echo $this->_var['next_good']['url']; ?>"><img style="position: absolute;right:0;"  alt="next" src="themes/ecmoban_tianmao2016/images/down.gif" /></a>
                    <?php endif; ?>
                </div>

                <div class="blank"></div>

                
                <?php echo $this->fetch('library/goods_gallery.lbi'); ?>
                

                
            </div>
            
            <div class="textInfo">
                <form action="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" method="post" name="ECS_FORMBUY" id="ECS_FORMBUY" >
                    <h1 class="clearfix" >
                        <?php echo $this->_var['goods']['goods_style_name']; ?>
                    </h1>
                    <?php if ($this->_var['promotion']): ?>
                    <div class="padd">
                        <?php $_from = $this->_var['promotion']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
                        <?php echo $this->_var['lang']['activity']; ?>
                        <?php if ($this->_var['item']['type'] == "snatch"): ?>
                        <a href="snatch.php" title="<?php echo $this->_var['lang']['snatch']; ?>" style="font-weight:100; color:#f69; text-decoration:none;">[<?php echo $this->_var['lang']['snatch']; ?>]</a>
                        <?php elseif ($this->_var['item']['type'] == "group_buy"): ?>
                        <a href="group_buy.php" title="<?php echo $this->_var['lang']['group_buy']; ?>" style="font-weight:100; color:#f69; text-decoration:none;">[<?php echo $this->_var['lang']['group_buy']; ?>]</a>
                        <?php elseif ($this->_var['item']['type'] == "auction"): ?>
                        <a href="auction.php" title="<?php echo $this->_var['lang']['auction']; ?>" style="font-weight:100; color:#f69; text-decoration:none;">[<?php echo $this->_var['lang']['auction']; ?>]</a>
                        <?php elseif ($this->_var['item']['type'] == "favourable"): ?>
                        <a href="activity.php" title="<?php echo $this->_var['lang']['favourable']; ?>" style="font-weight:100; color:#f69; text-decoration:none;">[<?php echo $this->_var['lang']['favourable']; ?>]</a>
                        <?php endif; ?>
                        <a href="<?php echo $this->_var['item']['url']; ?>" title="<?php echo $this->_var['lang'][$this->_var['item']['type']]; ?> <?php echo $this->_var['item']['act_name']; ?><?php echo $this->_var['item']['time']; ?>" style="font-weight:100; color:#f69;"><?php echo $this->_var['item']['act_name']; ?></a><br />
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    </div>
                    <?php endif; ?>
                    <ul class="ul2 clearfix">
                        <li class="clearfix" style="width:100%">
                            <dd>
                                
                                <strong><?php echo $this->_var['lang']['shop_price']; ?></strong><font class="shop" id="ECS_SHOPPRICE"><?php echo $this->_var['goods']['shop_price_formated']; ?></font>
                                <?php if ($this->_var['cfg']['show_marketprice']): ?>
                                <font class="market"><?php echo $this->_var['goods']['market_price']; ?></font>
                                <?php endif; ?>
                            </dd>
                        </li>

                        <?php if ($this->_var['cfg']['show_goodssn']): ?>
                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['goods_sn']; ?></strong><?php echo $this->_var['goods']['goods_sn']; ?>

                            </dd>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['goods']['goods_number'] != "" && $this->_var['cfg']['show_goodsnumber']): ?>
                        <li class="clearfix">
                            <dd>

                                <?php if ($this->_var['goods']['goods_number'] == 0): ?>
                                <strong><?php echo $this->_var['lang']['goods_number']; ?></strong>
                                <font color='red'><?php echo $this->_var['lang']['stock_up']; ?></font>
                                <?php else: ?>
                                <strong><?php echo $this->_var['lang']['goods_number']; ?></strong>
                                <?php echo $this->_var['goods']['goods_number']; ?> <?php echo $this->_var['goods']['measure_unit']; ?>
                                <?php endif; ?>

                            </dd>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['goods']['goods_brand'] != "" && $this->_var['cfg']['show_brand']): ?>
                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['goods_brand']; ?></strong><a href="<?php echo $this->_var['goods']['goods_brand_url']; ?>" ><?php echo $this->_var['goods']['goods_brand']; ?></a>
                            </dd>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['cfg']['show_goodsweight']): ?>
                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['goods_weight']; ?></strong><?php echo $this->_var['goods']['goods_weight']; ?>
                            </dd>
                        </li>
                        <?php endif; ?>
                        <?php if ($this->_var['cfg']['show_addtime']): ?>
                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['add_time']; ?></strong><?php echo $this->_var['goods']['add_time']; ?>
                            </dd>
                        </li>
                        <?php endif; ?>
                        <li class="clearfix">
                            <dd>
                                
                                <strong><?php echo $this->_var['lang']['goods_click_count']; ?>：</strong><?php echo $this->_var['goods']['click_count']; ?>
                            </dd>
                        </li>
                    </ul>

                    <ul>
                        <?php if ($this->_var['volume_price_list']): ?>
                        <li class="padd">
                            <font class="f1"><?php echo $this->_var['lang']['volume_price']; ?>：</font><br />
                            <table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#aad6ff">
                                <tr>
                                    <td align="center" bgcolor="#FFFFFF"><strong><?php echo $this->_var['lang']['number_to']; ?></strong></td>
                                    <td align="center" bgcolor="#FFFFFF"><strong><?php echo $this->_var['lang']['preferences_price']; ?></strong></td>
                                </tr>
                                <?php $_from = $this->_var['volume_price_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('price_key', 'price_list');if (count($_from)):
    foreach ($_from AS $this->_var['price_key'] => $this->_var['price_list']):
?>
                                <tr>
                                    <td align="center" bgcolor="#FFFFFF" class="shop"><?php echo $this->_var['price_list']['number']; ?></td>
                                    <td align="center" bgcolor="#FFFFFF" class="shop"><?php echo $this->_var['price_list']['format_price']; ?></td>
                                </tr>
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </table>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['goods']['is_promote'] && $this->_var['goods']['gmt_end_time']): ?>
                        <?php echo $this->smarty_insert_scripts(array('files'=>'lefttime.js')); ?>
                        <li class="padd loop" style="margin-bottom:5px; border-bottom:1px dashed #ccc;">
                            <strong><?php echo $this->_var['lang']['promote_price']; ?></strong><font class="shop"><?php echo $this->_var['goods']['promote_price']; ?></font><br />
                            <strong><?php echo $this->_var['lang']['residual_time']; ?></strong>
                            <font class="f4" id="leftTime"><?php echo $this->_var['lang']['please_waiting']; ?></font><br />
                        </li>
                        <?php endif; ?>

                        <li class="clearfix">
                            <dd >
                                <?php $_from = $this->_var['rank_prices']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'rank_price');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['rank_price']):
?>
                                <?php echo $this->_var['rank_price']['rank_name']; ?>：<font class="f1" id="ECS_RANKPRICE_<?php echo $this->_var['key']; ?>" style=" padding-right:10px;"><?php echo $this->_var['rank_price']['price']; ?></font>
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                                <a href='javascript:collect("<?php echo $this->_var['goods']['goods_id']; ?>")'>收藏</a> |
                                <?php if ($this->_var['affiliate']['on']): ?>
                                <a href="user.php?act=affiliate&goodsid=<?php echo $this->_var['goods']['goods_id']; ?>" >推荐</a>
                                <?php endif; ?>
                            </dd>
                        </li>

                        <?php if ($this->_var['goods']['give_integral'] > 0): ?>
                        <li class="clearfix">
                            <dd >
                                <strong><?php echo $this->_var['lang']['goods_give_integral']; ?></strong><font class="f4"><?php echo $this->_var['goods']['give_integral']; ?> <?php echo $this->_var['points_name']; ?></font>
                            </dd>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['goods']['bonus_money']): ?>
                        <li class="padd loop" style="margin-bottom:5px; border-bottom:1px dashed #ccc;">
                            <strong><?php echo $this->_var['lang']['goods_bonus']; ?></strong><font class="shop"><?php echo $this->_var['goods']['bonus_money']; ?></font><br />
                        </li>
                        <?php endif; ?>


                        <?php if ($this->_var['cfg']['use_integral']): ?>
                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['goods_integral']; ?></strong><font class="f4"><?php echo $this->_var['goods']['integral']; ?> <?php echo $this->_var['points_name']; ?></font>
                            </dd>
                        </li>
                        <?php endif; ?>

                        <?php if ($this->_var['goods']['is_shipping']): ?>
                        <li style="height:30px;padding-top:4px;">
                            <?php echo $this->_var['lang']['goods_free_shipping']; ?><br />
                        </li>
                        <?php endif; ?>
                    </ul>

                    <ul class="bnt_ul">

                        
                        <?php $_from = $this->_var['specification']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('spec_key', 'spec');if (count($_from)):
    foreach ($_from AS $this->_var['spec_key'] => $this->_var['spec']):
?>
                        <li class="padd loop">
                            <strong><?php echo $this->_var['spec']['name']; ?>：</strong>
                            
                            <?php if ($this->_var['spec']['attr_type'] == 1): ?>
                            <?php if ($this->_var['cfg']['goodsattr_style'] == 1): ?>
                            <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
                            <label for="spec_value_<?php echo $this->_var['value']['id']; ?>">
                                <input type="radio" name="spec_<?php echo $this->_var['spec_key']; ?>" value="<?php echo $this->_var['value']['id']; ?>" id="spec_value_<?php echo $this->_var['value']['id']; ?>" <?php if ($this->_var['key'] == 0): ?>checked<?php endif; ?> onclick="changePrice()" />
                                <?php echo $this->_var['value']['label']; ?> [<?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?> <?php echo $this->_var['value']['format_price']; ?>] </label>
                            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                            <?php else: ?>
                            <select name="spec_<?php echo $this->_var['spec_key']; ?>" onchange="changePrice()" >
                                <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
                                <option label="<?php echo $this->_var['value']['label']; ?>" value="<?php echo $this->_var['value']['id']; ?>"><?php echo $this->_var['value']['label']; ?> <?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?><?php if ($this->_var['value']['price'] != 0): ?><?php echo $this->_var['value']['format_price']; ?><?php endif; ?></option>
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </select>
                            <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                            <?php endif; ?>
                            <?php else: ?>
                            <?php $_from = $this->_var['spec']['values']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'value');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['value']):
?>
                            <label for="spec_value_<?php echo $this->_var['value']['id']; ?>">
                                <input type="checkbox" name="spec_<?php echo $this->_var['spec_key']; ?>" value="<?php echo $this->_var['value']['id']; ?>" id="spec_value_<?php echo $this->_var['value']['id']; ?>" onclick="changePrice()" />
                                <?php echo $this->_var['value']['label']; ?> [<?php if ($this->_var['value']['price'] > 0): ?><?php echo $this->_var['lang']['plus']; ?><?php elseif ($this->_var['value']['price'] < 0): ?><?php echo $this->_var['lang']['minus']; ?><?php endif; ?> <?php echo $this->_var['value']['format_price']; ?>] </label>
                            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            <input type="hidden" name="spec_list" value="<?php echo $this->_var['key']; ?>" />
                            <?php endif; ?>
                        </li>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        

                        <li class="clearfix">
                            <dd>
                                <strong><?php echo $this->_var['lang']['number']; ?>：</strong>
                                <input name="number" type="number" id="number" value="1" size="4" onblur="changePrice()" style="border:1px solid #ccc; "/> <strong><?php echo $this->_var['lang']['amount']; ?>：</strong><font id="ECS_GOODS_AMOUNT" class="f1"></font>
                            </dd>
                        </li>

                        <li class="padd">
                            <a class="btn_pink_138x32" href="javascript:addToCart(<?php echo $this->_var['goods']['goods_id']; ?>)" style="color:#FFF;text-decoration:none;">加入购物车</a>
                            <a class="btn_pink_138x32" href="javascript:addToCartNow(<?php echo $this->_var['goods']['goods_id']; ?>)" style="color:#FFF;text-decoration:none;">立即购买</a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div class="blank"></div>

        

        
        <div class="box">
            <div>
                <div id="com_b" class="history clearfix">
                    <h2>商品描述</h2>
                    <h2 class="h2bg"><?php echo $this->_var['lang']['goods_attr']; ?></h2>
                    <h2 class="h2bg">商品标签</h2>
                    <h2 class="h2bg">相关商品</h2>
                    <?php if ($this->_var['package_goods_list']): ?>
                    <h2 class="h2bg"><?php echo $this->_var['lang']['remark_package']; ?></h2>
                    <?php endif; ?>
                </div>
            </div>
            <div class="box_1">
            <div id="com_v" style="padding:6px;"></div>
            <div id="com_h">
                <blockquote>
                        <?php echo $this->_var['goods']['goods_desc']; ?>
                        
                            <?php echo $this->fetch('library/bought_note_guide.lbi'); ?>
                            <?php echo $this->fetch('library/bought_goods.lbi'); ?>

                        

                </blockquote>

                <blockquote>
                    <table class="table" width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#dddddd">
                        <?php $_from = $this->_var['properties']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'property_group');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['property_group']):
?>
                        <tr>
                            <th colspan="2" bgcolor="#FFFFFF"><?php echo htmlspecialchars($this->_var['key']); ?></th>
                        </tr>
                        <?php $_from = $this->_var['property_group']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'property');if (count($_from)):
    foreach ($_from AS $this->_var['property']):
?>
                        <tr>
                            <td bgcolor="#FFFFFF" align="left" width="30%" class="f1">[<?php echo htmlspecialchars($this->_var['property']['name']); ?>]</td>
                            <td bgcolor="#FFFFFF" align="left" width="70%"><?php echo $this->_var['property']['value']; ?></td>
                        </tr>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    </table>
                        
                        
                </blockquote>

                <blockquote><?php echo $this->fetch('library/goods_tags.lbi'); ?></blockquote>
                <blockquote><?php echo $this->fetch('library/goods_related.lbi'); ?></blockquote>

                <?php if ($this->_var['package_goods_list']): ?>
                <blockquote>
                    <?php $_from = $this->_var['package_goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'package_goods');if (count($_from)):
    foreach ($_from AS $this->_var['package_goods']):
?>
                    <strong><?php echo $this->_var['package_goods']['act_name']; ?></strong><br />
                    <table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#dddddd">
                        <tr>
                            <td bgcolor="#FFFFFF">
                                <?php $_from = $this->_var['package_goods']['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods_list');if (count($_from)):
    foreach ($_from AS $this->_var['goods_list']):
?>
                                <a href="goods.php?id=<?php echo $this->_var['goods_list']['goods_id']; ?>" target="_blank"><font class="f1"><?php echo $this->_var['goods_list']['goods_name']; ?></font></a> &nbsp;&nbsp;X <?php echo $this->_var['goods_list']['goods_number']; ?><br />
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </td>
                            <td bgcolor="#FFFFFF">
                                <strong><?php echo $this->_var['lang']['old_price']; ?></strong><font class="market"><?php echo $this->_var['package_goods']['subtotal']; ?></font><br />
                                <strong><?php echo $this->_var['lang']['package_price']; ?></strong><font class="shop"><?php echo $this->_var['package_goods']['package_price']; ?></font><br />
                                <strong><?php echo $this->_var['lang']['then_old_price']; ?></strong><font class="shop"><?php echo $this->_var['package_goods']['saving']; ?></font><br />
                            </td>
                            <td bgcolor="#FFFFFF">
                                <a href="javascript:addPackageToCart(<?php echo $this->_var['package_goods']['act_id']; ?>)" style="background:transparent"><img src="themes/ecmoban_tianmao2016/images/bnt_buy_1.gif" alt="<?php echo $this->_var['lang']['add_to_cart']; ?>" /></a>
                            </td>
                        </tr>
                    </table>
                    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    
                    
                </blockquote>
                <?php endif; ?>
            </div>
        </div>
        </div>
        <div class="blank"></div>
        
    </div>
    
</div>
<?php echo $this->fetch('library/page_footer.lbi'); ?>
</body>

<script type="text/javascript">
var goods_id = "<?php echo $this->_var['goods_id']; ?>";
var goodsattr_style = "<?php echo empty($this->_var['cfg']['goodsattr_style']) ? '1' : $this->_var['cfg']['goodsattr_style']; ?>";
var gmt_end_time = "<?php echo empty($this->_var['promote_end_time']) ? '0' : $this->_var['promote_end_time']; ?>";
<?php $_from = $this->_var['lang']['goods_js']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('key', 'item');if (count($_from)):
    foreach ($_from AS $this->_var['key'] => $this->_var['item']):
?>
var <?php echo $this->_var['key']; ?> = "<?php echo $this->_var['item']; ?>";
<?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
var goodsId = <?php echo $this->_var['goods_id']; ?>;
var now_time = <?php echo $this->_var['now_time']; ?>;

onload = function(){
  changePrice();
  fixpng();
  try {onload_leftTime();}
  catch (e) {}
}
  reg("com");

</script>
</html>
