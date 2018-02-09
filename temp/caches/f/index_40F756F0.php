<?php exit;?>a:3:{s:8:"template";a:10:{i:0;s:46:"D:/cmshop/themes/ecmoban_tianmao2016/index.dwt";i:1;s:60:"D:/cmshop/themes/ecmoban_tianmao2016/library/page_header.lbi";i:2;s:57:"D:/cmshop/themes/ecmoban_tianmao2016/library/index_ad.lbi";i:3;s:56:"D:/cmshop/themes/ecmoban_tianmao2016/library/ur_here.lbi";i:4;s:62:"D:/cmshop/themes/ecmoban_tianmao2016/library/recommend_new.lbi";i:5;s:68:"D:/cmshop/themes/ecmoban_tianmao2016/library/recommend_promotion.lbi";i:6;s:62:"D:/cmshop/themes/ecmoban_tianmao2016/library/recommend_hot.lbi";i:7;s:63:"D:/cmshop/themes/ecmoban_tianmao2016/library/recommend_best.lbi";i:8;s:53:"D:/cmshop/themes/ecmoban_tianmao2016/library/help.lbi";i:9;s:60:"D:/cmshop/themes/ecmoban_tianmao2016/library/page_footer.lbi";}s:7:"expires";i:1518167181;s:8:"maketime";i:1518163581;}<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="中移智能" />
<meta name="Description" content="中移智能" />
<title>中移智能</title>
<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link href="themes/ecmoban_tianmao2016/style.css" rel="stylesheet" type="text/css" />
<link rel="alternate" type="application/rss+xml" title="RSS|中移智能" href="feed.php" />
<script type="text/javascript" src="js/common.js"></script><script type="text/javascript" src="js/index.js"></script></head>
<body class="index_page" style="min-width:1200px;">
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script><script type="text/javascript" src="js/jquery.json.js"></script><script type="text/javascript" src="js/transport_jquery.js"></script><script type="text/javascript" src="js/utils.js"></script><script type="text/javascript" src="js/layer/2.1/layer.js"></script><script type="text/javascript" src="js/sweetalert2/sweetalert2.js"></script><script type="text/javascript">
var process_request = "正在处理您的请求...";
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
<div class="header-nav">
    <div class="block">
        <a href="index.php" class="fl gotoindex" style="margin-right:15px;"><i class="iconfont">&#xe624;</i> 商城首页</a>
        
        <p class="header-login-info">
            554fcae493e564ee0dc75bdf2ebf94camember_info|a:1:{s:4:"name";s:11:"member_info";}554fcae493e564ee0dc75bdf2ebf94ca        </p>
        
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
                <a href="flow.php">购物车</a>&nbsp;554fcae493e564ee0dc75bdf2ebf94cacart_info|a:1:{s:4:"name";s:9:"cart_info";}554fcae493e564ee0dc75bdf2ebf94ca            </li>
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
                                    <li class="li-home">
                <a href="flow.php">查看购物车</a>
            </li>
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
                                                    <li><a href="category.php?id=41">智能政企</a></li>
                                                    <li><a href="category.php?id=43">智能健康</a></li>
                                                    <li><a href="category.php?id=44">智能家居</a></li>
                                                    <li><a href="category.php?id=46">智能路由</a></li>
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
            554fcae493e564ee0dc75bdf2ebf94caads|a:3:{s:4:"name";s:3:"ads";s:2:"id";s:3:"163";s:3:"num";s:1:"1";}554fcae493e564ee0dc75bdf2ebf94ca        </div>
        
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
                    alert("请输入搜索关键词！");
                    return false;
                    }
                    }
                    -->
                    
                </script>
            </form>
                        <ul class="ul-hot-query">
                                <li class="first highlight"><a href="search.php?keywords=%E4%B8%AD%E7%A7%BB%E6%99%BA%E8%83%BD" target="_blank">中移智能</a></li>
                            </ul>
                    </div>
    </div>
