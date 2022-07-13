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
  //conversion angle to adapt with cordinate of web
  $root_url="http://".$_SERVER['SERVER_NAME']. dirname($_SERVER['REQUEST_URI']);
  $server_url=$root_url."/api/api.php?method=";

	$api_arrays = array(
    "YOUR API KEY"=>API_KEY,
    "Genres list"=>$server_url."getGenres&api_key=".API_KEY,
		"Detail One Radio"=>$server_url."getRadios&api_key=".API_KEY."&radio_id=1",
		"TopChart radios with paging"=>$server_url."getRadios&api_key=".API_KEY."&offset=0&limit=10&is_feature=1",
    "Radios list with paging"=>$server_url."getRadios&api_key=".API_KEY."&offset=0&limit=10",
    "Search radios with paging"=>$server_url."getRadios&api_key=".API_KEY."&offset=0&limit=10&q=edm",
    "Radios of genre with paging"=>$server_url."getRadios&api_key=".API_KEY."&offset=0&limit=10&genre_id=1",
    "Themes with paging"=>$server_url."getThemes&api_key=".API_KEY."&offset=0&limit=10",
    "Theme of single radio app"=>$server_url."getThemes&api_key=".API_KEY."&app_type=1",
    "Remote Configs"=>$server_url."getRemoteConfigs&api_key=".API_KEY,
    "Countries list"=>$server_url."getCountries&api_key=".API_KEY,
    "Radios of country with paging"=>$server_url."getRadios&api_key=".API_KEY."&offset=0&limit=10&country_id=1",
    "Privacy Policy"=>$root_url."/privacy_policy.php",
    "Term of Use"=>$root_url."/term_of_use.php"
  );

?>
	<div class="row">
      <div class="col-xs-12">
        <div class="card card-bottom">
          <div class="page_title_block">
            <div class="col-md-5 col-xs-12">
              <div class="page_title">List API</div>
            </div>
						<div class="divider"></div>
          </div>

          <div class="col-md-12 card-top container-api">
            <?php foreach($api_arrays as $key => $value) {?>
              <div class="api-title"><?php echo $key;?></div>
              <?php if($value!=API_KEY) {?>
                <div class="api-content"><a href="<?php echo $value;?>" target ="_blank"><?php echo $value;?></a></div>
              <?php } else { ?>
                <div class="api-content"><?php echo $value;?></div>
              <?php }?>
            <?php }?>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
</div>
<?php include("includes/xradio_footer.php");?>
