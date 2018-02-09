
<div id="category_tree">
<div class="tit">所有商品分类</div>
<dl class="clearfix" style=" overflow:hidden;" >
<div class="box1 cate" id="cate">
  <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat_0_17592100_1515035200');$this->_foreach['no'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['no']['total'] > 0):
    foreach ($_from AS $this->_var['cat_0_17592100_1515035200']):
        $this->_foreach['no']['iteration']++;
?>
  <h1 onclick="tab(<?php echo ($this->_foreach['no']['iteration'] - 1); ?>)"  <?php if (($this->_foreach['no']['iteration'] <= 1)): ?> style="border-top:none" <?php endif; ?>  >
  <span class="f_l"><img src="themes/ecmoban_tianmao2016/images/btn_fold.gif" style="padding-top:10px;padding-right:6px;cursor:pointer;"></span>
  </h1>
  <a  <?php if (($this->_foreach['no']['iteration'] <= 1)): ?> style="border-top:none" <?php endif; ?> href="<?php echo $this->_var['cat_0_17592100_1515035200']['url']; ?>" class="  f_ll" ><?php echo htmlspecialchars($this->_var['cat_0_17592100_1515035200']['name']); ?></a>
  <ul style="display:none" class="sub-tree">
    <?php $_from = $this->_var['cat_0_17592100_1515035200']['cat_id']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'child_0_17611700_1515035200');if (count($_from)):
    foreach ($_from AS $this->_var['child_0_17611700_1515035200']):
?>
    <a class="over_2" href="<?php echo $this->_var['child_0_17611700_1515035200']['url']; ?>"><?php echo htmlspecialchars($this->_var['child_0_17611700_1515035200']['name']); ?></a>
    <div class="clearfix">
      <?php $_from = $this->_var['child_0_17611700_1515035200']['cat_id']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'childer');if (count($_from)):
    foreach ($_from AS $this->_var['childer']):
?>
      <a class="over_3" href="<?php echo $this->_var['childer']['url']; ?>"><?php echo htmlspecialchars($this->_var['childer']['name']); ?></a>
      <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
  </ul>
  <div style="clear:both"></div>
  <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
</div>
<div style="clear:both"></div>
</div>
<div class="blank"></div>
<script type="text/javascript">
obj_h4 = document.getElementById("cate").getElementsByTagName("h4")
obj_ul = document.getElementById("cate").getElementsByTagName("ul")
obj_img = document.getElementById("cate").getElementsByTagName("img")
function tab(id)
{
		if(obj_ul.item(id).style.display == "block")
		{
			obj_ul.item(id).style.display = "none"
			obj_img.item(id).src = "themes/ecmoban_tianmao2016/images/btn_fold.gif"
			return false;
		}
		else(obj_ul.item(id).style.display == "none")
		{
			obj_ul.item(id).style.display = "block"
			obj_img.item(id).src = "themes/ecmoban_tianmao2016/images/btn_unfold.gif"
		}
}
</script>