</div>
<div class="header-menu">
    
    <div class="main-nav clearfix block">
        <div class="logo-content">
            <a href="javascript:;" class="cate-tree-all"><i class="iconfont">&#xe607;</i>商品分类</a>
        </div>
        
        <div class="main-nav-list">
                    </div>
        
        <div class="cate-tree none">
            <div class="cate-tree-bg"></div>
            <ul class="ul-cate-tree">
                                                <li class="cate-tree-item">
                    <i class="iconfont">&#xe603;</i>                                                                                                                                                                                                                                                                                                                                <a href="category.php?id=41" title="智能政企">智能政企</a>
                    <strong></strong>
                </li>
                                                                <li class="cate-tree-item">
                                        <i class="iconfont">&#xe604;</i>                                                                                                                                                                                                                                                                                                            <a href="category.php?id=43" title="智能健康">智能健康</a>
                    <strong></strong>
                </li>
                                                                <li class="cate-tree-item">
                                                            <i class="iconfont">&#xe601;</i>                                                                                                                                                                                                                                                                                        <a href="category.php?id=44" title="智能家居">智能家居</a>
                    <strong></strong>
                </li>
                                                                <li class="cate-tree-item">
                                                                                <i class="iconfont">&#xe600;</i>                                                                                                                                                                                                                                                                    <a href="category.php?id=46" title="智能路由">智能路由</a>
                    <strong></strong>
                </li>
                                            </ul>
            <ul class="cate-panel-wp">
                                                <li class="cate-panel panel-1">
                    <div class="left-part">
                                                <h3 class="panel-title">
                            <a href="category.php?id=50" target="_blank" class="more">更多</a>
                            <a href="category.php?id=50" target="_blank">装维工具</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                                <h3 class="panel-title">
                            <a href="category.php?id=51" target="_blank" class="more">更多</a>
                            <a href="category.php?id=51" target="_blank">专享公车</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                            </div>
                    <div class="right-part">
                        <h3 class="panel-title">
                            <a href="">特色品牌</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告1";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告2";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                    </div>
                </li>
                                                                <li class="cate-panel panel-2">
                    <div class="left-part">
                                                <h3 class="panel-title">
                            <a href="category.php?id=47" target="_blank" class="more">更多</a>
                            <a href="category.php?id=47" target="_blank">智能服务</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                            </div>
                    <div class="right-part">
                        <h3 class="panel-title">
                            <a href="">特色品牌</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告1";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告2";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                    </div>
                </li>
                                                                <li class="cate-panel panel-3">
                    <div class="left-part">
                                                <h3 class="panel-title">
                            <a href="category.php?id=48" target="_blank" class="more">更多</a>
                            <a href="category.php?id=48" target="_blank">H-ICT</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                                <h3 class="panel-title">
                            <a href="category.php?id=49" target="_blank" class="more">更多</a>
                            <a href="category.php?id=49" target="_blank">M-ICT</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                            </div>
                    <div class="right-part">
                        <h3 class="panel-title">
                            <a href="">特色品牌</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告1";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告2";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                    </div>
                </li>
                                                                <li class="cate-panel panel-4">
                    <div class="left-part">
                                                <h3 class="panel-title">
                            <a href="category.php?id=52" target="_blank" class="more">更多</a>
                            <a href="category.php?id=52" target="_blank">智能路由</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                                            </div>
                    <div class="right-part">
                        <h3 class="panel-title">
                            <a href="">特色品牌</a>
                        </h3>
                        <div class="panel-list">
                            <p class="clearfix">
                                                            </p>
                        </div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告1";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                        <div class="ad-pic-1">554fcae493e564ee0dc75bdf2ebf94caads|a:2:{s:4:"name";s:3:"ads";s:4:"type";s:22:"分类树面板广告2";}554fcae493e564ee0dc75bdf2ebf94ca</div>
                    </div>
                </li>
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
<script type="text/javascript">
  $(function(){
      //如果是首页，让分类树直接显示
      $(".cate-tree").each(function(){
        var _this = $(this);
        _this.removeClass("none").addClass("cate-tree-index");
      });
  });
