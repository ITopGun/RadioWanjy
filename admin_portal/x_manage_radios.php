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

	//Get all genre
	$stages = 3;
	$limit = 8;
	$start=0;
	$page=0;
	$search="";
	$genre_id=0;

	$name_drop_down="All Genres";
	$genre_qry="SELECT * FROM genres ORDER BY name";
	$genre_result=mysqli_query($mysqli,$genre_qry);

	if(isset($_GET['page'])){
		$page 	= 	mysqli_real_escape_string($mysqli,$_GET['page']);
		$search = 	mysqli_real_escape_string($mysqli,$_GET['search']);
		$genre_id = 	mysqli_real_escape_string($mysqli,$_GET['genre_id']);
	}
	if($page>0){
		$start = ($page - 1) * $limit;
	}

	$qry="select r.id as radio_id, r.name, r.img,r.type_radio,r.source_radio,r.link_radio,r.isFeatured,r.isActive from radios r";
	$query_count = "SELECT COUNT(*) as num FROM radios";
	if(isset($_POST['submit'])){
			$search=$_POST['qe_radio'];
	}
	if(isset($_POST['genre_id'])){
			$genre_id=$_POST['genre_id'];
	}
	if($genre_id>0){
		$qry= $qry. " INNER join radios_cat rc on rc.radio_id=r.id and rc.genre_id=$genre_id";
		$query_count=$query_count." INNER join radios_cat rc on rc.radio_id=r.id and rc.genre_id=$genre_id";

		$genre_res=mysqli_query($mysqli,"SELECT * FROM genres WHERE id=$genre_id");
		$genre_res_row=mysqli_fetch_assoc($genre_res);
		if($genre_res_row['name']!=""){
	    	$name_drop_down=$genre_res_row['name'];
		}
	}

	if($search!=""){
		$qry= $qry. " where r.name REGEXP '$search'";
		$query_count=$query_count." where name REGEXP '$search'";
	}
	$total_pages = mysqli_fetch_array(mysqli_query($mysqli,$query_count));
	$total_pages = $total_pages['num'];

	$qry=$qry." ORDER BY r.id DESC LIMIT $start, $limit";
	$result=mysqli_query($mysqli,$qry);

	$targetpage = "x_manage_radios.php?genre_id=$genre_id";
	$home="Location:x_manage_radios.php?genre_id=$genre_id";

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
		$radio_id=$_GET['id'];
		$action=$_GET['action'];
		if($action=="delete"){
			$img_res=mysqli_query($mysqli,"SELECT * FROM radios WHERE id=$radio_id");
			$img_res_row=mysqli_fetch_assoc($img_res);
			if($img_res_row['img']!=""){
				unlink('uploads/radios/'.$img_res_row['img']);
			}
			$_SESSION['msg']="8";
			delete_tbl('radios',"id=$radio_id");
			delete_tbl('radios_cat',"radio_id=$radio_id");
		}
		else if($action=="active"){
			$data = array('isActive'  =>  1);
			$_SESSION['msg']="15";
			update_tbl('radios', $data, "WHERE id = $radio_id");
		}
		else if($action=="inactive"){
			$data = array('isActive'  =>  0);
			$_SESSION['msg']="14";
			update_tbl('radios', $data, "WHERE id = $radio_id");
		}
		else if($action=="not_feature"){
			$data = array('isFeatured'  =>  0);
			$_SESSION['msg']="13";
			update_tbl('radios', $data, "WHERE id = $radio_id");
		}
		else if($action=="feature"){
			$data = array('isFeatured'  =>  1);
			$_SESSION['msg']="12";
			update_tbl('radios', $data, "WHERE id = $radio_id");
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
								<div class="page_title">Radios</div>
							</div>
							<div class="col-xs-12 col-md-12">
								<div class="search_list">
									<form action="x_manage_radios.php?page=1&genre_id=<?php echo $genre_id;?>" class="form-inline" method="post" enctype="multipart/form-data">
										<div class="form-group">
											<div class="dropdown">
												<button class="form-control dropdown-toggle" type="button" data-toggle="dropdown"><?php echo $name_drop_down;?>
													<span class="caret"></span>
												</button>
												<ul class="dropdown-menu">
													<li>
														<a href="x_manage_radios.php?page=1&genre_id=0">All Genres</a>
													</li>
													<?php while($genre_row=mysqli_fetch_array($genre_result)){?>
													<li>
														<a href="x_manage_radios.php?page=1&genre_id=<?php echo $genre_row['id'];?>"><?php echo $genre_row['name'];?></a>
													</li>
													<?php }?>
												</ul>
											</div>
										</div>
										<div class="form-group">
											<div class="search_block">
												<input type="text" class="form-control" name="qe_radio" id="qe_radio" placeholder="Search" required/>
												<button class="btn-search" type="submit" name="submit">
													<i class="fa fa-search"></i>
												</button>
											</div>
										</div>
									</form>
									<div class="add_btn_primary"> <a href="x_add_radio.php?action=add">Add Radio</a></div>
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
									<th class="table_title_center">Image</th>
									<th class="table_title_center">Name</th>
									<th class="table_title_center">Format</th>
									<th class="table_title_center">Source</th>
									<th class="table_title_center">Link</th>
									<th class="table_title_center">Link App</th>
                  <th class="table_title_center">Action</th>
                </tr>
              </thead>
              <tbody>
              <?php
								$i=0;
								while($row=mysqli_fetch_array($result)){
							?>
                <tr>
									<td width="8%" class="table_title_center"><?php echo $row['radio_id'];?></td>
									<td width="5%" class="table_title_center"><span class="img"><img src="uploads/radios/<?php if($row['img']!=""){echo $row['img'];}else{echo "radio_default.jpg";}?>" width="48" height="48" /></span></td>
                  <td class="table_title_center table_accent" width="15%"><?php echo $row['name'];?></td>
									<td class="table_title_center" width="5%"><?php echo $row['type_radio'];?></td>
									<td class="table_title_center" width="5%"><?php echo $row['source_radio'];?></td>
									<td class="table_title_center" width="10%"><a class="link_radio" href="<?php echo $row['link_radio'];?>" target="_blank">Link Radio</a></td>
									<td class="table_title_center" width="10%"><a class="link_app" href="<?php echo $row['link_app'];?>" target="_blank">Link App</a></td>
									<td width="20%" class="table_title_center">
										<a href="x_add_radio.php?action=edit&id=<?php echo $row['radio_id'];?>"><img src="assets/images/ic_edit.png" height="30" width="30"/></a>
										<a href="x_manage_radios.php?action=delete&id=<?php echo $row['radio_id']."&page=$page&search=$search&genre_id=$genre_id";?>" onclick="return confirm('Do you want to delete this radio?');"><img src="assets/images/ic_delete_red.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php if($row['isActive']!=0){?>
										<a href="x_manage_radios.php?action=inactive&id=<?php echo $row['radio_id']."&page=$page&search=$search&genre_id=$genre_id";?>"><img src="assets/images/ic_check.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }else{?>
										<a href="x_manage_radios.php?action=active&id=<?php echo $row['radio_id']."&page=$page&search=$search&genre_id=$genre_id";?>"><img src="assets/images/ic_uncheck.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }?>
										<?php if($row['isFeatured']!=0){?>
										<a href="x_manage_radios.php?action=not_feature&id=<?php echo $row['radio_id']."&page=$page&search=$search&genre_id=$genre_id";?>"><img src="assets/images/ic_feature.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }else{?>
										<a href="x_manage_radios.php?action=feature&id=<?php echo $row['radio_id']."&page=$page&search=$search&genre_id=$genre_id";?>"><img src="assets/images/ic_not_feature.png" height="30" width="30" style="margin:0px 5px"/></a>
										<?php }?>
										<a href="x_add_radio.php?action=copy&id=<?php echo $row['radio_id'];?>"><img src="assets/images/ic_copy.png" height="30" width="30" style="margin:0px 5px"/></a>
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
