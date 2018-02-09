<?php
    /**
     * Created by PhpStorm.
     * User: 13626321137@139.com
     * Date: 2017/12/22
     * Time: 16:55
     */

    /**
     *  首页文件
     */
    define( 'IN_MOBILE' , true );

    require( dirname( __FILE__ ) . '/include/init.php' );


    $act = $_REQUEST['act'];
    if ( $act == 'status' ) {
        $res = array('success'=>true);

        $res['account'] = $_SESSION['user_id'];


        echo  json_encode($res);


        exit;
    }