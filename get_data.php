<?php
$people_response = [];
$total_records = 0;
$next_remaing = true;
$record_count = $_POST['record_count'];
if(!isset($record_count)){
	$record_count = 1;
}
$countPerPage = 1;

$file_path = "source/data.json";
if(file_exists($file_path))
{
	$content = file_get_contents($file_path);	
	$is_valid_json = is_string($content) && is_array(json_decode($content, true)) ? true : false;
	if($is_valid_json)
	{
		$people = json_decode($content, true);	
		$start = ($record_count - 1) * $countPerPage;
		$people_response = array_slice($people,$start,$countPerPage);
		$total_records = count($people);
		$calc_remaining = $record_count + 1;

		/* check next record exist in peoples array */
		$people_keys = array_keys($people);
		if( !array_key_exists($record_count, $people_keys) ){
			$next_remaing = false;
		}
	}
}
echo json_encode(array('data'=>$people_response,'total_records'=>$total_records,'next_remaing'=>$next_remaing));