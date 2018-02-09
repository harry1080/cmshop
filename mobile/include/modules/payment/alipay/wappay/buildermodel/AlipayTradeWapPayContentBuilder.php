<?php

    /* *
     * 功能：支付宝手机网站支付接口(alipay.trade.wap.pay)接口业务参数封装
     * 版本：2.0
     * 修改日期：2016-11-01
     */


    class AlipayTradeWapPayContentBuilder
    {

        // 订单描述，可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
        private $body;

        // 订单标题，粗略描述用户的支付目的。
        private $subject;

        // 商户订单号.
        private $outTradeNo;

        // (推荐使用，相对时间) 支付超时时间，5m 5分钟
        private $timeExpress;

        // 订单总金额，整形，此处单位为元，精确到小数点后2位，不能超过1亿元
        private $totalAmount;

        // 如果该字段为空，则默认为与支付宝签约的商户的PID，也就是appid对应的PID
        private $sellerId;

        // 产品标示码，固定值：QUICK_WAP_PAY
        private $productCode;

        private $bizContentarr = array();

        private $bizContent = null;

        /**
         * 对变量进行 JSON 编码
         * @param mixed value 待编码的 value ，除了resource 类型之外，可以为任何数据类型，该函数只能接受 UTF-8 编码的数据
         * @return string 返回 value 值的 JSON 形式
         */
        public function json_encode_ex( $value )
        {
            if ( version_compare( PHP_VERSION , '5.4.0' , '<' ) ) {
                $str = json_encode( $value );
                $str = preg_replace_callback(
                    "#\\\u([0-9a-f]{4})#i" ,
                    function ( $matchs ) {
                        return iconv( 'UCS-2BE' , 'UTF-8' , pack( 'H4' , $matchs[1] ) );
                    } ,
                    $str
                );

                return $str;
            } else {
                return json_encode( $value , JSON_UNESCAPED_UNICODE );
            }
        }

        public function getBizContent()
        {
            if ( !empty( $this->bizContentarr ) ) {
                //Json不要编码Unicode.处理中文
//            $this->bizContent = json_encode($this->bizContentarr,JSON_UNESCAPED_UNICODE);
                $this->bizContent = $this->json_encode_ex( $this->bizContentarr );
            }

            return $this->bizContent;
        }

        public function __construct()
        {
            $this->bizContentarr['product_code'] = "QUICK_WAP_PAY";
        }

        public function AlipayTradeWapPayContentBuilder()
        {
            $this->__construct();
        }

        public function getBody()
        {
            return $this->body;
        }

        public function setBody( $body )
        {
            $this->body = $body;
            $this->bizContentarr['body'] = $body;
        }

        public function setSubject( $subject )
        {
            $this->subject = $subject;
            $this->bizContentarr['subject'] = $subject;
        }

        public function getSubject()
        {
            return $this->subject;
        }

        public function getOutTradeNo()
        {
            return $this->outTradeNo;
        }

        public function setOutTradeNo( $outTradeNo )
        {
            $this->outTradeNo = $outTradeNo;
            $this->bizContentarr['out_trade_no'] = $outTradeNo;
        }

        public function setTimeExpress( $timeExpress )
        {
            $this->timeExpress = $timeExpress;
            $this->bizContentarr['timeout_express'] = $timeExpress;
        }

        public function getTimeExpress()
        {
            return $this->timeExpress;
        }

        public function setTotalAmount( $totalAmount )
        {
            $this->totalAmount = $totalAmount;
            $this->bizContentarr['total_amount'] = $totalAmount;
        }

        public function getTotalAmount()
        {
            return $this->totalAmount;
        }

        public function setSellerId( $sellerId )
        {
            $this->sellerId = $sellerId;
            $this->bizContentarr['seller_id'] = $sellerId;
        }

        public function getSellerId()
        {
            return $this->sellerId;
        }
    }

