<?php
    /**
     * Created by PhpStorm.
     * User: tongwenping@163.cm
     * Date: 2017/4/7
     * Time: 9:24
     */

    $cron_lang = ROOT_PATH . 'languages/' . $GLOBALS['_CFG']['lang'] . '/cron/myclr.php';
    if ( file_exists( $cron_lang ) ) {
        global $_LANG;

        include_once( $cron_lang );
    }

    /* 模块的基本信息 */
    if ( isset( $set_modules ) && $set_modules == true ) {
        $i = isset( $modules ) ? count( $modules ) : 0;

        /* 代码 */
        $modules[$i]['code'] = basename( __FILE__ , '.php' );

        /* 描述对应的语言项 */
        $modules[$i]['desc'] = 'myclr_desc';

        /* 作者 */
        $modules[$i]['author'] = '云动商圈';

        /* 网址 */
        $modules[$i]['website'] = 'http://www.mbizzone.com';

        /* 版本号 */
        $modules[$i]['version'] = '1.0.0';

        /* 配置信息*/
//        $modules[$i]['config']  = array(
//            array('name' => 'myclr_day', 'type' => 'select', 'value' => '30'),
//        );

        return;
    }

    clear_cache_files();