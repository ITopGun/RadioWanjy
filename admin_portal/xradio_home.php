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
  include("includes/xradio_header.php");
  $qry_cat="SELECT COUNT(*) as num FROM genres";
  $total_cats= mysqli_fetch_array(mysqli_query($mysqli,$qry_cat));
  $total_cats = $total_cats['num'];

  $qry_radios="SELECT COUNT(*) as num FROM radios";
  $total_radios= mysqli_fetch_array(mysqli_query($mysqli,$qry_radios));
  $total_radios = $total_radios['num'];

  $qry_themes="SELECT COUNT(*) as num FROM themes";
  $total_themes= mysqli_fetch_array(mysqli_query($mysqli,$qry_themes));
  $total_themes = $total_themes['num'];

  $qry_configs="SELECT COUNT(*) as num FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = '".XRADIO_DB_NAME."' AND table_name = 'configs'";
  $total_configs= mysqli_fetch_array(mysqli_query($mysqli,$qry_configs));
  $total_configs = $total_configs['num']-1;

?>
<div class="row">
    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"> <a href="x_manage_genres.php" class="card card-home card-home-green">
      <div class="card-home-body">
        <i class="icon fa fa-cubes"></i>
        <div class="content">
          <div class="title">Genres</div>
          <div class="value"><span class="sign"></span><?php echo $total_cats;?></div>
        </div>
      </div>
      </a>
    </div>

    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"> <a href="x_manage_radios.php" class="card card-home card-home-green">
      <div class="card-home-body">
        <i class="icon fas fa-podcast"></i>
        <div class="content">
          <div class="title">Radios</div>
          <div class="value"><span class="sign"></span><?php echo $total_radios;?></div>
        </div>
      </div>
      </a>
    </div>

    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"> <a href="x_manage_themes.php" class="card card-home card-home-green">
      <div class="card-home-body">
        <i class="icon fa fa-magic"></i>
        <div class="content">
          <div class="title">Themes</div>
          <div class="value"><span class="sign"></span><?php echo $total_themes;?></div>
        </div>
      </div>
      </a>
    </div>

    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"> <a href="xradio_remote_configs.php" class="card card-home card-home-green">
      <div class="card-home-body">
        <i class="icon fas fa-code-branch"></i>
        <div class="content">
          <div class="title">Remote Configs</div>
          <div class="value"><span class="sign"></span><?php echo $total_configs;?></div>
        </div>
      </div>
      </a>
    </div>

</div>
<?php include("includes/xradio_footer.php");?>
