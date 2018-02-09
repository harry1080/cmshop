<?php

    /**
     * 文章内容
     */

    define( 'IN_PC' , true );

    require( dirname( __FILE__ ) . '/includes/init.php' );

    if ( ( DEBUG_MODE & 2 ) != 2 ) {
        $smarty->caching = true;
    }

    /*------------------------------------------------------ */
//-- INPUT
    /*------------------------------------------------------ */

    $smarty->assign( 'navigator_list' , get_navigator( $ctype , $catlist ) );  //自定义导航栏


    $_REQUEST['id'] = isset( $_REQUEST['id'] ) ? intval( $_REQUEST['id'] ) : 0;
    $article_id = $_REQUEST['id'];
    if ( isset( $_REQUEST['cat_id'] ) && $_REQUEST['cat_id'] < 0 ) {
        $article_id = $db->getOne( "SELECT article_id FROM " . $ecs->table( 'article' ) . " WHERE cat_id = '" . intval( $_REQUEST['cat_id'] ) . "' " );
    }

    /*------------------------------------------------------ */
//-- PROCESSOR
    /*------------------------------------------------------ */
    $smarty->assign( 'ur_here' , "邀请朋友" );  // 当前位置
    $cache_id = sprintf( '%X' , crc32( $_REQUEST['id'] . '-' . $_CFG['lang'] ) );
    $user_id = $_SESSION['user_id'];
    $smarty->assign( 'userid' , $user_id );
    $smarty->assign( 'weburl' , 'user.php?act=register' );
    $smarty->display( 'account.dwt' );
?>