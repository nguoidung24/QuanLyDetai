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
}
?>