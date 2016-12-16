<?php
class Database
{
    private $mysql_host = '';
    private $username = '';
    private $password = '';
    private $database = ''; 
    public $conn;
    
    public function dbConnection(){
        $this->conn = null;
        try{
            return new PDO("mysql:host=" . $this->mysql_host . ";dbname=" . $this->database, $this->username, $this->password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	    echo 'Połączenie nawiązane!';
            return $conn;
           if ($conn){
           }
        }catch(PDOException $e){
    	    echo 'Połączenie nie mogło zostać utworzone: ' .$e->getMessage();;
        }
        return $conn;
    }
}
?>	
	