<?php
    /**
     * 微信支付native
     */
    if ( !defined( 'IN_PC' ) ) {
        die( 'Hacking attempt' );
    }
    $payment_lang = ROOT_PATH . 'languages/' . $GLOBALS['_CFG']['lang'] . '/payment/native.php';
    if ( file_exists( $payment_lang ) ) {
        global $_LANG;

        include_once( $payment_lang );
    }

    /* 模块的基本信息 */
    if ( isset( $set_modules ) && $set_modules == true ) {
        $i = isset( $modules ) ? count( $modules ) : 0;

        /* 代码 */
        $modules[$i]['code'] = basename( __FILE__ , '.php' );

        /* 描述对应的语言项 */
        $modules[$i]['desc'] = 'native_desc';

        /* 是否支持货到付款 */
        $modules[$i]['is_cod'] = '0';

        /* 是否支持在线支付 */
        $modules[$i]['is_online'] = '1';

        /* 作者 */
        $modules[$i]['author'] = '云动商圈';

        /* 网址 */
        $modules[$i]['website'] = 'http://www.mbizzone.com';

        /* 版本号 */
        $modules[$i]['version'] = '1.0.0';

        /* 配置信息 */
        $modules[$i]['config'] = array(
            array( 'name' => 'appid' , 'type' => 'text' , 'value' => '' ) ,
            array( 'name' => 'mchid' , 'type' => 'text' , 'value' => '' ) ,
            array( 'name' => 'key' , 'type' => 'text' , 'value' => '' ) ,
            array( 'name' => 'appsecret' , 'type' => 'text' , 'value' => '' ) ,
            array( 'name' => 'logs' , 'type' => 'text' , 'value' => '' ) ,
        );

        return;
    }

    class native
    {
        function __construct()
        {
            $payment = get_payment( 'native' );

            if ( !defined( 'WXAPPID' ) ) {
                $root_url = str_replace( 'mobile/' , '' , $GLOBALS['ecs']->url() );
                define( "WXAPPID" , $payment['appid'] );
                define( "WXMCHID" , $payment['mchid'] );
                define( "WXKEY" , $payment['key'] );
                define( "WXAPPSECRET" , $payment['appsecret'] );
                define( "WXCURL_TIMEOUT" , 30 );
                define( 'WXNOTIFY_URL' ,return_url( basename( __FILE__ , '.php' ) ) );
                define( 'WXSSLCERT_PATH' , dirname( __FILE__ ) . '/WxPayPubHelper/cacert/apiclient_cert.pem' );
                define( 'WXSSLKEY_PATH' , dirname( __FILE__ ) . '/WxPayPubHelper/cacert/apiclient_key.pem' );

                define( 'WXJS_API_CALL_URL' , $root_url . 'wx_refresh.php' );
            }
            require_once( dirname( __FILE__ ) . "/WxPayPubHelper/WxPayPubHelper.php" );

        }

        function get_code( $order , $payment )
        {
            $unifiedOrder = new UnifiedOrder_pub();

            $unifiedOrder->setParameter( "body" , $order['order_sn'] );//商品描述
            $out_trade_no = $order['order_sn'];
            $unifiedOrder->setParameter( "out_trade_no" , "$out_trade_no" );//商户订单号
            $unifiedOrder->setParameter( "attach" , strval( $order['log_id'] ) );//商户支付日志
            $unifiedOrder->setParameter( "total_fee" , strval( intval( $order['order_amount'] * 100 ) ) );//总金额
            $unifiedOrder->setParameter( "notify_url" , WXNOTIFY_URL );//通知地址
            $unifiedOrder->setParameter( "trade_type" , "NATIVE" );//交易类型

            $unifiedOrderResult = $unifiedOrder->getResult();

            $html = '<button type="button" onclick="javascript:alert(\'出错了\')">微信支付</button>';

            if ( $unifiedOrderResult["code_url"] != null ) {
                $code_url = $unifiedOrderResult["code_url"];
                $html = '<div class="wx_qrcode" style="text-align:center">';
                $html .= $this->getcode( $code_url );
                $html .= "</div>";

                $html .= "<div style=\"text-align:center\">支付后点击<a href=\"user.php?act=order_list\">此处</a>查看我的订单</div>";
            }

            return $html;
        }

        function getcode( $url )
        {
            if ( file_exists( ROOT_PATH . 'includes/phpqrcode.php' ) ) {
                include( ROOT_PATH . 'includes/phpqrcode.php' );
            }
            // 纠错级别：L、M、Q、H
            $errorCorrectionLevel = 'Q';
            // 点的大小：1到10
            $matrixPointSize = 5;
            // 生成的文件名
            $tmp = ROOT_PATH . 'images/qrcode/';
            if ( !is_dir( $tmp ) ) {
                @mkdir( $tmp );
            }
            $filename = $tmp . $errorCorrectionLevel . $matrixPointSize . '.png';
            QRcode::png( $url , $filename , $errorCorrectionLevel , $matrixPointSize , 2 );

            return '<img src="' . $GLOBALS['ecs']->url() . 'images/qrcode/' . basename( $filename ) . '" />';
        }

        function respond()
        {

            $xml = $GLOBALS['HTTP_RAW_POST_DATA'];
            $payment = get_payment( 'native' );
            if ( $payment['logs'] ) {
                $this->log( ROOT_PATH . '/data/native_log.txt' , "传递过来的XML\r\n" . var_export( $xml , true ) );//mobile/
            }

            $notify = new Notify_pub();
            $notify->saveData( $xml );
            if ( $notify->checkSign() ) {
                if ( $notify->data['return_code'] == 'SUCCESS' && $notify->data['result_code'] == 'SUCCESS' ) {
                    $total_fee = $notify->data["total_fee"];
                    $log_id = $notify->data["attach"];
                    $sql = 'SELECT order_amount FROM ' . $GLOBALS['ecs']->table( 'pay_log' ) . " WHERE log_id = '$log_id'";
                    $amount = $GLOBALS['db']->getOne( $sql );
                    if ( intval( $amount * 100 ) == $total_fee ) {
                        order_paid( $log_id , 2 );

                        return true;
                    }
                }
            }
            return false;
        }
    }
