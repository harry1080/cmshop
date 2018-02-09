<?php

    /**
     * 管理中心菜单数组
     */

    //推荐分销
//    $modules['09_wechat']['affiliate'] = 'affiliate.php?act=list';//推荐设置
//    $modules['09_wechat']['affiliate_ck'] = 'affiliate_ck.php?act=list';//分成管理
//    $modules['09_wechat']['danpin_tuiguang'] = 'article_tianxin100.php?act=list';//单品推广
//    $modules['09_wechat']['zdy_parent'] = 'users_parent.php?act=list';//充值提现
//    $modules['09_wechat']['user_account'] = 'user_account.php?act=list';//资金管理
//    $modules['09_wechat']['user_account_manage'] = 'user_account_manage.php?act=list';//推荐关系

    //订单管理
    $modules['02_order']['02_order_list'] = 'order.php?act=list';//订单列表
//    $modules['02_order']['03_order_query'] = 'order.php?act=order_query';//订单查询
    $modules['02_order']['04_merge_order'] = 'order.php?act=merge';//合并订单
//    $modules['02_order']['05_edit_order_print'] = 'order.php?act=templates';//订单打印
    $modules['02_order']['06_undispose_booking'] = 'goods_booking.php?act=list_all';//缺货登记
    //$modules['04_order']['07_repay_application']        = 'repay.php?act=list_all';
//    $modules['02_order']['08_add_order'] = 'order.php?act=add';//添加订单
    $modules['02_order']['09_delivery_order'] = 'order.php?act=delivery_list';//发货单
    $modules['02_order']['10_back_order'] = 'order.php?act=back_list';//退货单


    //用户管理
    $modules['03_members']['03_users_list'] = 'users.php?act=list';//会员列表
    //    $modules['03_members']['04_users_add'] = 'users.php?act=add';//添加会员
    $modules['03_members']['05_user_rank_list'] = 'user_rank.php?act=list';//会员等级
    //    $modules['03_members']['06_list_integrate'] = 'integrate.php?act=list';//整合会员资源
    $modules['03_members']['08_unreply_msg'] = 'user_msg.php?act=list_all';//用户留言


    //促销活动
//    $modules['04_promotion']['02_snatch_list'] = 'snatch.php?act=list';
//    $modules['04_promotion']['04_bonustype_list'] = 'bonus.php?act=list';
//    $modules['04_promotion']['06_pack_list'] = 'pack.php?act=list';
//    $modules['04_promotion']['07_card_list'] = 'card.php?act=list';
//    $modules['04_promotion']['08_group_buy'] = 'group_buy.php?act=list';
//    $modules['04_promotion']['09_topic'] = 'topic.php?act=list';
//    $modules['04_promotion']['10_auction'] = 'auction.php?act=list';
//    $modules['04_promotion']['12_favourable'] = 'favourable.php?act=list';
//    $modules['04_promotion']['13_wholesale'] = 'wholesale.php?act=list';
//    $modules['04_promotion']['14_package_list'] = 'package.php?act=list';
//    //$modules['04_promotion']['ebao_commend']            = 'ebao_commend.php?act=list';
//    $modules['04_promotion']['15_exchange_goods'] = 'exchange_goods.php?act=list';
//    $modules['04_promotion']['17_wj_lottery'] = 'wj_lottery.php?act=list';       //抽奖列表
//    $modules['04_promotion']['18_wj_lottery_group'] = 'wj_lottery_group.php?act=list'; //抽奖级别
//    $modules['04_promotion']['19_wj_lottery_user'] = 'wj_lottery_user.php?act=list';  //获奖列表


    //商品管理
    $modules['05_cat_and_goods']['01_goods_list'] = 'goods.php?act=list';         // 商品列表
//        $modules['05_cat_and_goods']['02_goods_add'] = 'goods.php?act=add';          // 添加商品
    $modules['05_cat_and_goods']['03_goods_type'] = 'goods_type.php?act=manage';        //商品类型
    $modules['05_cat_and_goods']['05_comment_manage'] = 'comment_manage.php?act=list';//评论管理
//    $modules['05_cat_and_goods']['06_goods_brand_list'] = 'brand.php?act=list';         //品牌管理
    $modules['05_cat_and_goods']['08_category_list'] = 'category.php?act=list';   //商品分类
    $modules['05_cat_and_goods']['11_goods_trash'] = 'goods.php?act=trash';        // 商品回收站

//    $modules['05_cat_and_goods']['12_batch_pic'] = 'picture_batch.php'; // 图片批量处理
//    $modules['05_cat_and_goods']['13_batch_add'] = 'goods_batch.php?act=add';    // 商品批量上传
//    $modules['05_cat_and_goods']['14_goods_export'] = 'goods_export.php?act=goods_export';// 商品批量导出
//    $modules['05_cat_and_goods']['15_batch_edit'] = 'goods_batch.php?act=select'; // 商品批量修改
//    $modules['05_cat_and_goods']['16_goods_script'] = 'gen_goods_script.php?act=setup';//生成商品代码
//    $modules['05_cat_and_goods']['17_tag_manage'] = 'tag_manage.php?act=list';

    //虚拟商品
