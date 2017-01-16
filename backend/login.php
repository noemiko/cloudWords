<?php
require_once('class/user.php');
$user = new User();
	if ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		if(!isset($_POST["login"]) || !isset($_POST["password"])  ){
			$output = json_encode(array('error'=>true, 'message' => 'Musisz podać login lub hasło'));
			die($output);
		}
		$uname = filter_var(trim($_POST["login"]), FILTER_SANITIZE_STRING);
		$password = md5(filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING));
		$user->doLogin($uname, $password);
	}

?>		