<?php
if (!isset($GLOBALS['numeBaza'])||($GLOBALS['numeBaza']===""))
{
    require '../library/database.php';
}


/**
 * <b>Folosita la toate select-urile din baza!</b><br><br>
 * Creeaza o conexiune noua la baza de date, 
 * dupa care executa un text sql pentru selectarea datelor dintr-un tabel.<br>
 * Dupa executarea query-ului returneaza un vector de vectori asociativi. 
 * 
 * @param string $selectString Textul SQL 
 * 
 * @return Associative_array valoare=$result[index]["NUME_COLOANA"]
 * 
 * @throws Exception
 */
function GetTable($selectString)
{
    $dataArr=array();
    try
    {
        $conn=  dbConnection();
        if ($conn)
        {
            $ResultTemp = dbQuery($conn, $selectString );
            $count=0;
            while ($dataRow= dbFetchAssoc($ResultTemp))
            {
                $dataArr[$count]=$dataRow;
                        $count++; 
            }
            dbCommit($conn);
            dbFreeResult($ResultTemp);
            dbCloseConnection($conn);
        }
    }
    catch (Exception $e)
    {
        throw new Exception("Eroare la selectarea datelor din baza.", 0, $e);
        dbRollback();
        dbCloseConnection();
    }
	return $dataArr;
}
/**
 * <b>Folosita la toate executarile de query-uri in baza!</b><br><br>
 * Creeaza o conexiune noua la baza de date, 
 * dupa care executa un text sql.<br>
 * Dupa executarea query-ului returneaza daca s-a executat. 
 * 
 * @param string $executeString Textul SQL 
 * 
 * @return bool Daca s-a executat sau nu query-ul
 * 
 * @throws Exception
 */
 function ExecuteStatement($executeString)
 {
     try
     {
        $conn=  dbConnection();
            if ($conn)
            {
                dbQuery($conn, $executeString );
                $aBool= dbCommit($conn);
                dbCloseConnection($conn);
		return $aBool;
            }
     }
     catch(Exception $e)
     {
        throw new Exception("Eroare la executarea comenzii.", 0, $e);
        dbRollback();
        dbCloseConnection(); 
        return FALSE;
     }
 }
 
 function TestVB($text)
 {
     $sql="insert into test values ('$text')";
     ExecuteStatement($sql);
     return "BRAVO";
 }
 
 function SaveInregistrare($tipDeseu,$imageBase64,$latitudine,$longitudine,$nume_eco,$prenume_eco,$nr_tel)
 {
     $path="./library/img/";
     $imageID=SaveLocalPicture($imageBase64);
     if (!$imageID)
         return false;
     $sqlImg="Insert into imagini (id_imag,path) values('$imageID','$path');";
     $aBoolImg=  ExecuteStatement($sqlImg);
     if (!$aBoolImg)
         return false;
     $sqlInreg="insert into inregistrari"
             . "(data_inreg,ora_inreg,tip_deseu,id_imag,latitudine,longitudine,nume_ecologist,prenume_ecologist,nr_tel) "
             . "values(current_date,current_time,$tipDeseu,'$imageID',$latitudine,$longitudine,'$nume_eco','$prenume_eco',$nr_tel);"
             . ";";
     $aBool=  ExecuteStatement($sqlInreg);
     return $aBool;
     
 }
 
 
?>