<?php echo $this->smarty_insert_scripts(array('files'=>'jquery-1.11.3.min.js,jquery.json.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'transport_jquery.js,utils.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'layer/2.1/layer.js')); ?>
<?php echo $this->smarty_insert_scripts(array('files'=>'sweetalert2/sweetalert2.js')); ?>
<script type="text/javascript">
var process_request = "<?php echo $this->_var['lang']['process_request']; ?>";
</script>
<script type="text/javascript">
//设为首页
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
       obj.setHomePage(url);
   }catch(e){
       if(window.netscape){
          try{
              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
         }catch(e){
              alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
          }
       }else{
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
       }
  }
}

//收藏本站
function AddFavorite(title, url) {
  try {
      window.external.addFavorite(url, title);
  }
catch (e) {
     try {
       window.sidebar.addPanel(title, url, "");
    }
     catch (e) {
         alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
     }
  }
}
</script>

<?php if ($this->_var['script_name'] == 'index'): ?>

<div class="top-ad">
    <div class="block">
        <?php 
$k = array (
  'name' => 'ads_pro',
  'type' => '顶部横幅广告（宽）',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>
    </div>
</div>
<?php endif; ?>

<div class="header-nav">
    <div class="block">
        <a href="index.php" class="fl gotoindex" style="margin-right:15px;"><i class="iconfont">&#xe624;</i> 商城首页</a>
        
        <p class="header-login-info">
            <?php 
$k = array (
  'name' => 'member_info',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>
        </p>
        
        <ul class="ul-quick-menu">
            <li class="li-my menu-item">
                <a href="user.php"  class="menu-hd my_user">我的店铺<b></b></a>
                <div class="menu-bd">
                    <a href="user.php?act=order_list">我的订单</a>
                    <a href="user.php?act=account_log">我的余额</a>
                    <a href="user.php?act=collection_list" >我的收藏</a>
                    <a href="user.php?act=bonus">我的红包</a>
                </div>
            </li>
            <li class="li-cart" id="ECS_CARTINFO">
                <a href="flow.php">购物车</a>&nbsp;<?php 
$k = array (
  'name' => 'cart_info',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>
            </li>
            <li class="li-sep"></li>
            <li class="li-mobile">
                <i class="iconfont">&#xe615;</i>
                <a href="">手机版</a>
                <div class="mobile-qr">
                    <div class="qrcode-bg"></div>
                    <p>扫一扫，访问手机版</p>
                    <b></b>
                </div>
            </li>
            <?php if ($this->_var['navigator_list']['top']): ?>
            <?php $_from = $this->_var['navigator_list']['top']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'nav');$this->_foreach['nav_top_list'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['nav_top_list']['total'] > 0):
    foreach ($_from AS $this->_var['nav']):
        $this->_foreach['nav_top_list']['iteration']++;
?>
            <li class="li-home">
                <a href="<?php echo $this->_var['nav']['url']; ?>"<?php if ($this->_var['nav']['opennew'] == 1): ?> target="_blank" <?php endif; ?>><?php echo $this->_var['nav']['name']; ?></a>
            </li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            <?php endif; ?>
            <li class="li-sitemap menu-item">
                <h3 class="menu-hd"><i class="iconfont">&#xe607;</i><span>网站导航</span><b></b></h3>
                <div class="menu-bd block">
                    <div class="site-cate site-hot">
                        <h2>热点推荐<span>Hot</span></h2>
                        <ul>
                            <li><a href="group_buy.php" target="_blank">最新团购</a></li>
                            <li><a href="auction.php" target="_blank">拍卖会</a></li>
                            <li><a href="snatch.php" target="_blank">夺宝岛<i class="sitemap-icon sitemap-icon-new"></i></a></li>
                            <li><a href="activity.php" target="_blank">优惠活动<i class="sitemap-icon sitemap-icon-hot"></i></a></li>
                            <li><a href="package.php" target="_blank">超值礼包</a></li>
                            <li><a href="brand.php" target="_blank">品牌街<i class="sitemap-icon sitemap-icon-hot"></i></a></li>
                            <li><a href="search.php" target="_blank">随便看看</a></li>
                            <li><a href="message.php" target="_blank">喵言喵语</a></li>
                            <li><a href="user.php" target="_blank">会员中心</a></li>
                        </ul>
                    </div>
                    <div class="site-cate site-market">
                        <h2>行业市场<span>Market</span></h2>
                        <ul>
                        <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');if (count($_from)):
    foreach ($_from AS $this->_var['cat']):
?>
                            <li><a href="<?php echo $this->_var['cat']['url']; ?>"><?php echo htmlspecialchars($this->_var['cat']['name']); ?></a></li>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                        </ul>
                    </div>
                    <div class="site-cate site-brand">
                        <h2>品牌风尚<span>Brand</span></h2>
                        <ul>
                            <li><a href="">潮牌街</a></li>
                        </ul>
                    </div>
                    <div class="site-cate site-help">
                        <h2>服务指南<span>Help</span></h2>
                        <ul>
                            <li><a href="">帮助中心</a></li>
                            <li><a href="">品质保障</a></li>
                            <li><a href="">特色服务</a></li>
                            <li><a href="">7天退换货</a></li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

<div class="header-main">
    <div class="block">
        <div class="header-logo header-logo-index">
            <a href="index.php"><img src="themes/ecmoban_tianmao2016/images/logo.gif" alt=""></a>
        </div>
        <div class="header-banner">
            <?php 
$k = array (
  'name' => 'ads',
  'id' => '163',
  'num' => '1',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?>
        </div>
        
        <div class="mall-search">
            <form method="get" action="search.php" onSubmit="return checkSearchForm(this)" class="mallSearch-form">
                <div class="mallSearch-input-wp">
                    <input type="text" name="keywords" id="mq" class="mallSearch-input" value="春到焕新一见倾心" onfocus="javascript:if(this.value=='春到焕新一见倾心'){this.value=''}" onblur="javascript:if(this.value==''){this.value='春到焕新一见倾心'}" >
                    <label for="mq"></label>
                </div>
                <button type="submit">搜索</button>
                <script type="text/javascript">
                    
                    <!--
                    function checkSearchForm()
                    {
                    if(document.getElementById('keyword').value)
                    {
                    return true;
                    }
                    else
                    {
                    alert("<?php echo $this->_var['lang']['no_keywords']; ?>");
                    return false;
                    }
                    }
                    -->
                    
                </script>
            </form>
            <?php if ($this->_var['searchkeywords']): ?>
            <ul class="ul-hot-query">
                <?php $_from = $this->_var['searchkeywords']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'val');$this->_foreach['keywords'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['keywords']['total'] > 0):
    foreach ($_from AS $this->_var['val']):
        $this->_foreach['keywords']['iteration']++;
?>
                <li class="<?php if (($this->_foreach['keywords']['iteration'] <= 1)): ?>first<?php endif; ?><?php if ($this->_foreach['keywords']['iteration'] % 2 == 1): ?> highlight<?php endif; ?>"><a href="search.php?keywords=<?php echo urlencode($this->_var['val']); ?>" target="_blank"><?php echo $this->_var['val']; ?></a></li>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            </ul>
            <?php endif; ?>
        </div>
    </div>
</div>
<div class="header-menu">
    
    <div class="main-nav clearfix block">
        <div class="logo-content">
            <a href="javascript:;" class="cate-tree-all"><i class="iconfont">&#xe607;</i>商品分类</a>
        </div>
        
        <div class="main-nav-list">
            <?php $_from = $this->_var['navigator_list']['middle']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'nav');$this->_foreach['nav_middle_list'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['nav_middle_list']['total'] > 0):
    foreach ($_from AS $this->_var['nav']):
        $this->_foreach['nav_middle_list']['iteration']++;
?>
            <li>
            <a href="<?php echo $this->_var['nav']['url']; ?>"<?php if ($this->_var['nav']['opennew']): ?> target="_blank"<?php endif; ?>>
                <?php echo $this->_var['nav']['name']; ?>
                <div class="hover-pic"></div>
            </a>
            </li>
            <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
        </div>
        
        <div class="cate-tree<?php if ($this->_var['script_name'] != 'index'): ?> none<?php else: ?> cate-tree-index<?php endif; ?>">
            <div class="cate-tree-bg"></div>
            <ul class="ul-cate-tree">
                <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['categories_pro'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['categories_pro']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['categories_pro']['iteration']++;
?>
                <?php if ($this->_foreach['categories_pro']['iteration'] < 17): ?>
                <li class="cate-tree-item">
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 1): ?><i class="iconfont">&#xe603;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 2): ?><i class="iconfont">&#xe604;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 3): ?><i class="iconfont">&#xe601;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 4): ?><i class="iconfont">&#xe600;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 5): ?><i class="iconfont">&#xe602;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 6): ?><i class="iconfont">&#xe60e;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 7): ?><i class="iconfont">&#xe60c;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 8): ?><i class="iconfont">&#xe60f;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 9): ?><i class="iconfont">&#xe609;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 10): ?><i class="iconfont">&#xe611;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 11): ?><i class="iconfont">&#xe60b;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 12): ?><i class="iconfont">&#xe610;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 13): ?><i class="iconfont">&#xe613;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 14): ?><i class="iconfont">&#xe63a;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 15): ?><i class="iconfont">&#xe612;</i><?php endif; ?>
                    <?php if ($this->_foreach['categories_pro']['iteration'] == 16): ?><i class="iconfont">&#xe60a;</i><?php endif; ?>
                    <a href="<?php echo $this->_var['cat']['url']; ?>" title="<?php echo htmlspecialchars($this->_var['cat']['name']); ?>"><?php echo htmlspecialchars($this->_var['cat']['name']); ?></a>
                    <strong></strong>
                </li>
                <?php endif; ?>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            </ul>
            <ul class="cate-panel-wp">
                <?php $_from = $this->_var['categories']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'cat');$this->_foreach['cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['cat']['total'] > 0):
    foreach ($_from AS $this->_var['cat']):
        $this->_foreach['cat']['iteration']++;
?>
                <?php if ($this->_foreach['cat']['iteration'] < 17): ?>
                <li class="cate-panel panel-<?php echo $this->_foreach['cat']['iteration']; ?>">
                    <div class="left-part">
                        <?php $_from = $this->_var['cat']['cat_id']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'child');$this->_foreach['nocat_id'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['nocat_id']['total'] > 0):
    foreach ($_from AS $this->_var['child']):
        $this->_foreach['nocat_id']['iteration']++;
