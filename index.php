<!DOCTYPE html>
<html>
<head>
	<title>RadioWanjy</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="radiowanjy/assets/imgs/favicon.png" type="image/x-icon">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="radiowanjy/phone_plugin/css/intlTelInput.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="radiowanjy/assets/css/styles.css">
<link href="radiowanjy/main/audio8_html5.css" rel="stylesheet" type="text/css">
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js" type="text/javascript"></script> -->
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="radiowanjy/main/js/swfobject.js"></script>
<script src="radiowanjy/main/js/jquery.mousewheel.min.js" type="text/javascript"></script>
<script src="radiowanjy/main/js/jquery.touchSwipe.min.js" type="text/javascript"></script>

</head>
<?php
	$servername = "localhost";
	// $username = "radiowan";
	// $password = "F56c55fGqy";
	$username = "root";
	$password = "";
	$dbname = "radiowan_xradio_db";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
?>
<body>
<div>
<div id="header">
<nav class="navbar navbar-expand-md navbar-light bg-light">
  <a class="navbar-brand" href="javascript:void(0)"><img src="radiowanjy/assets/imgs/logo.png"></a>
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navb">
    <ul class="navbar-nav mr-auto" id="navbar-wrap">
      <li class="nav-item dropdown">
		<a class="nav-link change-lang" href="#" id="navbardrop" onclick="show_all_stations()">
		Home
		</a>
	  </li>
	  <li class="nav-item dropdown">
		<a class="nav-link dropdown-toggle change-lang" href="#" id="navbardrop" data-toggle="dropdown">
		Category
		</a>
		<div class="dropdown-menu">
			<div class="dropdown-item change-lang" onclick="gotoGenre()">Genre</div>
			<div class="dropdown-item change-lang" onclick="gotoFeature()">Feature</div>
			<div class="dropdown-item change-lang" onclick="gotoPopular()">Popular</div>
			<div class="dropdown-item change-lang" onclick="gotoDJ()">DJ</div>
			<div class="dropdown-item change-lang" onclick="gotoNews()">News</div>
		</div>
	  </li>
	  <li class="nav-item dropdown">
		<a class="nav-link change-lang" href="#" id="navbardrop" data-toggle="modal" data-target="#contactModal">
		Become a DJ
		</a>
	  </li>
    </ul>
      <span id="lang-btn" onclick="to_rtl()"><span class="lang-en">En</span><span class="lang-ar">Ar</span></span>
      <button data-toggle="modal" data-target="#searchModal" id="search-btn"><i style="font-size: 16px;margin: 0 10px;" class="fas fa-search"></i><span class="change-lang">Search</span></button>
  </div>
