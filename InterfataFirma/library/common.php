<?php
include_once './functions/Utils.php';

 if (strlen(session_id() )<1) session_start();
 
 if (!isset($GLOBALS['LOGIN_PAGE'])||$GLOBALS['LOGIN_PAGE']===false)
 {
    if (!isset($_SESSION['ULogat'])||($_SESSION['ULogat']!==true))
    {
        header("location:index.php");
    }
 }
 
 function ResetSessionVariable()
{
     unset($_SESSION['UID_Logare']);
     unset($_SESSION['ULogat']);;
     unset($_SESSION['UName']);
     unset($_SESSION['UID']);
}
?>