</script>
<script type="text/javascript" src="js/jquery.SuperSlide.js"></script><div class="main-banner-wp">
  <div class="block">
    <div class="main-banner" id="slideBox">
        <ul class="main-banner-hd hd">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
        <div class="bd">
            <ul class="main-banner-bd">
                                <li><a href="http://" target="_blank"><img src="data/afficheimg/20160419athosm.jpg" alt=""></a></li>
                                <li><a href="http://mb.ecmoban.com/kuajingtong/" target="_blank"><img src="data/afficheimg/20160129prsrpo.png" alt=""></a></li>
                                <li><a href="http://dsc.ecmoban.com/" target="_blank"><img src="data/afficheimg/20160129vfrgku.jpg" alt=""></a></li>
                                <li><a href="http://www.ecjia.com/" target="_blank"><img src="data/afficheimg/20160129bcmitn.jpg" alt=""></a></li>
                                <li><a href="http://www.ectouch.cn/" target="_blank"><img src="data/afficheimg/20150608boezpt.png" alt=""></a></li>
                                <li><a href="http://www.ecmoban.com/topic/wfx/index.html" target="_blank"><img src="data/afficheimg/20160129pcigev.png" alt=""></a></li>
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
</script><div class="indexw_content">
<div class="block clearfix" >
<div class="AreaL">
 
</div>
<div class="Arear">
 
</div> 
  <div class="goodsBox_1">
  
<div class="block box">
<div class="blank"></div>
 <div id="ur_here">
当前位置: <a href=".">首页</a> 
</div>
</div>
<div class="blank"></div>
  
<div class="xm-box">
  <h4 class="title"><i class="color-mark-new"></i><a class="more" href="search.php?intro=new">更多</a><em>新品上架</em> <span>New Products</span></h4>
  <div id="show_new_area" class="clearfix body">
        <div class="goodsItem"> <a href="goods.php?id=31" target="_blank"><img src="images/201711/thumb_img/31_thumb_G_1511127562615.jpg" alt="单频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=31" title="单频和川流" target="_blank">单频和川流</a></p>
      <div class="info">
        <p class="price">
                    88                  </p>
        <p class="market"> 市场价：88</p>
        <a href="goods.php?id=31" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=36" target="_blank"><img src="images/201712/thumb_img/36_thumb_G_1512610542311.jpg" alt="双频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=36" title="双频和川流" target="_blank">双频和川流</a></p>
      <div class="info">
        <p class="price">
                    108                  </p>
        <p class="market"> 市场价：129</p>
        <a href="goods.php?id=36" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=37" target="_blank"><img src="images/201712/thumb_img/37_thumb_G_1513377006978.jpg" alt="和禹路由（大）" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=37" title="和禹路由（大）" target="_blank">和禹路由（大）</a></p>
      <div class="info">
        <p class="price">
                    120                  </p>
        <p class="market"> 市场价：144</p>
        <a href="goods.php?id=37" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=33" target="_blank"><img src="images/201711/thumb_img/33_thumb_G_1511129139220.jpg" alt="和动源插座" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=33" title="和动源插座" target="_blank">和动源插座</a></p>
      <div class="info">
        <p class="price">
                    189                  </p>
        <p class="market"> 市场价：189</p>
        <a href="goods.php?id=33" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=35" target="_blank"><img src="images/201712/thumb_img/35_thumb_G_1513468579011.jpg" alt="专享公车·政企版" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=35" title="专享公车·政企版" target="_blank">专享公车·政企版</a></p>
      <div class="info">
        <p class="price">
                    3999                  </p>
        <p class="market"> 市场价：4798</p>
        <a href="goods.php?id=35" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=38" target="_blank"><img src="images/201712/thumb_img/38_thumb_G_1513376883246.jpg" alt="专享公车·装维版" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=38" title="专享公车·装维版" target="_blank">专享公车·装维版</a></p>
      <div class="info">
        <p class="price">
                    3999                  </p>
        <p class="market"> 市场价：4798</p>
        <a href="goods.php?id=38" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=34" target="_blank"><img src="images/201711/thumb_img/34_thumb_G_1511129172271.jpg" alt="智能熔接机" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=34" title="智能熔接机" target="_blank">智能熔接机</a></p>
      <div class="info">
        <p class="price">
                    2000                  </p>
        <p class="market"> 市场价：2400</p>
        <a href="goods.php?id=34" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
        <div class="goodsItem"> <a href="goods.php?id=32" target="_blank"><img src="images/201711/thumb_img/32_thumb_G_1511128362844.jpg" alt="和动源插排" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=32" title="和动源插排" target="_blank">和动源插排</a></p>
      <div class="info">
        <p class="price">
                    189                  </p>
        <p class="market"> 市场价：189</p>
        <a href="goods.php?id=32" class="buy" target="_blank">立即购买</a>
      </div>
      </div>
      </div>
