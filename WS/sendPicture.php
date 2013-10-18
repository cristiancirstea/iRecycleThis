<?php

include_once './library/common.php';
if (isset($_POST["POZA"]))
{
  SaveInregistrare(1,$_POST["POZA"] , 234, 23, 'Vasile', 'Grigore', '082132132131232');  
}

return;

if (isset($_POST["DATA"]))
{
    TestVB ($_POST["DATA"]);
    echo $_POST["DATA"];
}
if (isset($_POST["Gina"]))
    TestVB ($_POST["Gina"]);
if (isset($_POST["Bogdan"]))
    TestVB ($_POST["Bogdan"]);


if (isset($_GET["DATA"]))
    TestVB ($_GET["DATA"]);
if (isset($_GET["Gina"]))
    TestVB ($_GET["Gina"]);
if (isset($_GET["Bogdan"]))
    TestVB ($_GET["Bogdan"]);





?>
