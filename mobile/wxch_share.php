<?php
    require( ROOT_PATH . 'include/lib_weixintong.php' );
    define( 'BASE_URI' , 'http://' . $_SERVER['SERVER_NAME'] . '/' );

    $time = time();
    $access_token = access_token( $db );
    $url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' . $access_token;
    $wxid = $db->getOne( "SELECT `wxid` FROM " . $GLOBALS['ecs']->table( 'users' ) . " WHERE `user_id` = '$up_uid'" );
    $w_title = "您有新朋友加入了，赶紧看看吧";
    $Description = "新朋友的消费您都将有提成哦";
    $Url = BASE_URI . "mobile/user.php?act=fenxiao1&wxid=" . $wxid;
    $item['Title'] = $w_title;
    $item['Description'] = $Description;
    $item['PicUrl'] = $PicUrl;
    $item['Url'] = $Url;
    $item_arr = array( $item );
    $postData = transmitNews( $wxid , $ToUserName , $item_arr );

    $result = curl( $url , $postData );
    $ret = json_decode( $result );

    //回复图文
    function transmitNews( $FromUserName , $ToUserName , $arr_item )
    {
        if ( !is_array( $arr_item ) ) return;
        $itemTpl = "<item>
                        <Title><![CDATA[%s]]></Title>
                        <Description><![CDATA[%s]]></Description>
                        <PicUrl><![CDATA[%s]]></PicUrl>
                        <Url><![CDATA[%s]]></Url>
                        </item>";
        $item_str = "";
        foreach ( $arr_item as $item ) {
            $item_str .= sprintf(
                $itemTpl ,
                $item['Title'] ,
                $item['Description'] ,
                $item['PicUrl'] ,
                $item['Url'] );
        }
        $newsTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[news]]></MsgType>
                        <ArticleCount>%s</ArticleCount>
                        <Articles>$item_str</Articles>
                        </xml>";//图文消息个数，限制为10条以内
        $resultStr = sprintf(
            $newsTpl ,
            $FromUserName ,
            $ToUserName ,
            time() ,
            count( $arr_item )
        );

        return $resultStr;
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
            $ret_json = curl( $url );
            $result = json_decode( $ret_json );//object
            $access_token = $result->access_token;
            $db->query( "UPDATE `wxch_config` SET `access_token` = '$access_token',`dateline` = '$time' WHERE `id` =1;" );

        } else {
            $access_token = $db->getOne( "SELECT `access_token` FROM `wxch_config` WHERE `id` = 1;" );
            if ( empty( $access_token ) ) {
                $ret_json = curl( $url );
                $result = json_decode( $ret_json );
                $access_token = $result->access_token;
                $db->query( "UPDATE `wxch_config` SET `access_token` = '$access_token',`dateline` = '$time' WHERE `id` =1;" );
            }
        }

        return $access_token;
    }

    function curl( $url , $data = null )
    {
        $ch = curl_init();
        curl_setopt( $ch , CURLOPT_URL , $url );
        curl_setopt( $ch , CURLOPT_SSL_VERIFYPEER , false );
        curl_setopt( $ch , CURLOPT_SSL_VERIFYHOST , false );
        if ( !empty( $data ) ) {
            curl_setopt( $ch , CURLOPT_POST , 1 );
            curl_setopt( $ch , CURLOPT_POSTFIELDS , $data );
        }
        curl_setopt( $ch , CURLOPT_RETURNTRANSFER , 1 );
        $output = curl_exec( $ch );
        curl_close( $ch );

        return $output;
    }

?>