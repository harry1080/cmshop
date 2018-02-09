<?php if ($this->_var['hot_goods']): ?>
<?php if ($this->_var['cat_rec_sign'] != 1): ?>
<div class="xm-box">
  <h4 class="title"><i class="color-mark-hot"></i><a class="more" href="search.php?intro=hot">更多</a><em>热卖商品</em> <span>Hot Sales</span></h4>
  <div id="show_hot_area" class="clearfix body">

    <?php $_from = $this->_var['hot_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods_0_50330000_1515031837');if (count($_from)):
    foreach ($_from AS $this->_var['goods_0_50330000_1515031837']):
?>
    <div class="goodsItem"> <a href="<?php echo $this->_var['goods_0_50330000_1515031837']['url']; ?>" target="_blank"><img src="<?php echo $this->_var['goods_0_50330000_1515031837']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods_0_50330000_1515031837']['name']); ?>" class="goodsimg" /></a><br />
      <p class="name"><a href="<?php echo $this->_var['goods_0_50330000_1515031837']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods_0_50330000_1515031837']['name']); ?>" target="_blank"><?php echo $this->_var['goods_0_50330000_1515031837']['short_style_name']; ?></a></p>
      <div class="info">
        <p class="price">
          <?php if ($this->_var['goods_0_50330000_1515031837']['promote_price'] != ""): ?>
          <?php echo $this->_var['goods_0_50330000_1515031837']['promote_price']; ?>
          <?php else: ?>
          <?php echo $this->_var['goods_0_50330000_1515031837']['shop_price']; ?>
          <?php endif; ?>
        </p>
        <p class="market"><?php echo $this->_var['goods_0_50330000_1515031837']['market_price']; ?></p>
        <a href="<?php echo $this->_var['goods_0_50330000_1515031837']['url']; ?>" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>


  </div>
</div>
<div class="blank"></div>
<?php endif; ?>
<?php endif; ?>
