<?php
require_once('class/user.php');
$user = new User();

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["mail"]) ){
    	$output = json_encode(array('type'=>'error', 'text' => 'Input fields are empty!'));
		die($output);
	}
    
	$umail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    $user->changePasswordVerification($umail);
}

?>