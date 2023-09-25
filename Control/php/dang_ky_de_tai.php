<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_dang_ky_de_tai.php";
$dangKy = new DangKyDeTai($conn);
$json = file_get_contents("php://input");
$data = json_decode($json);
$response = [
    "result" => $dangKy->dangKyDeTai($data->ten_de_tai, $data->noi_dung, $data->ma_sinh_vien)
];
header("Content-Type: application/json");
echo json_encode($response);
?>