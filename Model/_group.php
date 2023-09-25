<?php
class CreatGroup{
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function getOptions_Khoa(){
        $arr = [];
        $query = "SELECT * FROM khoa";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        return $arr;
    }
    public function getOptions_BoMon($ma_khoa){
        $arr = [];
        $query = "SELECT * FROM bo_mon WHERE ma_khoa = $ma_khoa";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        return $arr;
    }
    public function getOptions_Giangvien($ma_bo_mon){
        $arr = [];
        $query = "SELECT * FROM giang_vien WHERE ma_bo_mon = $ma_bo_mon";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)) {
            $arr[] = $row;
        }
        return $arr;
    }
    private function check_MaDeTai($ma_de_tai){
        $query = "SELECT COUNT(*) as total FROM de_tai WHERE ma_de_tai = $ma_de_tai and trang_thai = 1";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result)["total"] > 0;
    }
    public function creatGroup($ten_nhom, $ma_sinh_vien, $ma_giang_vien, $ma_de_tai){
        $query = "INSERT INTO nhom(ten_nhom, ngay_tao, ma_giang_vien, ma_sinh_vien, ma_de_tai) 
            VALUES ('$ten_nhom',CURRENT_DATE,'$ma_giang_vien','$ma_sinh_vien','$ma_de_tai')";
        try{
            if(!$this->check_MaDeTai($ma_de_tai)) return false;
            else return mysqli_query($this->conn, $query);
        }
        catch(Exception $e){
            return false;
        }
    }
    public function getTable_MaDeTai(){
        $table = [];
        $query = "SELECT ma_de_tai, ten_de_tai FROM de_tai WHERE trang_thai = 1";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        return $table;
    }
    public function search($ten_de_tai){
        $table = [];
        $query = "SELECT ma_de_tai, ten_de_tai FROM de_tai WHERE  ten_de_tai like '%$ten_de_tai%' and trang_thai = 1";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        return $table;
    }
}
?>