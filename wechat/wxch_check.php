<?php
    define( 'IN_MOBILE' , true );
    require( dirname( __FILE__ ) . '/../mobile/include/init.php' );
    session_start();
    $wxid = !empty( $_GET['wxid'] ) ? $_GET['wxid'] : '';
    if ( empty( $wxid ) ) {
        exit( 'appid为空,请从微信进入' );
    }
    $_SESSION['wxid'] = $wxid;

    $pid = $_GET['pid'];
    if ( empty( $pid ) ) {
        exit( 'pid为空---,请从微信进入' );
    }

    //loop循环天数

    $loop = $db->getRow( "SELECT * FROM `wxch_prize` WHERE `pid` = '$pid' " );

    if ( $loop['loop'] >= 1 ) {
        $lasttime = $db->getOne( "SELECT `lasttime` FROM `wxch_prize_count` WHERE `wxid` = '$wxid' AND `pid` = '$pid';" );
        $time = time();
        $timezone = $time - $lasttime;
        if ( $timezone > 60 * 60 * 24 * $loop['loop'] ) {
            $cid = $db->getOne( "SELECT `cid` FROM `wxch_prize_count` WHERE `wxid` = '$wxid' AND `pid` = '$pid';" );
            $db->query( "UPDATE `wxch_prize_count` SET `count` = '0',`lasttime` = '$time' WHERE `cid` = '$cid';" );
        }

    }
    if ( $loop['status'] == 0 ) {
        exit( '活动尚未开始' );
    }

    $time = time();
    if ( $time <= $loop['starttime'] ) {
        exit( '活动尚未开始' );
    } elseif ( $time >= $loop['endtime'] ) {
        exit( '活动已结束' );
    }

    //活动规则说明，详细介绍
    $wxch_lang['prize_dzp'] = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'prize_dzp'" );

    //抽奖规则规定的一个周期内最高抽奖次数
    $prize_num = $db->getOne( "SELECT `num` FROM `wxch_prize` WHERE `pid` = '$pid' " );
    //在一个周期内累计做了几次活动
    $prize_count = $db->getOne( "SELECT `count` FROM `wxch_prize_count` WHERE `wxid` = '$wxid' AND `pid` = '$pid'" );

    //做一次活动扣多少积分
    $prize['point'] = $db->getOne( "SELECT `point` FROM `wxch_prize` WHERE `pid` = '$pid' " );

    //用户还剩多少积分
    $user_point = $db->getOne( "SELECT `pay_points` FROM `ecs_users` WHERE `wxid` = '$wxid' " );


    //今日次数已经用光
    if ( ( $prize_count >= $prize_num ) ) {
        $prize_num = 0;
    } else {
        //还剩几次抽奖的机会
        $prize_num = $prize_num - $prize_count;
    }


    //活动类型dzp,zjd...

    $prize['pzfun'] = $db->getOne( "SELECT `fun` FROM `wxch_prize` WHERE `pid` = '$pid' " );

    //用户昵称
    $prize['nickname'] = $db->getOne( "SELECT `nickname` FROM `wxch_user` WHERE `wxid` = '$wxid' " );

    //网站pc地址
    $base_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'baseurl' " );
    //手机地址 mobile
    $m_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'murl' " );

    //中奖之后去登记联系方式
    $go_contact = $base_url . $m_url . 'wxch_contact.php' . '?wxid=' . $wxid;

    //中奖名单
    $prize_users = $db->getAll( "SELECT * FROM `wxch_prize_users` WHERE `yn` = 'yes' AND `prize_id` = '$pid' ORDER BY `dateline` DESC LIMIT 0,6" );

    //奖品和数量
    $ret = $db->getAll( "SELECT * FROM `wxch_prize_append` WHERE `prize_id` = '$pid' " );
    $i = 1;

    foreach ( $ret as $k => $v ) {

        //微信中奖数据
        $wxchdata[$k] = $v;
        switch ( $i ) {
            case 1:
                $wxchdata[$k]['level'] = '一等奖';
                break;
            case 2:
                $wxchdata[$k]['level'] = '二等奖';
                break;
            case 3:
                $wxchdata[$k]['level'] = '三等奖';
                break;
            case 4:
                unset( $wxchdata[$k] );
                break;
        }
        $i++;

        if ( empty( $wxchdata[$k]['prize_value'] ) ) {
            unset( $wxchdata[$k] );
        }

    }

    foreach ( $wxchdata as $k => $v ) {
        $wxchdata[$k]['state'] = 'yes';
    }




