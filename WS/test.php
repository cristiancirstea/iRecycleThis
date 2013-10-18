<?php

include_once './library/common.php';

//var_export($_GET);





//GetUsers();
//echo GenerareRandID();

//SaveLocalPicture($pictureStr);

?>

<form method="POST" action="http://192.168.16.104/ws/sendPicture.php">
    <input type="text" name="DATA" >
    <button type="submit">Trimite</button>
</form>