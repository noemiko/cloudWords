<?php
    require_once('user.php');
    $user = new USER();
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        session_start();
        if ($user->verifiToken() ==  true){
            $stmt = $user->runQuery("SELECT `id`,`login`,`mail`,`date_login`,`date_register`,`lat`,`lon`,`aktywne` FROM `Uzytkownicy`  where id=:id");
            $stmt->bindparam(":id",  $_SESSION['sesion_id']);
            $stmt->execute();
            $reuslt=$stmt->fetchAll(PDO::FETCH_ASSOC);
            if($reuslt){
                echo  json_encode(array('error' => false, 'message' => $reuslt));
            }
        }
    }
?>	