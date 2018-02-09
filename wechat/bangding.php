<?php
    if (isset($_POST['action']) && $_POST['action'] == 'submitted') {
		$mysql_server_name='localhost'; //改成自己的mysql数据库服务器
        $mysql_username='root'; //改成自己的mysql数据库用户名
        $mysql_password='sh0ujish@ngqu@n'; //改成自己的mysql数据库密码
        $mysql_database='test'; //改成自己的mysql数据库名
        $a = $_GET['a'];
        $b = $_GET['b'];
	    $c = $_POST['shouji'];
		//查找是否绑定
		$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库
		mysql_query("set names 'utf8'"); //数据库输出编码
        mysql_select_db($mysql_database); //打开数据库
		$sql1 ="select * from bangding where fromUsername='$a'"; //SQL语句
        $result1 = mysql_query($sql1,$conn); //查询
		if (!mysql_num_rows($result1)) {
			//未绑定信息
            if (!$conn) {
        		$conn=mysql_connect($mysql_server_name,$mysql_username,$mysql_password); //连接数据库
	            $sql = "insert into bangding (fromUsername,shoujihao,bangdingshijian) values ('$a','$c',NOW())"; //SQL语句
        		$result=mysql_query($sql,$conn);
				
				$toUser = $a;
				//发送已绑定信息
				//调用_response_text()函数，回复发送者消息
		        $contentStr = "您已绑定资料,您参加的活动奖励将在次日发放!";
    			$resultStr = _reply_customer($toUser,$contentStr);
				
				mysql_close(); //关闭MySQL连接
			    echo "<script language=\"JavaScript\">alert(\"您已绑定资料,您参加的活动奖励将在次日发放!\");</script>"; 
            } else {
	            $sql = "insert into bangding (fromUsername,shoujihao,bangdingshijian) values ('$a','$c',NOW())"; //SQL语句
        		$result=mysql_query($sql,$conn);
				
				$toUser = $a;
				//发送已绑定信息
				//调用_response_text()函数，回复发送者消息
		        $contentStr = "您已绑定资料,您参加的活动奖励将在次日发放!";
    			$resultStr = _reply_customer($toUser,$contentStr);
				
				mysql_close(); //关闭MySQL连接
			    echo "<script language=\"JavaScript\">alert(\"您已绑定资料,您参加的活动奖励将在次日发放!\");</script>"; 
			}
		} else {
            $toUser = $a;
	        //发送已绑定信息
	        //调用_response_text()函数，回复发送者消息
	        $contentStr = "您已绑定资料,无法再次绑定!";
            $resultStr = _reply_customer($toUser,$contentStr);
			
			mysql_close(); //关闭MySQL连接
			echo "<script language=\"JavaScript\">alert(\"您已绑定资料,无法再次绑定!\");</script>"; 
		}
    } else {
    ?>
    <form action="<?php echo $_SERVER['PHP_SELF'].'?'.'a='.$_GET['a']?>" method="POST">
    <div align="center"><font size="10" face="arial" color="red">手机号码:</font></div>
    <div align="center"><input type="text" name="shouji" style="height:70px;width:400px;font-size:60px;"></div>
	<br>
    <input type="hidden" name="action" value="submitted">
    <div align="center"><input type="submit" name="submit"  style="color:#FF0000;height:70px;width:400px;font-size:50px;" value="保存"></div>
    </form>
    <?php
    }
	
	function _reply_customer($touser,$content){
    
    //更换成自己的APPID和APPSECRET
    $APPID="wxfb2d35da823285a0";
    $APPSECRET="06d33d386448488ca059ac62d56750e0";
    
    $TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$APPID."&secret=".$APPSECRET;
    
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $TOKEN_URL);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$output = curl_exec($ch);
	curl_close($ch);
	$jsoninfo = json_decode($output, true);
	$ACC_TOKEN = $jsoninfo["access_token"];
    
    $data = '{
        "touser":"'.$touser.'",
        "msgtype":"text",
        "text":
        {
             "content":"'.$content.'"
        }
    }';
    
    $url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=".$ACC_TOKEN;
    
    $result = https_post($url,$data);
    $final = json_decode($result);
    return $final;
}

function https_post($url,$data)
{
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url); 
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    if (curl_errno($curl)) {
       return 'Errno'.curl_error($curl);
    }
    curl_close($curl);
    return $result;
}
?>