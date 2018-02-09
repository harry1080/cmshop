<div class="main-banner-wp">
  <div class="block">
    <div class="main-banner" id="slideBox">
        <ul class="main-banner-hd hd">
            <?php $_from = $this->_var['flash']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'flash_0_49977200_1515031837');$this->_foreach['myflash'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['myflash']['total'] > 0):
    foreach ($_from AS $this->_var['flash_0_49977200_1515031837']):
        $this->_foreach['myflash']['iteration']++;
?>
            <li></li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </ul>
        <div class="bd">
            <ul class="main-banner-bd">
                <?php $_from = $this->_var['flash']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'flash_0_49985500_1515031837');$this->_foreach['myflash'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['myflash']['total'] > 0):
    foreach ($_from AS $this->_var['flash_0_49985500_1515031837']):
        $this->_foreach['myflash']['iteration']++;
?>
                <li><a href="<?php echo $this->_var['flash_0_49985500_1515031837']['url']; ?>" target="_blank"><img src="<?php echo $this->_var['flash_0_49985500_1515031837']['src']; ?>" alt=""></a></li>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            </ul>
        </div>
    </div>

  </div>
</div>
<script type="text/javascript">
  $("#slideBox").slide({
    effect : "fold",
    autoPlay : true,
    mainCell : ".bd ul"
  });
</script>