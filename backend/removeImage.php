<?php
require_once('class/user.php');
$user = new User();
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["hash"])){
        $output = json_encode(array('error'=>true, 'message' => 'Musisz wybrać zdjecie'));
		die($output);
	}
    $hash = filter_var(trim($_POST["hash"]), FILTER_SANITIZE_STRING);
    $user-> removeImage($hash);
}

?>
