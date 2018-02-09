<?php
    ini_set("soap.wsdl_cache_enabled",0);
    if(empty($_GET['service'])) {
        echo "参数非法，请传入service";
        return;
    }
    /**
     **根据类名生成一个wsdl文件
     **/
    function generateWsdl($serviceClass,$isRemake=FALSE)
    {
        include("soapdiscovery.php");
        if ( ! file_exists(strtolower($serviceClass).'.wsdl') || $isRemake)
        {
            $discovery = new SoapDiscovery($serviceClass,$serviceClass.'service');
            $discovery->getWSDL();
        }
    }
   $serviceName = strtolower(htmlentities(trim($_GET['service'])));
   if(isset($_GET['action'])) {
       $action = strtolower(htmlentities(trim($_GET['action'])));
   }
   
   
   include($serviceName.'.php');//与当前文件同名的目录下有一个提供webservice接口功能的类文件
   if(!file_exists($serviceName.'.php')) {
       echo $serviceName.'.php不存在';
       return;
   }        
   $isRemake = TRUE;//类文件方法修改时要重新生成一遍wsdl文件
   generateWsdl(ucfirst($serviceName),$isRemake);
   $path = $serviceName.'.wsdl';
   // if(is_writable($path)) {//要确保文件是可以写入的
       // echo "$path is writable<br/>";
   // }else {
       // echo "$path is not writable<br/>";
   // }
   
   if (isset($action) && $action == 'wsdl') {//这些语句可以查看当前webservice提供的接口方法描述
        header('Content-type:text/xml');
        $document = file_get_contents($path);
        echo $document;
        exit;
    }
    
   libxml_disable_entity_loader(false);//这一句可以提高webservice服务的可靠性
   $server = new SoapServer($path);
   $class = ucfirst($serviceName);
   $obj = new $class();
   $server->setObject($obj);
   $server->setClass($class);
   $server->handle();
?>