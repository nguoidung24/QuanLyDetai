<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_group.php";
$creatGroup = new CreatGroup($conn);
$json = file_get_contents("php://input");
$data = json_decode($json);
$response = [];
if(isset($data->search)){
    $creatGroup->search(1);
    $response = [
        "result" =>  $creatGroup->search($data->ten_de_tai)
    ];
}
else if(isset($data->getTable_MaDetai) && isset($data->ma_khoa)){
    $ma_khoa = $data->ma_khoa;
    $ma_bo_mon = $creatGroup->getOptions_BoMon($ma_khoa)[0]["ma_bo_mon"];
    $getOptions_Khoa = $creatGroup->getOptions_Khoa();
    $getOptions_BoMon = $creatGroup->getOptions_BoMon($ma_khoa);
    $getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);

    $table_MaDeTai = $creatGroup->getTable_MaDeTai();
    $response = [
        "getOptions_Khoa" => $getOptions_Khoa,
        "getOptions_BoMon" => $getOptions_BoMon,
        "getOptions_GiangVien" => $getOptions_GiangVien,
        "getTable_MaDeTai" => $table_MaDeTai
    ];
}
else if(isset($data->creatGroup)){
    $_creatGroup = $creatGroup->creatGroup(
        $data->ten_nhom, 
        $data->ma_sinh_vien,
        $data->ma_giang_vien,
        $data->ma_de_tai
    );
    $result = $_creatGroup?"Thành công":"Mã đề tài không hợp lệ";
    $response = [
        "result" => $result
    ];
}
else if(isset($data->ma_khoa)){
    $ma_khoa = $data->ma_khoa;
    $ma_bo_mon = $creatGroup->getOptions_BoMon($ma_khoa)[0]["ma_bo_mon"];
    $getOptions_Khoa = $creatGroup->getOptions_Khoa();
    $getOptions_BoMon = $creatGroup->getOptions_BoMon($ma_khoa);
    $getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);

    $response = [
        "getOptions_Khoa" => $getOptions_Khoa,
        "getOptions_BoMon" => $getOptions_BoMon,
        "getOptions_GiangVien" => $getOptions_GiangVien

    ];
}else if(isset($data->ma_bo_mon)){
    $ma_bo_mon = $data->ma_bo_mon;
    $getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);

    $response = [
        "getOptions_GiangVien" => $getOptions_GiangVien
    ];
}

header("Content-Type: application/json");
echo json_encode($response);
?>