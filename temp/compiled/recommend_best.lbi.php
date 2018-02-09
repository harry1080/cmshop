<?php if ($this->_var['best_goods']): ?>
<?php if ($this->_var['cat_rec_sign'] != 1): ?>
<div class="xm-box">
  <h4 class="title"><i class="color-mark-best"></i><a class="more" href="search.php?intro=best">更多</a><em>精品推荐</em><span>Recommend Buy</span> </h4>
  <div id="show_best_area" class="clearfix body">

    <?php $_from = $this->_var['best_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');if (count($_from)):
    foreach ($_from AS $this->_var['goods']):
?>
    <div class="goodsItem"> <a href="<?php echo $this->_var['goods']['url']; ?>" target="_blank"><img src="<?php echo $this->_var['goods']['thumb']; ?>" alt="<?php echo htmlspecialchars($this->_var['goods']['name']); ?>" class="goodsimg" /></a><br />
      <p class="name"><a href="<?php echo $this->_var['goods']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['goods']['name']); ?>" target="_blank"><?php echo $this->_var['goods']['short_style_name']; ?></a></p>
      <div class="info">
        <p class="price">
          <?php if ($this->_var['goods']['promote_price'] != ""): ?>
          <?php echo $this->_var['goods']['promote_price']; ?>
          <?php else: ?>
          <?php echo $this->_var['goods']['shop_price']; ?>
          <?php endif; ?>
        </p>
        <p class="market"><?php echo $this->_var['goods']['market_price']; ?></p>
        <a href="<?php echo $this->_var['goods']['url']; ?>" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
    <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>


  </div>
</div>
<div class="blank"></div>
<?php endif; ?>
<?php endif; ?>
