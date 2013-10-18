<?php
?>

<html>
<head>
    <link rel ="stylesheet" type = "text/css" href = "library/css/bootstrap.css">
<link rel ="stylesheet" type = "text/css" href = "library/css/my_CSS.css">
<script type = "text/javascript" src = "library/js/bootstrap.js"></script>
<script type = "text/javascript" src = "library/js/my_JS.js"></script>
<title> Test </title>
</head>

<body>
<div id = "myHeader">
	<div id = "Logo">
	</div>
</div>

<script type="text/javascript">

</script>   

<div class = "container" id = "container">

<form class="form-horizontal" name = "log" id = "formular" >

  <div class="control-group" id = "userPlace"style = "margin-left:auto; margin-right:auto;">
    <label class="control-label" for="inputEmail">User Name</label>
    <div class="controls">
      <input type="text" name = "user" id="inputEmail" placeholder="Email" >
    </div>
  </div>
  
  <div class="control-group" id = "passPlace">
    <label class="control-label" for="inputPassword"  >Password</label>
    <div class="controls">
      <input type="password" name = "Pass" id="inputPassword" placeholder="Password">
    </div>
  </div>
  
  <div class="control-group">
    <div class="controls">
<!--      <label class="checkbox">
        <input type="checkbox" id = "chk"> Remember me
      </label>-->
      <button type="button" class="btn btn-success btn-default" id = "buton" onclick = "ValidateData();">Log in</button>
    </div>
  </div>
  
</form>

</div>

</body>