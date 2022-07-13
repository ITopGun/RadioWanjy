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

	$url_action="";
	if(isset($_GET['action'])){
		$action=$_GET['action'];
		if($action=="add"){
			if(isset($_POST['submit'])){
				$genre_ids= array();
				if(isset($_POST['genre_id'])){
					$genre_ids=$_POST['genre_id'];
				}
				$radio_image="";
				if($_FILES['radio_img']['name']!=""){
					$radio_image="radio_".rand(0,99999)."_".$_FILES['radio_img']['name'];
					$tpath1='uploads/radios/'.$radio_image;
					$pic1=process_image($_FILES["radio_img"]["tmp_name"], $tpath1, 100);
				}
				$data = array(
					'name'  =>  $_POST['radio_name'],
					'type_radio'  =>  $_POST['type_radio'],
					'source_radio'  =>  $_POST['source_radio'],
					'link_radio'  =>  $_POST['link_radio'],
					'img'  => $radio_image
				);
				$data['user_agent_radio']  =  isset($_POST['user_agent_radio'])?$_POST['user_agent_radio']:"";
				$data['bitrate']  =  isset($_POST['bitrate'])?$_POST['bitrate']:"";
				$data['tags']  =  isset($_POST['tags'])?$_POST['tags']:"";
				$data['url_facebook']  =  isset($_POST['url_facebook'])?$_POST['url_facebook']:"";
				$data['url_twitter']  =  isset($_POST['url_twitter'])?$_POST['url_twitter']:"";
				$data['url_website']  =  isset($_POST['url_website'])?$_POST['url_website']:"";
				$data['url_instagram']  =  isset($_POST['url_instagram'])?$_POST['url_instagram']:"";

				$last_id=insert_tbl('radios',$data);
				if(!empty($genre_ids) and $last_id>0){
					foreach ($genre_ids as $genre_id){
						$data1 = array(
							'radio_id'  =>  $last_id,
							'genre_id'  => $genre_id
						);
						insert_tbl('radios_cat',$data1);
					}
				}
				$_SESSION['msg']="6";
				header( "Location:x_add_radio.php?action=add");
				exit;
			}
			$genre_qry="SELECT * FROM genres ORDER BY name";
			$genre_result=mysqli_query($mysqli,$genre_qry);
		}
		elseif($action=="delete_image"){
			$radio_id=$_GET['id'];
			$img_res=mysqli_query($mysqli,"SELECT * FROM radios WHERE id=$radio_id");
			$img_res_row=mysqli_fetch_assoc($img_res);
			if($img_res_row['img']!=""){
				unlink('uploads/radios/'.$img_res_row['img']);
				$data = array(
					'img'  => ""
				);
				update_tbl('radios', $data, "WHERE id = $radio_id");
				header( "Location:x_add_radio.php?action=edit&id=".$radio_id);
				exit;
			}
			$genre_qry="SELECT g.id, g.name,IFNULL((select count(id) from radios_cat rc where rc.genre_id=g.id and rc.radio_id=$radio_id),0) as num_radio FROM genres g ORDER BY name";
			$genre_result=mysqli_query($mysqli,$genre_qry);
		}
		elseif($action=="edit"){
			if(isset($_POST['submit']) and isset($_POST['radio_id'])){
				$radio_id=$_POST['radio_id'];
				$radio_name=$_POST['radio_name'];
				$radio_name=str_replace("'","\'",$radio_name);

				$genre_ids=$_POST['genre_id'];

				$radio_image="";
				$img_res=mysqli_query($mysqli,"SELECT * FROM radios WHERE id=$radio_id");
				$img_res_row=mysqli_fetch_assoc($img_res);
				if($img_res_row['img']!=""){
					$radio_image=$img_res_row['img'];
				}
				//check delete old image
				if($_FILES['radio_img']['name']!=""){
					if($radio_image!=""){
						unlink('uploads/radios/'.$radio_image);
					}
					//put new image
					$radio_image="radio_".rand(0,99999)."_".$_FILES['radio_img']['name'];
					$tpath1='uploads/radios/'.$radio_image;
					$pic1=process_image($_FILES["radio_img"]["tmp_name"], $tpath1, 100);
				}

				$data = array(
					'name'  =>  $radio_name,
					'type_radio'  =>  $_POST['type_radio'],
					'source_radio'  =>  $_POST['source_radio'],
					'link_radio'  =>  $_POST['link_radio'],
					'user_agent_radio'  =>  $_POST['user_agent_radio'],
					'bitrate'  =>  $_POST['bitrate'],
					'tags'  =>  $_POST['tags'],
					'url_facebook'  =>  $_POST['url_facebook'],
					'url_twitter'  =>  $_POST['url_twitter'],
					'url_website'  =>  $_POST['url_website'],
					'url_instagram'  =>  $_POST['url_instagram']
				);
				if($radio_image!=""){
					$data['img']=$radio_image;
				}
				update_tbl('radios', $data, "WHERE id = $radio_id");
				if(!empty($genre_ids)){
					//delete genre which not in array
					$check_rc_result=mysqli_query($mysqli,"SELECT genre_id FROM radios_cat rc WHERE rc.radio_id=$radio_id");
					while ($check_rc_row = mysqli_fetch_array($check_rc_result)) {
							$old_genre_id=$check_rc_row['genre_id'];
							$need_delete=TRUE;
							foreach ($genre_ids as $genre_id){
								if($genre_id==$old_genre_id){
									$need_delete=FALSE;
									break;
								}
							}
							if($need_delete){
								delete_tbl('radios_cat',"radio_id=$radio_id and genre_id=$old_genre_id");
							}
					}
					foreach ($genre_ids as $genre_id){
						$rc_res=mysqli_query($mysqli,"SELECT id FROM radios_cat rc WHERE rc.radio_id=$radio_id and rc.genre_id=$genre_id limit 1");
						$rc_row=mysqli_fetch_assoc($rc_res);
						if(empty($rc_row)){
							$data1 = array(
								'radio_id'  =>  $radio_id,
								'genre_id'  => $genre_id
							);
							insert_tbl('radios_cat',$data1);
						}
					}
				}
				$_SESSION['msg']="7";
				header("Location:x_add_radio.php?action=edit&id=".$radio_id);
				exit;
			}
			$radio_id=$_GET['id'];
			$qry="SELECT * FROM radios where id=$radio_id";
			$result=mysqli_query($mysqli,$qry);
			$row=mysqli_fetch_assoc($result);

			$genre_qry="SELECT g.id, g.name,IFNULL((select count(id) from radios_cat rc where rc.genre_id=g.id and rc.radio_id=$radio_id),0) as num_radio FROM genres g ORDER BY name";
			$genre_result=mysqli_query($mysqli,$genre_qry);

		}
		elseif($action=="copy"){
			$radio_id=$_GET['id'];
			$qry="SELECT * FROM radios where id=$radio_id";
			$result=mysqli_query($mysqli,$qry);
			$row=mysqli_fetch_assoc($result);
			$url_action="x_add_radio.php?action=add&id=$radio_id";

			$genre_qry="SELECT g.id, g.name,IFNULL((select count(id) from radios_cat rc where rc.genre_id=g.id and rc.radio_id=$radio_id),0) as num_radio FROM genres g ORDER BY name";
			$genre_result=mysqli_query($mysqli,$genre_qry);
		}
	}