</nav>
<div id="country-container" class="d-flex justify-content-between align-items-center">
	<h5 class="change-lang">Radio From</h5>
	<span id="country-toggle-btn"><img src="admin_portal/uploads/countries/ru.png" id="country-toggle-img"><i class="material-icons">expand_more</i></span>
	<span id="country-select">
		<ul class="country-list">
			<li><a href="#" title="United States" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/us.png" alt="United States" height="15" width="22">
			</a></li>
			<li><a href="#" title="United Kingdom" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/gb.png" alt="United Kingdom" height="15" width="22">
			</a></li>
			<li><a href="#" title="Canada" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/ca.png" alt="Canada" height="15" width="22">
			</a></li>
			<li><a href="#" title="Russia" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/ru.png" alt="Russia" height="15" width="22">
			</a></li>
			<li><a href="#" title="Turkey" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/tr.png" alt="Turkey" height="15" width="22">
			</a></li>
			<li><a href="#" title="France" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/fr.png" alt="France" height="15" width="22">
			</a></li>
			<li><a href="#" title="Italy" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/it.png" alt="Italy" height="15" width="22">
			</a></li>
			<li><a href="#" title="Greece" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/gr.png" alt="Greece" height="15" width="22">
			</a></li>
			<li><a href="#" title="Cyprus" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/cy.png" alt="Cyprus" height="15" width="22">
			</a></li>
			<li><a href="#" title="India" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/in.png" alt="India" height="15" width="22">
			</a></li>
			<li><a href="#" title="Japan" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/jp.png" alt="Japan" height="15" width="22">
			</a></li>
			<li><a href="#" title="Australia" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/au.png" alt="Australia" height="15" width="22">
			</a></li>
			<li><a href="#" title="Egypt" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/eg.png" alt="Egypt" height="15" width="22">
			</a></li>
			<li><a href="#" title="Syria" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/sy.png" alt="Syria" height="15" width="22">
			</a></li>
			<li><a href="#" title="Iraq" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/iq.png" alt="Iraq" height="15" width="22">
			</a></li>
			<li><a href="#" title="Jordan" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/jo.png" alt="Jordan" height="15" width="22">
			</a></li>
			<li><a href="#" title="Morocco" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/ma.png" alt="Morocco" height="15" width="22">
			</a></li>
			<li><a href="#" title="Lebanon" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/lb.png" alt="Lebanon" height="15" width="22">
			</a></li>
			<li><a href="#" title="Oman" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/om.png" alt="Oman" height="15" width="22">
			</a></li>
			<li><a href="#" title="Algeria" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/dz.png" alt="Algeria" height="15" width="22">
			</a></li>
			<li><a href="#" title="United Arab Emirates" class="country-item">
				<img class="flag-img" src="admin_portal/uploads/countries/ae.png" alt="United Arab Emirates" height="15" width="22">
			</a></li>
		</ul>
		<a href="#"  data-toggle="modal" data-target="#countryModal"><span>&nbsp;&nbsp;<span class="change-lang">Other Countries</span><i class="material-icons">chevron_left</i></span></a>
	</span>
</div>

