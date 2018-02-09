<?php

    /**
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/3/20
     * Time: 10:09
     */
    require_once( ROOT_PATH . 'includes/cls_transport.php' );
    require_once( ROOT_PATH . 'includes/shopex_json.php' );
    require_once( ROOT_PATH . 'includes/taobao/TopSdk.php' );

    class aliSendSms
    {
        /**
         * 存放MYSQL对象
         *
         * @access  private
         * @var     object $db
         */
        var $db = null;

        /**
         * 存放ECS对象
         *
         * @access  private
         * @var     object $ecs
         */
        var $ecs = null;

        /**
         * 存放transport对象
         *
         * @access  private
         * @var     object $t
         */
        var $t = null;

        function __construct()
        {
            /* 由于要包含init.php，所以这两个对象一定是存在的，因此直接赋值 */
            $this->db = $GLOBALS['db'];
            $this->ecs = $GLOBALS['ecs'];

            /* 此处最好不要从$GLOBALS数组里引用，防止出错 */
            $this->t = new transport();
            $this->json = new Services_JSON;
        }


        /**
         * 大鱼短信发送
         * sms_free_sign_name短信签名，传入的短信签名必须是在阿里大鱼“管理中心-短信签名管理”中的可用签名
         * $dayu_tag短信模板ID，传入的模板必须是在阿里大鱼“管理中心-短信模板管理”中的可用模板。示例：SMS_585014
         * rec_num短信接收号码。支持单个或多个手机号码，传入号码为11位手机号码，不能加0或+86。群发短信需传入多个号码，以英文逗号分隔，一次调用最多传入200个号码。示例：18600000000,13911111111,13322222222
         * 下面是调用示例：
         * sms_param短信模板变量，传参规则{"key":"value"}，key的名字须和申请模板中的变量名一致，多个变量之间以逗号隔开。示例：针对模板“验证码${code}，您正在进行${product}身份验证，打死不要告诉别人哦！”，传参时需传入{"code":"1234","product":"alidayu"}
         * AliSendSms('短信签名', '短信模板ID', '短信接收号码', array('短信模板变量' => '值'));
         */

        function AliSendSms( $sign , $dayu_local , $mobile , $smsParam )
        {

            $sql = 'SELECT * FROM ' .  $this->ecs->table( 'dayusms_config' );
            $sql1 = 'SELECT dayu_tag FROM ' .  $this->ecs->table( 'dayusms' ) . " WHERE  dayu_local = '$dayu_local'";;
            $config = $this->db->getAll( $sql );
            $dayu_tag = $this->db->getOne( $sql1 );

            $c = new TopClient;
            $c->appkey = trim( $config[0]['dykey'] );
            $c->secretKey = trim( $config[0]['dysecret'] );
            $req = new AlibabaAliqinFcSmsNumSendRequest;
            $req->setExtend( "123456" );
            $req->setSmsType( "normal" );
            $req->setSmsFreeSignName( $sign );
            $req->setSmsParam( json_encode( $smsParam ) );
            $req->setRecNum( trim( $mobile ) );
            $req->setSmsTemplateCode( $dayu_tag );

            $resp = $c->execute( $req );

            if ( !isset( $resp->code ) ) {
                return true;
            }
            return false;
        }

    }