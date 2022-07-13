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

	$orientation_arrays = array(
												0=>"Left Right",
												180=>"Right Left",
												270=>"Top Bottom",
												90=>"Bottom Top",
												315=>"Top Left Bottom Right",
												225=>"Top Right Bottom Left",
												45 =>"Bottom Left Top Right",
												135=>"Bottom Right Top Left");

	$url_action="";
	if(isset($_GET['action'])){
		$action=$_GET['action'];
		if($action=="add"){
			if(isset($_POST['submit'])){
				$theme_image="";
				if($_FILES['theme_img']['name']!=""){
					$theme_image="theme_".rand(0,99999)."_".$_FILES['theme_img']['name'];
					$tpath1='uploads/themes/'.$theme_image;
					$pic1=process_image($_FILES["theme_img"]["tmp_name"], $tpath1, 100);
				}
				$data = array(
					'name'  =>  $_POST['theme_name'],
					'img'  => $theme_image
				);
				$data['grad_start_color']  =  isset($_POST['grad_start_color']) && $_POST['grad_start_color']!="" ?$_POST['grad_start_color']:"0";
				$data['grad_end_color']  =  isset($_POST['grad_end_color']) && $_POST['grad_end_color']!="" ?$_POST['grad_end_color']:"0";
				$data['grad_orientation']  =  isset($_POST['grad_orientation']) && $_POST['grad_orientation']!="" ?$_POST['grad_orientation']:0;

				insert_tbl('themes',$data);
				$_SESSION['msg']="6";
				header( "Location:x_add_theme.php?action=add");
				exit;
			}
		}
		elseif($action=="delete_image"){
			$theme_id=$_GET['id'];
			$img_res=mysqli_query($mysqli,"SELECT * FROM themes WHERE id=$theme_id");
			$img_res_row=mysqli_fetch_assoc($img_res);
			if($img_res_row['img']!=""){
				unlink('uploads/themes/'.$img_res_row['img']);
				$data = array(
					'img'  => ""
				);
				update_tbl('themes', $data, "WHERE id = $theme_id");
				header( "Location:x_add_theme.php?action=edit&id=".$theme_id);
				exit;
			}
		}
		elseif($action=="edit"){
			if(isset($_POST['submit']) and isset($_POST['theme_id'])){
				$theme_id=$_POST['theme_id'];
				$theme_name=$_POST['theme_name'];
				$theme_name=str_replace("'","\'",$theme_name);

				$theme_image="";
				$img_res=mysqli_query($mysqli,"SELECT * FROM themes WHERE id=$theme_id");
				$img_res_row=mysqli_fetch_assoc($img_res);
				if($img_res_row['img']!=""){
					$theme_image=$img_res_row['img'];
				}
				//check delete old image
				if($_FILES['theme_img']['name']!=""){
					if($theme_image!=""){
						unlink('uploads/themes/'.$theme_image);
					}
					//put new image
					$theme_image="theme_".rand(0,99999)."_".$_FILES['theme_img']['name'];
					$tpath1='uploads/themes/'.$theme_image;
					$pic1=process_image($_FILES["theme_img"]["tmp_name"], $tpath1, 100);
				}

				$data = array(
					'name'  =>  $theme_name
				);
				$data['grad_start_color']  =  isset($_POST['grad_start_color']) && $_POST['grad_start_color']!="" ?$_POST['grad_start_color']:"0";
				$data['grad_end_color']  =  isset($_POST['grad_end_color']) && $_POST['grad_end_color']!="" ?$_POST['grad_end_color']:"0";
				$data['grad_orientation']  =  isset($_POST['grad_orientation']) && $_POST['grad_orientation']!="" ?$_POST['grad_orientation']:0;

				if($theme_image!=""){
					$data['img']=$theme_image;
				}
				update_tbl('themes', $data, "WHERE id = $theme_id");
				$_SESSION['msg']="7";
				header("Location:x_add_theme.php?action=edit&id=".$theme_id);
				exit;
			}
			$theme_id=$_GET['id'];
			$qry="SELECT * FROM themes where id=$theme_id";
			$result=mysqli_query($mysqli,$qry);
			$row=mysqli_fetch_assoc($result);
		}
		elseif($action=="copy"){
			$theme_id=$_GET['id'];
			$qry="SELECT * FROM themes where id=$theme_id";
			$result=mysqli_query($mysqli,$qry);
			$row=mysqli_fetch_assoc($result);
			$url_action="x_add_theme.php?action=add&id=$theme_id";
		}
	}
?>

<div class="row">
	<div class="col-md-12">
		<div class="card">
      <div class="page_title_block">
        <div class="col-md-5 col-xs-12">
          <div class="page_title"><?php if(isset($_GET['id']) and $action=="edit"){?>Edit Theme<?php }else{?>Add Theme<?php }?></div>
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
        <form action="<?php echo $url_action ?>" name="addedittheme" method="post" class="form form-horizontal" enctype="multipart/form-data">
        	<input  type="hidden" name="theme_id" value="<?php echo $_GET['id'];?>" />
          <div class="section">
            <div class="section-body">
              <div class="form-group">
                <label class="col-md-3 control-label">Name (*)</label>
                <div class="col-md-6">
                  <input type="text" name="theme_name" id="theme_name" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['name'];}?>" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label class="col-md-3 control-label">Background Image (size 720x1280)</label>
                <div class="col-md-6">
                  <div class="fileupload_block">
                    <input type="file" name="theme_img" value="fileupload" id="fileupload">
                        <?php if(isset($_GET['id']) and $action=="edit" and $row['img']!="") {?>
                    	  <div class="user_upload_img"><img type="image" class="bg_app" src="uploads/themes/<?php echo $row['img'];?>" alt="theme image"/></div>
                    	 <?php } else {?>
                    	  <div class="user_upload_img"><img type="image" class="bg_app" src="uploads/themes/theme_default.jpg" alt="theme image"/></div>
                    	<?php }?>
                  </div>
                </div>
              </div>

							<?php if(isset($_GET['id']) and $row['img']!="" and $action=="edit") {?>
							 	<div class="form-group">
								 <div class="col-md-9 col-md-offset-3">
									 <div class="add_btn_accent"> <a href="x_add_theme.php?action=delete_image&id=<?php echo $_GET['id'];?>" onclick="return confirm('Do you want to delete this image?');">Delete image</a></div>
								 </div>
							 	</div>
						 	<?php }?>

							<div class="form-group">
								<label class="col-md-3 control-label">Gradient Start Color (*)</label>
								<div class="col-md-6">
									<input type="color" name="grad_start_color" id="grad_start_color" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['grad_start_color'];}?>" class="form-control input-sm" required>
								</div>
							</div>

							<div class="form-group">
								<label class="col-md-3 control-label">Gradient End Color (*)</label>
								<div class="col-md-6">
									<input type="color" name="grad_end_color" id="grad_end_color" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['grad_end_color'];}?>" class="form-control input-sm" required>
								</div>
							</div>

							<div class="form-group">
								<label class="col-md-3 control-label-select">Gradient Orientaion (*)</label>
								<div class="col-md-6">
									 <select name="grad_orientation" id="grad_orientation" class="select-radio" required>
									 <?php foreach($orientation_arrays as $key => $value) {?>
											<?php if($key==$row['grad_orientation']) {?>
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
</div>

<?php include("includes/xradio_footer.php");?>
