<?php
class Select {
    /**
     *
     * @param string $name
     * @param int $age
     * @return string
     */
    public function add($name,$age)
    {
        $result = array('REV'=>false);
        $result['REV'] = true;
        $result['DATA'] = 1;
        $result['name'] = $name;
        $result['age'] = $age;
        return json_encode($result);
    }
	
    public function say1()
    {
		$mysql_server_name='localhost'; //改成自己的mysql数据库服务器
        $mysql_username='root'; //改成自己的mysql数据库用户名
        $mysql_password='sh0ujish@ngqu@n'; //改成自己的mysql数据库密码
        $mysql_database='test'; //改成自己的mysql数据库名
		//查找是否绑定
		$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库
		mysql_query("set names 'utf8'"); //数据库输出编码
        mysql_select_db($mysql_database); //打开数据库
		$sql ="select * from guanzhu"; //SQL语句
        $result = mysql_query($sql,$conn); //查询
        $posts = array();
        if(mysql_num_rows($result)) {
            while($post = mysql_fetch_assoc($result)) {
                $posts[] = array('post'=>$post);
            }
        }
        return json_encode(array('posts'=>$posts));
    }
	
    public function say()
    {
        return 'I am speaking!<br/>';
    }
    /**
     * delete the object
     * @param int $id
     * @return boolean
     */
    public function del($id)
    {
        $result = false;
        return $result;
    }
    /**
     *
     * @param int $type
     * @return string
     */
    public function getlist($type)
    {
        $result = array(
            array('name'=>'张三','age'=>18),
            array('name'=>'李四','age'=>20),
            array('name'=>'jms','age'=>10),
            array('name'=>'jk陈','age'=>8),
        );
        return json_encode($result);
        
    }
    
    public function receiveCompanies($xmlContent)
    {
        $arr_receive = $this->simplest_xml_to_array($xmlContent);
        
        return
        '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n<status>1</status>\n<version>'.count($arr_receive).'</version>\n</response>';
    }
    
    /** * 最简单的XML转数组 * @param string $xmlstring XML字符串 * @return array XML数组*/
    
    private function simplest_xml_to_array($xmlstring)
    {
		//禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $values = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);        
        return $values;
    }    
}