?>
                        <h3 class="panel-title">
                            <a href="<?php echo $this->_var['child']['url']; ?>" target="_blank" class="more">更多</a>
                            <a href="<?php echo $this->_var['child']['url']; ?>" target="_blank"><?php echo $this->_var['child']['name']; ?></a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                <?php $_from = $this->_var['child']['cat_id']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'childer');$this->_foreach['nochild_cat'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['nochild_cat']['total'] > 0):
    foreach ($_from AS $this->_var['childer']):
        $this->_foreach['nochild_cat']['iteration']++;
?>
                                <a href="<?php echo $this->_var['childer']['url']; ?>" target="_blank" <?php if ($this->_foreach['nochild_cat']['iteration'] % 2 == 1): ?>class="highlight"<?php endif; ?>><?php echo htmlspecialchars($this->_var['childer']['name']); ?></a>
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </p>
                        </div>
                        <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                    </div>
                    <div class="right-part">
                        <h3 class="panel-title">
                            <a href="">特色品牌</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                <?php $_from = $this->_var['cat']['brands']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array'); }; $this->push_vars('', 'brand');$this->_foreach['cat_brand'] = array('total' => count($_from), 'iteration' => 0);
if ($this->_foreach['cat_brand']['total'] > 0):
    foreach ($_from AS $this->_var['brand']):
        $this->_foreach['cat_brand']['iteration']++;
