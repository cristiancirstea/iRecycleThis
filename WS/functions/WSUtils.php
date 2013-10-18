<?php

 //o sa fie inclus in common.php


function CheckSubmitData()
{
    if (GET_POST_VAL("urq","",true)!="")
    {
        //echo "u/";
       $GLOBALS["_USER_REQUEST_"]=GET_POST_VAL("urq","",true);
    }
    else 
    {
        //echo "uu/";
        unset($GLOBALS["_USER_REQUEST_"]);
    }
    if (GET_POST_VAL("prq","",true)!="")
    {
        //echo "p/";
        $GLOBALS["_PASSWORD_REQUEST_"]=GET_POST_VAL("prq","",true);
    }
    else 
    {
       // echo "up/";
        unset($GLOBALS["_PASSWORD_REQUEST_"]);
    }
    if (GET_POST_VAL("trq","",true)!="")
    {
        //echo "t/";
        $GLOBALS["_TYPE_OF_REQUEST_"]=GET_POST_VAL("trq","",true);
    }
    else 
    {
        //echo "ut/";
        unset($GLOBALS["_TYPE_OF_REQUEST_"]);
    }
}
/**
 * Cauta constanta, cu numele dat ca parametru, in $_GET sau $_POST 
 * si retuneaza valoarea ei sau $defValue daca nu e gasita
 * 
 * @param string $stringVar numele constantei 
 * @param any $defValue daca nu e gasita constanta returneaza aceasta valoare
 * @return any Returneaza valoarea gasita, sau cea default 
 */
function GET_POST_VAL($stringVar,$defValue="",$noCaseSensitive=false)
{
    if ($noCaseSensitive)
    {
        $stringUpper=  strtoupper($stringVar); 
        $stringLower= strtolower($stringVar);
        if ( isset($_GET["".$stringLower]))
          return $_GET["".$stringLower];
        else
         if ( isset($_GET["".$stringUpper]))
          return $_GET["".$stringUpper];
         else
          if ( isset($_POST["".$stringUpper]))
           return $_POST["".$stringUpper];
         else
          if (isset($_POST["".$stringLower]))
           return $_POST["".$stringLower];
          else
              return $defValue; 
    }
    else
    {
        if (isset($_GET["".$stringVar]))
          return $_GET["".$stringVar];
        else
          if (isset($_POST["".$stringVar]))
            return $_POST["".$stringVar];
          else
              return $defValue; 
    }
   
}
/**
 * Cauta constanta, cu numele dat ca parametru, in $_GET sau $_POST 
 * si retuneaza cum a fost transmisa : GET sau POST
 * 
 * @param string $stringVar numele constantei 
 * @return string GET sau SET daca a fost transmisa <br>
 *                "" daca nu
 */
function GET_POST_TYPE($stringVar,$noCaseSensitive=false)
{
    if ($noCaseSensitive)
    {
     $stringUpper=  strtoupper($stringVar);   
     if (isset($_GET["".$stringVar])|| isset($_GET["".$stringUpper]))
       return "GET";
   else
      if (isset($_POST["".$stringVar])|| isset($_POST["".$stringUpper]))
        return "SET";
       else
           return "";
    }
    else {
        if (isset($_GET["".$stringVar]))
           return "GET";
       else
           if (isset($_POST["".$stringVar]))
            return "SET";
           else
               return "";    
    }
   
}

/**
 * Returneaza/Transmite un JSON.
 * 
 * @param Array(Associative_Array()) $theArray Ce vrem sa convertim
 */
function ReturnJSON($theArray)
 {
     $returnEntityName="rezultat";
     $returnCountName="nr_rezultate";
     header('Content-type: application/json');
     echo json_encode(array("".$returnEntityName=>$theArray,"".$returnCountName=>count($theArray)));
 }
 
 /**
  * Returneaza/Transmite un XML.(Pana la 2 nivele)
  * 
  * @param Array(Associative_Array()) $theArray Ce vrem sa convertim
  */
 function ReturnXML($theArray)
 {
     $rezultName="rezultat";
     $countName="nr_rezultate";
     $rootName="rootTag";
     $entitiesIndexName="index";
     header('Content-type: text/xml');
     echo "<$rootName>";
        echo "<$rezultName>";
            foreach($theArray as $index => $post) 
            {
                if(is_array($post))
                {
                    foreach($post as $key => $value) 
                    {
                        echo '<',$key,' ',$entitiesIndexName,'="',$index,'"','>';
                            if(is_array($value)) 
                            {
                                    foreach($value as $tag => $val) 
                                     {
                                            echo '<',$tag,' ',$entitiesIndexName,'="',$index,'"','>',
                                                    htmlentities($val),'</',$tag,'>';
                                     }
                            }
                            else 
                            {
                               echo htmlentities($value);  
                            }
                        echo '</',$key,'>';
                     }
                }
            }
	echo "</$rezultName>";
        echo "<$countName>";
            echo count($theArray);
        echo "</$countName>";
       echo "</$rootName>";
 }
 
 function ReturnFromSubmitRequest($theArray)
 {
     if (isset($GLOBALS["_USER_REQUEST_"]) && isset($GLOBALS["_PASSWORD_REQUEST_"]) && isset($GLOBALS["_TYPE_OF_REQUEST_"]))
     {
         
         if ($GLOBALS["_TYPE_OF_REQUEST_"]=="xml")
             ReturnXML ($theArray);
         else
           if ($GLOBALS["_TYPE_OF_REQUEST_"]=="json")
               ReturnJSON ($theArray);  
     }
 }
 
 function psMicroTime()
{
	list($usec, $sec) = explode(" ", microtime());
	return ((float)$usec + (float)$sec);
}
 /**
  * Genereaza un id unic in functie de timp de 21 de caractere.
  * 
  * @return String
  */
 function GenerareRandID()
    {
        $chars=str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        shuffle($chars);
        $theChars=implode('',  array_slice($chars, rand(0, 22),3));
        $theTime=(string)psMicroTime();
            if (strlen($theTime)<15)
                for ($i=0;$i<(15-strlen($theTime));$i++)
                   $theTime.=0;
            if (strlen($theTime)>15)
                $theTime=  substr ($theTime, 0,15);
        return $theTime.$theChars."PIC"; 
    }
    
 function SaveLocalPicture($strBase64,$path="./library/img/")
 {
     if (!$strBase64)
         return false;
     $decoded=  base64_decode($strBase64);
     $randID=  GenerareRandID();
     $path="".$path.$randID.".JPEG";
     file_put_contents($path, $decoded);
     return $randID;
 }
 
?>