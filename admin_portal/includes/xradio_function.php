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
include("utils/thumbnail_images.class.php");

function insert_tbl($table, $data){
    global $mysqli;
    $fields = array_keys( $data );
    $values = array_map( array($mysqli, 'real_escape_string'), array_values( $data ) );
    $result=mysqli_query($mysqli, "INSERT INTO $table(".implode(",",$fields).") VALUES ('".implode("','", $values )."');") or die( mysqli_error($mysqli) );
    if($result== TRUE){
      $last_id = mysqli_insert_id($mysqli);
      return $last_id;
    }
    require -1;
}

function update_tbl($table_name, $form_data, $where_clause=''){
    global $mysqli;
    $whereSQL = '';
    if(!empty($where_clause)){
      if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE'){
        $whereSQL = " WHERE ".$where_clause;
      }
      else{
        $whereSQL = " ".trim($where_clause);
      }
    }
    $sql = "UPDATE ".$table_name." SET ";
    $sets = array();
    foreach($form_data as $column => $value){
      $sets[] = "`".$column."` = '".$value."'";
    }
    $sql .= implode(', ', $sets);
    $sql .= $whereSQL;
    return mysqli_query($mysqli,$sql);
}

function delete_tbl($table_name, $where_clause=''){
    global $mysqli;
    $whereSQL = '';
    if(!empty($where_clause)){
      if(substr(strtoupper(trim($where_clause)), 0, 5) != 'WHERE'){
        $whereSQL = " WHERE ".$where_clause;
      }
      else{
        $whereSQL = " ".trim($where_clause);
      }
    }
    $sql = "DELETE FROM ".$table_name.$whereSQL;
    return mysqli_query($mysqli,$sql);
}

//process image before uploading to server
function process_image($source_url, $destination_url, $quality){
    $info = getimagesize($source_url);
    if ($info['mime'] == 'image/jpeg'){
      $image = imagecreatefromjpeg($source_url);
    }
    elseif ($info['mime'] == 'image/png'){
      $image = imagecreatefrompng($source_url);
    }
    imagejpeg($image, $destination_url, $quality);
    return $destination_url;
}
?>
