<?php
header("Content-Type: application/json");
require_once "../../Model/_connect.php";
require_once "../../Model/_home.php";
$json = file_get_contents("php://input");
$data = json_decode($json);
if(isset($data->detail)){
    $home = new Home($conn, $data->ma_nhom);
    echo json_encode([
        "result" => $home->getDetail(),
        "thanh_vien_nhom" => $home->lay_thanh_vien_nhom(),
        "giang_vien" => $home->lay_giang_vien(),
        "nguoi_tao" => $home->lay_nguoi_tao()
    ]);
}
else{
    $cardsNhat = [];
    $cardsNhi = [];
    $cardsBa = [];


    $resultNhat = mysqli_query($conn, $queryNhat);
    while($row = mysqli_fetch_assoc($resultNhat)){
        $cardsNhat[] = $row;
    }

    $resultNhi = mysqli_query($conn, $queryNhi);
    while($row = mysqli_fetch_assoc($resultNhi)){
        $cardsNhi[] = $row;
    }

    $resultBa = mysqli_query($conn, $queryBa);
    while($row = mysqli_fetch_assoc($resultBa)){
        $cardsBa[] = $row;
    }

    echo json_encode(
        [
            "giainhat" => $cardsNhat,
            "giainhi" => $cardsNhi,
            "giaiba" => $cardsBa
        ]
    );
}

?>