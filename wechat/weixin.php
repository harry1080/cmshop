<?php

    define( "TOKEN" , "5224964712244509781" );//换成你的token
    define( 'APP_ID' , 'wxfb2d35da823285a0' );//改成自己的APPID
    define( 'APP_SECRET' , '06d33d386448488ca059ac62d56750e0' );//改成自己的APPSECRET
    define( 'DB_SERVER_NAME' , 'localhost' );////改成自己的mysql数据库服务器
    define( 'DB_USERNAME' , 'root' );//改成自己的mysql数据库用户名
    define( 'DB_PASSWORD' , 'sh0ujish@ngqu@n' );//改成自己的mysql数据库密码
    define( 'DB_DATABASE' , 'test' );//改成自己的mysql数据库名
    define( 'BASE_URI' , 'http://' . $_SERVER['SERVER_NAME'] . '/' );

//    require(dirname(__FILE__) . '/../mobile/include/init.php');

    $weChat = new wechatCallbackApi();
    if ( isset( $_GET['echostr'] ) ) {     //验证微信
        $weChat->valid();
    } else {
        //回复消息
        $weChat->responseMsg();
    }

    class wechatCallbackApi
    {
        public function valid()
        {
            $echoStr = $_GET["echostr"];
            if ( $this->checkSignature() ) {
                echo $echoStr;
                exit;
            }
        }

        private function checkSignature()
        {
            $signature = $_GET["signature"];
            $timestamp = $_GET["timestamp"];
            $nonce = $_GET["nonce"];

            $token = TOKEN;
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
        public function responseMsg()
        {

            $postXml = $GLOBALS["HTTP_RAW_POST_DATA"];
            if ( !empty( $postXml ) ) {
                $postObj = simplexml_load_string( $postXml , 'SimpleXMLElement' , LIBXML_NOCDATA );
                $MsgType = trim( $postObj->MsgType );

                //消息类型
                switch ( $MsgType ) {
                    //接收普通消息
                    //https://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
                    case "text":
                        $resultStr = $this->receiveText( $postObj );
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
                        $resultStr = $this->receiveEvent( $postObj );
                        break;
                    default:
                        $resultStr = "未知的消息类型: " . $MsgType;
                        break;
                }
                echo $resultStr;
            } else {
                echo "";
                exit;
            }
        }

        //接收文本消息
        private function receiveText( $object )
        {


            //记录
//            $sql = "insert into textjilu (fromUsername,toUsername,creatTime,msgType,Content,lurushijian) values ('$fromUsername','$toUsername','$creatTime','$MsgType','$content',NOW())";
//            if ( !$conn ) {
//                $conn = mysql_connect( DB_SERVER_NAME , DB_USERNAME , DB_PASSWORD ); //连接数据库
//                mysql_query( $sql , $conn );
//            } else {
//                mysql_query( $sql , $conn );
//            }

            $keyword = trim( $object->Content );
            $url = "http://api100.duapp.com/movie/?appkey=DIY_miaomiao&name=" . $keyword;
            $output = file_get_contents( $url , $keyword );
            $contentStr = json_decode( $output , true );
            if ( is_array( $contentStr ) ) {
                $resultStr = $this->transmitNews( $object , $contentStr );
            } else {
                $resultStr = $this->transmitText( $object , $contentStr );
            }

            return $resultStr;
        }


        //接收事件，关注等
        private function receiveEvent( $object )
        {
            $conn = mysql_connect( DB_SERVER_NAME , DB_USERNAME , DB_PASSWORD ); //连接数据库
            mysql_query( "set names 'utf8'" ); //数据库输出编码
            mysql_select_db( DB_DATABASE ); //打开数据库

            $event = $object->Event;//事件类型

            switch ( $event ) {
                //subscribe(订阅)、unsubscribe(取消订阅)
                case "subscribe":
                    $resultStr = $this->subscribeHandle( $object , $conn );//关注后回复内容

                    break;
                case "unsubscribe":
                    $resultStr = $this->unsubscribe( $object , $conn );//关注后回复内容

                    break;
                case "CLICK":
                    $resultStr = $this->receiveClick( $object , $conn );    //点击事件
                    break;
                case "SCAN":
                    $resultStr = $this->receiveScan( $object , $conn );    //
                    break;
                case "VIEW":
                    $resultStr = $this->receiveView( $object , $conn );    //
                    break;
                default:
                    $resultStr = "receive a new event: " . $object->Event;
                    break;

            }

            $resultStr .= $this->bdHandle( $object , $conn );

            mysql_close(); //关闭MySQL连接

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

        //点击菜单消息
        private function receiveClick( $object , $conn )
        {
            $fromUsername = $object->FromUserName;


            switch ( $object->EventKey ) {//事件KEY值，与自定义菜单接口中KEY值对应
                case "dzp":

                    $sql = "select `pid` from wxch_prize where `fun`='dzp'"; //SQL语句
                    $res = mysql_query( $sql , $conn ); //查询
                    $rowObj = mysql_fetch_row( $res );

                    $Url = BASE_URI . "wechat/dzp/index.php?wxid=" . $fromUsername . '&pid=' . $rowObj[0];

                    //https://mp.weixin.qq.com/wiki/1/6239b44c206cab9145b1d52c67e6c551.html
                    $arr_item['Title'] = '大转盘';//图文消息标题
                    $arr_item['Description'] = '大转盘活动描述';//图文消息描述
                    $arr_item['PicUrl'] = '';//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                    $arr_item['Url'] = $Url;//点击图文消息跳转链接
                    $arr_items = array( $arr_item );
                    break;

                case "zjd":
                    $sql = "select pid from wxch_prize where fun='egg'"; //SQL语句
                    $res = mysql_query( $sql , $conn ); //查询
                    $rowObj = mysql_fetch_row( $res );
                    $Url = "http://www.mbizzone.com/wechat/egg/index.php?wxid=" . $fromUsername . '&pid=' . $rowObj[0];

                    //https://mp.weixin.qq.com/wiki/1/6239b44c206cab9145b1d52c67e6c551.html
                    $arr_item['Title'] = '砸金蛋';//图文消息标题
                    $arr_item['Description'] = '砸金蛋活动!';//图文消息描述
                    $arr_item['PicUrl'] = '';//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                    $arr_item['Url'] = $Url;//点击图文消息跳转链接
                    $arr_items = array( $arr_item );

                    break;

                case "qiandao":
//                    $sql = "select pid from wxch_prize where fun='egg'"; //SQL语句
//                    $res = mysql_query( $sql , $conn ); //查询
//                    $rowObj = mysql_fetch_row($res);
//                    $Url = "http://www.mbizzone.com/wechat/egg/index.php?wxid=" . $fromUsername . '&pid=' . $rowObj[0];

                    //https://mp.weixin.qq.com/wiki/1/6239b44c206cab9145b1d52c67e6c551.html
                    $arr_item['Title'] = '签到';//图文消息标题
                    $arr_item['Description'] = '砸金蛋活动!';//图文消息描述
                    $arr_item['PicUrl'] = '';//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                    $arr_item['Url'] = $Url;//点击图文消息跳转链接
                    $arr_items = array( $arr_item );

                    break;
                default:
                    $arr_items = "你点击了菜单: " . $object->EventKey;
                    break;
            }

            //两种回复
            if ( is_array( $arr_items ) ) {
                $resultStr = $this->transmitNews( $object , $arr_items );
            } else {
                $resultStr = $this->transmitText( $object , $arr_items );
            }

            return $resultStr;
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
                        <Content><![CDATA[]]></Content>
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


        //绑定处理
        private function bdHandle( $object , $conn )
        {
            $fromUsername = $object->FromUserName;
            $toUsername = $object->ToUserName;

            //查找是否绑定
            $sql4 = "select * from bangding where fromUsername='$fromUsername'"; //SQL语句
            if ( !$conn ) {
                $conn = mysql_connect( DB_SERVER_NAME , DB_USERNAME , DB_PASSWORD ); //连接数据库
                $result4 = mysql_query( $sql4 , $conn ); //查询
            } else {
                $result4 = mysql_query( $sql4 , $conn ); //查询
            }
            if ( !mysql_num_rows( $result4 ) ) {
                //发送未绑定图文消息

                $Url = "http://www.mbizzone.com/wechat/bangding.php?a=" . $fromUsername . "&b=" . $toUsername;

                //https://mp.weixin.qq.com/wiki/1/6239b44c206cab9145b1d52c67e6c551.html
                $arr_item['Title'] = '绑定资料';//图文消息标题
                $arr_item['Description'] = '欢迎您的到来,您还没有绑定资料,请点击绑定资料!';//图文消息描述
                $arr_item['PicUrl'] = '';//图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
                $arr_item['Url'] = $Url;//点击图文消息跳转链接

                $arr_items = array( $arr_item );
                $resultStr = $this->transmitNews( $object , $arr_items );

            } else {
                //发送已绑定信息
                $contentStr = "欢迎您的到来,您已绑定资料!";
                $resultStr = $this->transmitText( $object , $contentStr );
            }

            return $resultStr;
        }


        private function unsubscribe( $object , $conn )
        {
            $resultStr = '';

            $fromUsername = $object->FromUserName;
            $creatTime = $object->CreateTime;
            $toUsername = $object->ToUserName;
            $MsgType = trim( $object->MsgType );
            $event = $object->Event;

            $sql = "insert into quxiaoguanzhu (fromUsername,toUsername,creatTime,msgType,event,quxiaoguanzhushijian) values ('$fromUsername','$toUsername','$creatTime','$MsgType','$event',NOW())";
            mysql_query( $sql , $conn );

            return $resultStr;

        }

        //关注公众号后处理
        private function subscribeHandle( $object , $conn )
        {
            $resultStr = '';
            $fromUsername = $object->FromUserName;
            $createTime = $object->CreateTime;
            $toUsername = $object->ToUserName;
            $MsgType = trim( $object->MsgType );
            $event = $object->Event;

            $sql1 = "select * from guanzhu where fromUsername='$fromUsername'"; //SQL语句
            $result1 = mysql_query( $sql1 , $conn ); //查询

            if ( !mysql_num_rows( $result1 ) ) {//若未关注
                //插入到关注表内
                $sql2 = "insert into guanzhu (fromUsername,toUsername,createTime,msgType,guanzhushijian) values ('$fromUsername','$toUsername','$createTime','$MsgType','$event',NOW())";
                if ( !$conn ) {
                    $conn = mysql_connect( DB_SERVER_NAME , DB_USERNAME , DB_PASSWORD ); //连接数据库
                    mysql_query( $sql2 , $conn );
                } else {
                    mysql_query( $sql2 , $conn );
                }

            } else {
                $sql2 = "UPDATE guanzhu set xiugaishijian=NOW() where fromUsername='$fromUsername'";
                if ( !$conn ) {
                    $conn = mysql_connect( DB_SERVER_NAME , DB_USERNAME , DB_PASSWORD ); //连接数据库
                    mysql_query( $sql2 , $conn );
                } else {
                    mysql_query( $sql2 , $conn );
                }
            }


            return $resultStr;
        }
    }

?>