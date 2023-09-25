<?php
class DangKyDeTai{
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function dangKyDeTai($ten_de_tai, $noi_dung, $ma_sinh_vien){
        $query = "INSERT INTO de_tai(ten_de_tai, noi_dung, trang_thai, ma_sinh_vien) VALUES ('$ten_de_tai','$noi_dung','-1','$ma_sinh_vien')";
        try{
            return mysqli_query($this->conn, $query);
        }   
        catch(Exception $e){
            return false;
        }
    }
}
?>