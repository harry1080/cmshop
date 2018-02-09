<?php exit;?>a:3:{s:8:"template";a:7:{i:0;s:80:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/article_cat.dwt";i:1;s:88:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/page_header.lbi";i:2;s:84:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/ur_here.lbi";i:3;s:86:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/left_help.lbi";i:4;s:84:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/history.lbi";i:5;s:82:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/pages.lbi";i:6;s:88:"C:/phpStudy/WWW/trunk/shoujishangquan/themes/ecmoban_tianmao2016/library/page_footer.lbi";}s:7:"expires";i:1518155708;s:8:"maketime";i:1518152108;}<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="" />
<meta name="Description" content="联系我们 " />
<title>联系我们 _网店帮助分类_系统分类_中移智能</title>
<link rel="shortcut icon" href="favicon.ico" />
<link rel="icon" href="animated_favicon.gif" type="image/gif" />
<link href="themes/ecmoban_tianmao2016/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/common.js"></script></head>
<body>
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
  <div class="block box">
<div class="blank"></div>
 <div id="ur_here">
当前位置: <a href=".">首页</a> <code>&gt;</code> <a href="article_cat.php?id=1">系统分类</a> <code>&gt;</code> <a href="article_cat.php?id=3">网店帮助分类</a> <code>&gt;</code> <a href="article_cat.php?id=9">联系我们 </a> 
</div>
</div>
<div class="blank"></div>
<div class="block clearfix">
  
  <div class="AreaL">
   <div class="left_help clearfix">
<dl>
  <dt> <img src="themes/ecmoban_tianmao2016/images/left_help_biao.gif"> <a href='article_cat.php?id=5' title="新手上路 ">新手上路 </a></dt>
    <dd><a href="article.php?id=9" title="售后流程">售后流程</a></dd>
    <dd><a href="article.php?id=10" title="购物流程">购物流程</a></dd>
    <dd><a href="article.php?id=11" title="订购方式">订购方式</a></dd>
    <dd><a href="article.php?id=36" title="隐私声明">隐私声明</a></dd>
  </dl>
<dl>
  <dt> <img src="themes/ecmoban_tianmao2016/images/left_help_biao.gif"> <a href='article_cat.php?id=7' title="配送与支付 ">配送与支付 </a></dt>
    <dd><a href="article.php?id=15" title="货到付款区域">货到付款区域</a></dd>
    <dd><a href="article.php?id=17" title="支付方式说明">支付方式说明</a></dd>
  </dl>
<dl>
  <dt> <img src="themes/ecmoban_tianmao2016/images/left_help_biao.gif"> <a href='article_cat.php?id=10' title="会员中心">会员中心</a></dt>
    <dd><a href="article.php?id=18" title="资金管理">资金管理</a></dd>
    <dd><a href="article.php?id=19" title="我的收藏">我的收藏</a></dd>
    <dd><a href="article.php?id=20" title="我的订单">我的订单</a></dd>
  </dl>
<dl>
  <dt> <img src="themes/ecmoban_tianmao2016/images/left_help_biao.gif"> <a href='article_cat.php?id=8' title="服务保证 ">服务保证 </a></dt>
    <dd><a href="article.php?id=21" title="退换货原则">退换货原则</a></dd>
    <dd><a href="article.php?id=22" title="售后服务保证 ">售后服务保证</a></dd>
    <dd><a href="article.php?id=23" title="产品质量保证 ">产品质量保证</a></dd>
  </dl>
<dl>
  <dt> <img src="themes/ecmoban_tianmao2016/images/left_help_biao.gif"> <a href='article_cat.php?id=9' title="联系我们 ">联系我们 </a></dt>
    <dd><a href="article.php?id=24" title="网站故障报告">网站故障报告</a></dd>
    <dd><a href="article.php?id=26" title="投诉与建议 ">投诉与建议</a></dd>
  </dl>
  </div>
<div class="blank"></div>
    
    <div class="box" id='history_div'> <div class="box_1">
 <h3><span>浏览历史</span></h3>
 
  <div class="boxCenterList clearfix" id='history_list'>
    554fcae493e564ee0dc75bdf2ebf94cahistory|a:1:{s:4:"name";s:7:"history";}554fcae493e564ee0dc75bdf2ebf94ca  </div>
 </div>
</div>
<div class="blank5"></div>
<script type="text/javascript">
if (document.getElementById('history_list').innerHTML.replace(/\s/g,'').length<1)
{
    document.getElementById('history_div').style.display='none';
}
else
{
    document.getElementById('history_div').style.display='block';
}
function clear_history()
{
Ajax.call('user.php', 'act=clear_history',clear_history_Response, 'GET', 'TEXT',1,1);
}
function clear_history_Response(res)
{
document.getElementById('history_list').innerHTML = '您已清空最近浏览过的商品';
}
</script>  </div>
  
  
  <div class="AreaR">
 
    <div >
                    <form action="" name="search_form" method="post" class="article_search">
        <input name="keywords" type="text" id="requirement" value="" class="inputBg" />
        <input name="id" type="hidden" value="9" />
        <input name="cur_url" id="cur_url" type="hidden" value="" />
        <input type="submit" value="立即搜索" class="bnt_blue_1" />
      </form>
<div class="art_cat_box">
      <table width="100%" border="0" cellpadding="5" cellspacing="0">
      <tr>
        <th style="background:#e5e5e5">文章标题</th>
          <th style="background:#e5e5e5">作者</th>
          <th style="background:#e5e5e5">添加日期</th>
        </tr>
            <tr>
        <td><a style="text-decoration:none" href="article.php?id=26" title="投诉与建议 " class="f6">投诉与建议</a></td>
          <td align="center">中移智能</td>
          <td align="center">1970-01-01</td>
        </tr>
            <tr>
        <td><a style="text-decoration:none" href="article.php?id=24" title="网站故障报告" class="f6">网站故障报告</a></td>
          <td align="center">中移智能</td>
          <td align="center">1970-01-01</td>
        </tr>
          </table>
    </div>
    </div>
  <div class="blank5"></div>
  
<form name="selectPageForm" action="/article_cat.php" method="get">
 <div id="pager" class="pagebar">
  <span class="f_l " style="margin-right:10px;">总计 <b>2</b>  个记录</span>
      
      </div>
</form>
<script type="Text/Javascript" language="JavaScript">
<!--
function selectPage(sel)
{
  sel.form.submit();
}
//-->
</script>
  </div>  
  
</div>
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
<script type="text/javascript">
document.getElementById('cur_url').value = window.location.href;
</script>
</html>
