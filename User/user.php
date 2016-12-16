<?php

require_once('dbconfig.php');
require_once('device.php');
require_once('Session.php');


class User
{	

	private $conn;
	
	public function __construct()
	{
		$database = new Database();
		$db = $database->dbConnection();
		$this->conn = $db;
    }
	
	public function runQuery($sql)
	{
        try{

		    $stmt = $this->conn->prepare($sql);
		    return $stmt;
        
        }
        catch(PDOException $e)
    	{
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
	}
	
	public function register($uname,$umail,$password)
	{
        $device = new Device();
        $date = date('Y-m-d H:i:s');
        $hash = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
        $password = md5(filter_var(trim($upass), FILTER_SANITIZE_STRING));
        $lat = $this->geolocation()['geoplugin_latitude'];
        $lon = $this->geolocation()['geoplugin_longitude'];
        $token = "token";
        $os = $device -> getOs();
        $browser = $device->getBrowser();
		try
		{
			
			$stmt = $this->conn->prepare("INSERT INTO Uzytkownicy(`login`, `password`, `mail`, `date_login`, `date_register`, `lon`, `lat`, `token`,  `hash`, 'os', 'browser') 
		                                               VALUES(:uname, :password, :umail, :date_login, :date_register, :lat, :lon,  :token, :hash, :os, :browser)");
												  
			$stmt->bindparam(":uname", $uname);
			$stmt->bindparam(":password", $password);
			$stmt->bindparam(":umail", $umail);
            $stmt->bindparam(":date_login", $date);
    		$stmt->bindparam(":date_register", $date);
			$stmt->bindparam(":lat", $lat);
            $stmt->bindparam(":lon", $lon);
			$stmt->bindparam(":token", $token);
            $stmt->bindparam(":hash", $hash);
            $stmt->bindparam(":os", $os);
            $stmt->bindparam(":browser", $browser);
	
			$stmt->execute();
            
            $this->sendMailToUser($umail, $hash, 1);
            
			return $stmt;	
		}
		catch(PDOException $e)
		{
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}				
	}
    
    
    public function acountVerification($hash, $umail){
        if($this-> chcekHash($umail, $hash) == true){
            try{
                $stmt = $this->conn->prepare("UPDATE `Uzytkownicy` SET aktywne=1, `hash` = '' WHERE `Uzytkownicy`.mail = :umail and `Uzytkownicy`.hash = :hash ");
                $stmt->bindparam(":hash", $hash);
                $stmt->bindparam(":umail", $umail);
                $stmt->execute();
                echo json_encode(array('error' => false, 'message' => 'Konto zostao zweryfikowane'));
            }
            catch(PDOException $e)
            {
                echo json_encode(array('error' => true, 'message' => $e->getMessage()));    			
    		}
        }else{
            echo json_encode(array('error' => true, 'message' => 'link nieaktywny'));
        }
    }
    
    private function chcekBeforePassword($password, $umail, $hash){
        try {
            $stmt = $this->conn->prepare("SELECT * FROM `Uzytkownicy` WHERE mail = :umail and hash = :hash and password = :password");
            $stmt->execute(array(':hash'=>$hash, ':umail'=>$umail, ':password'=>$password));
            if($stmt->rowCount() == 0){
                
                return true;
            }
            return false;
        }
        catch(PDOException $e)
    	{
			
            echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
    }


    
    private function chcekHash( $umail, $hash){
          try {
              
            $stmt = $this->conn->prepare("SELECT * FROM `Uzytkownicy` WHERE mail = :umail and hash = :hash");
            $stmt->execute(array(':hash'=>$hash, ':umail'=>$umail));
            $row=$stmt->fetch(PDO::FETCH_ASSOC);
            
            if($stmt->rowCount() == 0){
                return false;
            }
            return true;
            
        }
        catch(PDOException $e)
        {
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
    }
    
    public function changePassword($password, $umail, $hash){
        if ($this->chcekHash($umail, $hash) == true){
            if($this->chcekBeforePassword($password, $umail, $hash) == true){
                try{
                     $stmt = $this->conn->prepare("UPDATE `Uzytkownicy` SET `password` = :password, `hash` = '' WHERE `Uzytkownicy`.mail = :umail and `Uzytkownicy`.hash = :hash ");
                     $stmt->execute(array(':hash'=>$hash, ':umail'=>$umail, ':password'=>$password));
                    
                    echo json_encode(array('error' => false, 'message' => 'haslo zostalo zmienione'));
                } 
                catch(PDOException $e)
                {
        			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
        		}
            }else{
                echo 'Haslo musi byc inne niz wczesniej używane.';
            }
        }else{
            echo 'Link zostal wykozystany';
        }
    }
    
    private function checkMail($umail){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM `Uzytkownicy` WHERE mail = :mail");
            $stmt->execute(array(":mail"=> $umail));
            if($stmt->rowCount() == 1){
                return true;
            }
            return false;	
		}
		catch(PDOException $e)
		{
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
    }
	
    
    public function changePasswordVerification($umail){
        if($this->checkMail($umail) == true){
            try{
                $hash = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
                $stmt = $this->conn->prepare("UPDATE Uzytkownicy SET hash = :hash WHERE Uzytkownicy.mail = :umail");;
                $stmt->execute(array(':hash'=>$hash, ':umail'=>$umail));
                
                $this->sendMailToUser($umail, $hash, 0);
                echo 'Mail zweryfikowany';
            }
            catch(PDOException $e)
    	    {
			    echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		    }
        }else{
            echo 'brak maila w bazie.';     
        }
    }
	
	public function doLogin($uname,$password)
	{
		try
		{
			$stmt = $this->conn->prepare("SELECT id,  login, mail, password FROM Uzytkownicy WHERE login=:uname OR mail=:umail ");
			$stmt->execute(array(':uname'=>$uname, ':umail'=>$uname));
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
			if($stmt->rowCount() == 1)
			{
				if(strcmp($password, $row['password']) === 0)
				{
                    $device = new Device();
                    $session = new Session();
                    $data = $session::getInstance();
                    $lat = $this->geolocation()['geoplugin_latitude'];
                    $lon = $this->geolocation()['geoplugin_longitude'];
                    $date = date('Y-m-d H:i:s');
                    $time = date('Y-m-d H:i:s:u');
                    $token = md5(filter_var(trim($time), FILTER_SANITIZE_STRING));
                     $os = $device->getOs();
                    $browser = $device->getBrowser();
                    echo $browser;
                    $stmt = $this->conn->prepare("UPDATE Uzytkownicy SET  lon=:lon, lat=:lat, date_login=:date_login, token=:token WHERE login=:uname OR mail=:umail ");
                    $urow = $stmt->execute(array(':uname'=>$uname, ':umail'=>$uname, ':date_login'=>$date,':lat'=>$lat, ':lon'=>$lon, ':token'=>$token ));

					$_SESSION['user_session'] = $token;
                    $_SESSION['sesion_id'] = $row['id'];
                    echo json_encode(array('error' => false, 'message' =>  "zostales zalogowany"));
					return true;
				}
				else
				{
                    echo json_encode(array('error' => true, 'message' =>  "zly login lub haslo"));
					return false;
				}
			}else{
    		  echo json_encode(array('error' => true, 'message' =>  "zly login lub haslo")); 
			}
		}
		catch(PDOException $e)
		{
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
	}
    
    public function verifiToken(){
         $session = new Session();
         try{
            //$stmt = $this->conn->prepare("SELECT id,  login, mail, token  FROM Uzytkownicy WHERE login=:uname OR mail=:umail ");
            $stmt = $this->conn->prepare("SELECT count(*) as count FROM Uzytkownicy WHERE token=:token OR id=:id ");
    		$nRows = $stmt->execute(array(':token'=>$row['token'], ':id'=>$_SESSION['sesion_id']));
			$nRows=$stmt->fetch(PDO::FETCH_ASSOC);
			if($nRows["count"] == 1)
			{
                return true;
			}else{
                if ($this->doLogout() == true){
                    return false;
                    echo json_encode(array('error' => true, 'message' =>  "Zostałeś wylogowany, twoja sesja się skończyła, zaloguj się ponownie"));
                }
            }
         }
         catch(PDOException $e)
    	{
			echo json_encode(array('error' => true, 'message' => $e->getMessage()));
		}
    }
	
	public function is_loggedin()
	{
		if(isset($_SESSION['user_session']))
		{
			return true;
		}
	}
	
	public function redirect($url)
	{
		header("Location: $url");
	}
	
	public function doLogout()
	{
		session_destroy();
		unset($_SESSION['user_session']);
        unset($_SESSION['sesion_id']);
		return true;
	}
    
    
    public function sendMailToUser($email, $hash, $register){
        
        $subject = '';
        $message = '';
        
        if ($register == 1){
        $subject = 'Potwierdzenie Rejestracji';
        $message ='     
    Dziękuję message zarejestrowanie się na naszej stronie.
     
    W celu aktywacji konta kliknij w link poniżej:
    
    http://canero.c0.pl/test/verify.php?email='.$email.'&hash='.$hash.''; 
          		
        }else{
        
        $subject = 'Zmiana hasla';
        
        $message ='     
    Jesli chcesz zmienic haslo kliknij w link ponizej:
    
    http://canero.c0.pl/test/changepassword.php?email='.$email.'&hash='.$hash.''; 
        
        }
                       
        $headers = 'From:admin@canero.c0.pl' . "\r\n"; 
        $headers.= "MIME-Version: 1.0\r\n"; 
        $headers.= "Content-Type: text/html; charset=ISO-8859-1\r\n"; 
        $headers.= "X-Priority: 1\r\n"; 
        mail($email, $subject, $message, $headers); 
        echo json_encode(array('error' => false, 'message' =>  "mail zostal wyslany"));
    }
    
    private function geolocation(){
        $user_ip = getenv('REMOTE_ADDR');
        return unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
    }
}
?>			