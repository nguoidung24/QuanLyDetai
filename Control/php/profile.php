<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_profile.php";
$profile = new Profile($conn);
$json = file_get_contents("php://input");
$data = json_decode($json);
$ma_sinh_vien = $data->ma_sinh_vien;
if(isset($data->doi_mat_khau)){
    if($data->mat_khau_moi != $data->nhap_lai_mat_khau_moi)
        $response = [
            "result" => false
        ];
    else 
        $response = [
            "result" => $profile->doi_mat_khau($data->mat_khau_moi, $data->ma_sinh_vien)
        ];
}
else{
    $tong_giai_thuong = (int)$profile->lay_so_lan_dat_giai_1($ma_sinh_vien) + (int)$profile->lay_so_lan_dat_giai_2($ma_sinh_vien);
    $response = [
        "ten_lop_khoa" => $profile->get_Info($ma_sinh_vien),
        "tong_so_lan_dat_giai" => $tong_giai_thuong,
        "nhom_tham_gia" => $profile->lay_nhom_da_tham_gia($ma_sinh_vien),
        "nhom_da_tao" => $profile->lay_nhom_da_tao($ma_sinh_vien)
    ];
}

header("Content-Type: application/json");
echo json_encode($response);
?>