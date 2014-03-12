<?php
include_once './library/common.php';
include './include/header.php';
include './include/top.php';

?>

<script type="text/javascript">
    var intervalRefresh=500;
    var runningRefresh;
    if (intervalRefresh>0)
        {
          runningRefresh=  setInterval(function(){
            GetDataFromWS("./functions/Utils.php",
                    '{"method":"PopuleazaTabelInregistrari"}',
                    "GET",
                    function(msg){
                        //trebuie optimizat ca sa faca refresh doar cand se adauga cv nou
                       if ($("#container-dashboard").html()!==msg) 
                           $("#container-dashboard").html(msg);
                      }); 
          },intervalRefresh);  
        }
  
</script>
<div class="container" id="container-dashboard">
    <?php
    PopuleazaTabelInregistrari();
    ?>
</div>
<?php
include_once './include/footer.php';
?>

