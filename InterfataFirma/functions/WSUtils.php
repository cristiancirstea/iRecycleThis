<?php

//require_once '../library/config.php';
$_ws_url="http://localhost/WebService/service";
$_ws_option_defaults = array(
    CURLOPT_HEADER => false,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT=>2,
    CURLOPT_SSL_VERIFYPEER=> false
  );
$_ws_handle;

function cURLcheckBasicFunctions() 
{ 
  if( !function_exists("curl_init") && 
      !function_exists("curl_setopt") && 
      !function_exists("curl_exec") && 
      !function_exists("curl_close") ) return false; 
  else return true; 
}
/**
 * Creaza comunicarea cu Web Service.<br>
 * 
 * 
 * @global string $_ws_url              URL catre Web Service
 * @global resource $_ws_handle         returnata de curl_init
 * @global array $_ws_option_defaults   optiunile default
 * @param String $method                GET/POST/PUT/DELETE
 * @param String $uri                   eg: "/clienti/106"
 * @param String $querry                Parametrii trasmisi in link
 *                                      <br>"?param1=value1..."
 * @param Array_Ref $params             referinta catre vectorul cu parametrii
 *                                      transmisi prin POST(ascunsi de link)
 *                                      <br>$data=array("key"="j2R2114S389bY7V1l36z6Qo1x");
 * @param Number $returnType             <pre>0-String
 *                                           1-Vector Asociativ
 *                                           2-Obiect</pre>
 *                                      default <b>String</b>
 * @param AssocArray $options
 * @return mixed JSON String           
 */
function ws_rest($method,$uri,$querry=NULL,$params=NULL,$returnType=0,$options=NULL,$showErrMessage=true){
  global $_ws_url,$_ws_handle,$_ws_option_defaults;
   // Connect 
  if(!isset($_ws_handle)) $_ws_handle = curl_init();
  if ($method=="GET" && (string)$querry=="" && $params!==NULL)
  {
      $querry=  http_build_query($params);
  }
  if ($method=="PUT")
      $params=  json_encode ($params);
  if ((string)$querry!=="")
      $querry="?".$querry;
  // Compose querry
  $options = array(
    CURLOPT_URL => $_ws_url.$uri.$querry,
    CURLOPT_CUSTOMREQUEST => $method, // GET POST PUT DELETE 
    CURLOPT_POSTFIELDS => $params,
  ); 
      curl_setopt_array($_ws_handle,($options + $_ws_option_defaults)); 
   
//  echo $_ws_url.$uri.$querry;
  // send request and wait for responce
  $responce =  curl_exec($_ws_handle);
 // var_export($responce);
      
  //curl_close($_ws_handle);
 // unset($_ws_handle);
  switch ($returnType) {
      case 0:
          return($responce);
          break;
      case 1:
          $arr_resp=json_decode($responce,true);
          if ($arr_resp)
          { if ($showErrMessage && array_key_exists("error", $arr_resp))
                echo "<script >".
                      'ArataMesajAlerta("Eroare",
                              "'.$arr_resp["error"].'",
                              "danger","",false);'.
                      "</script>";
          }
          else
              $arr_resp=array();
            return $arr_resp;
          break;
      case 2:
          return(json_decode($responce));
          break;
      default:
          return null;
          break;
  }
  
}
function close_ws_handle()
{
    global $_ws_handle;
    if ($_ws_handle) curl_close ($_ws_handle);
}
?>
