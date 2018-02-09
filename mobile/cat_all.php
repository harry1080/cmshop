<?php

    define( 'IN_MOBILE' , true );

    require( dirname( __FILE__ ) . '/include/init.php' );
    $categories = get_categories_tree();


    foreach ( $categories as $key => $category ) {
        if ( $category['cat_id'] ) {
            foreach ( $category['cat_id'] as $k => $v ) {
                $categories[$key]['cat_id'][$k]['goods_list'] = get_goods_list_by_cate($v['id']);
            }
        }
    }

    $smarty->assign( 'categories' , $categories );

    $smarty->display( "category_all.dwt" );


    function get_goods_list_by_cate( $cate_id )
    {
        $sql = 'SELECT * FROM ' . $GLOBALS['ecs']->table( 'goods' ) . "WHERE cat_id=$cate_id";

        $res = $GLOBALS['db']->getAll( $sql );

        return $res;
    }
