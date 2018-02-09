<?php
    /**
     * 云动商圈 帮助手册
     */

    define( 'IN_MOBILE' , true );
    require( dirname( __FILE__ ) . '/includes/init.php' );

    /*------------------------------------------------------ */
//-- 云动商圈帮助手册
    /*------------------------------------------------------ */
    if ( $_REQUEST['act'] == 'ectouch' ) {

        $smarty->assign( 'ur_here' , "帮助手册" );
        $smarty->assign( 'full_page' , 1 );

        $smarty->display( 'help_ectouch.htm' );
    }

    /*------------------------------------------------------ */
//-- 微信帮助手册
    /*------------------------------------------------------ */
    if ( $_REQUEST['act'] == 'weixintong' ) {

        $smarty->assign( 'ur_here' , "微信通帮助手册" );
        $smarty->assign( 'full_page' , 1 );

        $smarty->display( 'help_weixintong.htm' );
    }

    /*------------------------------------------------------ */
//-- 微信支付相关配置
    /*------------------------------------------------------ */
    if ( $_REQUEST['act'] == 'weixinpay' ) {

        $smarty->assign( 'ur_here' , "微信支付相关配置" );
        $smarty->assign( 'full_page' , 1 );

        $smarty->display( 'help_weixinpay.htm' );
    }

?>