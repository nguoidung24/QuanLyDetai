<?php
$queryNhat = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao, n.ma_nhom
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 1;";

$queryNhi = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao, n.ma_nhom
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 2;";

$queryBa = "SELECT s.ten_sinh_vien, g.ten_giang_vien, d.ten_de_tai, n.ngay_tao, n.ma_nhom
FROM nhom n
JOIN sinh_vien s ON n.ma_sinh_vien = s.ma_vien_vien
JOIN giang_vien g ON n.ma_giang_vien = g.ma_giang_vien
JOIN de_tai d ON n.ma_de_tai = d.ma_de_tai
WHERE n.ma_giai_thuong = 3;";

class Home {
    public function __construct($conn,$ma_nhom)
    {
        $this->conn = $conn;
        $this->ma_nhom = $ma_nhom;
    }
    public function getDetail(){
        $queryDetail =" SELECT 
                            nhom.ten_nhom,
                            sinh_vien.ten_sinh_vien,
                            giang_vien.ten_giang_vien, giang_vien.so_dien_thoai as sdt_giang_vien,
                            giai_thuong.ten_giai_thuong,
                            de_tai.ten_de_tai, de_tai.noi_dung,
                            COUNT(thanh_vien_nhom.ma_sinh_vien) as total_thanh_vien
                        FROM 
                            nhom, sinh_vien, giang_vien, giai_thuong, de_tai, thanh_vien_nhom
                        WHERE
                            nhom.ma_nhom = $this->ma_nhom
                            AND nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
                            AND nhom.ma_giang_vien = giang_vien.ma_giang_vien
                            AND nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
                            AND nhom.ma_de_tai = de_tai.ma_de_tai
                            AND nhom.ma_nhom = thanh_vien_nhom.ma_nhom
                    ";
        $result = mysqli_query($this->conn, $queryDetail);
        return mysqli_fetch_assoc($result);
    }
    public function lay_thanh_vien_nhom(){
        $table = [];
        $query = "SELECT sinh_vien.ten_sinh_vien, sinh_vien.so_dien_thoai, lop.ten_lop
        FROM thanh_vien_nhom, sinh_vien, lop
        WHERE 
            thanh_vien_nhom.ma_nhom = $this->ma_nhom
            AND thanh_vien_nhom.ma_sinh_vien = sinh_vien.ma_vien_vien
            AND sinh_vien.ma_lop = lop.ma_lop
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        return $table;
    }
    public function lay_nguoi_tao(){
        $query = "SELECT sinh_vien.ten_sinh_vien, sinh_vien.so_dien_thoai, lop.ten_lop
        FROM nhom, sinh_vien, lop
        WHERE 
            nhom.ma_nhom = $this->ma_nhom
            AND nhom.ma_sinh_vien = sinh_vien.ma_vien_vien
            AND sinh_vien.ma_lop = lop.ma_lop
        ";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result);
    }
    public function lay_giang_vien(){
        $query = "SELECT giang_vien.ten_giang_vien, giang_vien.so_dien_thoai
        FROM nhom, giang_vien
        WHERE 
            nhom.ma_nhom = $this->ma_nhom
            AND nhom.ma_giang_vien = giang_vien.ma_giang_vien";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result);
    }
}
?>