<?php
    /*
    Name: Export Structure
    URI: http://joesen.f2blog.com/index.php?load=read&id=234
    Version: 1.0
    Author: Joesen & Korsen
    Author URI: http://joesen.f2blog.com
    */
    /*
    77行 更改配置连接自己的数据库
    */


    error_reporting( E_ERROR | E_WARNING | E_PARSE );// This will NOT report uninitialized variables
    if ( !defined( 'PMA_GRAB_GLOBALS_INCLUDED' ) ) {
        define( 'PMA_GRAB_GLOBALS_INCLUDED' , 1 );
        if ( phpversion() < "4.1.0" ) {
            $PHP_SELF = $HTTP_SERVER_VARS['PHP_SELF'];
            $HTTP_HOST = $HTTP_SERVER_VARS['HTTP_HOST'];
            $REMOTE_ADDR = $HTTP_SERVER_VARS['REMOTE_ADDR'];
        } else {
            $PHP_SELF = $_SERVER['PHP_SELF'];
            $HTTP_HOST = $_SERVER['HTTP_HOST'];
            $REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];
        }

        if ( !empty( $_GET ) ) {
            $fix_vars = array( '_GET' );
            for ( $n = 0 ; $n < sizeof( $fix_vars ) ; ++$n ) {
                if ( is_array( $GLOBALS[$fix_vars[$n]] ) ) {
                    while ( list( $k , $v ) = each( $GLOBALS[$fix_vars[$n]] ) ) {
                        $GLOBALS[$fix_vars[$n]][$k] = $v;
                        $GLOBALS[$k] = $v;
                    }
                    @reset( $GLOBALS[$fix_vars[$n]] );
                }
            }
        } else if ( !empty( $HTTP_GET_VARS ) ) {
            $fix_vars = array( 'HTTP_GET_VARS' );
            for ( $n = 0 ; $n < sizeof( $fix_vars ) ; ++$n ) {
                if ( is_array( $GLOBALS[$fix_vars[$n]] ) ) {
                    while ( list( $k , $v ) = each( $GLOBALS[$fix_vars[$n]] ) ) {
                        $GLOBALS[$fix_vars[$n]][$k] = $v;
                        $GLOBALS[$k] = $v;
                    }
                    @reset( $GLOBALS[$fix_vars[$n]] );
                }
            }
        } // end if

        if ( !empty( $_POST ) ) {
            $fix_vars = array( '_POST' );
            for ( $n = 0 ; $n < sizeof( $fix_vars ) ; ++$n ) {
                if ( is_array( $GLOBALS[$fix_vars[$n]] ) ) {
                    while ( list( $k , $v ) = each( $GLOBALS[$fix_vars[$n]] ) ) {
                        $GLOBALS[$fix_vars[$n]][$k] = $v;
                        $GLOBALS[$k] = $v;
                    }
                    @reset( $GLOBALS[$fix_vars[$n]] );
                }
            }
        } else if ( !empty( $HTTP_POST_VARS ) ) {
            $fix_vars = array( 'HTTP_POST_VARS' );
            for ( $n = 0 ; $n < sizeof( $fix_vars ) ; ++$n ) {
                if ( is_array( $GLOBALS[$fix_vars[$n]] ) ) {
                    while ( list( $k , $v ) = each( $GLOBALS[$fix_vars[$n]] ) ) {
                        $GLOBALS[$fix_vars[$n]][$k] = $v;
                        $GLOBALS[$k] = $v;
                    }
                    @reset( $GLOBALS[$fix_vars[$n]] );
                }
            }
        } // end if
    }

    //Set Server
    //	$dbserver = "115.28.49.146";
    //	$dbusername = "root";
    //	$dbpassword = "geethin.com";
    $dbserver = "localhost";
    $dbusername = "root";
    $dbpassword = "root";
    $mysql_conn = @mysql_connect( "$dbserver" , "$dbusername" , "$dbpassword" ) or die( "Mysql connect is error." );
    mysql_set_charset( 'utf8' , $mysql_conn );//没有这句的话，备注便是乱码tongdragon

    if ( $action != "" ) {
        $seektable = @implode( ";" , $arr_seektable );
        if ( $seektable != "" ) {
            $seektable = ";$seektable;";
        }
        //echo $seektable;
    }

    //export data
    if ( $action == "export" && $database != "" ) {
        $temp_title = "";
        $temp_title .= "<html xmlns:o=\"urn:schemas-microsoft-com:office:office\"\n";
        $temp_title .= "xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\n";
        $temp_title .= "xmlns=\"http://www.w3.org/TR/REC-html40\">\n";
        $temp_title .= "\n";
        $temp_title .= "<head>\n";
        $temp_title .= "<meta http-equiv=Content-Type content=\"text/html; charset=utf8\">\n";
        $temp_title .= "<meta name=ProgId content=Excel.Sheet>\n";
        $temp_title .= "<meta name=Generator content=\"Microsoft Excel 10\">\n";
        $temp_title .= "<!--[if gte mso 9]><xml>\n";
        $temp_title .= "<x:ExcelWorkbook>\n";
        $temp_title .= "<x:ExcelWorksheets>\n";
        $temp_title .= "<x:ExcelWorksheet>\n";
        $temp_title .= "<x:Name></x:Name>\n";
        $temp_title .= "    <x:WorksheetOptions>\n";
        $temp_title .= "    <x:DisplayGridlines/>\n";
        $temp_title .= "    </x:WorksheetOptions>\n";
        $temp_title .= "    </x:ExcelWorksheet>\n";
        $temp_title .= "    </x:ExcelWorksheets>\n";
        $temp_title .= "    </x:ExcelWorkbook>\n";
        $temp_title .= "</xml><![endif]-->\n";
        $temp_title .= "<style type=\"text/css\">\n";
        $temp_title .= "<!--\n";
        $temp_title .= ".LeftTop {\n";
        $temp_title .= "	border-top-width: 1pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 1pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "	background: #CCCCCC;\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftTopDash {\n";
        $temp_title .= "	border-top-width: 1pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "	background: #CCCCCC;\n";
        $temp_title .= "}\n";
        $temp_title .= ".Left {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 1pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftDash {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;	\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftRight {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 1pt;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftButtom {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 1pt;\n";
        $temp_title .= "	border-left-width: 1pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;	\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftButtomDash {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 1pt;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 0px;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;	\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftButtomRight {\n";
        $temp_title .= "	border-top-width: 0.5pt;\n";
        $temp_title .= "	border-bottom-width: 1pt;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 1pt;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;	\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftTopRight {\n";
        $temp_title .= "	border-top-width: 1pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 1pt;\n";
        $temp_title .= "	border-right-width: 1pt;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "}\n";
        $temp_title .= ".LeftTopRightDash {\n";
        $temp_title .= "	border-top-width: 1pt;\n";
        $temp_title .= "	border-bottom-width: 0px;\n";
        $temp_title .= "	border-left-width: 0.5pt;\n";
        $temp_title .= "	border-right-width: 1pt;\n";
        $temp_title .= "	border-top-color: #000000;\n";
        $temp_title .= "	border-right-color: #000000;\n";
        $temp_title .= "	border-left-color: #000000;\n";
        $temp_title .= "	border-bottom-color: #000000;\n";
        $temp_title .= "	border-top-style: solid;\n";
        $temp_title .= "	border-right-style: solid;\n";
        $temp_title .= "	border-bottom-style: solid;\n";
        $temp_title .= "	border-left-style: solid;\n";
        $temp_title .= "	background: #CCCCCC;\n";
        $temp_title .= "}\n";
        $temp_title .= "table {\n";
        $temp_title .= "	font-family: \"Tamhoma\", \"Helvetica\", \"sans-serif\";\n";
        $temp_title .= "	font-size: 10px;\n";
        $temp_title .= "}\n";
        $temp_title .= ".title {\n";
        $temp_title .= "	font-weight: bold;\n";
        $temp_title .= "	align: center;\n";
        $temp_title .= "	text-align: center;\n";
        $temp_title .= "	font-size: 16px;\n";
        $temp_title .= "}\n";
        $temp_title .= "-->\n";
        $temp_title .= "</style>\n";
        $temp_title .= "</head>\n";
        $temp_title .= "<body text=\"#000000\" leftmargin=\"4\" topmargin=\"0\">\n";

        $temp_buffer .= "<table width=\"489pt\" border=\"0\" align=\"center\" cellpadding=\"4\" cellspacing=\"0\">\n";
        $temp_buffer .= "  <tr> \n";
        $temp_buffer .= "    <td colspan=\"5\" align=\"center\" class=\"title\"  style=\"width:30pt\">数据表</td>\n";
        $temp_buffer .= "  </tr>\n";

        mysql_select_db( $database , $mysql_conn );
        $result = mysql_list_tables( $database , $mysql_conn );
        $index = 0;
        while ( $row_array = mysql_fetch_array( $result ) ) {
            $table_name = $row_array["0"];

            if ( strpos( ";$seektable" , ";$table_name;" ) > 0 || $seektable == "" ) {
                $index++;

                $temp_buffer .= "  <tr valign=\"bottom\"> \n";
                $temp_buffer .= "    <td height=\"31\" colspan=\"5\">表格 $index: $table_name</td>\n";
                $temp_buffer .= "  </tr>\n";
                $temp_buffer .= "  <tr height=\"25\"> \n";
                $temp_buffer .= "    <td width=\"30pt\" align=\"center\" class=\"LeftTop\"  style=\"width:30pt\" nowrap>ID</td>\n";
                $temp_buffer .= "    <td width=\"78pt\" class=\"LeftTopDash\" style=\"width:78pt\" nowrap>字段名称</td>\n";
                $temp_buffer .= "    <td width=\"61pt\" class=\"LeftTopDash\" style=\"width:61pt\"  nowrap>数据类型</td>\n";
                $temp_buffer .= "    <td width=\"20pt\" class=\"LeftTopDash\"  style=\"width:30pt\" nowrap>Null(空)</td>\n";
                $temp_buffer .= "    <td width=\"304pt\" class=\"LeftTopRightDash\" style=\"width:304pt\"  nowrap>备注</td>\n";
                $temp_buffer .= "  </tr>\n";


                $j = 0;
                $field_result = mysql_query( "SELECT  * FROM Information_schema.columns WHERE table_Name='$table_name'" , $mysql_conn );
                $num_row = mysql_num_rows( $field_result );
                while ( $arr_field = mysql_fetch_array( $field_result ) ) {
                    $j++;
                    $name = $arr_field['COLUMN_NAME'];
                    $type = $arr_field['DATA_TYPE'];
                    $not_null = $arr_field['IS_NULLABLE'];
                    $default_value = $arr_field['COLUMN_DEFAULT'];
                    $extra_value = $arr_field['COLUMN_COMMENT'];

                    //show keys
                    $keys_result = mysql_query( "show keys from $table_name" , $mysql_conn );
                    $arr_keys = mysql_fetch_array( $keys_result );
                    $key_name = $arr_keys['Key_name'];
                    $key_field = $arr_keys['Column_name'];
                    if ( $name == $key_field ) {
                        $key_value = "主键";
                    } else {
                        $key_value = "";
                    }
                    //echo $key_value.$key_field;
                    if ( $key_value != "" ) {
                        $not_null = "<b>$key_value</b>";
                    }

                    //type
                    $type = eregi_replace( 'BINARY' , '' , $type );
                    $type = eregi_replace( 'ZEROFILL' , '' , $type );
                    $type = eregi_replace( 'UNSIGNED' , '' , $type );

                    $binary = eregi( 'BINARY' , $arr_field['Type'] , $test );
                    $unsigned = eregi( 'UNSIGNED' , $arr_field['Type'] , $test );
                    $zerofill = eregi( 'ZEROFILL' , $arr_field['Type'] , $test );
                    $attribute = '';
                    if ( $binary ) {
                        $attribute = 'BINARY';
                    }
                    if ( $unsigned ) {
                        $attribute = 'UNSIGNED';
                    }
                    if ( $zerofill ) {
                        $attribute = 'UNSIGNED ZEROFILL';
                    }

                    //last record
                    if ( $num_row == $j ) {
                        $temp_buffer .= "        <tr height=\"25\"> \n";
                        $temp_buffer .= "          <td width=\"30pt\" align=\"center\"  class=\"LeftButtom\" style=\"width:30pt\" nowrap>$j</td>\n";
                        $temp_buffer .= "          <td width=\"78pt\"  class=\"LeftButtomDash\" style=\"width:78pt\" nowrap>$name</td>\n";
                        $temp_buffer .= "          <td width=\"61pt\"  class=\"LeftButtomDash\" style=\"width:61pt\" nowrap>$type</td>\n";
                        $temp_buffer .= "          <td width=\"30pt\"  class=\"LeftButtomDash\" style=\"width:30pt\" nowrap>$not_null</td>\n";
                        $temp_buffer .= "          <td width=\"284pt\"  class=\"LeftButtomRight\" style=\"width:304pt\" nowrap>$extra_value</td>\n";
                        $temp_buffer .= "        </tr>\n";
                    } else {
                        $temp_buffer .= "        <tr height=\"25\"> \n";
                        $temp_buffer .= "          <td width=\"30pt\" align=\"center\"  class=\"Left\" style=\"width:30pt\" nowrap>$j</td>\n";
                        $temp_buffer .= "          <td width=\"78pt\"  class=\"LeftDash\" style=\"width:78pt\" nowrap>$name</td>\n";
                        $temp_buffer .= "          <td width=\"61pt\"  class=\"LeftDash\" style=\"width:61pt\" nowrap>$type</td>\n";
                        $temp_buffer .= "          <td width=\"30pt\"  class=\"LeftDash\" style=\"width:30pt\" nowrap>$not_null</td>\n";
                        $temp_buffer .= "          <td width=\"284pt\"  class=\"LeftRight\" style=\"width:304pt\" nowrap>$extra_value</td>\n";
                        $temp_buffer .= "        </tr>\n";

                    }
                }//end while
            }//end if
        } //end while
        $temp_buffer .= "</table>\n";

        //export
        $filename = "$database";
        header( "Content-type: application/zip" );
        header( "Content-disposition: inline; filename=$filename.xls" );
        echo $temp_title;
        echo $temp_buffer;
        echo $temp_foot;
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf8">
    <title>Database Structure Export</title>
