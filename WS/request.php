<?php
//la o aplicatie in php externa se foloseste asta!!!!!
//function GetDataFromWS($method,$params,$requestPage="request.php")
//{
//    $params["method"] = $method;
//   $params[$GLOBALS["_WSUserRqParam"]] = $GLOBALS["WSUser"];
//   $params[ $GLOBALS["_WSPasswordRqParam"] ]= $GLOBALS["WSPassword"];
//   $params[$GLOBALS["_WSTypeRqParam"]] = $GLOBALS["WSTypeOfRequest"];
//
//$postdata = http_build_query(
//    $params
//);
//
//$opts = array('http' =>
//    array(
//        'method'  => 'POST',
//        'header'  => 'Content-type: application/x-www-form-urlencoded',
//        'content' => $postdata
//    )
//);
//
//$context  = stream_context_create($opts);
//
//$result = file_get_contents($GLOBALS["WSUrlRoot"]."/".$requestPage, false, $context);
//return $result;
//}


include_once './library/common.php';

if (isset($_REQUEST["method"]))
{
    $method=$_REQUEST["method"];
}
else
{
    $method="";
}



  switch ($method)
  {
  case "SaveInregistrare":
      if (isset($_REQUEST["tip"]))
        {
            $tip=$_REQUEST["tip"];
        }
        else
        {
            $tip=1;
        } 
      if (isset($_REQUEST["Nume"]))
        {
            $nume=$_REQUEST["Nume"];
        }
        else
        {
            $nume="";
        }
        if (isset($_REQUEST["Numar"]))
        {
            $nr_tel=$_REQUEST["Numar"];
        }
        else
        {
            $nr_tel="";
        }
        if (isset($_REQUEST["latitude"]))
        {
            $lat=$_REQUEST["latitude"];
        }
        else{
           $lat=-1; 
        }
            
        if (isset($_REQUEST["longitude"]))
        {
            $long=$_REQUEST["longitude"];
        }
        else
        {
            $long=-1;
        }
      $isPicture=(isset($_REQUEST["photo"]));
      SaveInregistrare($tip,(($isPicture)?$_REQUEST["photo"]:"") ,  $lat,$long, $nume,"dummy",$nr_tel );
      break;
  case "test":
            if (isset($_REQUEST["DATA"]))
      {
          TestVB ($_REQUEST["DATA"]);
          echo $_REQUEST["DATA"];
      }
      if (isset($_REQUEST["Gina"]))
          TestVB ($_REQUEST["Gina"]);
      if (isset($_REQUEST["Bogdan"]))
          TestVB ($_REQUEST["Bogdan"]);
    break;
  case "GetUsers":
      GetUsers();
      break;
  case "CheckLoginInterfataFirma":
      if (isset($_REQUEST["USER"]))
      {
         $user= ($_REQUEST["USER"]);
      }
      else
          $user="";
      if (isset($_REQUEST["PASSWORD"]))
      {
         $passw= ($_REQUEST["PASSWORD"]);
      }
      else
          $passw="";
      CheckLoginInterfataFirma($user, $passw);
    break;
    case "GetInregistrari":
        GetInregistrari();
      break;
  case "GetCoordonate":
      if (isset($_REQUEST["id_i"]))
      {
        GetCoordonate($_REQUEST["id_i"]);
      }
      else
          GetCoordonate(-1);
      break;
    case "ValidateInregistrare":
        var_dump($_REQUEST);
        if (isset($_REQUEST["id_inreg"]))
      {
         $id_inreg= ($_REQUEST["id_inreg"]);
         ValidateInregistrare($id_inreg);
      }
        
      break;
  }
?>