</div>
<div style="height: 100px;display: none;"></div>
<div class="container">
	<div class="row">
		<div class="col-xl-12">
			<div id="main-title">
				<h1 class="change-lang">Music from 
					<?php 
					$sql="SELECT COUNT(id) AS stations FROM radios";
					$result = $conn->query($sql);
					if ($result->num_rows > 0) {
					  while($row = $result->fetch_assoc()) {
					    echo $row['stations'];
					  }
					}
					?>
				 radio Stations</h1>
				<p class="change-lang">Tune in to thousands of internet radio stations live right now!</p>
				<span class="face-twitter">
					<a href="#"><img src="radiowanjy/assets/imgs/ic_twitter.png"></a>
					<a href="#"><img src="radiowanjy/assets/imgs/ic_facebook.png"></a>
				</span>
			</div>
			<!-------------------------- Select Popular Genre ------------------->
			<div id="popular-genre">
				<div class="toolbar change-lang">Popular Genres</div>
				<div class="d-flex align-items-center flex-wrap justify-content-center" id="genre-container">
					<?php 
						$sql="SELECT name FROM `genres`";
						$result = $conn->query($sql);
						$count=0;
						if ($result->num_rows > 0) {
						  while($row = $result->fetch_assoc()) {
						  	$count++;
					?>
					<span class="pop-card <?php 
						if($count<10) echo 'lg';
						else if($count<20) echo 'md';
						else echo 'sm';
					?>"><?php echo $row['name'];?></span>
					<?php
					}
						}else{
							echo "<p>0 results</p>";
						}
					?>
				</div>
			</div>
			<!-------------------------- Display Radio Stations ------------------->
			<div id="radio-station">
				<div class="toolbar change-lang" id="all-radio">All Radio Stations</div>
				<div class="radio-body">
					<?php

						$sql = "SELECT genre.*, country_name.name AS country_name FROM (SELECT main.*, genres.name AS genre_name FROM (SELECT radios.*, radios_cat.genre_id FROM radios LEFT JOIN radios_cat ON radios.id = radios_cat.radio_id) main LEFT JOIN genres ON main.genre_id=genres.id ORDER BY main.name) genre LEFT JOIN (SELECT radios_country.radio_id, countries.name FROM radios_country LEFT JOIN countries ON radios_country.country_id=countries.id) country_name ON genre.id=country_name.radio_id;";
						$result = $conn->query($sql);

						if ($result->num_rows > 0) {
						  // output data of each row
						$i=0;
						$j=0;
						$all_results=[];
						while($roww = $result->fetch_assoc()) {
						  	if($GLOBALS['i']==0){
						  		$all_results[$GLOBALS['i']]=$roww;
						  		$all_results[$GLOBALS['i']]['genre_name']=[];
						  		$all_results[$GLOBALS['i']]['genre_name'][0]=$roww['genre_name'];
						  		$GLOBALS['i']++;
						  	}else{
						  		if($all_results[$GLOBALS['i']-1]['name']!=$roww['name']){
						  			$GLOBALS['j']=0;
						  			$all_results[$GLOBALS['i']]=$roww;
						  			$all_results[$GLOBALS['i']]['genre_name']=[];
						  			$all_results[$GLOBALS['i']]['genre_name'][0]=$roww['genre_name'];
						  			$GLOBALS['i']++;
						  		}else{
						  			$GLOBALS['j']++;
						  			$all_results[$GLOBALS['i']-1]['genre_name'][$GLOBALS['j']]=$roww['genre_name'];
						  		}
						  	}
						}
						}
						foreach($all_results as $row){
							// $row=$all_results[$i];
						  	
						     ?>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>" country="<?php echo $row['country_name'];?>" isrc="<?php echo $row['img'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
					<!----------------------------- Radio---Row--End -------------------->
				<?php }
				?>
					
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<!---------------------------- Features -------------------------->
		<div class="col-lg-6">
			<div class="section-kind" id="feature-element">
				<div class="toolbar change-lang">FEATURES</div>
				<div class="radio-body">
					<?php
					$count=0;
						foreach($all_results as $row){
							if($row['isFeatured']==1){
								$count++;
					?>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
					<!----------------------------- Radio---Row--End -------------------->
				<?php }}
				if($count==0) echo "<p>0 results</p>";
				?>
				</div>
			</div>
		</div>
		<!---------------------------- Popular -------------------------->
		<div class="col-lg-6">
			<div class="section-kind" id="popular-element">
				<div class="toolbar change-lang">POPULAR</div>
				<div class="radio-body">
					<?php
					$count=0;
						foreach($all_results as $row){
							if($row['isPopular']==1){
								$count++;
					?>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
					<!----------------------------- Radio---Row--End -------------------->
				<?php }}
				if($count==0) echo "<p>0 results</p>";
				?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<!---------------------------- News -------------------------->
		<div class="col-lg-6">
			<div class="section-kind" id="news-element">
				<div class="toolbar change-lang">NEWs</div>
				<div class="radio-body">
					<?php
					$count=0;
						foreach($all_results as $row){
							if($row['isNews']==1){
								$count++;
					?>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
					<!----------------------------- Radio---Row--End -------------------->
				<?php }}
				if($count==0) echo "<p>0 results</p>";
				?>
				</div>
			</div>
		</div>
		<!---------------------------- DJ -------------------------->
		<div class="col-lg-6">
			<div class="section-kind" id="dj-element">
				<div class="toolbar change-lang">DJ</div>
				<div class="radio-body">
					<?php
					$count=0;
						foreach($all_results as $row){
							if($row['isPrivate']==1){
								$count++;
					?>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
					<!----------------------------- Radio---Row--End -------------------->
				<?php }}
				if($count==0) echo "<p>0 results</p>";
				?>
				</div>
			</div>
		</div>
	</div>
	<div class="row mgt-40">
		<div class="col-xl-12">
			<iframe src="https://xat.com/embed/chat.php#id=220491159&gn=radiowanjy" style="width: 100%; height: 500px;" frameborder="0" scrolling="no"></iframe><br><br>
		</div>
	</div>
	<div class="row">
		<div class="col-xl-12" id="app-btns">
			<a href="#"><img src="radiowanjy/assets/imgs/ic_google_playstore.svg"></a>
		</div>
	</div>
</div>

<span id="totop-btn">
	<i class="fas fa-chevron-up"></i>
</span>









<!------------------------ Country Modal Start ------------------------------>
<div class="modal fade" id="countryModal" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Select Country.</h4>
        <button type="button" class="close" data-dismiss="modal">
          <span>×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="content-area">
<section class="country-section">
	<div class="box active">
		<div class="slide">
			<ul class="country-list">
				<?php
				$sql='SELECT name, img FROM countries ORDER BY NAME;';
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				  while($row = $result->fetch_assoc()) {
				  	?>
				<li><a href="#" title="<?php echo $row['name'];?>" class="country-item" data-dismiss="modal">
					<img class="flag-img" src="admin_portal/uploads/countries/<?php echo $row['img'];?>" alt="<?php echo $row['name'];?>" height="15" width="22"><?php echo $row['name'];?>
				</a></li>
				<?php  }}
				?>
			</ul>
		</div>
	</div>
