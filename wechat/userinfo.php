<?php

    /**
     *更新用户信息
     */
    define( 'IN_MOBILE' , true );
    require( dirname( __FILE__ ) . '/../mobile/include/init.php' );

    $wxid = !empty( $_GET['wxid'] ) ? $_GET['wxid'] : '';
    if ( !empty( $wxid ) ) {
        $access_token = access_token( $db );
//http://mp.weixin.qq.com/wiki/1/8a5ce6257f1d3b2afb20f83e72b72ce9.html
        $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$wxid";
        $res_json = curl_get_contents( $url );
        $w_user = json_decode( $res_json , true );

        if ( !empty( $w_user['errcode'] ) ) {
            //如果出错给一次机会重发一次请求
            $errmsg = $w_user->errmsg;
            exit($errmsg);
        }
        $ecs_users = $ecs->prefix . 'users';
        //更新wxch_user表
        $w_sql = "UPDATE  `wxch_user` SET  `subscribe`='$w_user[subscribe]',`nickname`='$w_user[nickname]',`sex`='$w_user[sex]',`city` ='$w_user[city]',`country` =  '$w_user[country]',`province` =  '$w_user[province]',`language` =  '$w_user[language]',`headimgurl` =  '$w_user[headimgurl]',`subscribe_time` =  '$w_user[subscribe_time]' WHERE `wxid` = '$wxid';";
        $db->query( $w_sql );
        //更新ecs_users表 昵称
        $w_users = "UPDATE  " . $ecs_users . " SET  `user_name` =  '$w_user[nickname]'  WHERE `wxch_bd` = 'ok' AND `wxid` = '$wxid';";
        $db->query( $w_users );
    }

    function access_token( $db )
    {
        $ret = $db->getRow( "SELECT * FROM `wxch_config` WHERE `id` = 1" );
        $appid = $ret['appid'];
        $appsecret = $ret['appsecret'];
        $dateline = $ret['dateline'];
        $time = time();
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
        $timezone = $time - $dateline;
        if ( $timezone >= 7200 ) {
            $ret_json = curl_get_contents( $url );
            $result = json_decode( $ret_json );
            if ( $result->access_token ) {
                $db->query( "UPDATE `wxch_config` SET `access_token` = '$result->access_token',`dateline` = '$time' WHERE `id` =1;" );
            }
            $access_token = $db->getOne( "SELECT `access_token` FROM `wxch_config` WHERE `id` = 1;" );

        } else {
            $access_token = $db->getOne( "SELECT `access_token` FROM `wxch_config` WHERE `id` = 1;" );
            if ( empty( $access_token ) ) {
                $ret_json = curl_get_contents( $url );
                $result = json_decode( $ret_json );
                if ( $result->access_token ) {
                    $db->query( "UPDATE `wxch_config` SET `access_token` = '$result->access_token',`dateline` = '$time' WHERE `id` =1;" );
                }
            }
            $access_token = $db->getOne( "SELECT `access_token` FROM `wxch_config` WHERE `id` = 1;" );
        }

        return $access_token;
    }


    function curl_get_contents( $url )
    {
        $ch = curl_init();
        curl_setopt( $ch , CURLOPT_URL , $url );
        curl_setopt( $ch , CURLOPT_USERAGENT , "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0" );
        curl_setopt( $ch , CURLOPT_REFERER , $url );
        curl_setopt( $ch , CURLOPT_FOLLOWLOCATION , 1 );
        curl_setopt( $ch , CURLOPT_RETURNTRANSFER , true );
        curl_setopt( $ch , CURLOPT_SSL_VERIFYPEER , false );
        curl_setopt( $ch , CURLOPT_SSL_VERIFYHOST , false );
        $r = curl_exec( $ch );
        curl_close( $ch );

        return $r;
    }

?>