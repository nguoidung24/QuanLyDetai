<?php
require_once "../../Model/_connect.php";
require_once "../../Model/_mygroup.php";
$group = new Group($conn);
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$limit = 2;
if(isset($data["pageSubmit"])){
    if( $data["pageSubmit"] == "First"){
        $start = 0;
        $groupAll = $group->getTableGroup($start,$limit);
        $response = [
            "currentPage" =>  1,
            "groupAll" => $groupAll,

        ];
    }
    else if( $data["pageSubmit"] == 'Last'){
        $totalPage = ceil($group->getTotalPage() / $limit);
        $start = ($totalPage - 1) * $limit;
        $groupAll = $group->getTableGroup($start,$limit);
        $response = [
            "currentPage" =>  $totalPage,
            "groupAll" => $groupAll,

        ];
    }
    else {
        $start = ($data["pageSubmit"] - 1)*$limit;
        $groupAll = $group->getTableGroup($start,$limit);
        $response = [
            "currentPage" =>  $data["pageSubmit"],
            "groupAll" => $groupAll,

        ];
    }
}
else if(isset($data["roi_nhom"])){
    $result = $group->roiNhom($data["ma_nhom"],$data["ma_sinh_vien"]);
    $allGroup = $group->getGroup($data["ma_sinh_vien"]);
    $response = [
        "result" => $result,
        "group" => $allGroup
    ];
}
else if(isset($data["inputSearch"])){
    $searchResult = $group->getSearchResult($data["inputSearch"]);
    $response = [
        "dataSearch" => $searchResult
    ];
}
else{
    $msv = $data["ma_sinh_vien"];
    if(isset($data["join"])){
        $mn = $data["ma_nhom"];
        $joinGroup = $group->joinGroup($mn, $msv);
    }

    $myGroup = $group->getMygroup($msv);
    $allGroup = $group->getGroup($msv);
    $groupAll = $group->getTableGroup(0,$limit);
    $response = [
        "myGroup" => $myGroup,
        "group" => $allGroup,
        "groupAll" => $groupAll,
        "totalPage" => ceil($group->getTotalPage() / $limit),
        "join" => isset($joinGroup)?$joinGroup: false
    ];
}
header("Content-Type: application/json");
echo json_encode($response);
