<?php
require_once('class/user.php');
$user = new User();

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
session_start();
    if (isset($_POST['image'])) {
        if ($user->verifiToken() ==  true){
            $name = "";
            if(isset($_POST['name'])){
                $name=$_POST['name'];
            }
            $image = filter_var(trim($_POST["image"]), FILTER_SANITIZE_STRING);
            $hash = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM));
            $date_create = date('Y-m-d H:i:s');
            $stmt = $user->runQuery("insert into Image (`hash`, `image`, `id_uzytkownik`, `date_create`, `name`) VALUES(:hash, :image, :id_uzytkownik, :date_create, :name )");
            $stmt->bindparam(":hash", $hash);
            $stmt->bindparam(":image", $image);
            $stmt->bindparam(":id_uzytkownik", $_SESSION['sesion_id']);
            $stmt->bindparam(":date_create", $date_create);
            $stmt->bindparam(":name", $name);
            $stmt->execute();
            echo json_encode(array('error' => false, 'message' => "zdjecie dodane"));
        }
    }
}
?>