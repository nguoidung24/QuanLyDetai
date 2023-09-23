<?php
include "ConnectDatabase.php";
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$totalPage = Database::getTable("SELECT COUNT(*) as t FROM tai_khoan");
$limit = 10;
$total = ceil($totalPage[0]["t"]/$limit);

if($data["page"] == "First") 
    $currentPage = 1;
else if($data["page"] == "Last") 
    $currentPage = $total;
else 
    $currentPage = (int)$data["page"];
    
$start = ($currentPage - 1) * $limit;
$query = "SELECT * FROM tai_khoan LIMIT $start,$limit";

$result =[
    "table" => Database::getTable($query),
    "totalPage" => $total,
    "currentPage" => $currentPage
];
echo json_encode($result);
?>