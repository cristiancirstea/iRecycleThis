<?php
include_once './library/common.php';
include './include/header.php';
include './include/top.php';
if (isset($_REQUEST["id_i"]))
{
    $id_i=  intval($_REQUEST["id_i"]);
    $data=GetDataFromWS("GetCoordonate", array("id_i"=>$id_i));
}
else{
    $data=GetDataFromWS("GetCoordonate", array()); 
}

?>  
<script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js?key=&sensor=true">
    </script>
 <script type="text/javascript">
//        var myLatlng = [new google.maps.LatLng(44.4325,26.103889),
//                  new google.maps.LatLng(-25.363882,131.044922),
//                  new google.maps.LatLng(15.363882,31.044922)]; 
         var dataJSON;
              <?php
                echo "dataJSON=JSON.parse('".trim($data)."');";
              ?>
          obiecte=dataJSON.response;
          for (var i=0;i<obiecte.length;i++)
          {
              obiecte[i].path="<?php echo $GLOBALS["WSUrlRoot"]?>"+obiecte[i].path;
          }
//    var obiecte=[{lat:44.444618,long:26.054705,nume:"Alexandra",deseu:"hartie"},
//                {lat:44.444619,long:26.055,nume:"Cristi",deseu:"plastic"},
//                {lat:44.445618,long:26.054705,nume:"Buggy",deseu:"ceva"}];
        google.maps.event.addDomListener(window, 'load', initializeMap3);
    </script>
    <div class="alert alert-info" id="map-alert">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Heads up!</strong>
        <span>There are <?php 
            $dataAr=  json_decode($data,true);
            $nr_alerte=$dataAr["count"];
            echo $nr_alerte;?> alerts. 
        </span>
      </div>
    <div class="container well" id="container-map">
        <div id="map-canvas" style=" height: 100%;"></div>   
    </div>
<?php
unset($data);
include './include/footer.php';
?>