<?php
    /**
     * Created by PhpStorm.
     * User: 13626321137@139.com
     * Date: 2018/2/22
     * Time: 0:09
     */


    define( 'IN_MOBILE' , true );
    require_once "includes/init.php";

    if ( $_REQUEST['act'] == 'list' ) {
        /* 检查权限 */
//        admin_priv( 'users_manage' );


        $sql = "SELECT id,name, mobile, address FROM " . $ecs->table( 'contact' ) . " ORDER BY id  ";
        $rs = $db->getAll( $sql );
        $filter = page_and_size( $filter );

        $arr = array( 'contact_list' => $rs , 'filter' => $filter ,
                      'page_count'   => $filter['page_count'] , 'record_count' => count( $rs ) );


        $smarty->assign( 'contact_list' , $rs );
        $smarty->assign( 'record_count' ,count( $rs ));
        $smarty->assign( 'page_count' , $filter['page_count'] );
        $smarty->assign( 'full_page' , 1 );

        assign_query_info();
        $smarty->display( 'contact.htm' );
    }
