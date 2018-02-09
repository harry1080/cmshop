<?php
    /**
     * 功能：微信对接入口
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/2/28
     * Time: 13:21
     */

    define( 'IN_MOBILE' , true );
    define( 'IN_PC' , true );
    require( dirname( __FILE__ ) . '/../mobile/include/init.php' );
    require( dirname( __FILE__ ) . '/callback-ent.php' );

    $weChat = new weChatCallback();
    if ( isset( $_GET['echostr'] ) ) {     //验证微信
        $weChat->valid( $db );
    } else {
        //回复消息
        $db -> prefix = $ecs -> prefix;
        $weChat->responseMsg( $db );
    }