</div>
<div class="blank"></div>
<div class="xm-box">
  <h4 class="title"><i class="color-mark-hot"></i><a class="more" href="search.php?intro=hot">更多</a><em>热卖商品</em> <span>Hot Sales</span></h4>
  <div id="show_hot_area" class="clearfix body">
        <div class="goodsItem"> <a href="goods.php?id=28" target="_blank"><img src="images/201702/thumb_img/28_thumb_G_1486665074992.jpg" alt="和尧路由" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=28" title="和尧路由" target="_blank">和尧路由</a></p>
      <div class="info">
        <p class="price">
                    198                  </p>
        <p class="market">198</p>
        <a href="goods.php?id=28" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=31" target="_blank"><img src="images/201711/thumb_img/31_thumb_G_1511127562615.jpg" alt="单频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=31" title="单频和川流" target="_blank">单频和川流</a></p>
      <div class="info">
        <p class="price">
                    88                  </p>
        <p class="market">88</p>
        <a href="goods.php?id=31" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=36" target="_blank"><img src="images/201712/thumb_img/36_thumb_G_1512610542311.jpg" alt="双频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=36" title="双频和川流" target="_blank">双频和川流</a></p>
      <div class="info">
        <p class="price">
                    108                  </p>
        <p class="market">129</p>
        <a href="goods.php?id=36" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=37" target="_blank"><img src="images/201712/thumb_img/37_thumb_G_1513377006978.jpg" alt="和禹路由（大）" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=37" title="和禹路由（大）" target="_blank">和禹路由（大）</a></p>
      <div class="info">
        <p class="price">
                    120                  </p>
        <p class="market">144</p>
        <a href="goods.php?id=37" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=27" target="_blank"><img src="images/201702/thumb_img/27_thumb_G_1486665102239.jpg" alt="和舜路由" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=27" title="和舜路由" target="_blank">和舜路由</a></p>
      <div class="info">
        <p class="price">
                    168                  </p>
        <p class="market">168</p>
        <a href="goods.php?id=27" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=26" target="_blank"><img src="images/201711/thumb_img/26_thumb_G_1511133196686.jpg" alt="和禹路由" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=26" title="和禹路由" target="_blank">和禹路由</a></p>
      <div class="info">
        <p class="price">
                    118                  </p>
        <p class="market">118</p>
        <a href="goods.php?id=26" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
    
  </div>