?>

<div class="row">
	<div class="col-md-12">
		<div class="card">
      <div class="page_title_block">
        <div class="col-md-5 col-xs-12">
          <div class="page_title"><?php if(isset($_GET['id']) and $action=="edit"){?>Edit Radio<?php }else{?>Add Radio<?php }?></div>
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
        <form action="<?php echo $url_action ?>" name="addeditradio" method="post" class="form form-horizontal" enctype="multipart/form-data">
        	<input  type="hidden" name="radio_id" value="<?php echo $_GET['id'];?>" />
          <div class="section">
            <div class="section-body">
              <div class="form-group">
                <label class="col-md-3 control-label">Name (*)</label>
                <div class="col-md-6">
                  <input type="text" name="radio_name" id="radio_name" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['name'];}?>" class="form-control" required>
                </div>
              </div>
							<div class="form-group">
								<label class="col-md-3 control-label">BitRate (*)</label>
								<div class="col-md-6">
									<input type="text" name="bitrate" id="bitrate" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['bitrate'];}?>" class="form-control" required>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Tags (*)</label>
								<div class="col-md-6">
									<input type="text" name="tags" id="tags" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['tags'];}?>" class="form-control" required>
								</div>
							</div>
							<div class="form-group">
                <label class="col-md-3 control-label-select">Format (*)</label>
								<div class="col-md-6">
									 <select name="type_radio" id="type_radio" class="select-radio" required>
									 <?php if(isset($_GET['id']) || $action=="copy"){?>
										  <?php if($row['type_radio']=="MP3") {?>
											 	<option value="MP3" selected>MP3 (audio/mpeg)</option>
											<?php }else {?>
												<option value="MP3">MP3 (audio/mpeg)</option>
											<?php }?>
											<?php if($row['type_radio']=="AAC") {?>
												<option value="AAC" selected>AAC (audio/aacp)</option>
											<?php }else {?>
												<option value="AAC">AAC (audio/aacp)</option>
											<?php }?>
									 <?php }else {?>
										 <option value="MP3" selected>MP3 (audio/mpeg)</option>
										 <option value="AAC">AAC (audio/aacp)</option>
									 <?php }?>
									 </select>
								 </div>
              </div>
							<div class="form-group">
                <label class="col-md-3 control-label-select">Source (*)</label>
								<div class="col-md-6">
									 <select name="source_radio" id="source_radio" class="select-radio" required>
									 <?php if(isset($_GET['id']) || $action=="copy"){?>
										  <?php if($row['source_radio']=="Shoutcast") {?>
											 	<option value="Shoutcast" selected>Shoutcast</option>
											<?php }else {?>
												<option value="Shoutcast">Shoutcast</option>
											<?php }?>
											<?php if($row['source_radio']=="Icecast") {?>
												<option value="Icecast" selected>Icecast</option>
											<?php }else {?>
												<option value="Icecast">Icecast</option>
											<?php }?>
											<?php if($row['source_radio']=="Other") {?>
												<option value="Other" selected>Other</option>
											<?php }else {?>
												<option value="Other">Other</option>
											<?php }?>
									 <?php }else {?>
										 <option value="Shoutcast" selected>Shoutcast</option>
										 <option value="Icecast">Icecast</option>
										 <option value="Other">Other</option>
									 <?php }?>
									 </select>
								 </div>
              </div>

							<div class="form-group">
                <label class="col-md-3 control-label">Link (*)</label>
                <div class="col-md-6">
                  <input type="url" name="link_radio" id="link_radio" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['link_radio'];}?>" class="form-control" required>
                </div>
              </div>

							<div class="form-group">
							 <label class="col-md-3 control-label-select">Genres (*)</label>
							 <div class="col-md-6">
									 <select name="genre_id[]" id="genre_id" class="select-radio" multiple required>
										 <?php while($genre_row=mysqli_fetch_array($genre_result)){?>
											 <?php if($genre_row['num_radio']!="" and $genre_row['num_radio']>0) {?>
												 <option value="<?php echo $genre_row['id'];?>" selected><?php echo $genre_row['name'];?></option>
											 <?php }else {?>
												 <option value="<?php echo $genre_row['id'];?>" ><?php echo $genre_row['name'];?></option>
											 <?php }?>
											<?php }?>
									 </select>
							 </div>
							</div>

              <div class="form-group">
                <label class="col-md-3 control-label">Image (size 500x500)</label>
                <div class="col-md-6">
                  <div class="fileupload_block">
                    <input type="file" name="radio_img" value="fileupload" id="fileupload">
                        <?php if(isset($_GET['id']) and $action=="edit" and $row['img']!="") {?>
                    	  <div class="user_upload_img"><img type="image" src="uploads/radios/<?php echo $row['img'];?>" alt="radio image"/></div>
                    	 <?php } else {?>
                    	  <div class="user_upload_img"><img type="image" src="uploads/radios/radio_default.jpg" alt="radio image"/></div>
                    	<?php }?>
                  </div>
                </div>
              </div>

							<?php if(isset($_GET['id']) and $row['img']!="" and $action=="edit") {?>
							 	<div class="form-group">
								 <div class="col-md-9 col-md-offset-3">
									 <div class="add_btn_accent"> <a href="x_add_radio.php?action=delete_image&id=<?php echo $_GET['id'];?>" onclick="return confirm('Do you want to delete this image?');">Delete image</a></div>
								 </div>
							 	</div>
						 	<?php }?>

							<div class="form-group">
                <label class="col-md-3 control-label">User Agent</label>
                <div class="col-md-6">
                  <input type="text" name="user_agent_radio" id="user_agent_radio" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['user_agent_radio'];}?>" class="form-control">
                </div>
              </div>

							<div class="form-group">
								<label class="col-md-3 control-label">Facebook URL</label>
								<div class="col-md-6">
									<input type="url" name="url_facebook" id="url_facebook" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['url_facebook'];}?>" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Twitter URL</label>
								<div class="col-md-6">
									<input type="url" name="url_twitter" id="url_twitter" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['url_twitter'];}?>" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Instagram URL</label>
								<div class="col-md-6">
									<input type="url" name="url_instagram" id="url_instagram" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['url_instagram'];}?>" class="form-control">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label">Website URL</label>
								<div class="col-md-6">
									<input type="url" name="url_website" id="url_website" value="<?php if(isset($_GET['id']) || $action=="copy"){echo $row['url_website'];}?>" class="form-control">
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
