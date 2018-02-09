<?php

    /**
     * 云服务接口
     */
    define( 'IN_PC' , true );

    require( dirname( __FILE__ ) . '/includes/init.php' );
    require( ROOT_PATH . 'includes/cls_transport.php' );
    require( ROOT_PATH . 'includes/cls_json.php' );
    require( ROOT_PATH . 'includes/shopex_json.php' );

    $data['api_ver'] = API_VER;
    $data['version'] = VERSION;
    $data['patch'] = file_get_contents( ROOT_PATH . ADMIN_PATH . "/patch_num" );
    $data['ecs_lang'] = $_CFG['lang'];
    $data['release'] = RELEASE;
    $data['charset'] = strtoupper( EC_CHARSET );
    $data['certificate_id'] = $_CFG['certificate_id'];
    $data['token'] = md5( $_CFG['token'] );
    $data['certi'] = $_CFG['certi'];
    $data['php_ver'] = PHP_VERSION;
    $data['mysql_ver'] = $db->version();
    $data['shop_url'] = $ecs->url();
    $data['admin_url'] = $ecs->url() . ADMIN_PATH;
    $data['sess_id'] = SESS_ID;
    $data['stamp'] = mktime();
    $data['ent_id'] = $_CFG['ent_id'];
    $data['ent_ac'] = $_CFG['ent_ac'];
    $data['ent_sign'] = $_CFG['ent_sign'];
    $data['ent_email'] = $_CFG['ent_email'];

    $act = !empty( $_REQUEST['act'] ) ? $_REQUEST['act'] : 'index';
    $must = array(
        'version' ,
        'ecs_lang' ,
        'charset' ,
        'patch' ,
        'stamp' ,
        'api_ver' ,
    );

    //除去待签名参数数组中的空值和签名参数
    $para_filter = paraFilter( $data );

    //对待签名参数数组排序
    $para_sort = argSort( $para_filter );

    //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
    $postData = createLinkstring( $para_sort );

    switch ( trim( $act ) ) {
        case 'menu_api':
        case 'cloud_remind':
            unionApi( $act , $data , $postData , $_CFG );
            break;
        case 'close_remind':
            break;
        case 'active'://激活

            ecs_header( "Location: " . $_CFG[$act] . "?" . $postData . "\n" );

            break;
        default:
//            if ( !empty( $_GET['link'] ) ) {
//                $url = parse_url( $_GET['link'] );
//                if ( !empty( $url['host'] ) ) {
//                    ecs_header( "Location: " . $url['scheme'] . "://" . $url['host'] . $url['path'] . "?" . $url['query'] . $query . "\n" );
//                    exit();
//                }
//            }
//
//            ecs_header( "Location: http://cloud.ecshop.com/api.php?act=" . $act . $query . "\n" );
            break;
    }

    /**
     * @param $act
     * @param $data
     * @param $postData
     * @param $_CFG
     */
    function unionApi( $act , $data , $postData , $_CFG )
    {
        if ( !admin_priv( 'all' ) ) {
            make_json_result( '0' );
        }

        $saveData = read_static_cache( $act );

        if ( $saveData === false || ( isset( $saveData['api_time'] ) && $saveData['api_time'] < date( 'Ymd' ) ) ) {
            $transport = new transport;
            $response = $transport->request( $_CFG[$act] , $postData );
            $body = $response["body"];
            if ( !empty( $body ) ) {
                $json = new Services_JSON;
                $api_arr = @$json->decode( $body , 1 );//json_decode($body,'true');
                if ( !empty( $api_arr )
                    && $api_arr['error'] == 0 &&
                    md5( $api_arr['content'] ) == $api_arr['hash']
                ) {
                    $api_arr['content'] = urldecode( $api_arr['content'] );
                    if ( $data['charset'] != 'UTF-8' ) {
                        $api_arr['content'] = ecs_iconv( 'UTF-8' , $data['charset'] , $api_arr['content'] );
                    }
                    $api_arr['api_time'] = date( 'Ymd' );
                    write_static_cache( $act , $api_arr );
                    make_json_result( $api_arr['content'] );
                } else {
//                    clear_all_files();
                    make_json_result( '0' );
                }
            } else {
                make_json_result( '0' );
            }
        } else {
            make_json_result( $saveData['content'] );
        }

    }

    /**
     * 除去数组中的空值和签名参数
     *
     * @param $para 签名参数组
     *
     * @return array 去掉空值与签名参数后的新签名参数组
     */
    function paraFilter( $para )
    {
        $para_filter = array();
        while ( list ( $key , $val ) = each( $para ) ) {
            if ( $key == "sign" || $key == "sign_type" || $val == "" ) {
                continue;
            } else {
                $para_filter[$key] = $para[$key];
            }
        }

        return $para_filter;
    }

    /**
     * 把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
     *
     * @param $para 需要拼接的数组
     *
     * @return string   拼接完成以后的字符串
     */
    function createLinkString( $para )
    {
        $arg = "";
        while ( list ( $key , $val ) = each( $para ) ) {
            $arg .= $key . "=" . $val . "&";
        }
        //去掉最后一个&字符
        $arg = substr( $arg , 0 , count( $arg ) - 2 );

        //如果存在转义字符，那么去掉转义
        if ( get_magic_quotes_gpc() ) {
            $arg = stripslashes( $arg );
        }

        return $arg;
    }

    /**
     * 对数组排序
     *
     * @param $para 排序前的数组
     *
     * @return mixed 排序后的数组
     */
    function argSort( $para )
    {
        ksort( $para );
        reset( $para );

        return $para;
    }