</div>
<div class="blank"></div>
<div class="xm-box">
  <h4 class="title"><i class="color-mark-best"></i><a class="more" href="search.php?intro=best">更多</a><em>精品推荐</em><span>Recommend Buy</span> </h4>
  <div id="show_best_area" class="clearfix body">
        <div class="goodsItem"> <a href="goods.php?id=28" target="_blank"><img src="images/201702/thumb_img/28_thumb_G_1486665074992.jpg" alt="和尧路由" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=28" title="和尧路由" target="_blank">和尧路由</a></p>
      <div class="info">
        <p class="price">
                    198                  </p>
        <p class="market">198</p>
        <a href="goods.php?id=28" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=31" target="_blank"><img src="images/201711/thumb_img/31_thumb_G_1511127562615.jpg" alt="单频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=31" title="单频和川流" target="_blank">单频和川流</a></p>
      <div class="info">
        <p class="price">
                    88                  </p>
        <p class="market">88</p>
        <a href="goods.php?id=31" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=36" target="_blank"><img src="images/201712/thumb_img/36_thumb_G_1512610542311.jpg" alt="双频和川流" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=36" title="双频和川流" target="_blank">双频和川流</a></p>
      <div class="info">
        <p class="price">
                    108                  </p>
        <p class="market">129</p>
        <a href="goods.php?id=36" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=37" target="_blank"><img src="images/201712/thumb_img/37_thumb_G_1513377006978.jpg" alt="和禹路由（大）" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=37" title="和禹路由（大）" target="_blank">和禹路由（大）</a></p>
      <div class="info">
        <p class="price">
                    120                  </p>
        <p class="market">144</p>
        <a href="goods.php?id=37" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=33" target="_blank"><img src="images/201711/thumb_img/33_thumb_G_1511129139220.jpg" alt="和动源插座" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=33" title="和动源插座" target="_blank">和动源插座</a></p>
      <div class="info">
        <p class="price">
                    189                  </p>
        <p class="market">189</p>
        <a href="goods.php?id=33" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=35" target="_blank"><img src="images/201712/thumb_img/35_thumb_G_1513468579011.jpg" alt="专享公车·政企版" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=35" title="专享公车·政企版" target="_blank">专享公车·政企版</a></p>
      <div class="info">
        <p class="price">
                    3999                  </p>
        <p class="market">4798</p>
        <a href="goods.php?id=35" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=38" target="_blank"><img src="images/201712/thumb_img/38_thumb_G_1513376883246.jpg" alt="专享公车·装维版" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=38" title="专享公车·装维版" target="_blank">专享公车·装维版</a></p>
      <div class="info">
        <p class="price">
                    3999                  </p>
        <p class="market">4798</p>
        <a href="goods.php?id=38" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=34" target="_blank"><img src="images/201711/thumb_img/34_thumb_G_1511129172271.jpg" alt="智能熔接机" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=34" title="智能熔接机" target="_blank">智能熔接机</a></p>
      <div class="info">
        <p class="price">
                    2000                  </p>
        <p class="market">2400</p>
        <a href="goods.php?id=34" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=32" target="_blank"><img src="images/201711/thumb_img/32_thumb_G_1511128362844.jpg" alt="和动源插排" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=32" title="和动源插排" target="_blank">和动源插排</a></p>
      <div class="info">
        <p class="price">
                    189                  </p>
        <p class="market">189</p>
        <a href="goods.php?id=32" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
        <div class="goodsItem"> <a href="goods.php?id=27" target="_blank"><img src="images/201702/thumb_img/27_thumb_G_1486665102239.jpg" alt="和舜路由" class="goodsimg" /></a><br />
      <p class="name"><a href="goods.php?id=27" title="和舜路由" target="_blank">和舜路由</a></p>
      <div class="info">
        <p class="price">
                    168                  </p>
        <p class="market">168</p>
        <a href="goods.php?id=27" class="buy" target="_blank">立即购买</a>
      </div>
    </div>
    
  </div>
</div>
<div class="blank"></div>
</div> 
</div>
  
 </div>
<div class="bottom_ad">
            
</div>
<div class="resetClear"></div>
    <a href="http://www.ecmoban.com" class="ecmoban">ecshop模板堂</a>
 
<div class="blank"></div>
<div class="footer">
    <div class="footer-desc clearfix">
                        <dl >
            <dt>新手上路 </dt>
            <dd>
                                <a href="article.php?id=9" title="售后流程">售后流程</a>
                                <a href="article.php?id=10" title="购物流程">购物流程</a>
                                <a href="article.php?id=11" title="订购方式">订购方式</a>
                                <a href="article.php?id=36" title="隐私声明">隐私声明</a>
                            </dd>
        </dl>
                                <dl >
            <dt>配送与支付 </dt>
            <dd>
                                <a href="article.php?id=15" title="货到付款区域">货到付款区域</a>
                                <a href="article.php?id=17" title="支付方式说明">支付方式说明</a>
                            </dd>
        </dl>
                                <dl >
            <dt>会员中心</dt>
            <dd>
                                <a href="article.php?id=18" title="资金管理">资金管理</a>
                                <a href="article.php?id=19" title="我的收藏">我的收藏</a>
                                <a href="article.php?id=20" title="我的订单">我的订单</a>
                            </dd>
        </dl>
                                <dl >
            <dt>服务保证 </dt>
            <dd>
                                <a href="article.php?id=21" title="退换货原则">退换货原则</a>
                                <a href="article.php?id=22" title="售后服务保证 ">售后服务保证</a>
                                <a href="article.php?id=23" title="产品质量保证 ">产品质量保证</a>
                            </dd>
        </dl>
                                <dl class="contact-us">
            <dt>联系我们 </dt>
            <dd>
                                <a href="article.php?id=24" title="网站故障报告">网站故障报告</a>
                                <a href="article.php?id=26" title="投诉与建议 ">投诉与建议</a>
                            </dd>
        </dl>
                    </div>
    <div class="footer-copyright">
        <div class="container">
             
            <p class="footer-nav">
                 
                <a href="article.php?id=3" >咨询热点</a> 
                 
            </p>
                                    <span style="color:#909090;">
                         
             
                        </span>
            <div class="d-copyright">
                <b>
                    &copy; 2005-2018 中移智能 版权所有，并保留所有权利。                                    </b>
               <p>网站备案：鲁ICP备16011080号-3</p>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(function(){
        $(".qr-code dt span").hover(function(){
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $(".qr-code dd img").eq(index).removeClass("none").siblings().addClass("none");
        });
    })
