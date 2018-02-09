<?php
    /* *
     * 类名：AlipayNotify
     * 功能：支付宝通知处理类
     * 详细：处理支付宝各接口通知返回
     * 版本：3.2
     * 日期：2011-03-25
     * 说明：

     *************************注意*************************
     * 调试通知返回时，可查看或改写log日志的写入TXT里的数据，来检查通知返回是否正常
     */

    require_once( "alipay_core.function.php" );
    require_once( "alipay_rsa.function.php" );
    require_once( "alipay_md5.function.php" );

    class AlipayNotify
    {
        /**
         * HTTPS形式消息验证地址
         */
        var $https_verify_url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&';
        /**
         * HTTP形式消息验证地址
         */
        var $http_verify_url = 'http://notify.alipay.com/trade/notify_query.do?';
        var $alipay_config;

        function AlipayNotify( $alipay_config )
        {
            $this->__construct( $alipay_config );
        }

        function __construct( $alipay_config )
        {
            $this->alipay_config = $alipay_config;
        }

        /**
         * 针对notify_url验证消息是否是支付宝发出的合法消息
         *
         * @return 验证结果
         */
        function verifyNotify()
        {
            if ( empty( $_POST ) ) {//判断POST来的数组是否为空
                return false;
            } else {
                //生成签名结果
                $isSign = $this->getSignVeryfy( $_POST , $_POST["sign"] );
                //获取支付宝远程服务器ATN结果（验证是否是支付宝发来的消息）
                $responseTxt = 'false';
                if ( !empty( $_POST["notify_id"] ) ) {
                    $responseTxt = $this->getResponse( $_POST["notify_id"] );
                }

                //写日志记录
                if ( $isSign ) {
                    $isSignStr = 'true';
                } else {
                    $isSignStr = 'false';
                }
                $log_text = "responseTxt=" . $responseTxt . "\n notify_url_log:isSign=" . $isSignStr . ",";
                $log_text = $log_text . createLinkString( $_POST );
                logResult( $log_text );

                //验证
                //$responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
                //isSign的结果不是true，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
                if ( preg_match( "/true$/i" , $responseTxt ) && $isSign ) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        /**
         * 获取返回时的签名验证结果
         *
         * @param $para_temp 通知返回来的参数数组
         * @param $sign      返回的签名结果
         *
         * @return 签名验证结果
         */
        function getSignVeryfy( $para_temp , $sign )
        {
            //除去待签名参数数组中的空值和签名参数
            $para_filter = paraFilter( $para_temp );

            //对待签名参数数组排序
            $para_sort = argSort( $para_filter );

            //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
            $prestr = createLinkstring( $para_sort );
            $isSgin = false;
            switch ( strtoupper( trim( $this->alipay_config['sign_type'] ) ) ) {
                case "RSA" :
                    $isSgin = rsaVerify( $prestr , trim( $this->alipay_config['ali_public_key_path'] ) , $sign );
                    break;
                case "MD5":
                    $isSgin = md5Verify( $prestr , $sign , trim( $this->alipay_config['alipay_key'] ) );
                    break;
                default :
                    $isSgin = false;
            }

            return $isSgin;
        }

        /**
         * 关于支付宝通知接口中，notify id的时效性
         * 当支付宝的接口存在页面跳转同步通知方式或服务器异步通知方式时，notify_id基本会在通知返回的url中出现。Notify_id是帮助商户校验商户获取的信息是否是支付宝发来的，这其中也包含了notify_id的时效性问题。
        在页面跳转同步通知方式里（return_url），notify_id的有效性一般为1分钟，且在有效期内支持重复使用校验。
        在服务器异步通知方式里（notify_url），notify_id的有效性则是永久，但不支持重复使用来校验通知，即校验成功（支付宝收到了商户打印的success且支付宝不再发该次通知），此时notify_id变为无效。
         * 获取远程服务器ATN结果,验证返回URL
         *
         * @param $notify_id 通知校验ID
         *
         * @return 服务器ATN结果
         * 该处的验证是指，对支付宝通知回来的参数notify_id合法性验证。
         * 这个验证动作实际上是调用了支付宝的另一个接口“通知验证接口(notify_verify)”来完成的。
         * 这个接口请求时使用的是模拟远程HTTP提交，回调模式是“直接在当前页面输出结果”，
         * 返回的数据是纯文本格式。
         * 请求的完整链接如下：
         * https://mapi.alipay.com/gateway.do?service=notify_verify&partner=2088002396712354&notify_id=RqPnCoPT3K9%252Fvwbh3I%252BFioE227%252BPfNMl8jwyZqMIiXQWxhOCmQ5MQO%252FWd93rvCB%252BaiGg
         *                   验证结果集：
         *                   invalid命令参数不对 出现这个错误，请检测返回处理中partner和key是否为空
         *                   true 返回正确信息
         *                   false 请检查防火墙或者是服务器阻止端口问题以及验证时间是否超过一分钟
         */
        function getResponse( $notify_id )
        {
            $transport = strtolower( trim( $this->alipay_config['transport'] ) );
            $partner = trim( $this->alipay_config['partner'] );
            $veryfy_url = '';
            if ( $transport == 'https' ) {
                $veryfy_url = $this->https_verify_url;
            } else {
                $veryfy_url = $this->http_verify_url;
            }
            $veryfy_url = $veryfy_url . "partner=" . $partner . "&notify_id=" . $notify_id;
            $responseTxt = getHttpResponseGET( $veryfy_url , $this->alipay_config['cacert'] );

            return $responseTxt;
        }

        /**
         * 针对return_url验证消息是否是支付宝发出的合法消息
         *
         * @return 验证结果
         */
        function verifyReturn()
        {
            if ( empty( $_GET ) ) {//判断GET来的数组是否为空
                return false;
            } else {
                unset( $_GET['_URL_'] );
                //生成签名结果
                $isSign = $this->getSignVeryfy( $_GET , $_GET["sign"] );
                //获取支付宝远程服务器ATN结果（验证是否是支付宝发来的消息）
                $responseTxt = 'false';
                if ( !empty( $_GET["notify_id"] ) ) {
                    $responseTxt = $this->getResponse( $_GET["notify_id"] );
                }

                //写日志记录
                if ( $isSign ) {
                    $isSignStr = 'true';
                } else {
                    $isSignStr = 'false';
                }
                $log_text = "responseTxt=" . $responseTxt . "\n return_url_log:isSign=" . $isSignStr . ",";
                $log_text = $log_text . createLinkString( $_GET );
                logResult( $log_text );
                //验证
                //$responsetTxt的结果不是true，与服务器设置问题、合作身份者ID、notify_id一分钟失效有关
                //isSign的结果不是true，与安全校验码、请求时的参数格式（如：带自定义参数等）、编码格式有关
                if ( preg_match( "/true$/i" , $responseTxt ) && $isSign ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

?>
