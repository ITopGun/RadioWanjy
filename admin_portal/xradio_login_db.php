<?php
/*
 * Copyright (c) 2018. YPY Global - All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *         http://ypyglobal.com/sourcecode/policy
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
	include("includes/xradio_conn.php");
	$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
	if($username==""){
		$_SESSION['msg']="1";
		header( "Location:index.php");
		exit;
	}
	else if($password==""){
		$_SESSION['msg']="2";
		header( "Location:index.php");
		exit;
	}
	else{
		$qry="select * from users where user_name='".$username."' limit 1";
		$result=mysqli_query($mysqli,$qry);
		if(mysqli_num_rows($result) > 0){
			$row=mysqli_fetch_assoc($result);
			$password_tbl=$row['user_password'];
			if(password_verify($password,$password_tbl)){
				$_SESSION['id']=$row['user_id'];
				$_SESSION['x_user_name']=$row['user_name'];
				//close my sql;
				mysqli_close($mysqli);
				header( "Location:xradio_home.php");
				exit;
			}
			else{
				$_SESSION['msg']="4";
				//close my sql;
				mysqli_close($mysqli);
				header( "Location:index.php");
				exit;
			}
		}
		else{
			$_SESSION['msg']="4";
			//close my sql;
			mysqli_close($mysqli);
			header( "Location:index.php");
			exit;
		}
}
?>
