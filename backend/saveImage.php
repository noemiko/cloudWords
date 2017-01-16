<?php
require_once('class/user.php');
$user = new User();
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["image"])){
        $output = json_encode(array('error'=>true, 'message' => 'Brak danych'));
		die($output);
	}
    $name = "";
    if(isset($_POST['name'])){
        $name=$_POST['name'];
    }
    
    $image = filter_var(trim($_POST["image"]), FILTER_SANITIZE_STRING);
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $hash = bin2hex(mcrypt_create_iv(20, MCRYPT_DEV_URANDOM));
    $user-> saveImage($image, $name, $hash);
}
?>
