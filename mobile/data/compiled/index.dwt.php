<html>
<head>
<meta name="Generator" content="cmShop v1.0.0" />
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title><?php echo $this->_var['page_title']; ?></title>
    <meta name="keywords" content="<?php echo $this->_var['keywords']; ?>">
    <meta name="description" content="<?php echo $this->_var['description']; ?>">

    <script>
        var imagePath = "<?php echo $this->_var['ectouch_themes']; ?>/images/"
    </script>
    <link href="<?php echo $this->_var['ectouch_themes']; ?>/css/vmcss.css?20170421" rel="stylesheet" type="text/css">
    <link href="<?php echo $this->_var['ectouch_themes']; ?>/images/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
    <link href="<?php echo $this->_var['ectouch_themes']; ?>/css/main.css?20160326" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="<?php echo $this->_var['ectouch_themes']; ?>/css/swiper.min.css">
</head>


<body style="">

<div class="index-top">
    
    <header class="header" id="index-header">
        <!--  <section class="logo">
            <a id="index-href" href="/">
                <img id="index-img" src="">
            </a>
        </section> -->
        

        <section class="search">
            <a id="indexSearch" href="search.php"
               onclick="_hmt.push(['_trackEvent', 'click icon3', 'click', '记录【搜索】按钮的点击次数'])">
                <input type="text" placeholder="中移动路由器" readonly="readonly">
            </a>
        </section>

        <section class="shortcut">
            <ul>

                <li class="hide">
                    <a id="loginIcon" class="icon-login" title="登录" href="user.php"><span>登录</span></a>
                </li>
            </ul>
        </section>
    </header>
    
</div>


<section class="pro-gallery" style="height:7.6em;">
    <div id="slider-huawei" class="swiper-container swiper-container-horizontal swiper-container-android">
        <ul class="swiper-wrapper swiper-slide-prev">

            <?php $_from = $this->_var['ads']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad');if (count($_from)):
    foreach ($_from AS $this->_var['ad']):
?>

            <li class="swiper-slide" style="width: 360px;" data-swiper-slide-index="<?php echo $this->_var['key']; ?>">
                <a href="<?php echo $this->_var['ad']['ad_link']; ?>">
                    <img src="data/afficheimg/<?php echo $this->_var['ad']['ad_code']; ?>"  onerror="javascript:this.src='<?php echo $this->_var['ectouch_themes']; ?>/images/mask.png'">
                </a>
            </li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>

        </ul>
    </div>
    <nav class="swiper-pagination-white swiper-pagination-clickable swiper-pagination-bullets" id="sliderNav-huawei">
        <?php $_from = $this->_var['ads']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'ad');if (count($_from)):
    foreach ($_from AS $this->_var['ad']):
?>
        <span class="swiper-pagination-bullet"></span>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </nav>
</section>




<section class="quicklink">
    <ul class="clearfix">
        <?php $_from = $this->_var['navigator_list']['middle']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'nav');$this->_foreach['nav_middle_list'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['nav_middle_list']['total'] > 0):
    foreach ($_from AS $this->_var['nav']):
        $this->_foreach['nav_middle_list']['iteration']++;
?>
        <?php if (($this->_foreach['nav_middle_list']['iteration'] - 1) < 5): ?>
        <li>
            <a href="<?php echo $this->_var['nav']['url']; ?>" <?php if ($this->_var['nav']['opennew'] == 1): ?> target="_blank"<?php endif; ?> >
                <i><img src="<?php echo $this->_var['nav']['pic']; ?>" width="50" height="50"
                        onerror="javascript:this.src='<?php echo $this->_var['ectouch_themes']; ?>/images/mask.png'"></i>
                <p><?php echo $this->_var['nav']['name']; ?></p>
            </a>
        </li>

        <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>


    </ul>
</section>



<section class="channel-floor">
    <div class="hot-area">
        <div class="b">
            <ul>
                <li><a href="https://msale.vmall.com/hwmate10.html"><img
                                src="https://res.vmallres.com/pimages//sale/2017-11/20171114201730217.jpg"
                                title="移动端小图.jpg" style="float:none;"></a></li>
                <li><a href="https://m.vmall.com/product/879920339.html"><img
                                src="https://res.vmallres.com/pimages//sale/2017-12/20171207172216866.jpg" title="4.jpg"
                                style="float:none;"></a></li>
            </ul>
        </div>
    </div>
