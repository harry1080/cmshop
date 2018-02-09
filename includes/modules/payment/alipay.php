<?php
    /**
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/3/7
     * Time: 13:15
     */
    if ( !defined( 'IN_PC' ) ) {
        die( 'Hacking attempt' );
    }

    $payment_lang = ROOT_PATH . 'languages/' . $GLOBALS['_CFG']['lang'] . '/payment/alipay.php';

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
        $modules[$i]['desc'] = 'alipay_desc';

        /* 是否支持货到付款 */
        $modules[$i]['is_cod'] = '0';

        /* 是否支持在线支付 */
        $modules[$i]['is_online'] = '1';

        /* 作者 */
        $modules[$i]['author'] = '云动商圈';

        /* 网址 */
        $modules[$i]['website'] = 'http://www.alipay.com';

        /* 版本号 */
        $modules[$i]['version'] = '1.0.2';

        /* 配置信息 */
        $modules[$i]['config'] = array(
            array( 'name' => 'alipay_account' , 'type' => 'text' , 'value' => 'zztt_zwzx@163.com' ) ,
            array( 'name' => 'alipay_key' , 'type' => 'text' , 'value' => 'r8uq1higvfmgrye6pkep8jjmeo4z9flz' ) ,
            array( 'name' => 'alipay_partner' , 'type' => 'text' , 'value' => '2088121905285245' ) ,
            array( 'name' => 'alipay_pay_method' , 'type' => 'select' , 'value' => '1' ) ,
        );

        return;
    }

    require_once( "alipay/lib/alipay_submit.class.php" );
    require_once( "alipay/lib/alipay_notify.class.php" );
    require_once( "alipay/lib/alipay_config.function.php" );

    class alipay
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
            $config = fetchConfig();

            $serviceApi = $payment['alipay_pay_method'];
            switch ( $serviceApi ) {
                case '0':
                    //构造要请求的参数数组
                    $parameter = array(
                        'service'           => 'create_partner_trade_by_buyer' ,//接口名称 不可空 担保交易
                        'partner'           => trim( $payment['alipay_partner'] ) ,//合作者身份ID 签约的支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成,不可空
                        '_input_charset'    => 'utf-8' ,//不可空EC_CHARSET
                        'notify_url'        => return_url( basename( __FILE__ , '.php' ) ) ,//服务器异步通知页面路径 支付宝服务器主动通知商户网站里指定的页面http路径。
                        'return_url'        => return_url( basename( __FILE__ , '.php' ) ) ,//页面跳转同步通知页面路径 支付宝处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径。
                        'payment_type'      => 1 ,//收款类型 收款类型，只支持1：商品购买。不可空

                        /* 业务参数 */
                        'subject'           => trim( $order['order_sn'] ) ,//商品名称 不可空
                        'out_trade_no'      => $order['order_sn'] . $order['log_id'] ,// 商户网站唯一订单号 不可空
                        'price'             => sprintf( "%.2f" , $order['order_amount'] ) ,//商品单价 不可空 单位为：RMB Yuan。取值范围为[0.01，1000000.00]，精确到小数点后两位
                        'quantity'          => 1 , //商品数量 不可空
                        /* 物流参数 */
                        'logistics_type'    => 'EXPRESS' ,//物流类型 不可空，三个值可选：EXPRESS（快递）、POST（平邮）、EMS（EMS）
                        'logistics_fee'     => '0.00' ,//  物流费用   不可空
                        'logistics_payment' => 'BUYER_PAY' ,  //物流支付类型  不可空，两个值可选：SELLER_PAY（卖家承担运费）、BUYER_PAY（买家承担运费）BUYER_PAY_AFTER_RECEIVE	买家到货付款，运费显示但不计入总价
                        /* 买卖双方信息 */
                        'seller_id'      => trim( $payment['alipay_account'] ) ,//卖家支付宝账号 //可空 卖家支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。登录时，seller_email和seller_id两者必填一个。
                        'token'             => '' ,
                    );
                    break;
                case '1':
                    //构造要请求的参数数组，无需改动
                    $parameter = array(

                        "service"        => 'alipay.wap.create.direct.pay.by.user' ,
                        'partner'        =>trim( $payment['alipay_partner'] ) ,// //合作者身份ID 签约的支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成,不可空
                        '_input_charset' => 'utf-8' ,//参数编码字符集 商户网站使用的编码格式，仅支持utf-8。
                        'notify_url'     => return_url( basename( __FILE__ , '.php' ) ) ,//服务器异步通知页面路径 支付宝服务器主动通知商户网站里指定的页面http路径。
                        'return_url'     => return_url( basename( __FILE__ , '.php' ) ) ,//页面跳转同步通知页面路径 支付宝处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径。
                        'payment_type' => '1' ,

                        /* 业务参数 */
                        'subject'      => trim(  $order['order_sn'] ) ,//商品名称 商品的标题/交易标题/订单标题/订单关键字等。该参数最长为128个汉字。 不可空
                        'out_trade_no'      => $order['order_sn'] . $order['log_id'] ,// 商户网站唯一订单号 支付宝合作商户网站唯一订单号。不可空
                        'total_fee'    => sprintf( "%.2f" ,  $order['order_amount']) ,//该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01，100000000.00]，精确到小数点后两位。
                        'body'         => trim(  $order['order_sn'] )  ,//商品描述

                        /* 买卖双方信息 */
                        'seller_id'    => trim( $payment['alipay_account'] ) ,//卖家支付宝用户号seller_id是以2088开头的纯16位数字。seller_email是支付宝登录账号，格式一般是邮箱或手机号。
                        'extern_token' => '',//接入极简版wap收银台时支持。当商户请求是来自手机支付宝，在手机支付宝登录后，有生成登录信息token时，使用该参数传入token将可以实现信任登录收银台，不需要再次登录。注意：登录后用户还是有入口可以切换账户，不能使用该参数锁定用户。'
                    );
                    break;
                default:

                    break;

            }

            //建立请求
            $alipaySubmit = new AlipaySubmit( $config );
            $button = $alipaySubmit->buildRequestForm( $parameter , "get" , $GLOBALS['_LANG']['pay_button'] );

            return $button;
        }

