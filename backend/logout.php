   <?php
    try{
        require_once('class/user.php');
        $user = new USER();
        if ($_SERVER['REQUEST_METHOD'] == 'POST'){
            session_start();
            if (isset($_SESSION['sesion_id'])){
    		    $user -> doLogout();
                echo  json_encode(array('error' => false, 'message' => "Zostales wylogowany"));
            }else{
                echo  json_encode(array('error' => false, 'message' => "Zostales wylogowany"));
            }
        }
    } catch (Exception $e) {
        echo  json_encode(array('error' => true, 'message' => $e->getMessage()));
    }
?>
