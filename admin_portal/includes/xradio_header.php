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
  include("xradio_conn.php");
  include("xradio_check_session.php");
  $script_name = $_SERVER["SCRIPT_NAME"];
  $parts = Explode('/', $script_name);
  $script_name = $parts[count($parts) - 1];
?>
<!DOCTYPE html>
<html>
<head>
<meta name="author" content="<?php echo XRADIO_APP_AUTHOR;?>">
<meta name="description" content="">
<meta http-equiv="Content-Type"content="text/html;charset=UTF-8"/>
<meta name="viewport"content="width=device-width, initial-scale=1.0">
<title><?php echo XRADIO_APP_NAME;?></title>
<link rel="icon" href="assets/images/ic_xradio_32x32.png">

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- /*!
 *  Font Awesome 5.0.9 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */
/* FONT PATH
 * -------------------------- */-->
<script defer src="assets/js/fontawesome-all.js"></script>

<link rel="stylesheet" type="text/css" href="assets/css/vendor.css">
<link rel="stylesheet" type="text/css" href="assets/css/flat-admin.css">
<script src="assets/ckeditor/ckeditor.js"></script>


</head>
<body>
<div class="app">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="app-brand"><img src="assets/images/app_logo.png" alt="app logo" /></a>
        <div class="app-name"><?php echo XRADIO_APP_NAME;?></div>
      </div>
      <ul class="nav navbar-nav">
        <li><a href="xradio_home.php" class= "nav-tab-item">Home</a></li>
        <li><a href="xradio_settings.php" class= "nav-tab-item">Settings</a></li>
        <li><a href="xradio_profile.php" class= "nav-tab-item">User Profile</a></li>
        <li><a href="xradio_api.php" class= "nav-tab-item">API</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
         <li class="dropdown">
           <a class="dropdown-toggle" data-toggle="dropdown" href="#">
             <?php if(XRADIO_USER_AVATAR){?>
               <img class="profile-img" src="assets/images/<?php echo XRADIO_USER_AVATAR;?>">
             <?php }else{?>
               <img class="profile-img" src="assets/images/profile.png">
             <?php }?>
           </a>
           <ul class="dropdown-menu">
             <h2 class="dropdown-menu-title"><?php echo XRADIO_USER_NAME;?></h2>
             <li><a href="xradio_logout.php"  class="dropdown-menu-item">Logout</a></li>
           </ul>
         </li>
      </ul>
    </div>
  </nav>

  <aside class="app-sidebar" id="sidebar">
    <div class="sidebar-menu">
      <ul class="sidebar-nav">
        <li <?php if($script_name=="x_manage_genres.php" or $script_name=="x_add_genre.php"){?>class="active"<?php }?>>
          <a href="x_manage_genres.php">
            <div class="nav_icon"><i class="fa fa fa-cubes" aria-hidden="true"></i></div>
            <div class="nav_title">Genres</div>
          </a>
        </li>
        <li <?php if($script_name=="x_manage_countries.php" or $script_name=="x_add_country.php"){?>class="active"<?php }?>>
          <a href="x_manage_countries.php">
            <div class="nav_icon"><i class="fa fa-flag" aria-hidden="true"></i></div>
            <div class="nav_title">Countries</div>
          </a>
        </li>
        <li <?php if($script_name=="x_manage_radios.php" or $script_name=="x_add_radio.php"){?>class="active"<?php }?>>
          <a href="x_manage_radios.php">
            <div class="nav_icon"><i class="fas fa-podcast" aria-hidden="true"></i> </div>
            <div class="nav_title">Radios</div>
          </a>
        </li>
        <li <?php if($script_name=="x_manage_themes.php" or $script_name=="x_add_theme.php"){?>class="active"<?php }?>>
          <a href="x_manage_themes.php">
            <div class="nav_icon"><i class="fa fa-magic" aria-hidden="true"></i> </div>
            <div class="nav_title">Themes</div>
          </a>
        </li>

        <li <?php if($script_name=="xradio_remote_configs.php"){?>class="active"<?php }?>>
          <a href="xradio_remote_configs.php">
            <div class="nav_icon"><i class="fas fa-code-branch" aria-hidden="true"></i> </div>
            <div class="nav_title">Remote Config</div>
          </a>
        </li>

        <li <?php if($script_name=="xradio_profile.php"){?>class="active"<?php }?>>
          <a href="xradio_profile.php">
            <div class="nav_icon"> <i class="fa fa-user-secret" aria-hidden="true"></i> </div>
            <div class="nav_title">User Profile</div>
          </a>
        </li>

        <li <?php if($script_name=="xradio_api.php"){?>class="active"<?php }?>>
          <a href="xradio_api.php">
            <div class="nav_icon"><i class="fa fa-transgender-alt" aria-hidden="true"></i> </div>
            <div class="nav_title">API</div>
          </a>
        </li>

        <li <?php if($script_name=="xradio_settings.php"){?>class="active"<?php }?>>
          <a href="xradio_settings.php">
            <div class="nav_icon"> <i class="fa fa-cog" aria-hidden="true"></i> </div>
            <div class="nav_title">Settings</div>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  <div class="app-container">
