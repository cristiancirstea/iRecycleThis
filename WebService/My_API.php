<?php

include_once './API.php';
require_once './library/DBClass.php';
/**
 * Verifica daca stringul e bun pt a fi transmis in Firebird.
 * 
 * <em>Deocamdata verifica doar apostroafele</em>
 * 
 * @param String $str string-ul de verificat
 * 
 * @return String string-ul bun
 */
function DBCheckString($str)
{
    $result=str_replace("'", "''", $str);
    return $result;
}
 function TestVB($text)
 {
     $sql="insert into test values ('$text')";
     $db= new DBClass();
     $db->ExecuteStatement($sql);
     unset($db);
     return "BRAVO";
 }
function MyFormatFloat($aFloat,$decimals = 2,$dec_point = '.',$thousands_sep = ',' )
{
    return number_format($aFloat,$decimals,$dec_point,$thousands_sep);
}
function MyFormatDate($aDateString,$format='d.m.Y') /* 'H:i' - pt ora*/
{
   $aDate=new DateTime(''.$aDateString);
   return $aDate->format($format);
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
class MyAPI extends API
{
    protected $User;
    protected $_goodUser;
    protected $_userID;
    public function __construct($request, $origin) {
        parent::__construct($request);
        $this->_goodUser=false;
        $this->_userID=0;
        
//        
//          echo "<br>".$this->file;
       if (strtoupper($this->method)=="PUT")
        {
           
           $putParams=array();
           if (!$this->request)
            $this->request=array();
           $putParams=  json_decode($this->file,true);
           $this->request=array_merge( $this->request,$putParams);
        }
        $this->_goodUser=true;
        //!!!!!!!!!!!! + Autentificare !!!!!!!!!!!!!!!
    }
    
 private function _SaveLocalPicture($strBase64,$path="./library/img/")
 {
     if (!$strBase64)
         return "-1";
     $decoded=  base64_decode($strBase64);
     $randID=  GenerareRandID();
     $path="".$path.$randID.".JPEG";
     file_put_contents($path, $decoded);
     return $randID;
 }
    /**
     * Endpoints/Functii (".../service/nume_functie/argumente?param_request=val_param_request...")
     */
    protected function login()
    {
         if (!$this->_goodUser)
             throw new Exception("WS000002 Eroare de autentificare.");
         $db= new DBClass();
        $sql="select * from users 
            where username_u='".$this->request["user"]."' 
                and password_u='".$this->request["parola"]."';";
        $data=$db->GetTable($sql);
        
        return $data;
        
    }
    protected function logout()
    {
        
    }
    protected function pictures($params)
    {
        if (!$this->_goodUser)
             throw new Exception("WS000002 Eroare de autentificare.");
         $db= new DBClass();
         switch ($this->method) {
             case "GET":
                   break;
             case "PUT":
                 break;
             case "POST":
                $path="/library/img/";
                 
                    if (trim($this->request["imageBase64"])==="")
                    {
                        $imageID='-1';
                    }
                    else
                    {
                        $imageID=  $this->_SaveLocalPicture($this->request["imageBase64"]);
                    }
                    
                    if (($imageID!='-1'))
                    {
                      try{
                      
                        $path.=$imageID.".JPEG";
                       $sqlImg="Insert into imagini (id_imag,path) values('$imageID','$path');";
                        
                       $aBoolImg=  $db->ExecuteStatement($sqlImg);
                       if (!$aBoolImg)
                       {
                           //return false;
                       }
                      }
                       catch (Exception $e)
                       {
                            TestVB($e);
                        throw new Exception("DB error1!");
                       }
                    }
                    try{
                    $sqlInreg="insert into inregistrari "
                            . "(data_inreg,ora_inreg,tip_deseu,id_imag,latitudine,longitudine,nume_ecologist,nr_tel) "
                            . " values(current_date,current_time,
                            ".$this->request["tip"].",
                            '".$imageID."',
                            ".$this->request["latitude"].",
                            ".$this->request["longitude"].",
                            '".$this->request["Nume"]."',
                            '".$this->request["Numar"]."')"
                            . ";";
                    TestVB(json_encode($this->request));
                    $aBool=$db->ExecuteStatement($sqlInreg);
                    if (!$aBool)
                        throw new Exception("Save faild!");
                    else
                        $data=array("success"=>true);
                    }
                    catch (Exception $e)
                    {
                        TestVB($e);
                        throw new Exception("DB error!");
                    }
                 break;
             case "DELETE":
                 break;
             default:
                $data=null;
                 break;
        }
        return $data;
    }
    protected function coordonate($params)
    {
        if (!$this->_goodUser)
             throw new Exception("WS000002 Eroare de autentificare.");
         $db= new DBClass();
         switch ($this->method) {
             case "GET":
                 $sql="select i.nume_ecologist as 'nume',i.latitudine as 'lat',i.longitudine as 'long',d.text as 'deseu',
                p.path
                from inregistrari i,deseuri d, imagini p
                    where d.id_deseu=i.tip_deseu and i.verificata=0 and i.id_imag=p.id_imag ".
                    ((isset($params[0])&&($params[0]!='-1'))?" and i.id_inreg=$params[0]":"");
                   $data=$db->GetTable($sql);
                   break;
             case "POST":
                 break;
             case "PUT":
                 break;
             case "DELETE":
                 break;
             default:
                $data=null;
                 break;
        }
        return $data;
    }
    
    protected function inregistrari($params)
    {
        
         if (!$this->_goodUser)
             throw new Exception("WS000002 Eroare de autentificare.");
         $db= new DBClass();
         switch ($this->method) {
             case "GET":
                 switch (count($params))
                 {
                 //lista cu inregistrari pt populare in interfata firmei
                    case 0:
                        $sql="select i.*,p.path,p.verificata,d.text as 'deseu' from inregistrari i,deseuri d,imagini p
                        where i.id_imag=p.id_imag and d.id_deseu=i.tip_deseu and i.verificata=0";
                        break;
                 //id_inreg-> pt detalii despre o anumita inregistrare
                    case 1:
                        $sql="select * from inregistrari where id_inreg=$params[0];";
                        break;
                 //coordonatele inregistrarii+detalii user+poza
                    case 2:
                        if ($params[1]==="coord")
                        {
                            $sql="select i.nume_ecologist as 'nume',i.latitudine as 'lat',
                           i.longitudine as 'long',d.text as 'deseu',
                            p.path
                            from inregistrari i,deseuri d, imagini p
                                where d.id_deseu=i.tip_deseu and i.verificata=0 and i.id_imag=p.id_imag ".
                                ((isset($params[0])&&($params[0]!='-1'))?" and i.id_inreg=$params[0]":"");
                        }
                        else 
                        {
                            $sql="";
                            throw new Exception("WS000003 Parametrii necunoscuti.");
                        }
                        break;
                    default:
                        $sql="";
                        throw new Exception("WS000004 Parametrii necunoscuti.");
                        break;
                 }
                 if (trim($sql)!=="")
                   $data=$db->GetTable($sql);
                 else
                     $data=null;
                   break;
             case "POST":
                 if (count($params)===0)
                 {
                    $sql="update inregistrari set verificata=1 where id_inreg=$params[0]";
                    $aBool=  ExecuteStatement($sql);
                    if ($aBool)
                        $data= array("success"=>true);
                    else
                      throw new Exception("WS000003 Verificarea inregistrarii nu s-a putut realiza.");    
                 }
                 else
                 {
                  throw new Exception("WS000004 Id-ul inregistrarii nu a fost transmis.");  
                 }
                 break;
             case "PUT":
                 break;
             case "DELETE":
                 break;
             default:
                $data=null;
                 break;
        }
        return $data;
    }
 }
?>
