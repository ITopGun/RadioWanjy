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
	include("xradio_constants.php");

  error_reporting(0);
  ob_start();
  session_start();
 	header("Content-Type: text/html;charset=UTF-8");

	$mysqli =mysqli_connect(XRADIO_DB_HOST,XRADIO_DB_USER,XRADIO_DB_PASSWORD,XRADIO_DB_NAME);
	if ($mysqli->connect_errno){
    	echo "Fail to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	mysqli_query($mysqli,"SET NAMES 'utf8'");

	$setting_qry="SELECT * FROM settings limit 1";
  $setting_result=mysqli_query($mysqli,$setting_qry);
  $settings_details=mysqli_fetch_assoc($setting_result);

  define("XRADIO_APP_NAME",$settings_details['app_name']);
  define("XRADIO_APP_AUTHOR",$settings_details['app_copyright']);
  define("XRADIO_APP_WEBSITE",$settings_details['app_website']);

    //Profile
  if(isset($_SESSION['id'])){
    $profile_qry="SELECT * FROM users where user_id='".$_SESSION['id']."'";
	  $profile_result=mysqli_query($mysqli,$profile_qry);
	  $profile_details=mysqli_fetch_assoc($profile_result);
	  define("XRADIO_USER_AVATAR",$profile_details['user_avatar']);
    define("XRADIO_USER_NAME",$profile_details['user_name']);
  }

?>
