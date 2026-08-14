<?php

//$feed = $_POST["feed"];

$feed = "../csgo/los-grandes-vs-leviatan-esl-challenger-anaheim-2022-south-america-closed-qualifier";


$file = fopen($feed, 'r');

$lineArray[] = null;

while (!feof($file)) {
	$line = fgetcsv($file, 4000, "\n");
	array_push($lineArray,$line);
}
fclose($file);
echo json_encode($lineArray);

?>
