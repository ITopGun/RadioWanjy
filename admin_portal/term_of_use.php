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
  $qry="SELECT app_term_of_use FROM settings where id='1'";
  $result=mysqli_query($mysqli,$qry);
  $row=mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html>
<head>
<meta name="author" content="<?php echo XRADIO_APP_AUTHOR;?>">
<meta name="description" content="">
<meta http-equiv="Content-Type"content="text/html;charset=UTF-8"/>
<meta name="viewport"content="width=device-width, initial-scale=1.0">

<title><?php echo XRADIO_APP_NAME;?></title>
<link rel="stylesheet" type="text/css" href="assets/css/vendor.css">
<link rel="stylesheet" type="text/css" href="assets/css/flat-admin.css">
<link rel="icon" href="assets/images/ic_xradio_32x32.png">

</head>
<body>
<div class="app">
  <div class="app-container-policy">
    <?php echo $row['app_term_of_use']?>
  </div>
</div>
</body>
</html>
