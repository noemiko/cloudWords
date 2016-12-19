<?php
    require_once('class/user.php');
    $user = new User();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
        if(!isset($_POST["password1"]) || !isset($_POST["password2"]) || !isset($_POST["currentPassword"])){
            $output = json_encode(array('error'=>true, 'message' => 'Podaj wszystkie dane'));
    		die($output);
        }else{
            session_start();
                if ($user->verifiToken() ==  true){
                    if (strcmp($_POST["password1"], $_POST['password2']) === 0){
                            if(strlen($password) <= 6){
                                $password = md5(filter_var(trim($_POST["password1"]), FILTER_SANITIZE_STRING));
                                $currentPasswodr = md5(filter_var(trim($_POST["currentPassword"]), FILTER_SANITIZE_STRING));
 
                                $user->changePasswordLogin($password, $currentPasswodr, $_POST["currentPassword"]);
                            }else{
                                echo json_encode(array('error'=>true, 'message' => 'Haslo jest za krotkie'));
                            }
                    }else{
                        echo json_encode(array('error'=>true, 'message' => 'Hasla nie sa takie same'));
                    }
                }else{
                }
                
        }
	}

   

?>
