<?php

?>

  <div id = "myHeader" class = "container header">
	<div class="row" id="logo-row">
            <div id = "Logo" class = "span7"></div>
              <div class="pull-right" id="container-userName">
                  <span id="numeUser">   <?php
                     echo "Welcome ".$_SESSION["UName"]."!";
                     ?>
                  </span>
                  <a href="index.php" class="btn btn-success" id="btnLogOut">Log Out</a>
              </div>
        </div>
      <div class="row">
        <div id = "menu" class = " container imagini" align = "right">
            <table class = "pull-right">
                <tr>
                <td><a href = "dashboard.php" id="img1"></a></td>
                <td><a href = "map.php" id="img2"></a></td>
                </tr>
            </table> 
        </div>
      </div>
    </div>