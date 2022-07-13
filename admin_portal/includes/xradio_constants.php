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
	//you can enter just one for live server or both if you want to test in localhost
	if($_SERVER['HTTP_HOST']=="localhost"){
			//local
      DEFINE ('XRADIO_DB_USER', 'radiowan_radioadmin'); //your local host db user
      DEFINE ('XRADIO_DB_PASSWORD', 'radioadmin');//your local host db password
      DEFINE ('XRADIO_DB_HOST', 'localhost');//your local host db host
      DEFINE ('XRADIO_DB_NAME', 'radiowan_xradio_db	');//your local host db name
	}
	else{
			//live
      DEFINE ('XRADIO_DB_USER', 'radiowan_radioadmin'); //your live db user
			DEFINE ('XRADIO_DB_PASSWORD', 'radioadmin');//your live db password
			DEFINE ('XRADIO_DB_HOST', 'localhost');//your live db host
			DEFINE ('XRADIO_DB_NAME', 'radiowan_xradio_db');//your live db name
	}
	DEFINE ('API_KEY', 'eHJhZGlvcGVyZmVjdGFwcA'); //Your api key.Maxium lenght should be 32 characters.

?>
