<?php
    require_once('class/user.php');
    $user = new USER();
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        session_start();
        if ($user->verifiToken() ==  true){
			$stmt = $user->runQuery("select id, id_uzytkownik, image, name, date_create from Image where id_uzytkownik=:id");
			$stmt->bindparam(":id",  $_SESSION['sesion_id']);
			$stmt->execute();
			$reuslt=$stmt->fetchAll(PDO::FETCH_ASSOC);
			if($reuslt){
				echo  json_encode(array('error' => false, 'message' => $reuslt));
			}else{
				echo  json_encode(array('error' => true, 'message' => 'Brak zdjęć'));
			}
        }
    }
?>
