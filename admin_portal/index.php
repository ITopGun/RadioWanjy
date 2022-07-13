<?php
  include("includes/xradio_conn.php");
	include("includes/xradio_msg.php");
	if(isset($_SESSION['x_user_name'])){
		header("Location:xradio_home.php");
		exit;
	}
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

<!-- /*!
 *  Font Awesome 5.0.9 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */
/* FONT PATH
 * -------------------------- */-->
<script defer src="assets/js/fontawesome-all.js"></script>
</head>
<body>
<div class="app">
  <div class="app-container app-login">
    <div class="flex-center">
      <div class="app-body">
        <div class="app-block">
          <div class="app-form login-form">
            <div class="form-header">
              <div><img src="assets/images/ic_xradio_144x144.png" width="72px" height="72px"></img></div>
              <div class="app-name"><?php echo XRADIO_APP_NAME;?></div>
            </div>
      			<div class="login_title_lineitem">
      				  <div class="xline"></div>
      				  <div class="xIconFlip icon">
        					 <span class="icon">
        						 <i class="fas fa-podcast"></i>&nbsp;
        						 <i class="fas fa-podcast"></i>&nbsp;
        						 <i class="fas fa-podcast"></i>
        				   </span>
      				   </div>
                 <div class="xline"></div>
      			</div>
            <form action="xradio_login_db.php" method="post">
      		       <div class="input-group" style="border:0px;">
                    <?php if(isset($_SESSION['msg'])){?>
                    <div class="alert alert-danger alert-dismissible" role="alert"> <?php echo $client_msg[$_SESSION['msg']]; ?> </div>
                    <?php unset($_SESSION['msg']);}?>
                  </div>
                  <div class="input-group"> <span class="input-group-addon icon" id="basic-addon1"> <i class="fa fa-user-secret" aria-hidden="true"></i></span>
                    <input type="text" name="username" id="username" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
                  </div>
                  <div class="input-group"> <span class="input-group-addon icon" id="basic-addon2"> <i class="fa fa-lock" aria-hidden="true"></i></span>
                    <input type="password" name="password" id="password" class="form-control" placeholder="Password" aria-describedby="basic-addon2">
                  </div>
                  <div class="text-center">
                    <input type="submit" class="btn btn-success btn-submit" value="Login">
                  </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
