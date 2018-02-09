<?php
    ini_set("soap.wsdl_cache_enabled",0);
    
    libxml_disable_entity_loader(false);//这一句可以提高webservice服务的可靠性
    $url = "http://www.mbizzone.com/wechat/select.wsdl";
    $client = new SoapClient($url);
    
    $params = array();
    $res = $client->__soapCall('say1',$params);
    var_dump($res);
    return;

