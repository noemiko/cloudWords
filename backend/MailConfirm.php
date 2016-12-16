<?php
require_once('class/user.php');
$user = new User();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["hash"]) || !isset($_POST["mail"]) )
    {
    	$output = json_encode(array('error'=>true, 'text' => 'Podaj wszystkie dane'));
		die($output);
	}

	$hash = filter_var(trim($_POST["hash"]), FILTER_SANITIZE_STRING);
	$umail = filter_var(trim($_POST["mail"]), FILTER_SANITIZE_EMAIL);
    $user-> acountVerification($hash, $umail);
}

?>