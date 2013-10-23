<?php
include "./include/header.php";
$LOGIN_PAGE=true;
include_once './library/common.php';
ResetSessionVariable();
?>

<div id = "myHeader">
	<div id = "Logo">
	</div>
</div>

<script type="text/javascript">

</script>   

<div class = "my_container" id = "containerLogin">

    <form class="form-horizontal " name = "log" id = "formular" action="verify_data.php" method="POST">

  <div class="control-group" id = "userPlace"style = "margin-left:auto; margin-right:auto;">
    <label class="control-label" for="inputEmail">User Name</label>
    <div class="controls">
      <input type="text" name = "username" id="inputEmail" placeholder="Email" 
             value=
             "<?php
                if (isset($_GET["u"]))
                {
                    echo $_GET["u"];
                }
             ?>">
    </div>
  </div>
  
  <div class="control-group" id = "passPlace">
    <label class="control-label" for="inputPassword"  >Password</label>
    <div class="controls">
      <input type="password" name = "password" id="inputPassword" placeholder="Password">
    </div>
  </div>
  
  <div class="control-group">
    <!--<div class="controls">-->
<!--      <label class="checkbox">
        <input type="checkbox" id = "chk"> Remember me
      </label>-->
        <button type="button" class="btn btn-success span6" id = "butonLogin" onclick = "ValidateDataLogin();">Log in</button>
    <!--</div>-->
  </div>
  
</form>

</div>

<?php
include "./include/footer.php";
?>