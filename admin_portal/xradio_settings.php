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

	$qry="SELECT * FROM settings where id='1'";
  $result=mysqli_query($mysqli,$qry);
  $row=mysqli_fetch_assoc($result);

  if(isset($_POST['submit'])){
		$data = array(
			'app_name'  =>  $_POST['app_name'],
			'app_email'  =>  $_POST['app_email'],
			'app_copyright'  =>  $_POST['app_copyright'],
			'app_phone'  =>  $_POST['app_phone'],
			'app_website'  =>  $_POST['app_website'],
			'app_facebook'  =>  $_POST['app_facebook'],
			'app_twitter'  =>  $_POST['app_twitter'],
			'app_term_of_use'  =>  $_POST['app_term_of_use'],
			'app_privacy_policy'  =>  $_POST['app_privacy_policy']
		);
    update_tbl('settings', $data, "WHERE id = '1'");
    $_SESSION['msg']="7";
    header( "Location:xradio_settings.php");
    exit;
  }
?>
<div class="row">
	<div class="col-md-12">
		<div class="card">
		  <div class="page_title_block">
        <div class="col-md-5 col-xs-12">
          <div class="page_title">Settings</div>
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
	                <label class="col-md-3 control-label">App Name (*)</label>
	                <div class="col-md-6">
	                  <input type="text" name="app_name" id="app_name" value="<?php echo $row['app_name'];?>" class="form-control" required>
	                </div>
	              </div>

								<div class="form-group">
	                <label class="col-md-3 control-label">Email Contact (*)</label>
	                <div class="col-md-6">
	                  <input type="email" name="app_email" id="app_email" value="<?php echo $row['app_email'];?>"  class="form-control" required>
	                </div>
	              </div>

								<div class="form-group">
									<label class="col-md-3 control-label">Website (*)</label>
									<div class="col-md-6">
										<input type="url" name="app_website" id="app_website" value="<?php echo $row['app_website'];?>"  class="form-control" required>
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label">Copyright Info (*)</label>
									<div class="col-md-6">
										<input type="text" name="app_copyright" id="app_copyright" value="<?php echo $row['app_copyright'];?>"  class="form-control" required>
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label">Phone Number</label>
									<div class="col-md-6">
										<input type="tel" name="app_phone" id="app_phone" value="<?php echo $row['app_phone'];?>"  class="form-control">
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label">Facebook Page</label>
									<div class="col-md-6">
										<input type="url" name="app_facebook" id="app_facebook" value="<?php echo $row['app_facebook'];?>"  class="form-control">
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label">Twitter Page</label>
									<div class="col-md-6">
										<input type="url" name="app_twitter" id="app_twitter" value="<?php echo $row['app_twitter'];?>"  class="form-control">
									</div>
								</div>

								<div class="form-group">
									<label class="col-md-3 control-label">Privacy Policy</label>
									<div class="col-md-6">
										<textarea name="app_privacy_policy" id="app_privacy_policy" class="form-control"><?php echo $row['app_privacy_policy'];?></textarea>
										<script>CKEDITOR.replace('app_privacy_policy');</script>
									</div>
								</div>

								<div class="clearfix"></div>
								<div class="row card-top"></div>

								<div class="form-group">
									<label class="col-md-3 control-label">Term Of Use</label>
									<div class="col-md-6">
										<textarea name="app_term_of_use" id="app_term_of_use" class="form-control"><?php echo $row['app_term_of_use'];?></textarea>
										<script>CKEDITOR.replace('app_term_of_use');</script>
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
