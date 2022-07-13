<?php
	if ($page == 0){
		$page = 1;
	}
	$last_page = ceil($total_pages/$limit);
	$prev = $page - 1;
	$prev1 = $page - 2;

	$next = $page + 1;
	$next1 = $page + 2;

	$last_page1 = $last_page - 1;
	$paginate = '';

	if($search!=""){
		$link="$targetpage&search=$search&page";
	}
	else{
		$link="$targetpage&page";
	}

	if($last_page > 1){
		$paginate .= "<ul class='pagination'>";
		if ($page > 1){
			$paginate.= "<li><a href='$link=$prev' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>";
		}
		else{
			$paginate.= "<li><span aria-hidden='true'>&laquo;</span></li>";
		}
		// Pages
		if ($last_page < 7 + ($stages * 2)){
			for ($counter = 1; $counter <= $last_page; $counter++){
				if ($counter == $page){
					$paginate.= "<li class='active'><span class='active'>$counter</span></li>";
				}
				else{
					$paginate.= "<li><a href='$link=$counter'>$counter</a></li>";
				}
			}
		}
		elseif($last_page > 5 + ($stages * 2)){
			// Beginning only hide later pages
			if($page < 1 + ($stages * 2)){
				for ($counter = 1; $counter < 4 + ($stages * 2); $counter++){
					if ($counter == $page){
						$paginate.= "<li class='active'><span class='active'>$counter</span></li>";
					}
					else{
						$paginate.= "<li><a href='$link=$counter'>$counter</a></li>";
					}
				}
				$paginate.= "<li>...</li>";
				$paginate.= "<li><a href='$link=$last_page1'>$last_page1</a></li>";
				$paginate.= "<li><a href='$link=$last_page'>$last_page</a></li>";
			}
			// Middle hide some front and some back
			elseif($last_page - ($stages * 2) > $page && $page > ($stages * 2)){
				$paginate.= "<li><a href='$link=1'>1</a></li>";
				$paginate.= "<li><a href='$link=2'>2</a></li>";
				$paginate.= "<li>...</li>";
				for ($counter = $page - $stages; $counter <= $page + $stages; $counter++){
					if ($counter == $page){
						$paginate.= "<li class='active'><span class='active'>$counter</span></li>";
					}
					else{
						$paginate.= "<li><a href='$link=$counter'>$counter</a></li>";
					}
				}
				$paginate.= "<li>...</li>";
				$paginate.= "<li><a href='$link=$last_page1'>$last_page1</a></li>";
				$paginate.= "<li><a href='$link=$last_page'>$last_page</a></li>";
			}
			// End only hide early pages
			else{
				$paginate.= "<li><a href='$link=1'>1</a></li>";
				$paginate.= "<li><a href='$link=2'>2</a></li>";
				$paginate.= "<li>...</li>";
				for ($counter = $last_page - (2 + ($stages * 2)); $counter <= $last_page; $counter++){
					if ($counter == $page){
						$paginate.= "<li class='active'><span class='active'>$counter</span></li>";
					}
					else{
						$paginate.= "<li><a href='$link=$counter'>$counter</a></li>";
					}
				}
			}
		}
		if ($page < $counter - 1){
			$paginate.= "<li><a href='$link=$next' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li>";
		}
		else{
			$paginate.= "<li><span aria-hidden='true'>&raquo;</span></li>";
		}
		$paginate.= "</ul>";
	}
	echo $paginate;
?>
