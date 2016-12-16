<?php
    require_once('class/user.php');
    $user = new User();

    
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["login"]) || !isset($_POST["mail"]) || !isset($_POST["password"]))
        {
        	$output = json_encode(array('error'=>true, 'maessage' => 'Input fields are empty!'));
    		die($output);
    	}
    	$uname = filter_var(trim($_POST["login"]), FILTER_SANITIZE_STRING);
    	$umail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    	$password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_EMAIL);

    	if($uname=="")	{
			echo  json_encode(array('error' => true, 'message' => "Podaj login"));
    	}
    	else if($umail=="")	{
    		echo  "Podaj mail";	
    	}
    	else if(!filter_var($umail, FILTER_VALIDATE_EMAIL))	{
			echo  json_encode(array('error' => true, 'message' => 'Podaj poprawny mail'));
    	}
    	else if($password=="")	{
			echo  json_encode(array('error' => true, 'message' => "podaj haslo"));
    	}
    	else if(strlen($password) < 6){
			echo  json_encode(array('error' => true, 'message' => "Haslo musi być dluższe niż 6 liter"));	
    	}
    	else
    	{
    		try
    		{
    			$stmt = $user->runQuery("SELECT login, mail FROM Uzytkownicy WHERE login=:uname OR mail=:umail");
                $stmt->bindparam(":uname", $uname);
    			$stmt->bindparam(":umail", $umail);
    			$stmt->execute();
    			$row=$stmt->fetch(PDO::FETCH_ASSOC);
                
    			if($row['login']==$uname) {
					echo  json_encode(array('error' => true, 'message' => "Ten login jest zajety"));
    			}
    			else if($row['mail']==$umail) {
					echo  json_encode(array('error' => true, 'message' => "Ten mail jest zajety"));
    			}
    			else
    			{
    				$user->register($uname,$umail,$upass);
    			}
    		}
    		catch(PDOException $e)
    		{
    			echo $e->getMessage();
    		}
    	}       
    }
?>
	