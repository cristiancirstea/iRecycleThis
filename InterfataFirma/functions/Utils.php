<?php
//include_once '../library/config.php';

function GetDataFromWS($method,$params,$returnAssoc=false,$requestPage="request.php")
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
    if ($returnAssoc)
    {
       return json_decode($result,true); 
    }
    else{
        return $result;
    }
        
}

function PopuleazaTabelInregistrari()
{
   $data=GetDataFromWS("GetInregistrari", array(),true);
   if ($data["count"]===0)
   {
       echo "Nu sunt date!";
       return 0;
   }
   echo '<table class="table table-striped" id="tabel-inregistrari">';
        echo '<thead>';
        
            echo '<th class="hidden-elem">Id_inreg</th>';
            echo '<th>#</th>';
            echo '<th>Name</th>';
            echo '<th>Number</th>';
            echo '<th>Type</th>';
            echo '<th>Date/Time</th>';
            echo '<th>Longitude</th>';
            echo '<th>Latitude</th>';
            echo '<th>Picture</th>';
            echo '<th>On Map</th>';
            echo '<th>Check</th>';
            
        echo '</thead>';
        echo '<tbody>';
        $nr_inreg=0;
            foreach ($data["response"] as $inregistrare)
            { 
                $nr_inreg++;
//                foreach ($inregistrare as $column=>$value )
//                 {
                echo "<tr >";
                     echo '<td class="hidden-elem idInreg">'.$inregistrare["id_inreg"].'</td>';
                     echo '<td class="cell-center">'.$nr_inreg.'</td>';
                     echo '<td class="cell-center">'.$inregistrare["nume_ecologist"].'</td>';
                     echo '<td class="cell-center">'.$inregistrare["nr_tel"].'</td>';
                     echo '<td class="cell-center">'.$inregistrare["deseu"].'</td>';
                     echo '<td class="cell-center">'.MyFormatDate($inregistrare["data_inreg"],"d.M.y").
                             '<br>'.
                             MyFormatDate($inregistrare["ora_inreg"],"H:i").'</td>';
                     echo '<td class="cell-center">'.$inregistrare["longitudine"].'</td>';
                     echo '<td class="cell-center">'.$inregistrare["latitudine"].'</td>';
                     echo '<td>'.
                             '<button type="button" class="btn btn-small"'
                             . 'onclick="ShowPicture('."'".$GLOBALS["WSUrlRoot"].$inregistrare["path"]."'".');">'
                             .'<i class="icon-camera "></i>'
                             . '</button>'.
//                             '<img src="'.$GLOBALS["WSUrlRoot"].$inregistrare["path"].'"/>'.
                           '</td>';
                     echo '<td>'.'<button type="button" class="btn btn-small btn-danger btnMarkerMap" id="btnMarker'.$nr_inreg.'"'
                             . 'onclick="SeeMarker('."'"."btnMarker".$nr_inreg."'".');">'
                             .'<i class=" icon-map-marker icon-white"></i>'
                             . '</button>'.'</td>';
                     echo '<td>'.'<button type="button" class="btn btn-small btn-success btnVerifInreg" id="btnVerifica'.$nr_inreg.'"'
                             . 'onclick="VerificaInregistrare('."'"."btnVerifica".$nr_inreg."'".');">'
                             .'<i class="icon-ok icon-white"></i>'
                             . '</button>'.'</td>';
                     
//                     echo $column." - ".$value."<br>";
//                 }
                     echo "</tr>";
            }
        echo '</tbody>';
   echo '</table>';
   $row_count=$data["count"];
   unset($data);
    return $row_count;
}
function MyFormatFloat($aFloat,$decimals = 2,$dec_point = '.',$thousands_sep = ',' )
{
    return number_format($aFloat,$decimals,$dec_point,$thousands_sep);
}
function MyFormatDate($aDateString,$format='d.m.Y')
{
   $aDate=new DateTime(''.$aDateString);
   return $aDate->format($format);
}

?>

