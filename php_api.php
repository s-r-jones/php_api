<?php
// open weahthe map's API key
// they make us sign up but nevery verify .... :|
$apiKey = "8c44ef774557ad2b049cf11d7c4c255c";

// base url is the bassis for all APU calls
$baseUrl = "http://api.openweathermap.org/data/2.5/weather";

// input to the API: direct search
if(empty($_GET["city"]) === false)
{
$query = htmlspecialchars($_GET["city"]);
$query = trim($query);
$query = urlencode($query);
$query = "?q=$query";
}
if(empty($_GET["latitude"]) === false && empty($_GET["longitude"]) === false)
{
    $latitude = trim($_GET["latitude"]);
    $latitude = floatval($latitude);
    $longitude = trim($_GET["longitude"]);
    $longitude = floatval($longitude);
    $query = "?lat=$latitude&lon=$longitude";
}



/*// account for malicious or incompetant users
if(empty($query) === true)
{
    throw(new RuntimeException("invalid city detected"));
    exit;
}*/

// final URL to get data from
$urlGlue = "$baseUrl$query";

// fetch JSON data
$jsonData = @file_get_contents($urlGlue);
if($jsonData === false)
{
    throw(new RuntimeException("Unble to download weather data"));
}

// convert JSON data into a big associative array
$weatherData = json_decode($jsonData, true);


// now do useful stuff with the data
// test with a var dump
/*echo"<pre>";
var_dump($weatherData);
echo "</pre>";*/

$dateTime = new DateTime();
$dateTime->setTimestamp($weatherData["dt"]);
$formattedDate = $dateTime->format("Y-m-d H:i:s");

// echo select fields from the array (cut superflous data)
echo "<p>" . $weatherData["main"]["temp"] . " K<br/>" . $weatherData["main"]["pressure"] . " hPa<br/>" . $formattedDate. "</p>";


?>