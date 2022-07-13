<?php
	if(!isset($_SESSION['x_user_name'])){
		session_destroy();
		header( "Location:index.php");
		exit;
	}
?>
