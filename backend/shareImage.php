<?php
require_once('class/user.php');
$user = new User();

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!isset($_POST["hash"])){
        $output = json_encode(array('error'=>true, 'message' => 'Brak danych'));
        die($output);
	}else{
        $hash = filter_var(trim($_POST["hash"]), FILTER_SANITIZE_STRING);
        $stmt = $user->runQuery("select id_uzytkownik from Image where hash=:hash");
        $stmt->bindparam(":hash", $hash);
        $stmt->execute();
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if($row){
            echo json_encode(array('error' => false, 'message' =>  $row['id_uzytkownik'] . '/' .  $hash . '.png', 'id' =>  $row['id_uzytkownik']));
        }else{
             echo json_encode(array('error' => true, 'message' =>  'Brak zdjecia'));
        }
    }   
}
?>	
