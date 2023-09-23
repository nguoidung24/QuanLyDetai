<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_group.php";
$creatGroup = new CreatGroup($conn);
$ma_khoa = 1;
$ma_bo_mon = 1;
$getOptions_Khoa = $creatGroup->getOptions_Khoa();
$getOptions_BoMon = $creatGroup->getOptions_BoMon($ma_khoa);
$getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);

$response = [
    "getOptions_Khoa" => $getOptions_Khoa,
    "getOptions_BoMon" => $getOptions_BoMon,
    "getOptions_GiangVien" => $getOptions_GiangVien

];
header("Content-Type: application/json");
echo json_encode($response);
?>