</section> 
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>












<!----------------------------- Country Modal End ---------------------------------->









<!------------------------------- Search Modal Start ------------------------------------>


<div class="modal fade" id="searchModal" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content" id="search-content">
    	<div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	      </div>
	     <div class="modal-body">
      <table id="table_id" class="display">
    <thead>
        <tr>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <?php
			foreach($all_results as $row){
		?>
			<tr>
				<td>
					<div class="radio-row">
						<div class="d-flex">
							<span class="play-group">
								<div>
									<span class="far fa-play-circle play-btn" srcc="<?php echo $row['link_radio'];?>" station="<?php echo $row['name'];?>"></span>
								</div>
								
							</span>
							<span class="detail-group">
								<h4>
									<a href="<?php echo $row['url_website'];?>" target="_blank"><?php echo $row['name'];?></a>
								</h4>
								<p><strong><?php echo $row['tags'];?></strong></p>
								
								<div class="genres-div">
									<span>Genres: </span>
									<?php 
									foreach ($row['genre_name'] as $value) {
									?>
									<a href="#"><?php echo $value;?></a>
								<?php } ?>
								</div>
							</span>
						</div>
						<span class="addition-group">
							<p>
								<?php echo $row['bitrate'];?>ps
							</p>
							<p>
							<?php if($row['isFeatured']==1){;?>
								<i class="material-icons">verified_user</i>
							<?php }?>
							<?php if($row['isPopular']==1){;?>
								<i class="material-icons">whatshot</i>
							<?php }?>
							</p>
						</span>
					</div>
				</td>
			</tr>
					<!----------------------------- Radio---Row--End -------------------->
		<?php }
		?>
    </tbody>
</table>
	</div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!--------------------------------------- Search Modal End ------------------------------->
		<div style="height: 100px;"></div>
<!----------------------------------- The Contact Modal ------------------------------------->
<div class="modal" id="contactModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Contact us</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
      	<div class="container">
      		<div class="row">
      			<div class="col-sm-6">
			        <div class="form-group">
						<label for="usr">Name:</label>
						<input type="text" class="form-control" id="usr" placeholder="Name...">
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
						<label for="email">Email:</label>
						<input type="text" class="form-control" id="email" placeholder="example@email.com">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-12">
						<label for="phone">Phone Number:</label>
					<div class="form-group">
						<input id="phone" name="phone" type="tel" class="form-control">
					</div>
				</div>
			</div>
			<div class="row">
      			<div class="col-sm-12">
					<div class="form-group">
						<label for="comment">Comment:</label>
						<textarea class="form-control" rows="5" id="comment" placeholder="I'd like to ..."></textarea>
					</div>
      			</div>
      		</div>
		</div>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Submit</button>
      </div>

    </div>
  </div>
</div>
<div class="audio8_html5_sticky">
	<div class="audio8_html5">
		<audio id="lbg_audio8_html5_shoutcast_2" preload="metadata">
			<div class="xaudioplaylist">
				<ul>
					<li class="xradiostream">http://173.245.78.90:80/;</li>
				</ul>
			</div>
			   No HTML5 audio playback capabilities for this browser. Use <a href="https://www.google.com/intl/en/chrome/browser/">Chrome Browser!</a>
		</audio>
	</div>