</script>
<div class="QQbox" id="divQQbox" style="width: 170px; ">
  <div class="Qlist" id="divOnline" onmouseout="hideMsgBox(event);" style="display: none; " onmouseover="OnlineOver();">
    <div class="t"></div>
    <div class="infobox">我们营业的时间<br>
      9:00-18:00</div>
    <div class="con">
      <ul>
        
         
         
         
         
         
         
         
         
         
         
         
         
         
         
         
        
              </ul>
    </div>
    <div class="b"></div>
  </div>
  <div id="divMenu" onmouseover="OnlineOver();" style="display: block; "><img src="themes/ecmoban_tianmao2016/images/qq_1.gif" class="press" alt="在线咨询"></div>
</div>
<script type="text/javascript">
//<![CDATA[
var tips; var theTop = 120/*这是默认高度,越大越往下*/; var old = theTop;
function initFloatTips() {
tips = document.getElementById('divQQbox');
moveTips();
};
function moveTips() {
var tt=50;
if (window.innerHeight) {
pos = window.pageYOffset
}
else if (document.documentElement && document.documentElement.scrollTop) {
pos = document.documentElement.scrollTop
}
else if (document.body) {
pos = document.body.scrollTop;
}
pos=pos-tips.offsetTop+theTop;
pos=tips.offsetTop+pos/10;
if (pos < theTop) pos = theTop;
if (pos != old) {
tips.style.top = pos+"px";
tt=10;
//alert(tips.style.top);
}
old = pos;
setTimeout(moveTips,tt);
}
//!]]>
initFloatTips();
function OnlineOver(){
document.getElementById("divMenu").style.display = "none";
document.getElementById("divOnline").style.display = "block";
document.getElementById("divQQbox").style.width = "170px";
}
function OnlineOut(){
document.getElementById("divMenu").style.display = "block";
document.getElementById("divOnline").style.display = "none";
}
if(typeof(HTMLElement)!="undefined")    //给firefox定义contains()方法，ie下不起作用
{   
      HTMLElement.prototype.contains=function(obj)   
      {   
          while(obj!=null&&typeof(obj.tagName)!="undefind"){ //通过循环对比来判断是不是obj的父元素
   　　　　if(obj==this) return true;   
   　　　　obj=obj.parentNode;
   　　}   
          return false;   
      };   
}  
function hideMsgBox(theEvent){ //theEvent用来传入事件，Firefox的方式
　 if (theEvent){
　 var browser=navigator.userAgent; //取得浏览器属性
　 if (browser.indexOf("Firefox")>0){ //如果是Firefox
　　 if (document.getElementById('divOnline').contains(theEvent.relatedTarget)) { //如果是子元素
　　 return; //结束函式
} 
} 
if (browser.indexOf("MSIE")>0){ //如果是IE
if (document.getElementById('divOnline').contains(event.toElement)) { //如果是子元素
return; //结束函式
}
}
}
/*要执行的操作*/
document.getElementById("divMenu").style.display = "block";
document.getElementById("divOnline").style.display = "none";
}
</script>
</body>
</html>
