<?php
class DeTaiCuaBan{
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function getDeTai($ma_sinh_vien){
        $table = [];
        $query = "SELECT ma_de_tai, ten_de_tai, ten_trang_thai FROM de_tai, trang_thai_de_tai WHERE de_tai.trang_thai = trang_thai_de_tai.ma_trang_thai and de_tai.ma_sinh_vien = $ma_sinh_vien";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        return $table;
    }
}
?>