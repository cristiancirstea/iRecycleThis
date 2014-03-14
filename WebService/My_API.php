<?php

include_once './API.php';
require_once './library/DBClass.php';
include_once './Security.php';
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
         Security::_ErrorLog("test00001",  json_encode($this->request));
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
        //TODO
        //!!!!!!!!!!!! + Autentificare !!!!!!!!!!!!!!!
    }
    
 private function _SaveLocalPicture($strBase64,$path="./library/img/")
 {
     $randID=-1;
     try{
        $decoded=  base64_decode($strBase64);
        $randID=  GenerareRandID();
        $path="".$path.$randID.".JPEG";
        file_put_contents($path, $decoded);
     }
    catch (Exception $e)
    {
        Security::_ThrowError("localPicture00001","Can't save local picture!","Local picture error: ".$e);
    }
     return $randID;
 }
    /**
     * Endpoints/Functii (".../service/nume_functie/argumente?param_request=val_param_request...")
     */
    protected function login()
    {
         $db= new DBClass();
         try{
            $sql="select * from users 
                where username_u='".$this->request["user"]."' 
                and password_u='".$this->request["parola"]."';";
            $data=$db->GetTable($sql);
           
         }
         catch(Exception $e)
         {
             Security::_ThrowError("localPicture00001","LoginError!","LoginError: ".$e);
         }
          if (count($data)===0)
            {
               Security::_ThrowError("localPicture00002","Incorect login information!",
                       "LoginIncorect: U:".$this->request["user"]."\n".
                       "P:".$this->request["parola"]);
            }
        return $data;
        
    }
    protected function logout()
    {
        
    }
    protected function pictures($params)
    {
//        if (!$this->_goodUser)
//             throw new Exception("WS000002 Eroare de autentificare.");
         $db= new DBClass();
         $data=array();
         switch ($this->method) {
             case "GET":
                   break;
             case "PUT":
                 break;
             case "POST":
                 //save local picture and add it into database
                $path="/library/img/";
                  Security::_ErrorLog("test00001",  json_encode($this->request["photo"]));
                    if (trim($this->request["photo"])==="")
                    {
                        $imageID='-1';
                    }
                    else
                    {
                        $imageID=  $this->_SaveLocalPicture($this->request["photo"]);
                    }
                   
                    Security::_ErrorLog("test00002",$imageID);
                    if (($imageID!='-1'))
                    {
                      try{
                      
                            $path.=$imageID.".JPEG";
                            $sqlImg="Insert into imagini (id_imag,path) values('$imageID','$path');";

                            $aBoolImg=  $db->ExecuteStatement($sqlImg);
                            if (!$aBoolImg)
                            {
                               Security::_ErrorLog("pictures0005","At insert picture into imagini table!");
                            }
                        }
                       catch (Exception $e)
                       {
                            Security::_ThrowError("picure00002","DB error1!");
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
                        $aBool=$db->ExecuteStatement($sqlInreg);
                        if (!$aBool)
                            Security::_ErrorLog("picture0001","Save faild!");
                        else
                            $data=array("success"=>true);
                        }
                    catch (Exception $e)
                    {
                       Security::_ThrowError("picture00003","DB error!");
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
//        if (!$this->_goodUser)
//            Security::_ThrowError("WS000002","Eroare de autentificare.");
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
    protected function test($params)
    {
        $this->_SaveLocalPicture("");
    }
    protected function getPicture($params)
    {
        $path='./library/img/events/2.jpeg';
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        return array(array("picture"=>base64_encode($data)));// $base64;
    }
    
    
    protected function inregistrari($params)
    {
        
//         if (!$this->_goodUser)
//             throw new Exception("WS000002 Eroare de autentificare.");
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
                           Security::_ThrowError("WS000003","Parametrii necunoscuti.");
                        }
                        break;
                    default:
                        $sql="";
                        Security::_ThrowError("WS000004","Parametrii necunoscuti.");
                        break;
                 }
                 if (trim($sql)!=="")
                   $data=$db->GetTable($sql);
                 else
                     $data=null;
                   break;
             case "POST":
                 if (count($params)>0)
                 {
                    $sql="update inregistrari set verificata=1 where id_inreg=$params[0]";
                    $aBool=  ExecuteStatement($sql);
                    if ($aBool)
                        $data= array("success"=>true);
                    else
                      Security::_ThrowError("WS000003","Verificarea inregistrarii nu s-a putut realiza.");    
                 }
                 else
                 {
                  Security::_ThrowError("WS000004","Id-ul inregistrarii nu a fost transmis.");  
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
