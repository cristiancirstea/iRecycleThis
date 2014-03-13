<?php

/**
 * Description of Security
 *
 * @author cristi_m
 */
class Security {
    
    private $_tempKEY;
    private $_amaID;
//    private $_dreptSuprem;
    private $db;
    private $errorLogFile;
    public $showErrorCodes;
    public function __construct() {
        $this->_amaID=0;
        $this->_dreptSuprem=false;
        $this->db= new DBClass();
    }
    public function __destruct() {
        unset($this->db);
    }
    public function GetKey(){return $this->_tempKEY;}
    /**
     * 
     * @param String $errCode           Codul erorii
     * @param String $message           Mesajul "aruncat"
     * @param Boolean $writeInLog       Daca trebuie sa scrie in error log sau nu
     * @param Boolean $persistentCode   Daca afiseaza codul in eroarea returnata fara sa tina seama
     *                                  de variabila globala $errorCodes din config
     * @throws Exception
     */
    public static function _ThrowError($errCode,$message="",$logMessage="",$writeInLog=true,$persistentCode=false)
    {
        if ($logMessage==="")
        {
            $logMessage=$message;
        }
        $errorLogFile="error";
        if (!$persistentCode)
            $showErrorCodes=  (isset($GLOBALS["errorCodes"])&&($GLOBALS["errorCodes"]===true));
        else
            $showErrorCodes=true;
        if ($writeInLog)
        {
            try{
                $errorLogMessage= date('d.M.Y H:i:s')." - ".$errCode." : ".$logMessage;
                file_put_contents($errorLogFile,"# ".$errorLogMessage ."\n", FILE_APPEND | LOCK_EX);
            }
            catch (Exception $e)
            {
                throw new Exception("".$e);   
            }
        }
         throw new Exception(($showErrorCodes?$errCode." ":"")
            .$message);
    }
    
    public static function _ErrorLog($errCode,$message="")
 {
     $errorLogFile="error";
        try{
                $errorLogMessage= date('d.M.Y H:i:s')." - ".$errCode." : ".$message;
                file_put_contents($errorLogFile,"# ".$errorLogMessage ."\n", FILE_APPEND | LOCK_EX);
            }
            catch (Exception $e)
            {
                throw new Exception("".$e);   
            }
    }
    
    public function CheckKey($k,$checkLogIn=false)
    {
       //TODO
    }
    private function SaveKey($ama_id,$hoursActive=2,$alternateKey=null)
    {
        //TODO
    }
    public function LogOut($key)
    {
        //TODO
    }
    private function ClearKeys($ama_id,$all=false)
    {
        //TODO
    }
    //TODO
    public function CheckUser($u,$p,$ip)
    {
       
            return null;
    }
    private function psMicroTime()
    {
            list($usec, $sec) = explode(" ", microtime());
            return ((float)$usec + (float)$sec);
    }
    private function GenerateKey($lenKey=25)
     {
         //15=lungimea string-ului de timp
         $nrChar=$lenKey-15;
         $arChars=str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
        shuffle($arChars);
        $theChars=implode('',  array_slice($arChars, rand(0, 50-$nrChar),$nrChar));
        $theTime=  str_replace(".", implode('',array_slice($arChars, rand(0, 49),1)) , (string)  $this->psMicroTime());
            if (strlen($theTime)<15)
                for ($i=0;$i<(15-strlen($theTime));$i++)
                   $theTime.=0;
            if (strlen($theTime)>15)
                $theTime=  substr ($theTime, 0,15);
          
         $strKey=  $theTime.$theChars;
         $arKey= str_split($strKey);
         shuffle($arKey);
        return implode('',$arKey);
    }
}

?>
