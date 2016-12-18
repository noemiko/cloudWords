<?php
    require_once('class/user.php');
    $user = new USER();

    
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    

    if(!isset($_POST["login"]) || !isset($_POST["mail"]) || !isset($_POST["password"]) || !isset($_POST["password2"]))
        {
        	$output = json_encode(array('type'=>'error', 'text' => 'Input fields are empty!'));
    		die($output);
    	}
        
    	$uname = filter_var(trim($_POST["login"]), FILTER_SANITIZE_STRING);
    	$umail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    	$password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);
        $password2 = filter_var(trim($_POST["password2"]), FILTER_SANITIZE_STRING);
        
    	if((strcmp($uname, '') === 0))	{
    		echo  json_encode(array('error' => true, 'message' => "Podaj login"));	
    	}
    	else if (strcmp($umail, '') === 0)	{
    		echo  json_encode(array('error' => true, 'message' => "Podaj mail"));	
    	}
    	else if(!filter_var($umail, FILTER_VALIDATE_EMAIL))	{
    	   echo  json_encode(array('error' => true, 'message' => 'Podaj poprawny mail'));
    	}
    	else if(strcmp($password, '') === 0)	{
    		echo  json_encode(array('error' => true, 'message' => "podaj haslo"));
    	}
    	else if(strlen($password) < 6){
    		echo  json_encode(array('error' => true, 'message' => "Haslo musi być dluższe niż 6 liter"));	
    	}else if(strcmp($password, $password2) !== 0){
    		echo  json_encode(array('error' => true, 'message' => "Podane hasła nie są jednakowe"));
		}else
    	{
    		try
    		{
    			$stmt = $user->runQuery("SELECT login, mail FROM Uzytkownicy WHERE login=:uname OR mail=:umail");
                $stmt->bindparam(":uname", $uname  );
    			$stmt->bindparam(":umail", $umail);
    			$stmt->execute();
    			$row=$stmt->fetch(PDO::FETCH_ASSOC);
                
    			if(strcmp($uname, $row['login'])===0) {
    				echo  json_encode(array('error' => true, 'message' => "Ten login jest zajety"));
    			}
    			else if(strcmp($umail, $row['mail'])===0){
    				echo  json_encode(array('error' => true, 'message' => "Ten mail jest zajety"));
    			}
    			else
    			{
    				$user->register($uname,$umail,$password);
    			}
    		}
    		catch(PDOException $e)
    		{
    			echo json_encode(array('error' => true, 'message' => $e->getMessage())); 
    		}
    	}
        
        
    }

?>
	