</div>
<?php $conn->close();?>
<script src="radiowanjy/main/js_UNCODED/audio8_html5.js" type="text/javascript"></script>
<!-- must have -->





	<script>
	jQuery(function() {
		setTimeout(function(){
				jQuery("#lbg_audio8_html5_shoutcast_2").audio8_html5({
					skin:"lightHover",
					playerHeight:94,
					titleWidth:200,
					playerBackgroundColor:"#0a0a0a",
					playerBackgroundOpacity:100,
					sticky:true,
					bannerWidth:728,
					bannerHeight:90,
					bannerIntervalSeconds:5,
					bannerLinkTarget:"darkHover",
					initialVolume:0.8,
					autoPlay:false,
					volumeOffColor:"#cccccc",
					volumeOnColor:"#9f9f9f",
					songTitleColor:"#cccccc",
					radioStationColor:"#FFFFFF",
					imageBorderColor:"#0a0a0a",
					minimizeButtonText:"",
					minButtonColor:"#989898",
					minButtonHoverColor:"#ffffff",
					facebookAppID:"",
					facebookShareTitle:"SHOUT - HTML5 Radio Player With Ads - ShoutCast and IceCast Support",
					facebookShareDescription:"A top-notch responsive HTML5 Radio Player with ads support, compatible with all major browsers and mobile devices.",
					pathToAjaxFiles:"",
					nowPlayingInterval:30,
					grabLastFmPhoto:false,
					grabStreamnameAndGenre:false,
					noImageAvailable:"radiowanjy/main/noimageavailable.jpg",
					translateRadioStation:"Radio Station: ",
					translateReadingData:"reading data...",
					translateAllRadioStations:"ALL RADIO STATIONS",
					popupWidth:1100,
					popupHeight:500,
					barsColor:"#848484",
					showGradientOverBars:true,
					showBanner:false,
					showVolume:true,
					showFacebookBut:true,
					showTwitterBut:true,
					showPopupBut:true,
					showRadioStation:true,
					showTitle:true,
					showPlaylistBut:true,
					playlistTopPos:5,
					playlistBgColor:"#0a0a0a",
					playlistRecordBgOffColor:"#000000",
					playlistRecordBgOnColor:"#828282",
					playlistRecordBottomBorderOffColor:"#333333",
					playlistRecordBottomBorderOnColor:"#333333",
					playlistRecordTextOffColor:"#cccccc",
					playlistRecordTextOnColor:"#ffffff",
					categoryRecordBgOffColor:"#222222",
					categoryRecordBgOnColor:"#333333",
					categoryRecordBottomBorderOffColor:"#2f2f2f",
					categoryRecordBottomBorderOnColor:"#2f2f2f",
					categoryRecordTextOffColor:"#777777",
					categoryRecordTextOnColor:"#00b4f9",
					numberOfThumbsPerScreen:7,
					playlistPadding:18,
					firstCateg:"ALL RADIO STATIONS",
					showCategories:true,
					selectedCategBg:"#555555",
					selectedCategOffColor:"#FFFFFF",
					selectedCategOnColor:"#00b4f9",
					selectedCategMarginBottom:12,
					showSearchArea:true,
					searchAreaBg:"#555555",
					searchInputText:"search...",
					searchInputBg:"#cccccc",
					searchInputBorderColor:"#333333",
					searchInputTextColor:"#333333",
					showPlaylistNumber:true
				});
		}, 1000);
	});
</script>
<link rel="stylesheet" type="text/css" href="radiowanjy/DataTables/datatables.min.css"/>
<script src="radiowanjy/phone_plugin/js/intlTelInput.js"></script>
<script type="text/javascript" src="radiowanjy/DataTables/datatables.min.js"></script>
<script src="radiowanjy/assets/js/custom.js"></script>
</body>
</html>