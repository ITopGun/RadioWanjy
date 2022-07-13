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

	$search="";
	$qry="SELECT * FROM countries ";
	if(isset($_GET['search'])){
		$search = mysqli_real_escape_string($mysqli,$_GET['search']);
	}
	if(isset($_POST['submit'])){
			$search=$_POST['qe_cat'];
	}
	if($search!=""){
			$qry= $qry. " where name REGEXP '$search'";
	}
	$qry=$qry." order by id DESC";
	$result=mysqli_query($mysqli,$qry);

	$home="Location:x_manage_countries.php";
	if($search!=""){
		$home=$home."?search=".$search;
	}
	if(isset($_GET['action'])){
		$country_id=$_GET['id'];
		$action=$_GET['action'];
		if($action=="delete"){
			$img_res=mysqli_query($mysqli,"SELECT * FROM countries WHERE id=$country_id");
			$img_res_row=mysqli_fetch_assoc($img_res);
			if($img_res_row['img']!=""){
				unlink('uploads/countries/'.$img_res_row['img']);
			}
			$_SESSION['msg']="8";
			delete_tbl('countries',"id=$country_id");
			delete_tbl('radios_country',"country_id=$country_id");
		}
		else if($action=="active"){
			$data = array('isActive'  =>  1);
			$_SESSION['msg']="17";
			update_tbl('countries', $data, "WHERE id = $country_id");
		}
		else if($action=="inactive"){
			$data = array('isActive'  =>  0);
			$_SESSION['msg']="16";
			update_tbl('countries', $data, "WHERE id = $country_id");
		}
		header($home);
		exit;
	}
?>
	<div class="row">
      <div class="col-xs-12">
        <div class="card card-bottom">
          <div class="page_title_block">
						<div class="page_search">
							<div class="col-md-5 col-xs-12">
	            	<div class="page_title">Countries</div>
	            </div>
	            <div class="col-xs-12 col-md-12">
	              	<div class="search_list">
										<form action=""  method="post" enctype="multipart/form-data">
											<div class="search_block">
												<div class="form-group">
													<input type="text" class="form-control" name="qe_cat" id="qe_cat" placeholder="Search" required/>
												</div>
												<div class="form-group">
													<button class="btn-search" type="submit" name="submit">
														<i class="fa fa-search"></i>
													</button>
												</div>
											</div>
										</form>
	                	<div class="add_btn_primary"> <a href="x_add_country.php?action=add">Add Country</a> </div>
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
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <tr>
									<th class="table_title_center">Id</th>
									<th class="table_title_center">Image</th>
                  <th>Name</th>
                  <th class="table_title_center">Action</th>
                </tr>
              </thead>
              <tbody>
              	<?php
						$i=0;
						while($row=mysqli_fetch_array($result)){?>
                <tr>
                  <td width="10%" class="table_title_center"><?php echo $row['id'];?></td>
									<td width="20%" class="table_title_center" ><span><img src="uploads/countries/<?php if($row['img']!=""){echo $row['img'];}else{echo "country_default.jpg";}?>" height="72" width="72"/></span></td>
									<td class="table_accent"><?php echo $row['name'];?></td>
                  <td width="30%" class="table_title_center">
										<a href="x_add_country.php?action=edit&id=<?php echo $row['id'];?>"><img src="assets/images/ic_edit.png" height="32" width="32"/></a>
										<a href="x_manage_countries.php?action=delete&id=<?php echo $row['id']."&search=$search";?>" onclick="return confirm('Do you want to delete this country?');"><img src="assets/images/ic_delete_red.png" height="32" width="32" style="margin:0px 10px"/></a>
										<?php if($row['isActive']!=0){?>
										<a href="x_manage_countries.php?action=inactive&id=<?php echo $row['id']."&search=$search";?>"><img src="assets/images/ic_check.png" height="32" width="32" style="margin:0px 5px"/></a>
										<?php }else{?>
										<a href="x_manage_countries.php?action=active&id=<?php echo $row['id']."&search=$search";?>"><img src="assets/images/ic_uncheck.png" height="32" width="32" style="margin:0px 5px"/></a>
										<?php }?>
										<a href="x_add_country.php?action=copy&id=<?php echo $row['id'];?>"><img src="assets/images/ic_copy.png" height="32" width="32" style="margin:0px 5px"/></a>
									</td>
                </tr>
                <?php
								$i++;
				     	}?>
              </tbody>
            </table>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
</div>
<?php include("includes/xradio_footer.php");?>
