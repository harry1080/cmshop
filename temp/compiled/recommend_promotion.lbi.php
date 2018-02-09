<?php if ($this->_var['promotion_goods']): ?>
<div class="xm-box">
  <h4 class="title"><i class="color-mark-promotion"></i><a class="more" href="search.php?intro=new">更多</a><em>特价商品</em> <span>Price Off</span></h4>
      <div class="clearfix body">
        <?php $_from = $this->_var['promotion_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods_0_49798700_1518163581');$this->_foreach['promotion_foreach'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['promotion_foreach']['total'] > 0):
    foreach ($_from AS $this->_var['goods_0_49798700_1518163581']):
        $this->_foreach['promotion_foreach']['iteration']++;
?>
        
        <div class="goodsItem"> <a href="<?php echo $this->_var['goods_0_49798700_1518163581']['url']; ?>" target="_blank"><img src="<?php echo $this->_var['goods_0_49798700_1518163581']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods_0_49798700_1518163581']['name']); ?>" class="goodsimg" /></a><br />
          <p class="name"><a href="<?php echo $this->_var['goods_0_49798700_1518163581']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_49798700_1518163581']['name']); ?>" target="_blank"><?php echo $this->_var['goods_0_49798700_1518163581']['short_style_name']; ?></a></p>
          <div class="info">
            <p class="price">
              <?php if ($this->_var['goods_0_49798700_1518163581']['promote_price'] != ""): ?> 
              <?php echo $this->_var['goods_0_49798700_1518163581']['promote_price']; ?> 
              <?php else: ?> 
              <?php echo $this->_var['goods_0_49798700_1518163581']['shop_price']; ?> 
              <?php endif; ?> 
            </p>
            <p class="market"><?php echo $this->_var['goods_0_49798700_1518163581']['market_price']; ?></p>
            <a href="<?php echo $this->_var['goods_0_49798700_1518163581']['url']; ?>" class="buy" target="_blank">立即购买</a>
          </div>
        </div>
         <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
       </div>
 </div>
 
<div class="blank" style="height:1px;"></div>
<?php endif; ?>