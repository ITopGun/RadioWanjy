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

	$stages = 3;
	$limit = 8;
	$start=0;
	$page=0;
	$search="";

	//conversion angle to adapt with cordinate of web
	$orientation_arrays = array(
												0=>90,  //Left Right
												180=>270, //Right Left
												270=>180, //Top Bottom
												90=>0, //Bottom Top
												315=>135, //Top Left Bottom Right
												225=>225, //Top Right Bottom Left
												45 =>45, //Bottom Left Top Right
												135=>315); //Bottom Right Top Left

	if(isset($_GET['page'])){
		$page 	= 	mysqli_real_escape_string($mysqli,$_GET['page']);
		$search = 	mysqli_real_escape_string($mysqli,$_GET['search']);
	}
	if($page>0){
		$start = ($page - 1) * $limit;
	}

	$qry="select * from themes";
	$query_count = "SELECT COUNT(*) as num FROM themes";
	if(isset($_POST['submit'])){
			$search=$_POST['qe_theme'];
	}

	if($search!=""){
		$qry= $qry. " where name REGEXP '$search'";
		$query_count=$query_count." where name REGEXP '$search'";
	}
	$total_pages = mysqli_fetch_array(mysqli_query($mysqli,$query_count));
	$total_pages = $total_pages['num'];

	$qry=$qry." ORDER BY id DESC LIMIT $start, $limit";
	$result=mysqli_query($mysqli,$qry);

	$targetpage = "x_manage_themes.php?";
	$home="Location:x_manage_themes.php?";

	if($search!=""){
		$home="$home&search=$search";
		if($page>0){
			$home=$home."&page=$page";
		}
	}
	else{
		if($page>0){
			$home=$home."&page=$page";
		}
	}
	if(isset($_GET['action'])){
		$theme_id=$_GET['id'];
		$action=$_GET['action'];
		if($action=="delete"){
			$img_res=mysqli_query($mysqli,"SELECT * FROM themes WHERE id=$theme_id");
			$img_res_row=mysqli_fetch_assoc($img_res);
			if($img_res_row['img']!=""){
				unlink('uploads/themes/'.$img_res_row['img']);
			}
			$_SESSION['msg']="8";
			delete_tbl('themes',"id=$theme_id");
		}
		else if($action=="active"){
			$data = array('isActive'  =>  1);
			$_SESSION['msg']="18";
			update_tbl('themes', $data, "WHERE id = $theme_id");
		}
		else if($action=="inactive"){
			$data = array('isActive'  =>  0);
			$_SESSION['msg']="19";
			update_tbl('themes', $data, "WHERE id = $theme_id");
		}
		else if($action=="single"){
			$reset_datas=array('is_single_theme'  =>  0);
			update_tbl('themes',$reset_datas ,"");
			$data = array('is_single_theme'  =>  1);
			$_SESSION['msg']="20";
			update_tbl('themes', $data, "WHERE id = $theme_id");
		}
		else if($action=="nosingle"){
			$data = array('is_single_theme'  =>  0);
			$_SESSION['msg']="21";
			update_tbl('themes', $data, "WHERE id = $theme_id");
		}
		header( $home);
		exit;
	}
?>

<div class="row">
      <div class="col-xs-12">
        <div class="card card-bottom">
          <div class="page_title_block">
						<div class="page_search">
							<div class="col-md-5 col-xs-12">
								<div class="page_title">Themes</div>
							</div>
							<div class="col-xs-12 col-md-12">
								<div class="search_list">
									<form action="x_manage_themes.php?page=1" class="form-inline" method="post" enctype="multipart/form-data">
										<div class="form-group">
											<div class="search_block">
												<input type="text" class="form-control" name="qe_theme" id="qe_theme" placeholder="Search" required/>
												<button class="btn-search" type="submit" name="submit">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</form>
									<div class="add_btn_primary"> <a href="x_add_theme.php?action=add">Add Theme</a></div>
								</div>
							</div>
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

          <div class="col-md-12 card-top">
            <table class="table table-striped table-bordered table-hover table-xradio">
              <thead>
                <tr>
									<th class="table_title_center">Id</th>
									<th class="table_title_center">Name</th>
									<th class="table_title_center">Background</th>
                  <th class="table_title_center">Action</th>
                </tr>
              </thead>
              <tbody>
              <?php
								$i=0;
								while($row=mysqli_fetch_array($result)){
							?>
                <tr>
									<td width="10%" class="table_title_center"><?php echo $row['id'];?></td>
									<td class="table_title_center table_accent" width="15%"><?php echo $row['name'];?></td>
									<?php if($row['img']!=""){?>
										<td width="10%" class="table_title_center"><span class="img"><img src="uploads/themes/<?php echo $row['img'];?>" width="64" height="113" /></span></td>
									<?php } else{?>
										<?php $orient=$orientation_arrays[$row['grad_orientation']]; $bg_img="background-image: linear-gradient(".$orient."deg, ".$row['grad_start_color']." 0%, ".$row['grad_end_color']." 100%);"; ?>
										<td width="10%" class="table_title_center"><span class="img"><img style="<?php echo $bg_img;?>" width="64" height="113" /></span></td>
									<?php }?>
									<td width="30%" class="table_title_center">
										<a href="x_add_theme.php?action=edit&id=<?php echo $row['id'];?>"><img src="assets/images/ic_edit.png" height="30" width="30"/></a>
										<a href="x_manage_themes.php?action=delete&id=<?php echo $row['id']."&page=$page&search=$search";?>" onclick="return confirm('Do you want to delete this theme?');"><img src="assets/images/ic_delete_red.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php if($row['isActive']!=0){?>
										<a href="x_manage_themes.php?action=inactive&id=<?php echo $row['id']."&page=$page&search=$search";?>"><img src="assets/images/ic_check.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }else{?>
										<a href="x_manage_themes.php?action=active&id=<?php echo $row['id']."&page=$page&search=$search";?>"><img src="assets/images/ic_uncheck.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }?>
										<?php if($row['is_single_theme']!=0){?>
										<a href="x_manage_themes.php?action=nosingle&id=<?php echo $row['id']."&page=$page&search=$search";?>"><img src="assets/images/ic_theme_on.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }else{?>
										<a href="x_manage_themes.php?action=single&id=<?php echo $row['id']."&page=$page&search=$search";?>"><img src="assets/images/ic_theme_off.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }?>
										<a href="x_add_theme.php?action=copy&id=<?php echo $row['id'];?>"><img src="assets/images/ic_copy.png" height="30" width="30" style="margin:0px 5px"/></a>
									</td>
                </tr>
                <?php
								$i++;
				     	}
							?>
              </tbody>
            </table>
          </div>
					<div class="col-md-12 col-xs-12">
					 <div class="pagination_item_block">
						 <nav>
							 <?php include("xradio_pagination.php");?>
						 </nav>
					 </div>
				 </div>
          <div class="clearfix"></div>
        </div>
      </div>
</div>
<?php include("includes/xradio_footer.php");?>
