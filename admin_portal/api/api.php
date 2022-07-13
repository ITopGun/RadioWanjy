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
include("../includes/xradio_constants.php");
require_once("Rest.inc.php");

class XRADIO_API extends REST{

		private $db = NULL;
		private $mysqli = NULL;
    public $var;
    public function __construct() {
				parent::__construct();
				$this->dbConnect();
    }

		private function dbConnect(){
			$this->mysqli = new mysqli(XRADIO_DB_HOST, XRADIO_DB_USER, XRADIO_DB_PASSWORD, XRADIO_DB_NAME);
			$this->mysqli->set_charset("utf8");
		}

		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['method'])));
			if((int)method_exists($this,$func) > 0) {
					$this->$func();
			}
			else {
					$result['status']=404;
					$result['msg']='processApi - method not exist';
					$this->response($this->json($result),200);
			}
		}
		// check api key from service
		private function checkApiKey(){
			if($this->get_request_method() != "GET") {
				 	$error = array('status' => "406", "msg" => "Invalid call method");
				 	$this->response($this->json($error),200);
			}
			if(isset($this->_request['api_key'])){
				 	$api_key = $this->_request['api_key'];
					if($api_key !=API_KEY){
							$error = array('status' => "404", "msg" => "Invalid api key");
							$this->response($this->json($error), 200);
					}
			}
			else{
					$this->responseInvalidParam();
			}
		}

		/*
		 * GET LIST GENRES ----------------------------------------------------------------------------------------------------------
		 */
		private function getGenres(){
			$this->checkApiKey();
			$query= "select id,name,img from genres where isActive=1 ORDER BY id DESC";
			$this->get_list($query);
		}

		/*
		 * GET REMOTE CONFIGS----------------------------------------------------------------------------------------------------------
		 */
		private function getRemoteConfigs(){
			$this->checkApiKey();
			$query= "select * from configs";
			$this->get_list($query);
		}

		/*
		 * GET LIST THEMES----------------------------------------------------------------------------------------------------------
		 */
		private function getThemes(){
		 $this->checkApiKey();
		 if(isset($this->_request['app_type'])){
			 $app_type =intval($this->_request['app_type']);
			 if($app_type==0 || $app_type>1){
				 $this->responseInvalidParam();
			 }
			 if($app_type==1){
				 $query= "select id,name,img,grad_start_color,grad_end_color,grad_orientation from themes where is_single_theme=1 and isActive=1";
				 $this->get_list($query);
				 return;
			 }
		 }
		 if(isset($this->_request['offset']) && isset($this->_request['limit'])){
			 $offset =intval($this->_request['offset']);
			 $limit = intval($this->_request['limit']);
			 if($offset<0 || $limit<=0){
				 $this->responseInvalidParam();
			 }
			 $query= "select id,name,img,grad_start_color,grad_end_color,grad_orientation from themes where isActive=1 ORDER BY id DESC";
			 $query=$query. " limit ".$offset. ", " .$limit;
       $this->get_list($query);
		 }
		 else{
			 $this->responseInvalidParam();
		 }
	 }

	 /*
	  * GET LIST RADIO----------------------------------------------------------------------------------------------------------
	  */
	 private function getRadios(){
		 $this->checkApiKey();
		 if(isset($this->_request['radio_id']) || (isset($this->_request['offset']) && isset($this->_request['limit']))){
			 $radio_id=isset($this->_request['radio_id'])?intval($this->_request['radio_id']):0;
			 if($radio_id<0){
				 $this->responseInvalidParam();
			 }

			 $query= "select r.id,r.name,r.img,r.bitrate,r.tags,r.type_radio,r.source_radio,r.link_radio,"
							."r.user_agent_radio,r.url_facebook,r.url_twitter, r.url_instagram,r.url_website from radios r";

			 if($radio_id >0){
				 $query=$query." where id=$radio_id and isActive=1";
			 }
			 else{
				 $offset =intval($this->_request['offset']);
				 $limit = intval($this->_request['limit']);

				 if($offset<0 || $limit<=0){
					 $this->responseInvalidParam();
				 }

				 $is_feature = (isset($this->_request['is_feature'])) ? intval($this->_request['is_feature']) : 0;
				 $genre_id = (isset($this->_request['genre_id'])) ? intval($this->_request['genre_id']) : 0 ;
				 $country_id = (isset($this->_request['country_id'])) ? intval($this->_request['country_id']) : 0 ;
				 $q = (isset($this->_request['q'])) ? (urldecode($this->_request['q'])) : "";

				 if($genre_id >0){
				 	$query= $query." INNER join radios_cat rc on rc.radio_id=r.id and rc.genre_id=$genre_id";
				 }
				 if($country_id >0){
				 	$query= $query." INNER join radios_country rco on rco.radio_id=r.id and rco.country_id=$country_id";
				 }
				 $query =$query. " where isActive=1";
				 if($is_feature==1){
					 $query= $query." and isFeatured=1";
				 }
				 if($q != "") {
					 $query = $query . " and (name REGEXP '$q' or tags REGEXP '$q')";
				 }
				 $query = $query . " ORDER BY id DESC";
				 $query=$query. " limit ".$offset. ", " .$limit;
			 }
       $this->get_list($query);
		 }
		 else{
			 $this->responseInvalidParam();
		 }
	 }

    /** GET COUNTRIES LIST **/
    private function getCountries(){
        $this->checkApiKey();
        $query= "select id,name,img from countries where isActive=1 ORDER BY id DESC";
        $this->get_list($query);
    }

	 private function get_list($query){
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			$result = array();
			$result['status']=200;
			$result['msg']='success';
			if($r->num_rows > 0){
				$datas = array();
				while($row = $r->fetch_assoc()){
						$datas[] = $row;
				}
				$result['datas']=$datas;
			}
			else{
				$result['datas']=array();
			}
			$r->close();
			$this->mysqli->close();
			$this->response($this->json($result),200);
		}

		private function responseInvalidParam(){
			$resp = array("status" => '404', "msg" => 'Invalid Parameter' );
			$this->response($this->json($resp), 200);
		}

		private function responseNoData(){
			$resp = array("status" => '200', "msg" => 'success',"data" => array());
			$this->response($this->json($resp), 200);
		}

		/*Encode array into JSON */
		private function json($data){
			if(is_array($data)){
				return json_encode($data, JSON_NUMERIC_CHECK);
			}
		}

}

$api = new XRADIO_API;
$api->processApi();

?>
