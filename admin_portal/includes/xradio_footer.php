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
include("xradio_conn.php");
//close my sql;
mysqli_close($mysqli);
?>
<footer class="app-footer">
  <div class="row">
    <div class="col-xs-12">
      <div class="footer-copyright">Copyright © <?php echo date('Y');?> <a href="<?php echo XRADIO_APP_WEBSITE?>"><?php echo XRADIO_APP_AUTHOR;?></a>. All Rights Reserved.</div>
    </div>
  </div>
</footer>
</div>
</div>
</body>
</html>
