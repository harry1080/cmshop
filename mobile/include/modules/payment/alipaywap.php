<?php
    /**
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/4/6
     * Time: 11:02
     */

    $payment_lang = ROOT_PATH . 'lang/' . $GLOBALS['_CFG']['lang'] . '/payment/alipaywap.php';

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
        $modules[$i]['desc'] = 'alipaywap_desc';

        /* 是否支持货到付款 */
        $modules[$i]['is_cod'] = '0';

        /* 是否支持在线支付 */
        $modules[$i]['is_online'] = '1';

        /* 作者 */
        $modules[$i]['author'] = '云动商圈';

        /* 网址 */
        $modules[$i]['website'] = 'http://www.mbizzone.com';

        /* 版本号 */
        $modules[$i]['version'] = '1.0.2';

        /* 配置信息 */
        $modules[$i]['config'] = array(
            array( 'name' => 'app_id' , 'type' => 'text' , 'value' => '2017040506559385' ) ,
            array( 'name' => 'merchant_private_key' , 'type' => 'text' , 'value' => 'MIICXQIBAAKBgQDkpAv34ehCyH1GfI6rBkTqSLE7Y/jp1h4ltm/1y8uZZv1zo3eWpQ2RiCze9KRA0GaZUzN1tHynLxOQBDBrIUjX7O0/TTzbyguc4u1po8aI3U1OmglE8z1A1YjZ//0q+k4DL/1AFDIelWJ+2YwNgAhIUUj60h9Oywuvdf6VOM/45QIDAQABAoGADZlcROAg6mf2W4zpB28WBkFQmVG26mGb5W5Wdm4qq/MePBSK9mDWz8MjuBcg9eHvWEtEkkmr6F26ciRtpNGT/Xb80ogkclY01kvZZL8DmxF0Tu/hTBi6Nr1+0qXAoB//L7QgxebFhEki6ifEAXvJw4UfevpLlAxoK0isGSIkXEECQQD/7PLNOIl2iE8CrNDcJBYATerTh8+IL1Ul8DP4kfNUWV2rb+ouJM7m+5rRQpYorBAND1HfczfplU/eyrhX/qeNAkEA5LURMrgbgri6+3ZHlED7ZaRWwmshe/piceQIonV4fnb2/9ueK7SUumhAMeoGQ1AuW2iLilgicMAUqo0xc5F0uQJBALuVTZImMntzBZaMXLo+qPGoKsrI7NCBAQRBv5YeRCA7MHEMIrWXvR+Io71l9PHyzAEGjZget4i6LES8icnVmbECQQCsjchKAgoPmJzKuLTMsDJ8v38N9JIw3fqEf03cdNDSaaN16xbtVrOX6Kv2fOD4zHgNU1VkrZZehy2QeDLFRQtRAkBDc7KBY/vOoo20e++ZJLbOUp66KSMfGOjOcAvRvB1EJ9fMO7ogSrtOGjIiWXvhjDOe/qNp3UcQ00g83Vmi2RCM' ) ,
            array( 'name' => 'alipay_public_key' , 'type' => 'text' , 'value' => 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkpAv34ehCyH1GfI6rBkTqSLE7Y/jp1h4ltm/1y8uZZv1zo3eWpQ2RiCze9KRA0GaZUzN1tHynLxOQBDBrIUjX7O0/TTzbyguc4u1po8aI3U1OmglE8z1A1YjZ//0q+k4DL/1AFDIelWJ+2YwNgAhIUUj60h9Oywuvdf6VOM/45QIDAQAB' ) ,
            array( 'name' => 'alipay_pay_sign_type' , 'type' => 'select' , 'value' => '0' ) ,
        );

        return;
    }
    require_once( "alipay/lib/alipay_submit.class.php" );
    require_once( "alipay/lib/alipay_config.function.php" );
    require_once( "alipay/aop/request/AlipayTradeWapPayRequest.php" );
    require_once( "alipay/wappay/service/AlipayTradeService.php" );
    require_once( "alipay/wappay/buildermodel/AlipayTradeWapPayContentBuilder.php" );
    require_once( "alipay/AopSdk.php" );

    class alipaywap
    {
        /**
         * 生成支付代码
         *
         * @param $order   订单信息
         * @param $payment 支付方式信息
         *
         * @return string
         */
        function get_code( $order , $payment )
        {

            //https://doc.open.alipay.com/doc2/detail.htm?treeId=203&articleId=105463&docType=1#s1
            $config = fetchNewVersionConfig();
            //加密类型
            $sign_type = $payment['alipay_pay_sign_type'];

            switch ( $sign_type ) {
                case 0:
                    $config['sign_type'] = 'RSA';
                    break;
                case 1:
                    $config['sign_type'] = 'RSA2';
                    break;
                default:
                    break;
            }
            //同步跳转
            $config['notify_url'] = return_url( basename( __FILE__ , '.php' ) );//服务器异步通知页面路径 支付宝服务器主动通知商户网站里指定的页面http路径。
            $config['return_url'] = return_url( basename( __FILE__ , '.php' ) );//页面跳转同步通知页面路径 支付宝处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径。


            //商户订单号，商户网站订单系统中唯一订单号，必填
            $out_trade_no = $order['order_sn'] . $order['log_id'];

            //订单名称，必填 商品的标题/交易标题/订单标题/订单关键字等。
            $subject = trim( $order['order_sn'] );

            //付款金额，必填 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
            $total_amount = sprintf( "%.2f" , $order['order_amount'] );

            //商品描述，可空
            $body = 'test';

            //超时时间
            $timeout_express = "1m";
            //销售产品码必填，商家和支付宝签约的产品码
//            $product_code="QUICK_WAP_PAY";

            $payRequestBuilder = new AlipayTradeWapPayContentBuilder();
            $payRequestBuilder->setBody( $body );
            $payRequestBuilder->setSubject( $subject );
            $payRequestBuilder->setOutTradeNo( $out_trade_no );
            $payRequestBuilder->setTotalAmount( $total_amount );
            $payRequestBuilder->setTimeExpress( $timeout_express );


            //建立请求
            $payResponse = new AlipayTradeService( $config );
            $result = $payResponse->wapPay( $payRequestBuilder , $config['return_url'] , $config['notify_url'] );

            return $result;
        }
//    *************************页面功能说明*************************
//    * 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
//    * 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
//    * 如果没有收到该页面返回的 success 信息，支付宝会在24小时内按一定的时间策略重发通知
        /* 实际验证过程建议商户添加以下校验。
    1、商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
    2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
    3、校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email）
    4、验证app_id是否为该商户本身。
    */
        public function respond()
        {
//            $_POST = array(
//                'total_amount'     => '0.01' ,
//                'buyer_id'         => '2088702006857072' ,
//                'trade_no'         => '2017041421001004070204667044' ,
//                'body'             => 'test' ,//
//                'notify_time'      => '2017-04-14 09:58:13' ,//
//                'subject'          => '2017041461924' ,
//                'sign_type'        => 'RSA' ,
//                'buyer_logon_id'   => 'ton***@163.com' ,
////                'auth_app_id'      => '2017040506559385' ,
//                'charset'          => 'UTF-8' ,//
//                'notify_type'      => 'trade_status_sync' ,
//                'invoice_amount'   => '0.01' ,
//                'out_trade_no'     => '2017041461924168' ,
//                'trade_status'     => 'TRADE_SUCCESS' ,
//                'gmt_payment'      => '2017-04-14 09:58:13' ,//
//                'version'          => '1.0' ,
//                'point_amount'     => '0.00' ,
//                'sign'             => 'YKmikuE704nMbo1Kz/H7/LU+R5zCI8dzp7J28NuhwwE8Tbw5TicFPkmcAEjAyr5jPJFdanjWWcc/KsWRXbINO4zwmPXytapLCOi/m0Di2W0dT5S25GBxfRUB6uoXmdG0jqECcowNVAWSKsMYbcaCyk/D/Um3+sxHr+nl4NfKmOk=' ,
//                'gmt_create'       => '2017-04-14 09:58:12' ,//
//                'buyer_pay_amount' => '0.01' ,
//                'receipt_amount'   => '0.01' ,
//                'fund_bill_list'   => '[{\\"amount\\":\\"0.01\\",\\"fundChannel\\":\\"ALIPAYACCOUNT\\"}]' ,
////                'app_id'           => '2017040506559385' ,//
//                'seller_id'        => '2088121905285245' ,
//                'notify_id'        => '33bd79df67bc62aa7e46b13bfcd5425gji' ,
//                'seller_email'     => 'zztt_zwzx@163.com' ,
//            );
//            http://www.shoujishangquan.com/mobile/respond.php?code=alipaywap

            unset( $_POST['code'] );
            $config = fetchNewVersionConfig();
            $config['sign_type'] = $_POST['sign_type'];

            logResult( "ALIPAYWAP GET:传递过来的GET_XML\r\n" . var_export( $_GET , true ) );
            logResult( "ALIPAYWAP POST:传递过来的POST_XML\r\n" . var_export( $_POST , true ) );

            $alipaySevice = new AlipayTradeService( $config );
            $verify_notify = $alipaySevice->check( $_POST );
            $verify_result = $alipaySevice->check( $_GET );


            if ( $verify_result ) {//同步通知
                logResult( '支付宝手机支付同步通知成功！' );

                if ( $_GET['trade_status'] == 'WAIT_SELLER_SEND_GOODS' ||
                    $_GET['trade_status'] == 'TRADE_FINISHED' ||
                    $_GET['trade_status'] == 'TRADE_SUCCESS'
                ) {
                    /* 检查支付的金额是否相符 */
                    $order_sn = str_replace( $_GET['subject'] , '' , $_GET['out_trade_no'] );
                    $order_sn = trim( $order_sn );  //商户订单号
                    $total_fee = $_GET['total_fee'];//日志里记录的need_pay单位为分，get获取到的金额单位为元
                    /* 检查支付的金额是否相符 */
                    if ( check_money( $order_sn , $total_fee ) ) {
                        order_paid( $order_sn );
                        logResult( '支付宝订单号：' . $_GET['out_trade_no'] . "写入日志成功." );

                        return true;
                    }
                }
            }
            logResult( '支付宝手机支付同步通知失败' );

            if ( $verify_notify ) {//异步通知
                logResult( '支付宝手机支付异步通知成功' );

                if ( $_POST['trade_status'] == 'WAIT_SELLER_SEND_GOODS' ||
                    $_POST['trade_status'] == 'TRADE_FINISHED' ||
                    $_POST['trade_status'] == 'TRADE_SUCCESS'
                ) {
                    /* 检查支付的金额是否相符 */
                    $order_sn = str_replace( $_POST['subject'] , '' , $_POST['out_trade_no'] );
                    $order_sn = trim( $order_sn );  //商户订单号
                    $total_fee = $_POST['total_fee'];//日志里记录的need_pay单位为分，get获取到的金额单位为元
                    /* 检查支付的金额是否相符 */
                    if ( check_money( $order_sn , $total_fee ) ) {

                        order_paid( $order_sn );
                        logResult( 'ALIPAYWAP支付宝订单号：' . $_POST['out_trade_no'] . "写入日志成功." );

                        return true;
                    }

                }
            }
            logResult( '支付宝手机支付异步通知失败' );

            return false;
        }

    }