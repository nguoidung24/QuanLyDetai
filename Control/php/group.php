<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_group.php";
$creatGroup = new CreatGroup($conn);
$json = file_get_contents("php://input");
$data = json_decode($json);

$limt = 2;
$totalRow = $creatGroup->getTotalRow();
$totalPage = ceil($totalRow / $limt);

$response = [];
if(isset($data->tat_ca_de_tai)){
    $table_MaDeTai = $creatGroup->getTable_MaDeTai(0,$limt);
    $response = [
        "totalPage" => ceil($creatGroup->getTotalRow() / $limt),
        "getTable_MaDeTai" => $table_MaDeTai,
        "currentPage" => 1,
        "isSearch" => false,
        "inputSearch" => ""
    ];  
}
else if(isset($data->inputSearch) && isset($data->pageSubmit) && isset($data->isSearch)){
    if($data->inputSearch == '' || $data->isSearch == false){
        if($data->pageSubmit == "First"){
            $currentPage = 1;
        }
        else if($data->pageSubmit == 'Last'){
            $currentPage = $totalPage;
        }
        else{
            $currentPage = $data->pageSubmit;
        }
        $start = ($currentPage - 1) * $limt;
        $table_MaDeTai = $creatGroup->getTable_MaDeTai($start,$limt);
    
        $response = [
            "result" => $table_MaDeTai,
            "currentPage" => $currentPage,
            "isSearch"=>false,
            "totalPage" => ceil($creatGroup->getTotalRow() / $limt)
        ];  
    }
    else{
            if($data->pageSubmit == "First"){
                $currentPage = 1;
            }
            else if($data->pageSubmit == 'Last'){
                $currentPage = ceil($creatGroup->getTotaRow_Search($data->inputSearch) / $limt);
            }
            else{
                $currentPage = $data->pageSubmit;
            }
            $start = ($currentPage - 1) * $limt;

            $response = [
                "currentPage" => $currentPage,
                "isSearch"=>true,
                "result" => $creatGroup->search($data->inputSearch,$start,$limt),
                "totalPage" => ceil($creatGroup->getTotaRow_Search($data->inputSearch) / $limt)
            ];
    }
}
else if(isset($data->search)){
    $response = [
        "isSearch"=>true,
        "result" => $creatGroup->search($data->ten_de_tai,0,$limt),
        "totalPage" => ceil($creatGroup->getTotaRow_Search($data->ten_de_tai) / $limt),
    ];
}
else if(isset($data->getTable_MaDetai) && isset($data->ma_khoa)){
    $ma_khoa = $data->ma_khoa;
    $ma_bo_mon = $creatGroup->getOptions_BoMon($ma_khoa)[0]["ma_bo_mon"];
    $getOptions_Khoa = $creatGroup->getOptions_Khoa();
    $getOptions_BoMon = $creatGroup->getOptions_BoMon($ma_khoa);
    $getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);
    
    $currentPage = 1;
    $start = ($currentPage - 1) * $limt;
    $table_MaDeTai = $creatGroup->getTable_MaDeTai($start,$limt);

    $response = [
        "isSearch"=>false,
        "getOptions_Khoa" => $getOptions_Khoa,
        "getOptions_BoMon" => $getOptions_BoMon,
        "getOptions_GiangVien" => $getOptions_GiangVien,
        "getTable_MaDeTai" => $table_MaDeTai,
        "totalPage" => $totalPage
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
        "isSearch"=>false,
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
        "isSearch"=>false,
        "getOptions_Khoa" => $getOptions_Khoa,
        "getOptions_BoMon" => $getOptions_BoMon,
        "getOptions_GiangVien" => $getOptions_GiangVien

    ];
}else if(isset($data->ma_bo_mon)){
    $ma_bo_mon = $data->ma_bo_mon;
    $getOptions_GiangVien = $creatGroup->getOptions_GiangVien($ma_bo_mon);

    $response = [
        "isSearch"=>false,
        "getOptions_GiangVien" => $getOptions_GiangVien
    ];
}

header("Content-Type: application/json");
echo json_encode($response);
?>