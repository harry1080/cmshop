<?php
/**
 * 云动商圈快钱联合注册接口
 * ============================================================================
 * * 版权所有 2017-2027 中移铁通智能产品分公司，并保留所有权利。
 * 网站地址: http://www.mbizzone.com；
 * ----------------------------------------------------------------------------
 * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
 * 使用；不允许对程序代码以任何形式任何目的的再发布。
 * ============================================================================
 * $Author: liuhui $
 * $Id: send.php 15013 2008-10-23 09:31:42Z liuhui $
*/

define('IN_PC', true);

require(dirname(__FILE__) . '/includes/init.php');
$backUrl=$ecs->url() . ADMIN_PATH . '/receive.php';
header("location:http://cloud.ecshop.com/payment_apply.php?mod=kuaiqian&par=$backUrl");
exit;
?>