</section>





<section class="channel-floor channel-floor-hw channel-floor-list3">
    <header class="h">
        <h3><span>精品推荐</span></h3>
    </header>
    <div class="b">
        <?php $_from = $this->_var['best_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['best_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['best_goods']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['best_goods']['iteration']++;
?>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 0): ?>
            <ul>
            <?php endif; ?>
            <li>
                <a href="<?php echo $this->_var['goods']['url']; ?>">
                    <p class="p-img">
                        <img src="/<?php echo $this->_var['goods']['goods_img']; ?>" width="480" height="480"  onerror="javascript:this.src='<?php echo $this->_var['ectouch_themes']; ?>/images/mask.png'">
                        <i class="icon-tag">
                            <img src="https://res0.vmallres.com/pimages//tag/87/1489666525347.png&#10;">
                        </i>
                    </p>
                    <p class="p-name"><?php echo $this->_var['goods']['name']; ?></p>
                    <p class="p-promotion"><?php echo $this->_var['goods']['brief']; ?></p>
                    <p class="p-price"><b><?php echo $this->_var['goods']['shop_price']; ?></b></p>
                </a>
            </li>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 2): ?>
                </ul>
            <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>


    </div>
</section>

<section class="channel-floor channel-floor-hw channel-floor-list2" >
    <header class="h">
        <h3><span>新品推荐</span></h3>
    </header>
    <div class="b">
        <?php $_from = $this->_var['new_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['best_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['best_goods']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['best_goods']['iteration']++;
?>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 0): ?>
                <ul>
            <?php endif; ?>
            <li>
                <a href="<?php echo $this->_var['goods']['url']; ?>">
                    <p class="p-img">
                        <img src="/<?php echo $this->_var['goods']['thumb']; ?>" width="480" height="480">
                        <i class="icon-tag">
                            <img src="https://res0.vmallres.com/pimages//tag/87/1489666525347.png&#10;">
                        </i>
                    </p>
                    <p class="p-name"><?php echo $this->_var['goods']['name']; ?></p>
                    <p class="p-promotion"><?php echo $this->_var['goods']['brief']; ?></p>
                    <p class="p-price"><b><?php echo $this->_var['goods']['shop_price']; ?></b></p>
                </a>
            </li>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 2): ?>
                </ul>
            <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div>
</section>


<section class="channel-floor channel-floor-hw channel-floor-list2" style="margin-bottom: 80px">
    <header class="h">
        <h3><span>预售商品</span></h3>
    </header>
    <div class="b">
        <?php $_from = $this->_var['presale_goods']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'goods');$this->_foreach['best_goods'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['best_goods']['total'] > 0):
    foreach ($_from AS $this->_var['goods']):
        $this->_foreach['best_goods']['iteration']++;
?>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 0): ?>
                <ul>
            <?php endif; ?>
            <li>
                <a href="<?php echo $this->_var['goods']['url']; ?>">
                    <p class="p-img">
                        <img src="/<?php echo $this->_var['goods']['thumb']; ?>" width="480" height="480">
                        <i class="icon-tag">
                            <img src="https://res0.vmallres.com/pimages//tag/87/1489666525347.png&#10;">
                        </i>
                    </p>
                    <p class="p-name"><?php echo $this->_var['goods']['name']; ?></p>
                    <p class="p-promotion"><?php echo $this->_var['goods']['brief']; ?></p>
                </a>
            </li>
            <?php if (($this->_foreach['best_goods']['iteration'] - 1) % 3 == 2): ?>
                </ul>
            <?php endif; ?>
        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
    </div>
</section>


<?php echo $this->fetch('library/my_page_footer.lbi'); ?>



<section class="hungBar"><a href="javascript:scroll(0, 0);" class="button-top"><span>返回顶部</span></a></section>


<script src="<?php echo $this->_var['ectouch_themes']; ?>/js/ecWap.js?20170316"></script>
<script src="<?php echo $this->_var['ectouch_themes']; ?>/js/huawei_index.js?20170426"></script>
<script src="https://res9.vmallres.com/nwap/20171124/js/echannelApp/cart/cartNew/dist/cartSys.min.js?20170729"></script>



</body>
</html>