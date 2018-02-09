<?php
    /**
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/3/16
     * Time: 13:42
     */
    define( 'IN_PC' , true );
    require( dirname( __FILE__ ) . '/includes/init.php' );
    require( ROOT_PATH  . '/includes/cls_aliSendSms.php' );
    require_once( ROOT_PATH . 'includes/taobao/TopSdk.php' );

    $action = isset( $_REQUEST['act'] ) ? trim( $_REQUEST['act'] ) : 'aliSendSmsList';

    $aliSendSms = new aliSendSms();


    switch ( $action ) {
        /* 显示短信发送界面，如果尚未注册或启用短信服务则显示注册界面。 */
        case 'aliSendSmsList' :
            /* 检查权限 */
//            admin_priv( 'aliSendSmsList' );

            $smarty->assign( 'ur_here' , $_LANG['aliSendSmsList'] );
            $sql = 'SELECT * FROM ' . $ecs->table( 'dayusms' );
            $row = $db->getAll( $sql );

            assign_query_info();

            $smarty->assign( 'list' , $row );

            $smarty->display( 'aliSendSmsList.htm' );
            break;

        case 'aliSendSmsSend':

            /* 检查权限 */
//            admin_priv( 'aliSendSmsSend' );

            $special_ranks = get_rank_list();
            $send_rank['1_0'] = $_LANG['user_list'];
            foreach ( $special_ranks as $rank_key => $rank_value ) {
                $send_rank['2_' . $rank_key] = $rank_value;
            }
            $smarty->assign( 'ur_here' , $_LANG['aliSendSmsSend'] );
            $smarty->assign( 'send_rank' , $send_rank );
            $smarty->display( 'aliSendSmsSend.htm' );
            break;
        case 'aliSendSmsConfig' :
            /* 检查权限 */
//            admin_priv( 'aliSendSmsList' );

            $smarty->assign( 'ur_here' , $_LANG['aliSendSmsConfig'] );
            assign_query_info();
            $smarty->display( 'aliSendSmsConfig.htm' );
            break;
        case 'aliSendSmsConfigAdd':
            $dykey = !empty( $_POST['dykey'] ) ? trim( $_POST['dykey'] ) : '23349000';
            $dysecret = !empty( $_POST['dysecret'] ) ? trim( $_POST['dysecret'] ) : 'e6c2f23692f4d1545797119adad88518';


            /* 查看模板是否与其它有重复 */
            $sql = 'SELECT COUNT(*) FROM ' . $ecs->table( 'dayusms_config' ) .
                " WHERE  dykey = '$dykey'";

            if ( $db->getOne( $sql ) == 0 ) {

                $sql = 'INSERT INTO ' . $ecs->table( 'dayusms_config' ) .
                    ' (dykey, dysecret) ' .
                    "VALUES ('$dykey', '$dysecret')";

                if ( $db->query( $sql ) ) {
                    /* 记录管理员操作 */
                    admin_log( $dykey , 'add' , 'dayusms' );

                    /* 清除缓存 */
                    clear_cache_files();

                    /* 提示信息 */
                    $link[] = array( 'text' => $_LANG['back_aliSendSmsConfig'] , 'href' => 'aliSendSms.php?act=aliSendSmsConfig' );
                    sys_msg( $_LANG['update'] . ' ' . stripslashes( $dykey ) . ' ' . $_LANG['attradd_succed'] , 0 , $link );
                }
            } else {
                $sql = "UPDATE " . $ecs->table( 'dayusms_config' ) . " SET " .
                    "dysecret    = '$dysecret'" .
                    "WHERE dykey = '$dykey'";
                if ( $db->query( $sql ) ) {
                    /* 记录管理员操作 */
                    admin_log( $dykey , 'update' , 'dayusms' );

                    /* 清除缓存 */
                    clear_cache_files();
                    /* 提示信息 */
                    $link[] = array( 'text' => $_LANG['back_aliSendSmsConfig'] , 'href' => 'aliSendSms.php?act=aliSendSmsConfig' );
                    sys_msg( $_LANG['update'] , 0 , $link );
                }
            }

            break;

        case 'aliSendSmsSendStart':
            $send_num = !empty( $_POST['send_num'] ) ? trim( $_POST['send_num'] ) : '';

            if ( isset( $send_num ) ) {
                $phone = $send_num . ',';
            }

            $send_rank = isset( $_POST['send_rank'] ) ? $_POST['send_rank'] : 0;

            if ( $send_rank != 0 ) {
                $rank_array = explode( '_' , $send_rank );

                if ( $rank_array['0'] == 1 ) {
                    $sql = 'SELECT mobile_phone FROM ' . $ecs->table( 'users' ) . "WHERE mobile_phone <>'' ";
                    $row = $db->query( $sql );
                    while ( $rank_rs = $db->fetch_array( $row ) ) {
                        $value[] = $rank_rs['mobile_phone'];
                    }
                } else {
                    $rank_sql = "SELECT * FROM " . $ecs->table( 'user_rank' ) . " WHERE rank_id = '" . $rank_array['1'] . "'";
                    $rank_row = $db->getRow( $rank_sql );
                    //$sql = 'SELECT mobile_phone FROM ' . $ecs->table('users') . "WHERE mobile_phone <>'' AND rank_points > " .$rank_row['min_points']." AND rank_points < ".$rank_row['max_points']." ";

                    if ( $rank_row['special_rank'] == 1 ) {
                        $sql = 'SELECT mobile_phone FROM ' . $ecs->table( 'users' ) . " WHERE mobile_phone <>'' AND user_rank = '" . $rank_array['1'] . "'";
                    } else {
                        $sql = 'SELECT mobile_phone FROM ' . $ecs->table( 'users' ) . "WHERE mobile_phone <>'' AND rank_points > " . $rank_row['min_points'] . " AND rank_points < " . $rank_row['max_points'] . " ";
                    }

                    $row = $db->query( $sql );

                    while ( $rank_rs = $db->fetch_array( $row ) ) {
                        $value[] = $rank_rs['mobile_phone'];
                    }
                }
                if ( isset( $value ) ) {
                    $phone .= implode( ',' , $value );
                }
            }

            $msg = isset( $_POST['msg'] ) ? $_POST['msg'] : '';


            $send_date = isset( $_POST['send_date'] ) ? $_POST['send_date'] : '';


            $mobile ='13626321137';
            $sign='溜枣庄商城信息网';
            $dayu_local  ='sms_yzm';//"SMS_7741451"
            $smsParam = array(
                'sitename' => 'test' ,
                'code'     => '456123' ,
            );
            $respObject = $aliSendSms->AliSendSms($sign , $dayu_local , $mobile , $smsParam);
            $link[] = array( 'text' => $_LANG['back'] . $_LANG['03_sms_send'] , 'href' => 'sms.php?act=display_send_ui' );
            if ( !isset( $respObject->code ) )//发送成功
            {
                sys_msg( $_LANG['send_ok'] , 0 , $link );
            } else {
                @$error_detail = $_LANG['server_errors'][$sms->errors['server_errors']['error_no']]
                    . $_LANG['api_errors']['send'][$sms->errors['api_errors']['error_no']];
                sys_msg( $_LANG['send_error'] . $error_detail , 1 , $link );
            }


            break;
        case 'aliSendSmsEdit' :
            //            admin_priv( 'aliSendSmsEdit' );

            $smarty->assign( 'ur_here' , $_LANG['aliSendSmsEdit'] );

            $_REQUEST['id'] = !empty( $_REQUEST['id'] ) ? intval( $_REQUEST['id'] ) : 0;


            /* 获取管理员信息 */

            $sql = 'SELECT * FROM ' . $ecs->table( 'dayusms' ) . " WHERE id = '" . $_REQUEST['id'] . "'";

            $info = $db->getRow( $sql );

            assign_query_info();

            $smarty->assign( 'info' , $info );
            $smarty->assign( 'id' , $_REQUEST['id'] );

            $smarty->display( 'aliSendSmsEdit.htm' );
            break;

        case 'aliSendSmsUpdate' :
            $id = !empty( $_POST['id'] ) ? trim( $_POST['id'] ) : '';
            $dayu_local = !empty( $_POST['dayu_local'] ) ? trim( $_POST['dayu_local'] ) : '';
            $dayu_tag = !empty( $_POST['dayu_tag'] ) ? trim( $_POST['dayu_tag'] ) : '';
            $dayu_name = !empty( $_POST['dayu_name'] ) ? trim( $_POST['dayu_name'] ) : '';
            $dayu_note = !empty( $_POST['dayu_note'] ) ? trim( $_POST['dayu_note'] ) : '';

            /* 查看模板是否与其它有重复 */
            $sql = 'SELECT COUNT(*) FROM ' . $ecs->table( 'dayusms' ) .
                " WHERE  dayu_local = '$dayu_local' AND id = '$id'";

            if ( $db->getOne( $sql ) == 0 ) {
                $sql = "UPDATE " . $ecs->table( 'dayusms' ) . " SET " .
                    "dayu_local    = '$dayu_local', " .
                    "dayu_tag         = '$dayu_tag', " .
                    "dayu_name        = '$dayu_name', " .
                    "dayu_note    = '$dayu_note' " .
                    "WHERE id = '$id'";

                if ( $db->query( $sql ) ) {
                    /* 记录管理员操作 */
                    admin_log( $dayu_name , 'edit' , 'dayusms' );

                    /* 清除缓存 */
                    clear_cache_files();

                    /* 提示信息 */
                    $link[] = array( 'text' => $_LANG['back_aliSendSmsList'] , 'href' => 'aliSendSms.php?act=aliSendSmsList' );
                    sys_msg( $_LANG['edit'] , 0 , $link );
                }
            } else {
                $link[] = array( 'text' => $_LANG['go_back'] , 'href' => 'javascript:history.back(-1)' );
                sys_msg( $_LANG['exist'] , 0 , $link );
            }

            break;


        /* 显示我的短信服务个人信息 */
        default :
            break;

    }

