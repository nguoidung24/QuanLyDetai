<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_de_tai_cua_ban.php";
$deTaiCuaBan = new DeTaiCuaBan($conn);
$json = file_get_contents("php://input");
$data = json_decode($json);
$response = [
    "data" => $deTaiCuaBan->getDeTai($data->ma_sinh_vien)
];
header("Content-Type: application/json");
echo json_encode($response);
?>