//    $modules['05_cat_and_goods']['50_virtual_card_list'] = 'goods.php?act=list&extension_code=virtual_card';//


    //    $modules['05_cat_and_goods']['51_virtual_card_add'] = 'goods.php?act=add&extension_code=virtual_card';//添加虚拟产品
//    $modules['05_cat_and_goods']['52_virtual_card_change'] = 'virtual_card.php?act=change';//更改加密串
//    $modules['05_cat_and_goods']['goods_auto'] = 'goods_auto.php?act=list';//商品自动上下架


    //广告展位
    $modules['06_banner']['ad_position'] = 'ad_position.php?act=list';
    $modules['06_banner']['ad_list'] = 'ads.php?act=list';
    $modules['06_banner']['flashplay'] = 'flashplay.php?act=list';//pc首页幻灯片

    //pc端界面
    //    $modules['07_template']['02_template_select'] = 'template.php?act=list';
//    $modules['07_template']['03_template_setup'] = 'template.php?act=setup';
//    $modules['07_template']['04_template_library'] = 'template.php?act=library';
//    $modules['07_template']['05_edit_languages'] = 'edit_languages.php?act=list';
//    $modules['07_template']['06_template_backup'] = 'template.php?act=backup_setting';

    //文章精粹
    $modules['08_content']['03_article_list'] = 'article.php?act=list';
    $modules['08_content']['02_articlecat_list'] = 'articlecat.php?act=list';
//    $modules['08_content']['vote_list'] = 'vote.php?act=list';//在线调查
//    $modules['08_content']['article_auto'] = 'article_auto.php?act=list';//文章自动发布
    //$modules['08_content']['shop_help']                 = 'shophelp.php?act=list_cat';
    //$modules['08_content']['shop_info']                 = 'shopinfo.php?act=list';

//    //微信通管理
//    $modules['09_wechat']['wx_22api'] = 'wxch-ent.php?act=wxconfig';//微信接口
//    $modules['09_wechat']['wx_21menu'] = 'wxch-ent.php?act=menu';             //微信菜单
//    $modules['09_wechat']['wx_20config'] = 'wxch-ent.php?act=config';      //微信通设置
//    $modules['09_wechat']['wx_19autoreg'] = 'wxch-ent.php?act=autoreg';    //微信自动登录
//    $modules['09_wechat']['wx_18bonus'] = 'wxch-ent.php?act=bonus';        //送红包
//    $modules['09_wechat']['wx_17regmsg'] = 'wxch-ent.php?act=regmsg';      //自动注册
//    $modules['09_wechat']['wx_23lang'] = 'wxch-ent.php?act=lang';          //语言设置
//    $modules['09_wechat']['wx_16keywords'] = 'wxch-ent.php?act=keywords';  //关键词自动回复
//    $modules['09_wechat']['wx_00point'] = 'wxch-ent.php?act=point';      //增加积分
//    $modules['09_wechat']['wx_14fun'] = 'wxch-ent.php?act=fun';            //功能变量
//    $modules['09_wechat']['wx_01prize'] = 'wxch-ent.php?act=prize';    //抽奖规则
//    $modules['09_wechat']['wx_03zjd'] = 'wxch-ent.php?act=zjd';            //砸金蛋
//    $modules['09_wechat']['wx_02dzp'] = 'wxch-ent.php?act=dzp';            //大转盘
////    $modules['09_wechat']['wx_10qr'] = 'wxch-ent.php?act=qr';          //多功能二维码
//    $modules['09_wechat']['wx_09order'] = 'wxch-ent.php?act=order';    //发货提醒
//    $modules['09_wechat']['wx_08pay'] = 'wxch-ent.php?act=pay';        //付款提醒
//    $modules['09_wechat']['wx_07reorder'] = 'wxch-ent.php?act=reorder';    //订单提醒
//    $modules['09_wechat']['wx_06fans'] = 'wxch_users.php?act=list';    //粉丝管理
//    $modules['09_wechat']['wx_15oauth'] = 'wxch-ent.php?act=oauth';        //微信OAuth
//    $modules['09_wechat']['wx_04tuijian'] = 'wxch-ent.php?act=tuijian'; //扫码引荐
//    $modules['09_wechat']['wx_11tuijian_reply'] = 'wxch-ent.php?act=tuijian_reply';//发展会员关注提醒
//    $modules['09_wechat']['wx_05list'] = 'users_invite.php?act=list';//推荐人列表

    //权限管理
    $modules['10_priv_admin']['admin_logs'] = 'admin_logs.php?act=list';
    $modules['10_priv_admin']['admin_list'] = 'privilege.php?act=list';
    $modules['10_priv_admin']['admin_role'] = 'role.php?act=list';


//    $modules['10_priv_admin']['agency_list'] = 'agency.php?act=list';                        //办事处
//    $modules['10_priv_admin']['suppliers_list'] = 'suppliers.php?act=list'; // 供货商


    //系统设置
