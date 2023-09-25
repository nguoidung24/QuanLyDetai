<?php
header("Content-Type: application/json");
$conn = mysqli_connect("localhost","root","","quan_ly_nckh");
$queryNhat = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 1;";

$queryNhi = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 2;";

$queryBa = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 3;";


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
?>