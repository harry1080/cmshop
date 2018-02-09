<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="<?php echo $this->_var['keywords']; ?>" />
<meta name="Description" content="<?php echo $this->_var['description']; ?>" />

<title><?php echo $this->_var['page_title']; ?></title>

<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link href="<?php echo $this->_var['ecs_css_path']; ?>" rel="stylesheet" type="text/css" />

<?php echo $this->smarty_insert_scripts(array('files'=>'transport_jquery.js,common.js')); ?>
</head>
<body>
<?php echo $this->fetch('library/page_header.lbi'); ?>
<?php echo $this->fetch('library/ur_here.lbi'); ?>
<div class="block">
  <h5><span><?php echo $this->_var['lang']['package_list']; ?></span></h5>
  <div class="blank"></div>
   <?php $_from = $this->_var['list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'val');if (count($_from)):
    foreach ($_from AS $this->_var['val']):
?>
   <a name="<?php echo $this->_var['val']['act_id']; ?>"></a>
  <table width="100%" border="0" cellpadding="5" cellspacing="1" bgcolor="#dddddd">
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['package_name']; ?>:</th>
      <td colspan="3" bgcolor="#ffffff"><?php echo $this->_var['val']['act_name']; ?></td>
    </tr>
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['start_time']; ?>:</th>
      <td width="200" bgcolor="#ffffff"><?php echo $this->_var['val']['start_time']; ?></td>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['orgtotal']; ?>:</th>
      <td bgcolor="#ffffff"><?php echo $this->_var['val']['subtotal']; ?></td>
    </tr>
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['end_time']; ?>:</th>
      <td bgcolor="#ffffff"><?php echo $this->_var['val']['end_time']; ?></td>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['package_price']; ?>:</th>
      <td bgcolor="#ffffff"><?php echo $this->_var['val']['package_price']; ?></td>
    </tr>
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['heart_buy']; ?>:</th>
      <td bgcolor="#ffffff"><a href="javascript:addPackageToCart(<?php echo $this->_var['val']['act_id']; ?>)" style="background:transparent"><img src="themes/ecmoban_tianmao2016/images/bnt_buy_1.gif" alt="<?php echo $this->_var['lang']['add_to_cart']; ?>" /></a></td>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['saving']; ?>:</th>
      <td width="200" bgcolor="#ffffff"><?php echo $this->_var['val']['saving']; ?></td>
    </tr>
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['package_goods']; ?>:</th>
      <td colspan="3" bgcolor="#ffffff">
        <?php $_from = $this->_var['val']['goods_list']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
        <a href="goods.php?id=<?php echo $this->_var['goods']['goods_id']; ?>" target="_blank" class="f6"><span class="f_user_info"><u><?php echo $this->_var['goods']['goods_name']; ?></u></span></a> &nbsp;X &nbsp;<?php echo $this->_var['goods']['goods_number']; ?><br />
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
      </td>
    </tr>
    <tr>
      <th bgcolor="#ffffff"><?php echo $this->_var['lang']['desc']; ?>:</th>
      <td colspan="3" bgcolor="#ffffff"><?php echo $this->_var['val']['act_desc']; ?></td>
    </tr>
  </table>
  <div class="blank5"></div><br />
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</div>

<?php echo $this->fetch('library/page_footer.lbi'); ?>
</body>
</html>