//    $modules['11_system']['wj_award_type'] = 'wj_award_type.php?act=edit';    //赠送积分设置
//    $modules['11_system']['website'] = 'website.php?act=list';//第三方登录
    $modules['11_system']['01_shop_config'] = 'shop_config.php?act=list_edit';
//    $modules['11_system']['shop_authorized'] = 'license.php?act=list_edit';
//    $modules['11_system']['02_payment_list'] = 'payment.php?act=list';
//    $modules['11_system']['03_shipping_list'] = 'shipping.php?act=list';
//    $modules['11_system']['04_mail_settings'] = 'shop_config.php?act=mail_settings'; /// 邮件服务器
//    $modules['11_system']['05_area_list'] = 'area_manage.php?act=list';                //地区列表
    //$modules['11_system']['06_plugins']                 = 'plugins.php?act=list';
//    $modules['11_system']['07_cron_schcron'] = 'cron.php?act=list';//任务
//    $modules['11_system']['08_friendlink_list'] = 'friend_link.php?act=list';
//    $modules['11_system']['sitemap'] = 'sitemap.php';
//    $modules['11_system']['check_file_priv'] = 'check_file_priv.php?act=check';
//    $modules['11_system']['captcha_manage'] = 'captcha_manage.php?act=main';
//    $modules['11_system']['ucenter_setup'] = 'integrate.php?act=setup&code=ucenter';
//    $modules['11_system']['navigator'] = 'navigator.php?act=list';//自定义导航栏 pc
//    $modules['11_system']['file_check'] = 'filecheck.php';
    //$modules['11_system']['fckfile_manage']             = 'fckfile_manage.php?act=list';
//    $modules['11_system']['021_reg_fields'] = 'reg_fields.php?act=list';

    //报表统计
//    $modules['12_stats']['flow_stats'] = 'flow_stats.php?act=view';
//    $modules['12_stats']['searchengine_stats'] = 'searchengine_stats.php?act=view';
//    $modules['12_stats']['z_clicks_stats'] = 'adsense.php?act=list';
    $modules['12_stats']['report_guest'] = 'guest_stats.php?act=list';
    $modules['12_stats']['report_order'] = 'order_stats.php?act=list';
    $modules['12_stats']['report_sell'] = 'sale_general.php?act=list';
    $modules['12_stats']['sale_list'] = 'sale_list.php?act=list';
    $modules['12_stats']['sell_stats'] = 'sale_order.php?act=goods_num';
    $modules['12_stats']['report_users'] = 'users_order.php?act=order_num';
//    $modules['12_stats']['visit_buy_per'] = 'visit_sold.php?act=list';


    //数据库管理
//    $modules['13_backup']['02_db_manage'] = 'database.php?act=backup';
//    $modules['13_backup']['03_db_optimize'] = 'database.php?act=optimize';
//    $modules['13_backup']['04_sql_query'] = 'sql.php?act=main';
//    //$modules['13_backup']['05_synchronous']             = 'integrate.php?act=sync';
//    $modules['13_backup']['convert'] = 'convert.php?act=main';


    //短信管理
//    $modules['14_sms']['02_sms_my_info']                = 'sms.php?act=display_my_info';
    $modules['14_sms']['03_sms_send'] = 'sms.php?act=display_send_ui';
    $modules['14_sms']['aliSendSmsList'] = 'aliSendSms.php?act=aliSendSmsList';
    $modules['14_sms']['aliSendSmsConfig'] = 'aliSendSms.php?act=aliSendSmsConfig';
    $modules['14_sms']['aliSendSmsSend'] = 'aliSendSms.php?act=aliSendSmsSend';
    //    $modules['14_sms']['04_sms_charge']                 = 'sms.php?act=display_charge_ui';
    //    $modules['14_sms']['05_sms_send_history']           = 'sms.php?act=display_send_history_ui';
    //    $modules['14_sms']['06_sms_charge_history']         = 'sms.php?act=display_charge_history_ui';

    //邮件群发管理
    //    $modules['16_email_manage']['email_list'] = 'email_list.php?act=list';
    //    $modules['16_email_manage']['magazine_list'] = 'magazine_list.php?act=list';
    //    $modules['16_email_manage']['attention_list'] = 'attention_list.php?act=list';
    //    $modules['16_email_manage']['view_sendlist'] = 'view_sendlist.php?act=list';
    //    $modules['16_email_manage']['mail_template_manage'] = 'mail_template.php?act=list';

    //
    //    //$modules['17_template']['02_template_select']       = 'mobile/template.php?act=list';
    //    $modules['17_template']['03_template_setup'] = '/mobile/template.php?act=setup';
    //    $modules['17_template']['04_template_library'] = '/mobile/template.php?act=library';
    //    $modules['17_template']['navigator'] = '/mobile/navigator.php?act=list';//菜单管理
    //    $modules['17_template']['ad_position'] = '/mobile/ad_position.php?act=list';//广告管理