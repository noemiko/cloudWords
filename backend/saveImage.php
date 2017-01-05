<?php
require_once('class/user.php');
$user = new User();
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!isset($_POST["image"])){
        $output = json_encode(array('error'=>true, 'message' => 'Nie ma zdjęcia'));
		die($output);
	}
    $name = "";
    if(isset($_POST['name'])){
        $name=$_POST['name'];
    }
    $image = filter_var(trim($_POST["image"]), FILTER_SANITIZE_STRING);
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $user-> saveImage($image, $name);
}
?>
