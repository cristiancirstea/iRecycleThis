<?php
$LOGIN_PAGE=true;
include_once './library/common.php';
//include_once './functions/WSUtils.php';
ResetSessionVariable();
//var_export($_POST);
//$responseJSON= GetDataFromWS("CheckLoginInterfataFirma",array("USER"=>$_POST["username"],"PASSWORD"=>$_POST["password"]));

$data=array(
  "user"=>$_POST["username"],
    "parola"=>$_POST["password"]
);
$response=  ws_rest("GET", "/login","",$data,1);

//var_export($response);
//return;
//$response=  json_decode($responseJSON,true);
//var_export($response);
////return;
if (!$response["count"])
{
    header ("Location:index.php?u=".$_POST["username"]);
}
else
{
     if (strlen(session_id() )<1) session_start();
     $_SESSION['ULogat']=true;
     $_SESSION['UName']=$response["response"][0]["prenume"]." ".$response["response"][0]["nume"];
     $_SESSION['UID']=$response["response"][0]["id_u"];
     header ("Location:dashboard.php");  
}
 
unset($response);

?>

