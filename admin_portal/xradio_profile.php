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

	if(isset($_SESSION['id'])){
		$qry="select * from users where user_id='".$_SESSION['id']."'";
		$result=mysqli_query($mysqli,$qry);
		$row=mysqli_fetch_assoc($result);
	}
	if(isset($_POST['submit'])){
		$password="";
		if(isset($_POST['user_password'])){
			$password=$_POST['user_password'];
		}
		$retype_pass="";
		if(isset($_POST['retype_password'])){
			$retype_pass=$_POST['retype_password'];
		}
		if($password!=$retype_pass){
			$_SESSION['msg']="9";
			header( "Location:xradio_profile.php");
			exit;
		}
		$username=$_POST['user_name'];
		if(!preg_match('/^[a-zA-Z0-9_]{4,}$/', $username)){
			$_SESSION['msg']="10";
			header( "Location:xradio_profile.php");
			exit;
		}
		$user_email=$_POST['user_email'];
		if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){
			$_SESSION['msg']="11";
			header( "Location:xradio_profile.php");
			exit;
		}
		$pw_hash="";
		if($password!=""){
				$options = [
	    		'cost' => 12,
				];
				$pw_hash=password_hash($password, PASSWORD_BCRYPT, $options);
		}
		$user_avatar="";
		if($_FILES['user_avatar']['name']!=""){
			$user_avatar="user_".rand(0,99999)."_".$_FILES['user_avatar']['name'];
			$tpath1='assets/images/'.$user_avatar;
			$pic1=process_image($_FILES["user_avatar"]["tmp_name"], $tpath1, 100);
			if(XRADIO_USER_AVATAR!=""){
				unlink('assets/images/'.XRADIO_USER_AVATAR);
			}
		}
		if($pw_hash!=""){
			$data = array(
					'user_name'  =>  $username,
					'user_password'  =>  $pw_hash,
					'user_email'  =>  $user_email
			);
		}
		else{
			$data = array(
					'user_name'  =>  $username,
					'user_email'  =>  $user_email
			);
		}
		if($user_avatar!=""){
			$data['user_avatar']=$user_avatar;
		}
		update_tbl('users', $data, "WHERE user_id = '".$_SESSION['id']."'");
		$_SESSION['msg']="7";
		header( "Location:xradio_profile.php");
		exit;
	}
?>
<div class="row">
      <div class="col-md-12">
        <div class="card">
		  		<div class="page_title_block">
            <div class="col-md-5 col-xs-12">
              <div class="page_title">User Profile</div>
            </div>
						<div class="divider"></div>
          </div>

          <div class="clearfix"></div>
          <div class="row card-top">
            <div class="col-md-12">
              <div class="col-md-12 col-sm-12">
                <?php if(isset($_SESSION['msg'])){?>
								 <?php if($_SESSION['msg']=="7"){?>
                 			<div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                  		<?php echo $client_msg[$_SESSION['msg']] ;?></a> </div>
								 <?php } else {?>
									 		<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
									 		<?php echo $client_msg[$_SESSION['msg']];?></a> </div>
								 <?php }?>
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
            <form action="" name="editprofile" method="post" class="form form-horizontal" enctype="multipart/form-data">
              <div class="section">
                <div class="section-body">
                  <div class="form-group">
                    <label class="col-md-3 control-label">Username</label>
                    <div class="col-md-6">
                      <input type="text" name="user_name" id="user_name" value="<?php echo $row['user_name'];?>" class="form-control" required autocomplete="off">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Password</label>
                    <div class="col-md-6">
                      <input type="password" name="user_password" id="user_password" placeholder="********" class="form-control" autocomplete="off">
                    </div>
                  </div>
									<div class="form-group">
                    <label class="col-md-3 control-label">Retype Password</label>
                    <div class="col-md-6">
                      <input type="password" name="retype_password" id="retype_password" placeholder="********" class="form-control" autocomplete="off">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-md-3 control-label">Email</label>
                    <div class="col-md-6">
                      <input type="email" name="user_email" id="user_email" value="<?php echo $row['user_email'];?>" class="form-control" required autocomplete="off">
                    </div>
                  </div>

									<div class="form-group">
										<label class="col-md-3 control-label">Avatar</label>
										<div class="col-md-6">
											<div class="fileupload_block">
												<input type="file" name="user_avatar" value="fileupload" id="fileupload">
														<?php if($row['user_avatar']!="") {?>
														<div class="user_upload_img"><img class="user_avatar" type="image" src="assets/images/<?php echo $row['user_avatar'];?>" /></div>
														<?php } else {?>
														<div class="user_upload_img"><img class="user_avatar" type="image" src="assets/images/profile.png" /></div>
													<?php }?>
											</div>
										</div>
									</div>

                  <div class="form-group">
                    <div class="col-md-6 col-md-offset-3">
                      <button type="submit" name="submit" class="btn btn-primary">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
</div>
<?php include("includes/xradio_footer.php");?>
