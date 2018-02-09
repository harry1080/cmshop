<?php
    define( 'IN_MOBILE' , true );
    define( 'BASE_URI' , 'http://' . $_SERVER['SERVER_NAME'] . '/' );

    class weChatCallback
    {
        public function valid($db)
        {
            $echoStr = $_GET["echostr"];
            if ( $this->checkSignature($db) ) {
                echo $echoStr;
                exit;
            }
        }

        //打印日志
        function logResult( $word = '' )
        {
            $fp = fopen( "log.txt" , "a" );
            flock( $fp , LOCK_EX );
            fwrite( $fp , "执行日期：" . strftime( "%Y%m%d%H%M%S" , time() ) . "\n" . $word . "\n" );
            flock( $fp , LOCK_UN );
            fclose( $fp );
        }

        private function checkSignature($db)
        {
            $signature = $_GET["signature"];
            $timestamp = $_GET["timestamp"];
            $nonce = $_GET["nonce"];
            $token = $db->getOne( "SELECT `token` FROM `wxch_config` WHERE `id` = 1" );
            $tmpArr = array( $token , $timestamp , $nonce );
            sort( $tmpArr );
            $tmpStr = implode( $tmpArr );
            $tmpStr = sha1( $tmpStr );

            if ( $tmpStr == $signature ) {
                return true;
            } else {
                return false;
            }
        }

        //回复消息
        //1 文本消息text
        //2 图片消息image
        //3 语音消息
        //4 视频消息
        //5 小视频消息
        //6 地理位置消息
        //7 链接消息
        public function responseMsg( $db )
        {
            $postXml = $GLOBALS["HTTP_RAW_POST_DATA"];
//            $postXml = '<xml>
//<ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
//<FromUserName><![CDATA[o_fypwHt4F0uJu-i8lheviEJ0AzE]]></FromUserName>
//<CreateTime>123456789</CreateTime>
//<MsgType><![CDATA[event]]></MsgType>
//<Event><![CDATA[CLICK]]></Event>
//<EventKey><![CDATA[qrcode]]></EventKey>
//</xml>';
////
//            $postXml = '<xml>
////<ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
////<FromUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></FromUserName>
////<CreateTime>123456789</CreateTime>
////<MsgType><![CDATA[event]]></MsgType>
////<Event><![CDATA[CLICK]]></Event>
////<EventKey><![CDATA[subscribe]]></EventKey>
////</xml>';
//            $postXml = '<xml>
//<ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
//<FromUserName><![CDATA[o_fypwHt4F0uJu-i8lheviEJ0AzE]]></FromUserName>
//<CreateTime>123456789</CreateTime>
//<MsgType><![CDATA[text]]></MsgType>
// <Content><![CDATA[bd:tongfuture:3586088]]></Content>
//</xml>';
//            $postXml = '<xml>
//<ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
//<FromUserName><![CDATA[o_fypwHt4F0uJu-i8lheviEJ0AzE]]></FromUserName>
//<CreateTime>123456789</CreateTime>
//<MsgType><![CDATA[event]]></MsgType>
//<Event><![CDATA[subscribe]]></Event>
//</xml>';
//            $postXml = '<xml><ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
//<FromUserName><![CDATA[o_fypwHt4F0uJu-i8lheviEJ0AzE]]></FromUserName>
//<CreateTime>123456789</CreateTime>
//<MsgType><![CDATA[event]]></MsgType>
//<Event><![CDATA[subscribe]]></Event>
//<EventKey><![CDATA[qrscene_123123]]></EventKey>
//<Ticket><![CDATA[TICKET]]></Ticket>
//</xml>';
//            $postXml = '<xml>
//<ToUserName><![CDATA[o_fypwBB8feyyft4ronigFQG6WgI]]></ToUserName>
//<FromUserName><![CDATA[o_fypwHt4F0uJu-i8lheviEJ0AzE]]></FromUserName>
//<CreateTime>123456789</CreateTime>
//<MsgType><![CDATA[event]]></MsgType>
//<Event><![CDATA[SCAN]]></Event>
//<EventKey><![CDATA[15]]></EventKey>
//<Ticket><![CDATA[gQFJ8DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3ZEdGNoT1BrQ0M1eGFkODhpeGM1AAIEuSskWAMEAAAAAA==]]></Ticket>
//</xml>';

            if ( !empty( $postXml ) ) {
                $postObj = simplexml_load_string( $postXml , 'SimpleXMLElement' , LIBXML_NOCDATA );
                $MsgType = trim( $postObj->MsgType );
                $fromUsername = $postObj->FromUserName;
                $this->logResult($postXml);
                //消息类型
                switch ( $MsgType ) {
                    //接收普通消息
                    //https://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
                    case "text":
                        $keyword = trim( $postObj->Content );
                        //关键字自动回复
                        $resultStr = $this->receiveText( $postObj , $db , $keyword );
                        break;
                    case "image":
                        $resultStr = $this->receiveImage( $postObj );
                        break;
                    case "location":
                        $resultStr = $this->receiveLocation( $postObj );
                        break;
                    case "voice":
                        $resultStr = $this->receiveVoice( $postObj );
                        break;
                    case "video":
                        $resultStr = $this->receiveVideo( $postObj );
                        break;
                    case "link":
                        $resultStr = $this->receiveLink( $postObj );
                        break;

                    //接收事件推送
                    //https://mp.weixin.qq.com/wiki/7/9f89d962eba4c5924ed95b513ba69d9b.html
                    case "event":
                        $resultStr = $this->receiveEvent( $postObj , $db );
                        break;
                    default:
                        $resultStr = "未知的消息类型: " . $MsgType;
                        break;
                }

                $msg = $this->updateUserInfo( $db , $fromUsername );
                $this->insert_message( $db , $postObj , $msg );
                echo $resultStr;
            } else {
                echo "";
                exit;
            }
        }


        //接收文本消息
        private function receiveText( $object , $db , $keyword )
        {
            $fromUsername = $object->FromUserName;

            //功能变量
            $wxch_msg = $db->getAll( "SELECT * FROM  `wxch_msg`" );
            foreach ( $wxch_msg as $k => $v ) {
                $commands[$k] = $v;
            }
            foreach ( $commands as $kk => $vv ) {
                $temp_msg = explode( " " , $vv['command'] );
                if ( in_array( $keyword , $temp_msg ) ) {
                    $keyword = $vv['function'];
                }
            }

            switch ( $keyword ) {
                case 'bd':
                case 'news':
                case 'best':
                case 'hot':
                case 'jfcx':
                case 'ddlb':
                case 'ddcx':
                case 'dzp':
                case 'zjd':
                case 'mima':
                case 'help':
                    $resultStr = $this->receiveClick( $object , $db , $keyword );
                    break;
                default:
                    $arr_items = $this->getKeywordsReply( $db , $keyword , $fromUsername );
                    //搜索推荐
                    //            $sousuotuijian = $db->getRow( "SELECT `cfg_value` FROM  `wxch_cfg` WHERE `cfg_name` = 'plustj'" );//true
                    //            if ( !$sousuotuijian ) return;

                    //两种回复
                    if ( is_array( $arr_items ) ) {
                        $resultStr = $this->transmitNews( $object , $arr_items );
                    } else {
                        //增加积分
                        $resultStr = $this->transmitText( $object , $arr_items );
                    }
                    break;
            }

            return $resultStr;
        }


        //接收事件，关注等
        private function receiveEvent( $object , $db )
        {
            $event = $object->Event;//事件类型
            $resultStr = '';
            switch ( $event ) {
                //subscribe(订阅)、unsubscribe(取消订阅)
                case "subscribe":
                    $resultStr = $this->subscribeHandle( $object , $db );//关注后回复内容
                    break;
                case "unsubscribe":
                    $this->unsubscribe( $object , $db );//关注后回复内容
                    break;
                case "CLICK":
                    $keyword = $object->EventKey;//键值
                    $resultStr = $this->receiveClick( $object , $db , $keyword );    //点击事件
                    break;
                case "SCAN":
                    $resultStr = $this->receiveScan( $object , $db );
                    break;
                case "VIEW":
                    $resultStr = $this->receiveView( $object , $db );
                    break;
                default:
                    $resultStr = "receive a new event: " . $object->Event;
                    break;

            }

            return $resultStr;
        }

        //接收图片
        private function receiveImage( $object )
        {
            $contentStr = "你发送的是图片，地址为：" . $object->PicUrl;
            $resultStr = $this->transmitText( $object , $contentStr );

            return $resultStr;
        }


        //接收语音
        private function receiveVoice( $object )
        {
            $contentStr = "你发送的是语音，媒体ID为：" . $object->MediaId;
            $resultStr = $this->transmitText( $object , $contentStr );

            //wx_message 表记录
            return $resultStr;
        }

        //接收视频
        private function receiveVideo( $object )
        {
            $contentStr = "你发送的是视频，媒体ID为：" . $object->MediaId;
            $resultStr = $this->transmitText( $object , $contentStr );

            return $resultStr;
        }

        //位置消息
        private function receiveLocation( $object )
        {
            $contentStr = "你发送的是位置，纬度为：" . $object->Location_X . "；经度为：" . $object->Location_Y . "；缩放级别为：" . $object->Scale . "；位置为：" . $object->Label;
            $resultStr = $this->transmitText( $object , $contentStr );

            return $resultStr;
        }

        //链接消息
        private function receiveLink( $object )
        {
            $contentStr = "你发送的是链接，标题为：" . $object->Title . "；内容为：" . $object->Description . "；链接地址为：" . $object->Url;
            $resultStr = $this->transmitText( $object , $contentStr );

            return $resultStr;
        }

        private function subscribeHandle( $object , $db )
        {
            $scene_id = $object->EventKey;//实践KEY值,是一个32位无符号整数，即创建二维码时的二维码scene_id

            $fromUsername = $object->FromUserName;

            $arr_items = $this->autoRegister( $db , $fromUsername );

            $Ticket = $object->Ticket;
            if ( !empty( $Ticket ) ) { //扫推荐码的用户，注册到数据库
                //推荐人。通过分享扫码scan获得人数统计
                $db->query( "UPDATE `wxch_qr` SET `subscribe`=`subscribe` + 1 WHERE `scene_id`= '$scene_id';" );
                $db->query( "UPDATE `wxch_user` SET `affiliate`='$scene_id' WHERE `wxid`= '$fromUsername';" );
                //ecs_users 更新上级id号
                //推荐人id
                $ecs_user = $db->prefix . 'users';
                $db->query( "UPDATE `$ecs_user` SET `parent_id`='$scene_id' WHERE `wxch_bd`= 'ok' AND `wxid`= '$fromUsername';" );
                $arr_items = '推荐扫码成功!';
            }
            //两种回复
            if ( is_array( $arr_items ) ) {
                $resContent = $this->transmitNews( $object , $arr_items );
            } else {
                $resContent = $this->transmitText( $object , $arr_items );
                $this->insert_message( $db , $object , $arr_items );
            }

            return $resContent;
        }

        //扫描带参数二维码事件
        //1. 用户未关注时，进行关注后的事件推送
        //2. 用户已关注时的事件推送
        //这里为第二种情况
        private function receiveScan( $object , $db )
        {

            $scene_id = $object->EventKey;//实践KEY值,是一个32位无符号整数，即创建二维码时的二维码scene_id
            $fromUsername = $object->FromUserName;
            //扫推荐码的用户，注册到数据库
            $arr_items = $this->autoRegister( $db , $fromUsername );
            $Ticket = $object->Ticket;
            if ( !empty( $Ticket ) ) {
                //推荐人。通过分享扫码scan获得人数统计
                $db->query( "UPDATE `wxch_qr` SET `scan`=`scan` + 1 WHERE `scene_id`= '$scene_id';" );
                $db->query( "UPDATE `wxch_user` SET `affiliate`='$scene_id' WHERE `wxid`= '$fromUsername';" );
                //ecs_users 更新上级id号
                //推荐人id
                $ecs_user = $db->prefix . 'users';
                $db->query( "UPDATE `$ecs_user` SET `parent_id`='$scene_id' WHERE `wxch_bd`= 'ok' AND `wxid`= '$fromUsername';" );
                $arr_items = '推荐扫码成功!';
            }
            //两种回复
            if ( is_array( $arr_items ) ) {
                $resContent = $this->transmitNews( $object , $arr_items );
            } else {
                $resContent = $this->transmitText( $object , $arr_items );
                $this->insert_message( $db , $object , $arr_items );
            }

            return $resContent;
        }

        private function unsubscribe( $object , $db )
        {
            $fromUsername = $object->FromUserName;
            $db->query( "UPDATE  `wxch_user` SET  `subscribe` =  '0' WHERE  `wxid` = '$fromUsername';" );
        }


        private function bdHandle( $db , $fromUsername , $keyword )
        {

            $keywords = trim( $keyword );//转成小写的
            //web
            //strpos 大小写敏感  stripos大小写不敏感    两个函数都是返回str2 在str1 第一次出现的位置
            if ( stripos( $keywords , ':' ) === false ) {     //使用绝对等于
                //不包含
                $resultContent = "格式如下(注意冒号为英文字符):\r\n" . "bd:用户名:密码";

            } else {

                $array = explode( ':' , $keywords );
                if ( count( $array ) == 3 ) {
                    $prefix = strtolower( $array[0] );
                    $input_user_name = trim( $array[1] );
                    $input_password = trim( $array[2] );

                    $setp = $db->getOne( "SELECT `setp` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
                    //快速绑定会员帐号，享受我们提供给你更全面的服务
                    $bd_lang = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'bd'" );

                    $cxbd = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'cxbd'" );
                    $ecs_users = $db->prefix . 'users';
                    $bd = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'bd'" );

                    switch ( $prefix ) {
                        case 'bd':
                            if ( $bd == 'web' ) {//页面来绑定
                                $bd_url = '<a href="' . BASE_URI . 'mobile/user_wxch.php?wxid=' . $fromUsername . '">点击绑定会员</a>';
                                $resultContent = $bd_url . "\r\n" . $bd_lang;
                            }
                            if ( $bd == 'step' ) {//关键词回复模式
                                if ( !empty( $input_user_name ) ) {
                                    $wx_bd = $db->getOne( "SELECT `wxch_bd` FROM `$ecs_users` WHERE `user_name` = '$input_user_name'" );
                                    if ( $wx_bd != 'ok' ) {
                                        $user =& init_users();
                                        $verifyLogin = $user->check_user( $input_user_name , $input_password );
                                        if ( $verifyLogin ) {
                                            $db->query( "UPDATE `wxch_user` SET `setp`=`3` WHERE `wxid`= '$fromUsername';" );
                                            $db->query( "UPDATE `$ecs_users` SET `wxid`=`$fromUsername`,`wx_bd`=`ok` WHERE `user_name`= '$input_user_name';" );
                                            $resultContent = "已经绑定到'$input_user_name'成功!";
                                        } else {
                                            $resultContent = '您输入的密码不正确，请重新输入';
                                        }
                                    } else {
                                        $resultContent = '已经绑定过了，输入jcbd,之后重新绑定即可';
                                    }
                                }
                            }
                            break;
                        case 'jcbd':
                            if ( $cxbd ) {
                                $db->query( "UPDATE `wxch_user` SET `setp`= 3 WHERE `wxid`= '$fromUsername';" );
                                $db->query( "UPDATE `$ecs_users` SET `wxid`=``,`wx_bd`=`no` WHERE `wxid`= '$fromUsername';" );
                                $resultContent = "恭喜你,解除绑定成功!你可以重新绑定";
                            }
                            break;
                        default:
                            $resultContent = "格式如下(注意冒号为英文字符):\r\n" . "bd:用户名:密码";
                            break;
                    }
                } else {
                    $resultContent = "格式如下(注意冒号为英文字符):\r\n" . "bd:用户名:密码";
                }

            }

            return $resultContent;

        }

        //点击菜单消息
        private function receiveClick( $object , $db , $keyword )
        {
            $fromUsername = $object->FromUserName;
            //显示下架商品 good
//  $murl = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'murl'" );
//            $base_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'baseurl'" );
//            $m_url = $base_url . $murl;

            $setp = $db->getOne( "SELECT `setp` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
            $ecs_users = $db->prefix . 'users';
            //快速绑定会员帐号，享受我们提供给你更全面的服务
            $bd_lang = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'bd'" );
            $cxbd = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'cxbd'" );
            $bd = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'bd'" );

            switch ( $keyword ) {//事件KEY值，与自定义菜单接口中KEY值对应
                case 'bd':
                    if ( $bd == 'web' ) {//页面来绑定
                        $bd_url = '<a href="' . BASE_URI . 'mobile/user_wxch.php?wxid=' . $fromUsername . '">点击绑定会员</a>';
                        $arr_items = $bd_url . "\r\n" . $bd_lang;
                    }
                    break;
                case 'mima':
                    $ecs_user_name = $db->getOne( "SELECT `user_name` FROM `$ecs_users` WHERE `wxid` = '$fromUsername' AND `wxch_bd` = 'ok'" );
                    $password_tianxin = $db->getOne( "SELECT `password_tianxin` FROM `$ecs_users` WHERE `wxid` = '$fromUsername' AND `wxch_bd` = 'ok'" );
                    $arr_items = "您的账号：" . $ecs_user_name . "" . "密码：" . $password_tianxin;
                    break;
                case 'jcbd':
                    if ( $cxbd ) {
                        $db->query( "UPDATE `wxch_user` SET `setp`= 3 WHERE `wxid`= '$fromUsername';" );
                        $db->query( "UPDATE `$ecs_users` SET `wxid`='',`wx_bd`=`no` WHERE `wxid`= '$fromUsername';" );
                        $arr_items = "恭喜你,解除绑定成功!你可以重新绑定";
                    }
                    break;
                case 'jfcx'://积分查询
                    //余额查询
                    $arr_items = $this->jfcx( $db , $fromUsername );
                    break;
                case 'ddlb'://我的订单
                    $arr_items = $this->getOrder( $db , $fromUsername , $setp );
                    break;
                case 'ddcx'://订单查询
                    $arr_items = $this->ddcx( $db , $fromUsername , $setp );
                    $this->plusPoint( $db , $fromUsername , $keyword );

                    break;
                case 'kdcx'://快递单号查询
                    $arr_items = $this->kdcx( $db , $fromUsername , $setp );
                    $this->plusPoint( $db , $fromUsername , $keyword );

                    break;
                case "dzp"://大转盘
                    $arr_items = $this->dzp( $db , $fromUsername );
                    $this->plusPoint( $db , $fromUsername , $keyword );
                    break;
                case "zjd":
                    $arr_items = $this->egg( $db , $fromUsername );
                    $this->plusPoint( $db , $fromUsername , $keyword );
                    break;
                case "qiandao":
                    //增加积分
                    $arr_items = $this->plusPoint( $db , $fromUsername , $keyword );
                    break;
                case "news"://新品上架
                case "best"://精品展示
                case "hot"://热销产品
                    $arr_items = $this->getGoods( $db , $fromUsername , $keyword );
                    $this->plusPoint( $db , $fromUsername , $keyword );

                    break;
                case "qrcode":
                    $arr_items = $this->getQrcode( $db , $fromUsername , $keyword );
                    break;
                case "help":
                    $arr_items = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'help'" );
                    break;
                default:
                    $arr_items = "你点击了菜单: " . $keyword;
                    break;
            }

            //两种回复
            if ( is_array( $arr_items ) ) {
                $resultStr = $this->transmitNews( $object , $arr_items );
            } else {
                //增加积分
                $resultStr = $this->transmitText( $object , $arr_items );
                $this->insert_message( $db , $object , $arr_items );

            }

            return $resultStr;
        }

        //微信自动注册模块
        // 商创微信通-》“自动注册设置”
        private function autoRegister( $db , $fromUsername )
        {
            $msgContent = '';
            //默认自动注册
            $state = $db->getOne( "SELECT `state` FROM `wxch_autoreg` WHERE `autoreg_id` = 1" );

            //更新2个表
            $ecs_users = $db->prefix . 'users';

            //用户名前缀:wx_+user_id 生成：wx_113
            $userPrefix = $db->getOne( "SELECT `autoreg_name` FROM `wxch_autoreg` WHERE `autoreg_id` = 1" );
            //随机密码位数
            $passwordNum = $db->getOne( "SELECT `autoreg_rand` FROM `wxch_autoreg` WHERE `autoreg_id` = 1" );
            //密码前缀:
            $passwordPrefix = $this->randomkeys( $passwordNum );
            //明码
            $ec_password = $userPrefix . $passwordPrefix;
            //md5加密安全密码
            $ec_md5_password = md5( $ec_password );

            $time = time();

            //ecs_users
            $row = $db->getRow( "SELECT * FROM `$ecs_users` WHERE `wxid` = '$fromUsername';" );

            //wxch_user表
            $wxrow = $db->getRow( "SELECT * FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
            if ( !$wxrow ) {
                //数据为空，创建
                $wxch_user_insert = "INSERT INTO `wxch_user` ( `subscribe`,`wxid`,`setp`) VALUES ('1','$fromUsername','3')";
                $db->query( $wxch_user_insert );

                if ( $state == 1 ) {
                    if ( !$row ) {
                        //创建ecs_users记录
                        $ecs_users_insert = "INSERT INTO `$ecs_users` ( `password`,`wxid`,`user_rank`,`wxch_bd`,`is_validated`,`password_tianxin`,`reg_time`) VALUES ('$ec_md5_password','$fromUsername','99','no','1','$ec_password','$time')";
                        $db->query( $ecs_users_insert );
                        $ecs_user_id = $db->insert_id();

                        $ecs_user_name = $userPrefix . $ecs_user_id;
                        $db->query( " UPDATE `$ecs_users` SET `user_name` = '$ecs_user_name',`wxch_bd`='ok',`wxid`='$fromUsername',`user_name`='$ecs_user_name' WHERE `user_id` = '$ecs_user_id';" );
                        $msgContent = "您的账号：" . $ecs_user_name . "密码：" . $ec_password;
                        //增加关注送积分
                        $this->plusPoint( $db , $fromUsername , "g_point" );
                    } else {
                        $db->query( " UPDATE `$ecs_users` SET `user_rank` = '99',`wxch_bd`='ok',`is_validated`='1' WHERE `wxid` ='$fromUsername';" );
                    }
                } else {
                    $msgContent = "自动注册功能未开启！";
                }
            } else {
                $this->updateUserInfo( $db , $fromUsername );
            }

            return $msgContent;
        }

        private function getUserName( $db , $fromUsername )
        {

            $userName = $db->getOne( "SELECT `uname` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );

            return $userName;
        }

        private function getOpenId( $db , $fromUsername )
        {

            $openId = $db->getOne( "SELECT `wxid` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
            if ( !empty( $openId ) ) {
                return $openId;
            }

            return $fromUsername;
        }

        protected function insert_message( $db , $postObj , $msg )
        {
            $fromUsername = $postObj->FromUserName;
            $MsgType = trim( $postObj->MsgType );
            $content = trim( $postObj->Content );
            $message = $MsgType . $content;
            $time = time();
            $db->query( "INSERT INTO `wxch_message` (`wxid`) VALUES ( '$fromUsername');" );
            $belong = $db->insert_id();
            $db->query( " UPDATE `wxch_message` SET `w_message` = '$msg',`belong`='$belong',`dateline`='$time',`message`='$message' WHERE `wxid` ='$fromUsername';" );
        }


        /**
         * 活动赠送积分情况
         * 增加积分
         *
         * @param $db
         * @param $fromUsername //送积分的用户
         * @param $point_name   //送积分活动名称
         *
         * @return string 返回提示信息
         */
        protected function plusPoint( $db , $fromUsername , $point_name )
        {
            $msgContent = '';


            $sql = "SELECT * FROM `wxch_point_record` WHERE `point_name` = '$point_name' AND `wxid` = '$fromUsername'";
            $record = $db->getRow( $sql );


            $time = time();
            if ( empty( $record ) ) {//首次参加，数据库没记录，创建记录
                $insert_sql = "INSERT INTO `wxch_point_record` (`wxid`, `point_name`, `num`, `lasttime`, `datelinie`) VALUES ('$fromUsername', '$point_name' , 0, '$time', '$time');";
                //送积分活动名称,签到,dzp.zjd....
                $point_name = $db->getOne( "SELECT `point_name` FROM `wxch_point` WHERE `point_name` = '$point_name'" );
                if ( !empty( $point_name ) ) {
                    //存在这种活动才插入数据表wxch_point_record
                    $db->query( $insert_sql );
                }
            } else {
                //之前参加过，数据库有记录
                $sql = "SELECT `lasttime` FROM `wxch_point_record` WHERE `point_name` = '$point_name' AND `wxid` = '$fromUsername'";
                $lasttime = $db->getOne( $sql );//上次参加时间

                //如果超过一天时间，当天参加活动的次数重置
                $timezone = $time - $lasttime;
                if ( $timezone > ( 60 * 60 * 24 ) ) {
                    $update_sql = "UPDATE `wxch_point_record` SET `num` = 0,`lasttime` = '$time' WHERE `wxid` ='$fromUsername' AND `point_name` = '$point_name';";
                    $db->query( $update_sql );
                }

                //修复积分赠送次数限制
                //参加次数
                $num = $db->getOne( "SELECT `num` FROM `wxch_point_record` WHERE `point_name` = '$point_name' AND `wxid` = '$fromUsername'" );
                //有效次数
                $point_num = $db->getOne( "SELECT `point_num` FROM `wxch_point` WHERE `point_name` = '$point_name'" );
                $point_title = $db->getOne( "SELECT `point_title` FROM `wxch_point` WHERE `point_name` = '$point_name'" );

                if ( $num < $point_num ) {
                    $update_sql = "UPDATE `wxch_point_record` SET `num` = `num`+1,`lasttime` = '$time' WHERE `point_name` = '$point_name' AND `wxid` ='$fromUsername';";
                    $db->query( $update_sql );
                    //系统设置-》积分增加
                    //给用户加积分
                    $wxch_points = $db->getAll( "SELECT * FROM  `wxch_point`" );
                    foreach ( $wxch_points as $k => $v ) {
                        if ( $v['point_name'] == $point_name ) {//news,best,dzp,zjd.....
                            if ( $v['autoload'] == 'yes' ) {//是否开启
                                $points = $v['point_value'];//活动增加积分值
                                $users = $db->prefix . 'users';

                                $user_id = $db->getOne( "SELECT `user_id` FROM `$users` WHERE `wxid` ='$fromUsername'" );

                                $user_money = 0;
                                $frozen_money = 0;//冻结资金
                                $rank_points = $points;//等级积分
                                $pay_points = 0;//消费积分
                                $change_desc = $point_title . "送积分";

                                log_account_change( $user_id , $user_money , $frozen_money , $rank_points , $pay_points , $change_desc );
                                $msgContent = $point_title . '送了您' . $points . '积分';
                            } else {
                                $msgContent = $point_title . '积分增加未开启';
                            }
                        }
                    }
                } else {
                    $msgContent = "今日" . $point_title . "次数已经用完，请明天再来！";
                }
            }


            return $msgContent;
        }

        //回复文本消息
        private function transmitText( $object , $content )
        {
            $textTpl = "<xml>
                         <ToUserName><![CDATA[%s]]></ToUserName>
                         <FromUserName><![CDATA[%s]]></FromUserName>
                         <CreateTime>%s</CreateTime>
                         <MsgType><![CDATA[text]]></MsgType>
                         <Content><![CDATA[%s]]></Content>
                        </xml>";
            $resultStr = sprintf(
                $textTpl ,
                $object->FromUserName ,
                $object->ToUserName ,
                time() ,
                $content
            );

            return $resultStr;
        }


        //回复图文
        private function transmitNews( $object , $arr_item )
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
                $object->FromUserName ,
                $object->ToUserName ,
                time() ,
                count( $arr_item )
            );

            return $resultStr;
        }


        //音乐消息
        private function transmitMusic( $object , $musicArray , $flag = 0 )
        {
            $itemTpl = "<Music>
        <Title><![CDATA[%s]]></Title>
        <Description><![CDATA[%s]]></Description>
        <MusicUrl><![CDATA[%s]]></MusicUrl>
        <HQMusicUrl><![CDATA[%s]]></HQMusicUrl>
        </Music>";
            $item_str = sprintf( $itemTpl , $musicArray['Title'] , $musicArray['Description'] , $musicArray['MusicUrl'] , $musicArray['HQMusicUrl'] );
            $textTpl = "<xml>
        <ToUserName><![CDATA[%s]]></ToUserName>
        <FromUserName><![CDATA[%s]]></FromUserName>
        <CreateTime>%s</CreateTime>
        <MsgType><![CDATA[music]]></MsgType>
        $item_str
        <FuncFlag>%d</FuncFlag>
        </xml>";
            $resultStr = sprintf( $textTpl , $object->FromUserName , $object->ToUserName , time() , $flag );

            return $resultStr;
        }

        //获取所有文章
        private function get_keywords_articles( $kws_id , $db )
        {
            $ecs_article = $db->prefix . 'article';

            $ret = $db->getAll( "SELECT `article_id` FROM `wxch_keywords_article` WHERE `kws_id` = '$kws_id';" );
            $articles = '';
            foreach ( $ret as $v ) {
                $articles .= $v['article_id'] . ',';
            }
            $length = strlen( $articles ) - 1;
            $articles = substr( $articles , 0 , $length );
            if ( !empty( $articles ) ) {
                $res = $db->getAll( "SELECT * FROM " . $ecs_article . " WHERE `article_id` IN ($articles) ORDER BY `add_time` DESC " );
            }

            return $res;
        }

        protected function coupon( $db , $fromUsername )
        {
            $retc = $db->getRow( "SELECT `coupon` FROM `wxch_user` WHERE `wxid` ='$fromUsername'" );
            $lang = $db->getAll( "SELECT * FROM `wxch_lang` WHERE `lang_name` LIKE '%coupon%'" );
            if ( !empty( $retc['coupon'] ) ) {
                $contentStr = $lang[0]['lang_value'] . $retc['coupon'] . $lang[3]['lang_value'];

                return $contentStr;
            } else {
                $ret = $db->getRow( "SELECT * FROM `wxch_coupon` WHERE `id` = 1" );
                $type_id = $ret['type_id'];
                $thistable = $db->prefix . 'bonus_type';
                $ret = $db->getRow( "SELECT * FROM `$thistable` WHERE `type_id` =$type_id " );
                $type_money = $ret['type_money'];
                $use_end_date = date( "Y年-m月-d日" , $ret['use_end_date'] );
                $time = time();
                if ( ( $time >= $ret['send_start_date'] ) or ( $time <= $ret['send_end_date'] ) ) {
                    $thistable = $db->prefix . 'user_bonus';
                    $ret = $db->getRow( "SELECT `bonus_sn` FROM `$thistable` WHERE `bonus_type_id` = $type_id AND `used_time` = 0 " );
                    if ( !empty( $ret['bonus_sn'] ) ) {
                        $user_bonus = $db->getAll( "SELECT `bonus_sn` FROM  `$thistable` WHERE `bonus_type_id` = $type_id" );
                        $wx_bonus = $db->getAll( "SELECT `coupon` FROM  `wxch_user` " );
                        foreach ( $wx_bonus as $k => $v ) {
                            foreach ( $user_bonus as $kk => $vv ) {
                                if ( $v['coupon'] == $vv['bonus_sn'] ) {
                                    unset( $user_bonus[$kk] );
                                }
                            }
                        }
                        $bonus_rand = array_rand( $user_bonus );
                        $coupon = $user_bonus[$bonus_rand]['bonus_sn'];
                        if ( !empty( $user_bonus[$bonus_rand]['bonus_sn'] ) ) {
                            $contentStr = $lang[1]['lang_value'] . $type_money . "元,优惠券：" . $coupon . "\r\n使用结束日期：$use_end_date" . $lang[3]['lang_value'];
                            $db->query( "UPDATE `wxch_user` SET `coupon` = '$coupon' WHERE `wxid` ='$fromUsername';" );
                        } else {
                            $contentStr = $lang[2]['lang_value'] . $lang[3]['lang_value'];
                        }
                    } else {
                        $contentStr = $lang[2]['lang_value'] . $lang[3]['lang_value'];
                    }
                }
            }

            return $contentStr;
        }

        protected function dzp( $db , $fromUsername )
        {
            $ret = $db->getAll( "SELECT * FROM `wxch_prize` WHERE `fun` = 'dzp' AND `status` = 1 ORDER BY `dateline` DESC " );
            $temp_count = count( $ret );
            $time = time();
            if ( $temp_count > 1 ) {
                foreach ( $ret as $k => $v ) {
                    if ( $time <= $v['starttime'] ) {
                        unset( $ret[$k] );
                    } elseif ( $time >= $v['endtime'] ) {
                        unset( $ret[$k] );
                    }
                }
            }
            $prize_count = count( $ret );
            $prize = $ret[array_rand( $ret )];
            $wxch_lang = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'prize_dzp'" );
            if ( $prize_count <= 0 ) {
                $arr_item = '大转盘暂时未开放';
            } else {
                $Url = BASE_URI . 'wechat/dzp/index.php?pid=' . $prize['pid'] . '&wxid=' . $fromUsername;
                $PicUrl = BASE_URI . 'wechat/dzp/images/wx_bd.png';
                $arr_item['Title'] = '大转盘';//图文消息标题
                $arr_item['Description'] = $wxch_lang;//图文消息描述
                $arr_item['PicUrl'] = $PicUrl;//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                $arr_item['Url'] = $Url;//点击图文消息跳转链接
                $arr_item = array( $arr_item );
            }

            return $arr_item;
        }

        protected function egg( $db , $fromUsername )
        {
            $ret = $db->getAll( "SELECT * FROM `wxch_prize` WHERE `fun` = 'egg' AND `status` = 1 ORDER BY `dateline` DESC " );
            $temp_count = count( $ret );
            $time = time();
            if ( $temp_count > 1 ) {
                foreach ( $ret as $k => $v ) {
                    if ( $time <= $v['starttime'] ) {
                        unset( $ret[$k] );
                    } elseif ( $time >= $v['endtime'] ) {
                        unset( $ret[$k] );
                    }
                }
            }
            $prize_count = count( $ret );
            $prize = $ret[array_rand( $ret )];
            $wxch_lang = $db->getOne( "SELECT `lang_value` FROM `wxch_lang` WHERE `lang_name` = 'prize_egg'" );
            if ( $prize_count <= 0 ) {
                $arr_item = '砸金蛋暂时未开放';
            } else {
                $Url = BASE_URI . 'wechat/egg/index.php?pid=' . $prize['pid'] . '&wxid=' . $fromUsername;
                $PicUrl = BASE_URI . 'wechat/egg/images/wx_bd.jpg';
                $arr_item['Title'] = '砸金蛋';//图文消息标题
                $arr_item['Description'] = $wxch_lang;//图文消息描述
                $arr_item['PicUrl'] = $PicUrl;//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                $arr_item['Url'] = $Url;//点击图文消息跳转链接
                $arr_item = array( $arr_item );
            }

            return $arr_item;
        }

        private function jfcx( $db , $fromUsername )
        {
            $ecs_users = $db->prefix . 'users';
            $pay_points = $db->getOne( "SELECT `pay_points` FROM `$ecs_users` WHERE `wxid` = '$fromUsername' AND `wxch_bd`='ok';" );
            $rank_points = $db->getOne( "SELECT `rank_points` FROM `$ecs_users` WHERE `wxid` = '$fromUsername' AND `wxch_bd`='ok';" );
            $user_money = $db->getOne( "SELECT `user_money` FROM `$ecs_users` WHERE `wxid` = '$fromUsername' AND `wxch_bd`='ok';" );

            $resultContent = "欢迎您的查询,查询结果如下：" . "\r\n余额：" . $user_money . "\r\n消费积分：" . $pay_points . "\r\n等级积分：" . $rank_points;

            return $resultContent;
        }

        private function kdcx( $db , $fromUsername , $setp )
        {
            $ecs_users = $db->prefix . 'users';
            $ecs_order_info = $db->prefix . 'order_info';
            $contentStr = '';
            if ( $setp == 3 ) {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd`='ok' AND `wxid` ='$fromUsername'" );
            } else {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd`='no' AND `wxid` ='$fromUsername'" );
            }
            $orders = $db->getRow( "SELECT * FROM `$ecs_order_info` WHERE `user_id` = '$user_id' ORDER BY `order_id` DESC" );

            if ( empty( $orders ) ) {
                $contentStr = '您还没有订单，无法查询快递';
            } else {
                if ( empty( $orders['invoice_no'] ) ) {
                    $contentStr = '订单号：' . $orders['order_sn'] . '还没有快递单号，不能查询';
                } else {
                    $k_arr = $this->kuaidi( $orders['invoice_no'] , $orders['shipping_name'] );
                    $contents = '';
                    if ( $k_arr['message'] == 'ok' ) {
                        $count = count( $k_arr['data'] ) - 1;
                        for ( $i = $count ; $i >= 0 ; $i-- ) {
                            $contents .= "\r\n" . $k_arr['data'][$i]['time'] . "\r\n" . $k_arr['data'][$i]['context'];
                        }
                        $contentStr = "订单号：$orders[invoice_no]\r\n" . "快递信息" . $contents;
                    } else {
                        $contentStr = "没有查到订单号：$orders[invoice_no] 的" . "快递信息";
                    }
                }

            }

            return $contentStr;
        }


        private function ddcx( $db , $fromUsername , $setp )
        {
            $ecs_users = $db->prefix . 'users';
            $ecs_order_info = $db->prefix . 'order_info';
            $ecs_ordr_goods = $db->prefix . 'order_goods';
            $postfix = '&wxid=' . $this->getOpenId( $db , $fromUsername );

            $oauth = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'oauth'" );
            $murl = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'murl'" );
            $base_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'baseurl'" );
            $m_url = $base_url . $murl;
            $oauth_location = BASE_URI . 'wechat/oauth/wxch_oauths.php?uri=';

            if ( $setp == 3 ) {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd`='ok' AND `wxid` ='$fromUsername'" );
            } else {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd`='no' AND `wxid` ='$fromUsername'" );
            }
            $order_id = $db->getOne( "SELECT `order_id` FROM `$ecs_order_info` WHERE `user_id` = '$user_id' ORDER BY `order_id` DESC" );
            $orders = $db->getRow( "SELECT * FROM `$ecs_order_info` WHERE `user_id` = '$user_id' ORDER BY `order_id` DESC" );
            $order_goods = $db->getAll( "SELECT * FROM `$ecs_ordr_goods`  WHERE `order_id` = '$order_id'" );

            $shopinfo = '';
            foreach ( $order_goods as $v ) {
                if ( empty( $v['goods_attr'] ) ) {
                    $shopinfo .= $v['goods_name'] . '(' . $v['goods_number'] . '),';
                } else {
                    $v['goods_attr'] = $this->filter( $v['goods_attr'] );
                    $shopinfo .= $v['goods_name'] . '（' . $v['goods_attr'] . '）' . '(' . $v['goods_number'] . '),';
                }
            }


            $shopinfo = substr( $shopinfo , 0 , strlen( $shopinfo ) - 1 );
            $title = '订单号：' . $orders['order_sn'];
            if ( $orders['pay_status'] == 0 ) {
                $pay_status = '支付状态：未付款';
            } elseif ( $orders['pay_status'] == 1 ) {
                $pay_status = '支付状态：付款中';
            } elseif ( $orders['pay_status'] == 2 ) {
                $pay_status = '支付状态：已付款';
            }
            if ( $oauth == 'true' ) {

                $url = $oauth_location . $m_url . 'user.php?act=order_detail&order_id=' . $orders['order_id'];
                $items_order_list = '<a href="' . $url . '">"详细信息"</a>';

            } elseif ( $oauth == 'false' ) {
                $url = $m_url . 'user.php?act=order_detail&order_id=' . $orders['order_id'] . $postfix;
                $items_order_list = '<a href="' . $url . '">"详细信息"</a>';
            }
            if ( $orders['order_amount'] == 0.00 ) {
                if ( $orders['money_paid'] > 0 ) {
                    $orders['order_amount'] = $orders['money_paid'];
                }
            }
            $items_more = '更多详细信息请点击' . $items_order_list . '';
            $items = $title . "\r\n商品信息:" . $shopinfo . "\r\n总金额:" . $orders['order_amount'] . "\r\n" . $pay_status . "\r\n物流类型:" . $orders['shipping_name'] . "\r\n物流单号:" . $orders['invoice_no'] . "\r\n--------------------\r\n";

            if ( count( $orders ) > 1 ) {
                $resultContent = $items . $items_more;
            } else {
                $tips = "你还没有订单\r\n";
                $resultContent = $tips . $items_more;
            }

            return $resultContent;

        }

        private function getOrder( $db , $fromUsername , $step )
        {
            $ecs_users = $db->prefix . 'users';
            $ecs_order_info = $db->prefix . 'order_info';
            $ecs_ordr_goods = $db->prefix . 'order_goods';

            $oauth = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'oauth'" );
            $murl = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'murl'" );
            $base_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'baseurl'" );
            $m_url = $base_url . $murl;
            $oauth_location = BASE_URI . 'wechat/oauth/wxch_oauths.php?uri=';

            if ( $step == 3 ) {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd` = 'ok' AND `wxid` ='$fromUsername'" );
            } else {
                $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd` = 'no' AND `wxid` ='$fromUsername'" );
            }
            $orders = $db->getAll( "SELECT * FROM `$ecs_order_info` WHERE `user_id` = '$user_id' ORDER BY `order_id` DESC LIMIT 0,5" );

            $items = '';
            foreach ( $orders as $k => $v ) {
                $order_id = $v['order_id'];
                $order_goods = $db->getAll( "SELECT * FROM `$ecs_ordr_goods`  WHERE `order_id` = '$order_id'" );
                $shopinfo = '';
                foreach ( $order_goods as $vv ) {
                    if ( empty( $v['goods_attr'] ) ) {
                        $shopinfo .= $vv['goods_name'] . '(' . $vv['goods_number'] . '),';
                    } else {
                        $shopinfo .= $vv['goods_name'] . '（' . $vv['goods_attr'] . '）' . '(' . $vv['goods_number'] . '),';
                    }
                }
                $shopinfo = substr( $shopinfo , 0 , strlen( $shopinfo ) - 1 );
                if ( $oauth == 'true' ) {
                    if ( $oauth == 'true' ) {
                        $title = '订单号：<a href="' . $oauth_location . $m_url . 'user.php?act=order_detail&order_id=' . $v['order_id'] . '">' . $v['order_sn'] . "</a>\r\n";
                    } elseif ( $oauth == 'false' ) {
                        $title = '订单号：<a href="' . $m_url . 'user.php?act=order_detail&order_id=' . $v['order_id'] . '&wxid=' . $fromUsername . '">' . $v['order_sn'] . "</a>\r\n";
                    }
                }

                if ( $v['order_amount'] == 0.00 ) {
                    if ( $v['money_paid'] > 0 ) {
                        $v['order_amount'] = $v['money_paid'];
                    }
                }
                $description = '商品信息：' . $shopinfo . "\r\n总金额：" . $v['order_amount'] . "\r\n物流类型：" . $v['shipping_name'] . "\r\n物流单号：" . $v['invoice_no'] . "\r\n---------------------\r\n";
                $items .= $title . $description;
            }

            if ( $oauth == 'true' ) {
                $items_oder_list = '<a href="' . $oauth_location . $m_url . 'user.php?act=order_list">"我的订单"</a>';
            } elseif ( $oauth == 'false' ) {
                $items_oder_list = '<a href="' . $m_url . 'user.php?act=order_list&wxid=' . $fromUsername . '">"我的订单"</a>';
            }
            $items_more = '更多详细信息请点击' . $items_oder_list . '';
            $contentStr = $items . $items_more;

            return $contentStr;
        }


        protected function getGoods( $db , $fromUsername , $type )
        {
            $murl = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'murl'" );
            $base_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'baseurl'" );
            $img_path = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'imgpath'" );
            $m_url = $base_url . $murl;

            $postfix = '&wxid=' . $this->getOpenId( $db , $fromUsername );

            $ecs_goods = $db->prefix . 'goods';
            //显示下架产品
            $goods = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'goods'" );

            //微信OAuth
            $oauth = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'oauth'" );
            $oauth_location = $base_url . 'wechat/oauth/wxch_oauths.php?uri=';

            //推荐分成
            //推荐人id
            //如果存在推荐人附加到URL参数中
            $affiliate_id = $db->getOne( "SELECT `affiliate` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
            if ( $affiliate_id >= 1 ) {
                $affiliate = '&u=' . $affiliate_id;
            }
            $where = '';
            //%goods =="true" 显示下架产品
            //$goods == "false" 不显示显示下架产品
            if ( $goods == 'false' ) {
                $where = ' AND is_delete = 0 AND is_on_sale = 1';
            }
            $Description = '';
            switch ( $type ) {
                case 'news'://新品上架
                    $sql = "SELECT * FROM  `$ecs_goods` WHERE `is_new` = 1 $where ORDER BY sort_order, last_update DESC  LIMIT 0 , 6 ";
                    $Description = '新品上架';
                    break;
                case 'best'://精品推荐
                    $sql = "SELECT * FROM  `$ecs_goods` WHERE `is_best` = 1 $where ORDER BY sort_order, last_update DESC  LIMIT 0 , 6 ";
                    $Description = '精品推荐';
                    break;
                case 'hot'://热销产品
                    $sql = "SELECT * FROM  `$ecs_goods` WHERE `is_hot` = 1 $where ORDER BY sort_order, last_update DESC  LIMIT 0 , 6 ";
                    $Description = '热销产品';
                    break;
                default:
                    break;

            }
            $ret = $db->getAll( $sql );


            $arr_item = array();
            foreach ( $ret as $v ) {
                if ( $img_path == 'local' ) {
                    $v['thumbnail_pic'] = $base_url . $v['goods_img'];
                } elseif ( $img_path == 'server' ) {
                    $v['thumbnail_pic'] = $v['goods_img'];
                }

                //$oauth== "true" 打开授权url
                if ( $oauth == 'true' ) {
                    $goods_url = $oauth_location . $m_url . 'goods.php?id=' . $v['goods_id'] . $affiliate;
                } else {

                    $goods_url = $m_url . 'goods.php?id=' . $v['goods_id'] . $postfix . $affiliate;
                }
                $items['Title'] = $v['goods_name'];
//                $items['Description']=   $v['goods_name'];
                $items['Description'] = $Description;
                $items['PicUrl'] = $v['thumbnail_pic'];
                $items['Url'] = $goods_url;
                array_push( $arr_item , $items );
            }

            return $arr_item;
        }

        //推荐二维码
        //场景二维码
        //生成带参数二维码
//    用户扫描带场景值二维码时，可能推送以下两种事件：
//    如果用户还未关注公众号，则用户可以关注公众号，关注后微信会将带场景值关注事件推送给开发者。
//    如果用户已经关注公众号，在用户扫描后会自动进入会话，微信也会将带场景值扫描事件推送给开发者。
//    获取带参数的二维码的过程包括两步，首先创建二维码ticket，然后凭借ticket到指定URL换取二维码。
//    http://www.cnblogs.com/txw1958/p/weixin-qrcode-with-parameters.html
//    https://mp.weixin.qq.com/wiki/18/28fc21e7ed87bec960651f0ce873ef8a.html
        private function getQrcode( $db , $fromUsername , $function )
        {
            $ecs_users = $db->prefix . 'users';


            $affiliate = unserialize( $GLOBALS['_CFG']['affiliate'] );
            //成为分销商积分标准
            $level_register_up = (float) $affiliate['config']['level_register_up'];
            // 推荐设置开关
            $on = $affiliate['on'];
            //如果不是推荐关系会员，直接关注，默认上级为官方账号
            $parent_id = (float) $affiliate['config']['parent_id'];

            //等级积分
            $rank_points = $db->getOne( "SELECT `rank_points` FROM `$ecs_users` WHERE `wxid` = '$fromUsername'" );
            $user_id = $db->getOne( "SELECT `user_id` FROM `$ecs_users` WHERE `wxch_bd` = 'ok' AND `wxid` = '$fromUsername'" );
            //是否已经关注
            $subscribe = $db->getOne( "SELECT `subscribe` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );
            $user_name = $this->getUserName( $db , $fromUsername );
            $qr_path = $db->getOne( "SELECT `qr_path` FROM `wxch_qr` WHERE `scene_id`='$user_id'" );
            $Url = BASE_URI . 'wechat/qrcode/index.php?scene_id=' . $user_id;
            $type = 'tj';
            if ( $on == 1 ) {
                //成为分销商积分标准
                if ( $rank_points < $level_register_up ) {
                    $contentStr = "您还不是分销商，暂时不能获取推广二维码";

                    return $contentStr;
                }
            } else {
                $contentStr = "推荐设置未打开";

                return $contentStr;
            }

            if ( !empty( $qr_path ) ) {
                $PicUrl = $qr_path;
            } else {
                //推荐二维码为空
                //插入数据
                //1.创建二维码ticket
                $action_name = "QR_LIMIT_SCENE";//永久二维码请求 最多10万个 用户来源统计
//                $action_name = "QR_SCENE";//临时二维码请求 expire_seconds 最大不超过1800 帐号绑定
                $json_arr = array(
                    'action_name' => $action_name ,
                    'action_info' => array(
                        'scene' => array( 'scene_id' => $user_id ) ,
                    ) ,
                );
                $data = json_encode( $json_arr );
                $access_token = $this->access_token( $db );
                if ( strlen( $access_token ) >= 64 ) {
                    //创建二维码ticket
                    $url = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=' . $access_token;
                    $res_json = $this->curl( $url , $data );
                    $json = json_decode( $res_json );
                }
                $ticket = $json->ticket;
                if ( $ticket ) {
                    $ticket_url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' . urlencode( $ticket );
                    //2.凭借ticket到指定URL换取二维码
                    $time = time();
                    $local_url = 'qrcode/images/' . $time . '.jpg';
                    $PicUrl = BASE_URI . 'wechat/' . $local_url;
                    $local_file = fopen( $local_url , 'a' );
                    if ( false !== $local_file ) {
                        $data = $this->curl( $ticket_url );
                        if ( !empty( $data ) ) {
                            if ( false !== fwrite( $local_file , $data ) ) {
                                fclose( $local_file );
                                $scene_id = $db->getOne( "SELECT `scene_id` FROM `wxch_qr` WHERE `scene` = '$user_name'" );
                                if ( !empty( $scene_id ) ) {
                                    $sql = "UPDATE `wxch_qr` SET `type` = `$type`,`action_name` = `$action_name`,`ticket` = `$ticket`,`qr_path` = `$PicUrl`,`function` = `$function`,`affiliate` = `$scene_id`,`endtime` = `$time`,`dateline` = `$time` WHERE `scene_id` =`$scene_id`";
                                } else {
                                    //将生成的二维码图片的地址放到数据库中
                                    $sql = "INSERT INTO `wxch_qr` (`type`,`subscribe`,`action_name`,`ticket`, `scene_id`, `scene` ,`qr_path`,`function`,`affiliate`,`endtime`,`dateline`)
                                         VALUES('$type','$subscribe','$action_name','$ticket','$user_id', '$user_name' ,'$PicUrl','$function','$user_id','$time','$time')";
                                }
                                $db->query( $sql );
                            }
                            $Description = '扫描二维码可以获得推荐关系！';
                        } else {
                            $Description = '获取二维码失败,请检查 ticket_url';
                        }

                    }
                }
            }

            $item['Title'] = '推荐二维码';
            $item['Description'] = $Description;
            $item['PicUrl'] = $PicUrl;
            $item['Url'] = $Url;
            $item_arr = array( $item );

            return $item_arr;
        }

        //关键词自动回复
        protected function getKeywordsReply( $db , $keyword , $fromUsername )
        {
            $article_url = $db->getOne( "SELECT `cfg_value` FROM `wxch_cfg` WHERE `cfg_name` = 'article'" );
            $ret = $db->getAll( "SELECT * FROM `wxch_keywords`" );
            if ( count( $ret ) > 0 ) {
                foreach ( $ret as $k => $v ) {
                    if ( $v['status'] == 1 ) {
                        // 文本新规则
                        $res_ks = explode( ' ' , $v['keyword'] );
                        if ( $v['type'] == 1 ) {
                            foreach ( $res_ks as $kk => $vv ) {
                                if ( $vv == $keyword ) {
                                    $db->query( "UPDATE `wxch_keywords` SET `count` = `count`+1 WHERE `id` =$v[id]" );

                                    return $v['contents'];
                                }
                            }
                        } elseif ( $v['type'] == 2 ) {
                            //图文新规则
                            $items = '';
                            foreach ( $res_ks as $kk => $vv ) {
                                if ( $vv == $keyword ) {
                                    $res = $this->get_keywords_articles( $v['id'] , $db );
                                    $arr_items = array();
                                    foreach ( $res as $vvv ) {
                                        if ( !empty( $vvv['file_url'] ) ) {
                                            $PicUrl = BASE_URI . $vvv['file_url'];
                                        } else {
                                            $PicUrl = BASE_URI . 'themes/default/images/logo.gif';
                                            if ( !is_null( $GLOBALS['_CFG']['template'] ) ) {
                                                $PicUrl = BASE_URI . 'themes/' . $GLOBALS['_CFG']['template'] . '/images/logo.gif';
                                            }
                                        }
                                        $Url = BASE_URI . 'mobile/' . $article_url . $vvv['article_id'];
                                        $items['Title'] = $vvv['title'];
                                        $items['Description'] = $vvv['description'];
                                        $items['PicUrl'] = $PicUrl;
                                        $items['Url'] = $Url;
                                        array_push( $arr_items , $items );
                                    }
                                    $db->query( "UPDATE `wxch_keywords` SET `count` = `count`+1 WHERE `id` =$v[id];" );

                                    return $arr_items;
                                }
                            }
                        }
                    }
                }
            }
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
                $ret_json = $this->curl( $url );
                $result = json_decode( $ret_json );//object
                $access_token = $result->access_token;
                $db->query( "UPDATE `wxch_config` SET `access_token` = '$access_token',`dateline` = '$time' WHERE `id` =1;" );

            } else {
                $access_token = $db->getOne( "SELECT `access_token` FROM `wxch_config` WHERE `id` = 1;" );
                if ( empty( $access_token ) ) {
                    $ret_json = $this->curl( $url );
                    $result = json_decode( $ret_json );
                    $access_token = $result->access_token;
                    $db->query( "UPDATE `wxch_config` SET `access_token` = '$access_token',`dateline` = '$time' WHERE `id` =1;" );
                }
            }

            return $access_token;
        }


        public function orders( $user_id , $size = 10 , $start = 0 )
        {
            include_once( ROOT_PATH . 'includes/lib_transaction.php' );
            $orders = get_user_orders( $user_id , $size , $start );

            return $orders;
        }

        public function kuaidi( $invoice_no , $shipping_name )
        {
            switch ( $shipping_name ) {
                case '中国邮政':
                    $logi_type = 'ems';
                    break;
                case '申通快递':
                    $logi_type = 'shentong';
                    break;
                case '圆通速递':
                    $logi_type = 'yuantong';
                    break;
                case '顺丰速运':
                    $logi_type = 'shunfeng';
                    break;
                case '韵达快递':
                    $logi_type = 'yunda';
                    break;
                case '天天快递':
                    $logi_type = 'tiantian';
                    break;
                case '中通速递':
                    $logi_type = 'zhongtong';
                    break;
                case '增益速递':
                    $logi_type = 'zengyisudi';
                    break;
            }
            $kurl = 'http://www.kuaidi100.com/query?type=' . $logi_type . '&postid=' . $invoice_no;
            $ret = $this->curl( $kurl );
            $k_arr = json_decode( $ret , true );//true 数组

            return $k_arr;
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

        //过滤
        public function filter( $str )
        {
            $str = str_replace( "\r" , "" , $str );
            $str = str_replace( "\n" , "" , $str );
            $str = str_replace( "\t" , "" , $str );
            $str = str_replace( "\r\n" , "" , $str );
            $str = trim( $str );

            return $str;
        }
        //更新用户信息，微信获取用户信息
        //http://mp.weixin.qq.com/wiki/1/8a5ce6257f1d3b2afb20f83e72b72ce9.html
        private function updateUserInfo( $db , $fromUsername )
        {
            $access_token = $this->access_token( $db );

            $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$fromUsername";
            $res_json = $this->curl( $url );
            $w_user = json_decode( $res_json , true );

            if ( !empty( $w_user['errcode'] ) ) {
                $resultContent = $w_user['errmsg'] . ":" . $w_user['errcode'];
            } else {
                $ecs_users = $db->prefix . 'users';
                //更新wxch_user表
                $user_name = $db->getOne( "SELECT `user_name` FROM `$ecs_users` WHERE `wxid` = '$fromUsername'" );
                $time = time();
                $w_sql = "UPDATE  `wxch_user` SET `dateline` = '$time',`uname` = '$user_name',`subscribe`='$w_user[subscribe]',`nickname`='$w_user[nickname]',`sex`='$w_user[sex]',`city` ='$w_user[city]',`country` =  '$w_user[country]',`province` =  '$w_user[province]',`language` =  '$w_user[language]',`headimgurl` =  '$w_user[headimgurl]',`subscribe_time` =  '$w_user[subscribe_time]' WHERE `wxid` = '$fromUsername';";
                $db->query( $w_sql );

                //更新ecs_users表
//                $user_name = $db->getOne("SELECT `uname` FROM `wxch_user` WHERE `wxid` = '$fromUsername'" );

//                $w_users = "UPDATE `$ecs_users` SET `wxch_bd` = 'ok' ,`wxid` = '$fromUsername' WHERE `user_name` = '$user_name';";
//                $db->query( $w_users );
                $resultContent = '更新用户信息成功！';
            }

            return $resultContent;

        }

//新增
        function randomkeys( $length )
        {
            $key = '';
            $pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
            for ( $i = 0 ; $i < $length ; $i++ ) {
                $key .= $pattern{mt_rand( 0 , 35 )};    //生成php随机数
            }

            return $key;
        }
    }