//    https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.yWeh6M&treeId=62&articleId=104747&docType=1
//    业务数据处理注意事项
//
//    商户需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，并判断total_fee是否确实为该订单的实际金额（即商户订单创建时的金额），同时需要校验通知中的seller_id（或者seller_email) 是否为out_trade_no这笔单据的对应的操作方（有的时候，一个商户可能有多个seller_id/seller_email），上述有任何一个验证不通过，则表明本次通知是异常通知，务必忽略。在上述验证通过后商户必须根据支付宝不同类型的业务通知，正确的进行不同的业务处理，并且过滤重复的通知结果数据。在支付宝的业务通知中，只有交易通知状态为TRADE_SUCCESS或TRADE_FINISHED时，支付宝才会认定为买家付款成功。 如果商户需要对同步返回的数据做验签，必须通过服务端的签名验签代码逻辑来实现。如果商户未正确处理业务通知，存在潜在的风险，商户自行承担因此而产生的所有损失。
//
//    交易状态TRADE_SUCCESS的通知触发条件是商户签约的产品支持退款功能的前提下，买家付款成功；
//    交易状态TRADE_FINISHED的通知触发条件是商户签约的产品不支持退款功能的前提下，买家付款成功；或者，商户签约的产品支持退款功能的前提下，交易已经成功并且已经超过可退款期限；
//    交易成功之后，商户（高级即时到账或机票平台商）可调用批量退款接口，系统会发送退款通知给商户，具体内容请参见批量退款接口文档；
//    当商户使用站内退款时，系统会发送包含refund_status和gmt_refund字段的通知给商户。
//    对于退款接口，以异步通知中的退款处理结果业务数据为准。 如果商户未正确处理业务通知，存在潜在的风险，商户自行承担因此而产生的所有损失。
//
//    退款接口只支持https请求；
//    退款接口不支持退分润；
//    同一批次中不允许包含两条交易号相同的退款明细。
        public function respond()
        {
            //计算得出通知验证结果
            $alipay_config = fetchConfig();
            $alipayNotify = new AlipayNotify( $alipay_config );
            //这里是同步通知
            $verify_result = $alipayNotify->verifyReturn();
            $verify_notify = $alipayNotify->verifyNotify();
            logResult("传递过来的XML\r\n".var_export($_GET,true));//mobile/            $php_json = json_encode($_GET);
            logResult("传递过来的XML\r\n".var_export($_POST,true));//mobile/
//            测试数据
//            http://www.shoujishangquan.com/respond.php?code=alipay
//            当支付宝的接口存在页面跳转同步通知方式或服务器异步通知方式时，notify_id基本会在通知返回的url中出现。Notify_id是帮助商户校验商户获取的信息是否是支付宝发来的，这其中也包含了notify_id的时效性问题。
//在页面跳转同步通知方式里（return_url），notify_id的有效性一般为1分钟，且在有效期内支持重复使用校验。
//在服务器异步通知方式里（notify_url），notify_id的有效性则是永久，但不支持重复使用来校验通知，即校验成功（支付宝收到了商户打印的success且支付宝不再发该次通知），此时notify_id变为无效。
//            $_POST= array (
//                'code' => 'alipay',
//                'payment_type' => '1',
//                'subject' => '2017030838868',
//                'trade_no' => '2017030821001004070238574420',
//                'buyer_email' => 'tongwenping@163.com',
//                'gmt_create' => '2017-03-08 11:31:37',
//                'notify_type' => 'trade_status_sync',
//                'quantity' => '1',
//                'out_trade_no' => '2017030838868164',
//                'seller_id' => '2088121905285245',
//                'notify_time' => '2017-03-08 11:31:38',
//                'body' => '2017030838868',
//                'trade_status' => 'TRADE_SUCCESS',
//                'is_total_fee_adjust' => 'N',
//                'total_fee' => '0.01',
//                'gmt_payment' => '2017-03-08 11:31:38',
//                'seller_email' => 'zztt_zwzx@163.com',
//                'price' => '0.01',
//                'buyer_id' => '2088702006857072',
//                'notify_id' => 'e5ac989d7c599578154ebc975e25e05gji',
//                'use_coupon' => 'N',
//                'sign_type' => 'MD5',
//                'sign' => '80676bb969475cdfb65e72fc0bd0bf90',
//            );

            //计算得出通知验证结果
            $alipay_config = fetchConfig();
            $alipayNotify = new AlipayNotify( $alipay_config );
            //这里是同步通知
            $verify_result = $alipayNotify->verifyReturn();
            $verify_notify = $alipayNotify->verifyNotify();


// 验证签名
//首先必需验证签名（参见本文档“附录：签名与验签”），然后验证是否是支付宝发来的通知。
            if ( $verify_result ) {//验证成功
                logResult( 'verify_result success' );

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
            logResult( 'verify_result failed' );

            if ( $verify_notify ) {//验证成功
                logResult( 'verify_notify success' );

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
                        logResult( '支付宝订单号：' . $_POST['out_trade_no'] . "写入日志成功." );

                        return true;
                    }

                }
            }
            logResult( 'verify_notify failed' );
            return false;
        }

    }