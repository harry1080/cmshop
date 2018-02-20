<?php
    /**
     * Created by PhpStorm.
     * User: 13626321137@139.com
     * Date: 2018/2/19
     * Time: 17:44
     */
    define( 'IN_MOBILE' , true );
    require( dirname( __FILE__ ) . '/include/init.php' );


    $action = $_POST['action'];

    if ( $action == 'post' ) {


        $name = $_POST['name'];
        $address = $_POST['address'];
        $mobile = $_POST['mobile'];
        if ( isMobile( $mobile ) ){
            /* 获取当前分类及其子分类 */
            $sql = 'SELECT count(*) FROM ' . $GLOBALS['ecs']->table( 'contact' ) . " WHERE name = '$name'";

            $res = $GLOBALS['db']->getOne( $sql );
            if ( !$res ) {

                $sql = "INSERT INTO " . $GLOBALS['ecs']->table( 'contact' ) .
                    " (name, address, mobile)" . " VALUES ('$name','$address', '$mobile')";
                $res = $GLOBALS['db']->query( $sql );

                if($res){
                    $return = array('msg'=>'提交成功！','status'=>'success');
                }else{
                    $return = array('msg'=>'提交失败！','status'=>'error');

                }

            }
        }else{
            $return = array('msg'=>'手机格式不对！','status'=>'error');
        }

        die(json_encode($return));

    }

    $smarty->display( 'contact.dwt' , $cache_id );

    /**
     * @param $mobile
     *
     * @return bool
     */
    function isMobile( $mobile )
    {
        if ( !is_numeric( $mobile ) ) {
            return false;
        }

        return preg_match( '#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$#' , $mobile ) ? true : false;
    }