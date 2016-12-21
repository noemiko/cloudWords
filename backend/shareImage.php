<?php
require_once('class/user.php');
$user = new User();

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    if (isset($_POST['image'])) {
        $hash = filter_var(trim($_POST["image"]), FILTER_SANITIZE_STRING);
        $stmt = $user->runQuery("select image from Image where hash=:hash");
        $stmt->bindparam(":hash", $hash);
        $stmt->execute();
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if($row){
            if (isset($row['name'])){
                 echo json_encode(array('error' => false, 'message' =>  $row['image']));
            }
        }
    }
}
?>	