</head>

<body topmargin="0">
<form name="form1" method="post" action="">
    <table width="100%" border="0" cellspacing="1" cellpadding="6">
        <tr>
            <td height="28" align="center"><strong>Database Structure Export</strong></td>
        </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#000000">
        <tr>
            <td>
                <table width="100%" border="0" cellspacing="1" cellpadding="4">
                    <tr bgcolor="#FFFFFF">
                        <td width="10%" align="right" bgcolor="#CCCCCC">Database:</td>
                        <td width="30%">
                            <select name="database"
                                    onchange="Javascript:this.form.action='<?= $PHP_SELF ?>';this.form.submit();">
                                <option value=""> - Please select database -</option>
                                <?
                                    $result = mysql_list_dbs( $mysql_conn );
                                    while ( $row_array = mysql_fetch_row( $result ) ) {
                                        $list_data = $row_array[0];
                                        if ( $list_data == $database ) {
                                            $selected = "selected";
                                        } else {
                                            $selected = "";
                                        }
                                        echo "<option value=\"$list_data\" $selected>$list_data</option> \n";
                                    }
                                ?>
                            </select>
                        </td>
                        <td width="60%">
                            &nbsp;
                        </td>
                    </tr>
                    <tr bgcolor="#FFFFFF">
                        <td width="10%" align="right" bgcolor="#CCCCCC" valign="top">Table:</td>
                        <td width="30%">
                            <?
                                if ( $database != "" ) {
                                    echo "<select name=\"arr_seektable[]\" size=\"6\" multiple> \n";
                                    echo "<option value=\"\"> - - - - -  All Table - - - - - -</option> \n";
                                    mysql_select_db( $database , $mysql_conn );
                                    $result = mysql_list_tables( $database , $mysql_conn );
                                    while ( $row_array = mysql_fetch_array( $result ) ) {
                                        $table_name = $row_array["0"];
                                        $selected = ( strpos( ";$seektable" , ";$table_name;" ) > 0 ) ? "selected" : "";
                                        echo "<option value=\"$table_name\" $selected>$table_name</option> \n";
                                    }
                                    echo "</select> \n";
                                }
                            ?>
                        </td>
                        <td width="60%" nowrap>
                            <? if ( $database != "" ) { ?>
                                <INPUT TYPE="submit" name="confirm" value="Confirm Select"
                                       onclick="this.form.action='<?= "$PHP_SELF?action=confirm" ?>';">
                                <br><br>
                                <input type="submit" name="export" value="  Export Excel  "
                                       onclick="this.form.action='<?= "$PHP_SELF?action=export" ?>';">
                            <? } ?>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <?
        //list table
        if ( $database != "" ) {
            mysql_select_db( $database , $mysql_conn );
            $result = mysql_list_tables( $database , $mysql_conn );
            $index = 0;

            while ( $row_array = mysql_fetch_array( $result ) ) {
                $table_name = $row_array["0"];

                //echo ";$seektable -- $table_name";
                //echo strpos(";$seektable",";$table_name;");
                if ( strpos( ";$seektable" , ";$table_name;" ) > 0 || $seektable == "" ) {
                    $index++;
                    ?>
                    <br>
                    表 <?= "$index : $table_name" ?>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#000000">
                        <tr>
                            <td>
                                <table width="100%" border="0" cellspacing="1" cellpadding="4">
                                    <tr bgcolor="#CCCCCC">
                                        <td width="5%">ID</td>
                                        <td width="10%">字段名称</td>
                                        <td width="10%">数据类型</td>
                                        <td width="5%">Null(空)</td>
                                        <td width="50%">备注</td>
                                    </tr>
                                    <?
                                        $j = 0;
                                        $field_result = mysql_query( "SELECT  * FROM Information_schema.columns WHERE table_Name='$table_name'" , $mysql_conn );

                                        while ( $arr_field = mysql_fetch_array( $field_result ) ) {
                                            $j++;
                                            //print_r($arr_field);
                                            $name = $arr_field['COLUMN_NAME'];
                                            $type = $arr_field['DATA_TYPE'];
                                            $not_null = $arr_field['IS_NULLABLE'];
                                            $default_value = $arr_field['COLUMN_DEFAULT'];
                                            $extra_value = $arr_field['COLUMN_COMMENT'];


                                            //show keys
                                            $keys_result = mysql_query( "show keys from $table_name" , $mysql_conn );
                                            $arr_keys = mysql_fetch_array( $keys_result );
                                            $key_name = $arr_keys['Key_name'];
                                            $key_field = $arr_keys['Column_name'];
                                            if ( $name == $key_field ) {
                                                $key_value = "主键";
                                            } else {
                                                $key_value = "";
                                            }
                                            //echo $key_value.$key_field;
                                            if ( $key_value != "" ) {
                                                $not_null = "<b>$key_value</b>";
                                            }

                                            //type
                                            $type = eregi_replace( 'BINARY' , '' , $type );
                                            $type = eregi_replace( 'ZEROFILL' , '' , $type );
                                            $type = eregi_replace( 'UNSIGNED' , '' , $type );

                                            $binary = eregi( 'BINARY' , $arr_field['Type'] , $test );
                                            $unsigned = eregi( 'UNSIGNED' , $arr_field['Type'] , $test );
                                            $zerofill = eregi( 'ZEROFILL' , $arr_field['Type'] , $test );
                                            $attribute = '';
                                            if ( $binary ) {
                                                $attribute = 'BINARY';
                                            }
                                            if ( $unsigned ) {
                                                $attribute = 'UNSIGNED';
                                            }
                                            if ( $zerofill ) {
                                                $attribute = 'UNSIGNED ZEROFILL';
                                            }
                                            ?>
                                            <tr bgcolor="#FFFFFF">
                                                <td nowrap><?= $j ?></td>
                                                <td nowrap><?= $name ?></td>
                                                <td nowrap><?= $type ?></td>
                                                <td nowrap><?= $not_null ?></td>
                                                <td nowrap><?= $extra_value ?></td>
                                            </tr>
                                        <? } ?>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <?
                }//end if
            }//end while
        }//end if
    ?>
</form>
<?
    mysql_close( $mysql_conn );
?>
</body>
</html>