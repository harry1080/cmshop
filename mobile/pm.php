<?php

    define( 'IN_MOBILE' , true );

    require( dirname( __FILE__ ) . '/include/init.php' );
    if ( empty( $_SESSION['user_id'] ) || $_CFG['integrate_code'] == 'ecshop' ) {
        ecs_header( 'Location:./' );
    }

    uc_call( "uc_pm_location" , array( $_SESSION['user_id'] ) );
//$ucnewpm = uc_pm_checknew($_SESSION['user_id']);
//setcookie('checkpm', '');

?>