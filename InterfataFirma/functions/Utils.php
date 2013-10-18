<?php


function GetDataFromWS($method,$params,$requestPage="request.php")
{
    $params["method"] = $method;
   $params[$GLOBALS["_WSUserRqParam"]] = $GLOBALS["WSUser"];
   $params[ $GLOBALS["_WSPasswordRqParam"] ]= $GLOBALS["WSPassword"];
   $params[$GLOBALS["_WSTypeRqParam"]] = $GLOBALS["WSTypeOfRequest"];

$postdata = http_build_query(
    $params
);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);

$context  = stream_context_create($opts);

$result = file_get_contents($GLOBALS["WSUrlRoot"]."/".$requestPage, false, $context);
return $result;
}



?>