?>
                                <?php if ($this->_foreach['cat_brand']['iteration'] < 11): ?>
                                <a href="<?php echo $this->_var['brand']['url']; ?>" <?php if ($this->_foreach['cat_brand']['iteration'] % 2 == 1): ?>class="highlight"<?php endif; ?>><?php echo $this->_var['brand']['brand_name']; ?></a>
                                <?php endif; ?>
                                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
                            </p>
                        </div>
                        <div class="ad-pic-1"><?php 
$k = array (
  'name' => 'ads',
  'type' => '分类树面板广告1',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?></div>
                        <div class="ad-pic-1"><?php 
$k = array (
  'name' => 'ads',
  'type' => '分类树面板广告2',
);
echo $this->_echash . $k['name'] . '|' . serialize($k) . $this->_echash;
?></div>
                    </div>
                </li>
                <?php endif; ?>
                <?php endforeach; endif; unset($_from); ?><?php $this->pop_vars();; ?>
            </ul>
        </div>
    </div>
</div>
<script type="text/javascript">
  $(function(){
    $(".cate-tree-item,.menu-item").hover(function(){
      $(this).addClass("hover");
    },function(){
      $(this).removeClass("hover");
    });
    //鼠标经过离开分类
      $(".cate-tree-item").on("mouseenter mouseleave",function(e){
        var index = $(this).index();
        if(e.type == "mouseenter"){
          toggleCatePanel(index, true);
        }else if(e.type == "mouseleave"){
          toggleCatePanel(index, false);
        }
      });
      //鼠标经过离开分类面板
      $(".cate-panel").on("mouseenter mouseleave",function(e){
        var index = $(this).index();
        if(e.type == "mouseenter"){
          toggleCatePanel(index, true);
        }else if(e.type == "mouseleave"){
          toggleCatePanel(index, false);
        }
      });
      //显示隐藏分类树方法
      function toggleCatePanel(i, show){
        var $panel = $(".cate-panel").eq(i);
        if(show){
          $panel.show();
        }else{
          $panel.hide();
        }
      }
      //首页之外其它页面分类树显示
      $(".cate-tree-all,.cate-tree").hover(function(){
        if(!$(".cate-tree").hasClass("cate-tree-index")){
            //如果是首页不做任何反应//如果分类里有内容
            if($.trim($(".ul-cate-tree").html()).length != 0){
                $(".cate-tree").removeClass("none");
            }
        }
      },function(){
        if(!$(".cate-tree").hasClass("cate-tree-index")){
          $(".cate-tree").addClass("none");
        }
      });




    });


  //禁止鼠标滚动事件冒泡
  $.fn.extend({
    "preventScroll":function(){
        $(this).each(function(){
            var _this = this;
            if(navigator.userAgent.indexOf('Firefox') >= 0){   //firefox
                _this.addEventListener('DOMMouseScroll',function(e){
                    _this.scrollTop += e.detail > 0 ? 60 : -60;
                    e.preventDefault();
                },false);
            }else{
                _this.onmousewheel = function(e){
                    e = e || window.event;
                    _this.scrollTop += e.wheelDelta > 0 ? -60 : 60;
                    return false;
                };
            }
        })
    }
});
$(".cate-panel .left-part").preventScroll();
</script>
