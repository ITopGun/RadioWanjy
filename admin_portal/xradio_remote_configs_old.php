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
	include("includes/xradio_function.php");
	include("includes/xradio_msg.php");

	$qry="SELECT * FROM configs where id=1";
  $result=mysqli_query($mysqli,$qry);
  $row=mysqli_fetch_assoc($result);

	$use_bg_arrays = array(0=>"Just ActionBar", 1=>"Full Background");
	$ui_radio_arrays = array(1=>"Flat Grid", 2=>"Flat List", 3=>"Card Grid",4=>"Card List");
	$ui_themes_arrays = array(1=>"Flat Grid", 2=>"Flat List", 3=>"Card Grid",4=>"Card List",0=>"Hidden");
	$ui_cat_arrays = array(1=>"Flat Grid", 2=>"Flat List", 3=>"Card Grid",4=>"Card List",5=>"Magic Grid",0=>"Hidden");
	$ui_player_arrays = array(1=>"Square Disk",2=>"Circle Disk",3=>"Rotate Disk",4=>"Square Disk - No LastFM",5=>"Circle Disk - No LastFM",6=>"Rotate Disk - No LastFM");
	$radio_arrays = array(1=>"Single Radio", 2=>"Multi Radios");

  if(isset($_POST['submit'])){
		$data = array(
			'ui_top_chart'  =>  $_POST['ui_top_chart'],
			'ui_genre'  =>  $_POST['ui_genre'],
			'ui_favorite'  =>  $_POST['ui_favorite'],
			'ui_themes'  =>  $_POST['ui_themes'],
			'ui_detail_genre'  =>  $_POST['ui_detail_genre'],
			'ui_player'  =>  $_POST['ui_player'],
			'ui_search'  =>  $_POST['ui_search'],
			'is_full_bg'  =>  $_POST['is_full_bg'],
			'app_type'  =>  $_POST['app_type']
		);
    update_tbl('configs', $data, "WHERE id = '1'");
    $_SESSION['msg']="7";
    header( "Location:xradio_remote_configs.php");
    exit;
  }
?>
<div class="row">
	<div class="col-md-12">
		<div class="card">
		  <div class="page_title_block">
        <div class="col-md-5 col-xs-12">
          <div class="page_title">Remote Config</div>
        </div>
				<div class="divider"></div>
			</div>

			<div class="clearfix"></div>
			<div class="row card-top">
        	<div class="col-md-12">
            <div class="col-md-12 col-sm-12">
              <?php if(isset($_SESSION['msg'])){?>
               <div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                <?php echo $client_msg[$_SESSION['msg']] ; ?></a> </div>
              <?php unset($_SESSION['msg']);}?>
            </div>
          </div>
			</div>

			<!-- auto dismiss dialog -->
			<script type="text/javascript">
				$(document).ready(function () {
				window.setTimeout(function() {
						$(".alert").fadeTo(500, 0).slideUp(500, function(){
							$(this).remove();
						});
				}, 800);
				});
			</script>
			<div class="card-home-body card-bottom">
					<form action="" name="settings" method="post" class="form form-horizontal" enctype="multipart/form-data">
						<div class="section">
	            <div class="section-body">

								<div class="form-group">
									<label class="col-md-3 control-label-select">App Types (*)</label>
									<div class="col-md-6">
										 <select name="app_type" id="app_type" class="select-radio" required>
										 <?php foreach($radio_arrays as $key => $value) {?>
												<?php if($key==$row['app_type']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label-select">Background Mode (*)</label>
									<div class="col-md-6">
										 <select name="is_full_bg" id="is_full_bg" class="select-radio" required>
										 <?php foreach($use_bg_arrays as $key => $value) {?>
												<?php if($key==$row['is_full_bg']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>

	              <div class="form-group">
	                <label class="col-md-3 control-label-select">UI TopChart (*)</label>
									<div class="col-md-6">
										 <select name="ui_top_chart" id="ui_top_chart" class="select-radio" required>
										 <?php foreach($ui_radio_arrays as $key => $value) {?>
											  <?php if($key==$row['ui_top_chart']) {?>
												 	<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
	              </div>
								<div class="form-group">
	                <label class="col-md-3 control-label-select">UI Genres (*)</label>
									<div class="col-md-6">
										 <select name="ui_genre" id="ui_genre" class="select-radio" required>
										 <?php foreach($ui_cat_arrays as $key => $value) {?>
											  <?php if($key==$row['ui_genre']) {?>
												 	<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
	              </div>
								<div class="form-group">
									<label class="col-md-3 control-label-select">UI Favorite (*)</label>
									<div class="col-md-6">
										 <select name="ui_favorite" id="ui_favorite" class="select-radio" required>
										 <?php foreach($ui_radio_arrays as $key => $value) {?>
												<?php if($key==$row['ui_favorite']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label-select">UI Search (*)</label>
									<div class="col-md-6">
										 <select name="ui_search" id="ui_search" class="select-radio" required>
										 <?php foreach($ui_radio_arrays as $key => $value) {?>
												<?php if($key==$row['ui_search']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label-select">UI Themes (*)</label>
									<div class="col-md-6">
										 <select name="ui_themes" id="ui_themes" class="select-radio" required>
										 <?php foreach($ui_themes_arrays as $key => $value) {?>
												<?php if($key==$row['ui_themes']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label-select">UI Detail Genre (*)</label>
									<div class="col-md-6">
										 <select name="ui_detail_genre" id="ui_detail_genre" class="select-radio" required>
										 <?php foreach($ui_radio_arrays as $key => $value) {?>
												<?php if($key==$row['ui_detail_genre']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>
								<div class="form-group">
									<label class="col-md-3 control-label-select">UI Player (*)</label>
									<div class="col-md-6">
										 <select name="ui_player" id="ui_player" class="select-radio" required>
										 <?php foreach($ui_player_arrays as $key => $value) {?>
												<?php if($key==$row['ui_player']) {?>
													<option value="<?php echo $key;?>" selected><?php echo $value;?></option>
												<?php }else {?>
													<option value="<?php echo $key;?>"><?php echo $value;?></option>
												<?php }?>
										 <?php }?>
										 </select>
									 </div>
								</div>

								<div class="form-group">
									<div class="col-md-9 col-md-offset-3" style="margin-bottom:15px;margin-top:15px;color:#c375f2;">(*) Required Field.</div>
								</div>

							 	<div class="form-group">
	                <div class="col-md-9 col-md-offset-3">
	                  <button type="submit" name="submit" class="btn btn-primary">Save</button>
	                </div>
	              </div>

	            </div>
	          </div>
					</form>

      </div>
		</div>
</div>
<?php include("includes/xradio_footer.php");?>
