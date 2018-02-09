<?php require( '../wxch_check.php' ); ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>大转盘</title>
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">
    <link href="dzp.css" rel="stylesheet">
</head>
<body>
<div class="grid">
    <div id="banner">
        <div class="inner">
<!--            <img src="images/zhizhen.png" alt="" id="zhen">-->
            <div id="zhen"></div>
        </div>
    </div>
    <div class="jifen"><span class="num"><?php echo $prize_num; ?></span></div>
    <div class="gift"></div>
</div>
    <div class="contion">

    <div class="block fix-block">
        <div class="title">剩余次数</div>
        <p>你还可抽奖的次数：<span class="num"><?php echo $prize_num; ?></span></p>

        <div class="title">每次消耗积分</div>
        <p><span class="num1"><?php echo $prize['point'] ?></span></p>

        <div class="title">我的积分剩余</div>
        <p><span class="num_point"><?php echo $user_point; ?></span></p>
    </div>
    <div class="block">
        <div class="title">奖项设置</div>
        <ul>
            <?php foreach ( $wxchdata as $v ) { ?>
                <li class="tpl-prize-item">
                    <span class="prize-num tpl-prize-num"></span>
                    <span class="prize-name tpl-prize-name"><?php echo $v['level'] ?>
                        ---<?php echo $v['prize_name'] ?></span>
                    <span class="prize-number tpl-prize-number"><?php if ( $v['state'] == 'yes' ) {
                            echo '---奖品数量：' . $v['prize_value'];
                        } ?></span>
                    <span class="prize-img"><img class="tpl-prize-img" style=" ;display:none"></span>
                </li>
            <?php } ?>
        </ul>
    </div>
    <div class="block">
        <div class="title">活动规则</div>
        <p><?php echo $wxch_lang['prize_dzp']; ?></p>
    </div>

    <div class="block">
        <div class="title">中奖记录</div>
        <?php foreach ( $prize_users as $v ) { ?>
            <p><?php echo $v['nickname'] ?>----<?php echo $v['prize_name'] ?></p>
        <?php } ?>
    </div>
    </div>



<div id="mask"></div>
<div id="dialog" class="yes">
    <div id="content"></div>
    <a href="<?php echo $go_contact; ?>">马上去登记</a>
    <button id="close">关闭</button>
</div>

</body>
</html>
<script src="jq.js"></script>
<script>
    $(function () {
        var data = [
            {type: 1, msg: '一等奖'},
            {type: 0, msg: '谢谢参与'},
            {type: 0, msg: ''},
            {type: 0, msg: '要加油哦'},
            {type: 1, msg: '三等奖'},
            {type: 0, msg: '运气不够'},
            {type: 0, msg: ''},
            {type: 0, msg: '再接再厉'},
            {type: 1, msg: '二等奖'},
            {type: 0, msg: '祝你好运'},
            {type: 0, msg: ''},
            {type: 0, msg: '不要灰心'}
        ];

        var tt = null;
        $("#zhen").on('click', function () {
            // 显示结果
            var $me = $(this);
            $.getJSON("/wechat/prize_dzp.php?pid=<?php echo $pid.'&pzfun='.$prize['pzfun'].'&wxid='.$wxid; ?>", function (wxch_data) {
                console.log(wxch_data);

                if (wxch_data.msg == 2) {
                    $("#content").html(wxch_data.prize);
                    $("#dialog").attr("class", 'no').show();
                }
                else if (wxch_data.msg == 4) {
                    $("#content").html(wxch_data.prize);
                    $("#dialog").attr("class", 'no').show();
                } else {
                    var result = wxch_data.dzp;

                    var r = 1440 + 30 * (result - 1);
                    var isIE = false;
                    var style;
                    //var $me = $(this);
                    if (isIE) {
                        var i = 0, _r = 0;
                        var dt = 10;
                        var dr = r / 3000 * dt;

                        tt = setInterval(function () {
                            if (i >= 3000) {
                                clearInterval(tt);
                                $.post("/wechat/api.php?act=dzp", {
                                    pid: wxch_data.pid,
                                    nickname: '<?php echo $prize['nickname'] ?>',
                                    yn: wxch_data.yn,
                                    pzfun: wxch_data.pzfun,
                                    paid: wxch_data.paid,
                                    prize_value: wxch_data.prize_value,
                                    prize: wxch_data.prize,
                                    wxid: '<?php echo $wxid ?>'
                                });
                                wxch_show(result, 'ie');
                                return;
                            }
                            _r += dr;
                            i += dt;
                            var rad = _r * (Math.PI / 180);
                            var m11 = Math.cos(rad), m12 = -1 * Math.sin(rad), m21 = Math.sin(rad), m22 = m11;
                            var W = Math.abs(Math.sin(rad) * 224) + Math.abs(Math.cos(rad) * 224), H = Math.abs(Math.sin(rad) * 224) + Math.abs(Math.cos(rad) * 224);
                            var dw = (224 - W) / 2, dh = (224 - H) / 2;

                            style = "filter:progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ",SizingMethod='auto expand')";
                            $me.attr('style', style);
                            $me.css({
                                'margin-left': dw,
                                'margin-top': dh
                            })
                        }, dt);
                    } else {
                        style = '-webkit-transition-delay:1s;-webkit-transition: all 3s;transition: all 3s;-webkit-transform: rotate(' + r + 'deg);' + '-moz-transition-delay:1s;-moz-transition: all 3s;transition: all 3s;-moz-transform: rotate(' + r + 'deg);' + 'transition-delay:1s;transition: all 3s;transition: all 3s;transform: rotate(' + r + 'deg);' + 'filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);';
                        $me.attr('style', style);
                        $.post("/wechat/api.php?act=dzp",
                            {
                                pid: wxch_data.pid,
                                nickname: '<?php echo $prize['nickname'] ?>',
                                yn: wxch_data.yn,
                                pzfun: wxch_data.pzfun,
                                paid: wxch_data.paid,
                                prize_value: wxch_data.prize_value,
                                prize: wxch_data.prize,
                                wxid: '<?php echo $wxid ?>'
                            });

                        wxch_show(result);
                    }


                    if (wxch_data.num >= 1) {
                        $(".num").text(wxch_data.num - 1);
                    }
                    else {
                        $(".num").text(wxch_data.num);
                    }

                    $(".num_point").text(wxch_data.point);

                }
            });
        });

        function wxch_show(r, ie) {
            var result = data[r - 1];
            var angle = 30 * (r - 1);
            var t = ie ? 1 : 3000;
            setTimeout(function () {
                $("#mask").show();
                if (!ie) {
                    $("#zhen").attr('style', '-webkit-transform: rotate(' + angle + 'deg);-moz-transform: rotate(' + angle + 'deg);transform: rotate(' + angle + 'deg);')
                }
                if (result.type) {
                    var html = '恭喜你中了' + result.msg;
                    $("#content").html(html);
                    $("#dialog").attr("class", 'yes').show();
                    setTimeout(function () {
                        window.location.href = '<?php echo $go_contact; ?>';
                    }, 3500);
                } else {
                    $("#content").html('很遗憾，您没有中奖');
                    $("#dialog").attr("class", 'no').show();
                }
            }, t);
        }

        $("#mask").on('click', function () {
            $(this).hide();
            $("#dialog").hide();
        });

        $("#close").click(function () {
            $("#mask").trigger('click');
        });
    });
</script>