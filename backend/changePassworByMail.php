<?php
    require_once('class/user.php');
    $user = new User();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["hash"]) || !isset($_POST["mail"]) || !isset($_POST["password1"]) || !isset($_POST["password2"]))
    {
            $output = json_encode(array('error'=>true, 'message' => 'Podaj wszystkie dane'));
    		die($output);
    }
       
          if (strcmp($_POST["password1"], $_POST["password2"]) === 0){

        if(strlen($password) < 6){
            $hash = filter_var(trim($_POST["hash"]), FILTER_SANITIZE_STRING);
            $umail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
            $password = md5(filter_var(trim($_POST["password1"]), FILTER_SANITIZE_STRING));
            $user->changePassword($password, $umail, $hash);
        }else{
             echo json_encode(array('error'=>true, 'message' => 'Haslo jest za krotkie'));
        }
       
    }else{
        echo json_encode(array('error'=>true, 'message' => 'Hasla nie sa takie same'));
    }
}
?>
