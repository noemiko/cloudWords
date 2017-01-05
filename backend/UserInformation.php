<?php
    require_once('class/user.php');
    $user = new USER();
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        session_start();
        if ($user->verifiToken() ==  true){
            $stmt = $user->runQuery("SELECT `id`,`login`,`mail`,`date_login`,`date_register`,`lat`,`lon`,`aktywne` FROM `Uzytkownicy`  where id=:id");
            $stmt->bindparam(":id",  $_SESSION['sesion_id']);
            $stmt->execute();
            $reuslt=$stmt->fetch(PDO::FETCH_ASSOC);
            if($reuslt){
                $stmth = $user->runQuery("select id, id_uzytkownik, image, name, date_create, hash from Image where id_uzytkownik=:id");
                $stmth->bindparam(":id",  $_SESSION['sesion_id']);
                $stmth->execute();
                $reuslth=$stmth->fetchAll(PDO::FETCH_ASSOC);
                $reuslt['history'] = $reuslth;
                echo  json_encode(array('error' => false, 'message' => $reuslt));
            }
        }
    }
?>	
