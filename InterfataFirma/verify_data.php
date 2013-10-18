<?php

include_once './library/common.php';
//var_export($_POST);
$responseJSON= GetDataFromWS("CheckLoginInterfataFirma",array("USER"=>$_POST["username"],"PASSWORD"=>$_POST["password"]));

$response=  json_decode($responseJSON,true);
var_export($response);
if (!$response["count"])
    header ("Location:index.php?u=".$_POST["username"]);
else
   header ("Location:dashboard.php"); 
unset($response);

?>

