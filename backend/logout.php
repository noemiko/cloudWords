   <?php
     try{
    require_once('calss/user.php');
    session_start();
    session_regenerate_id(true);
    $user = new User();
    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        try{
       		if($user -> is_loggedin()){
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
