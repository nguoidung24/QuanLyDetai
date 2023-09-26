<?php
class Profile{
    public function __construct($conn)
    {
        $this->conn = $conn;
    }
    public function get_Info($ma_sinh_vien){
        $table = [];
        $query ="SELECT sinh_vien.ten_sinh_vien, khoa.ten_khoa, lop.ten_lop from sinh_vien, khoa, lop 
        WHERE sinh_vien.ma_vien_vien = $ma_sinh_vien and lop.ma_khoa = khoa.ma_khoa and sinh_vien.ma_lop = lop.ma_lop";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $table[] = $row;
        }
        return $table;
    }
    public function lay_nhom_da_tao($ma_sinh_vien){
        $query ="SELECT COUNT(*) as total FROM nhom WHERE ma_sinh_vien = $ma_sinh_vien";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result)['total'];
    }
    public function lay_nhom_da_tham_gia($ma_sinh_vien){
        $query ="SELECT COUNT(*) as total FROM thanh_vien_nhom WHERE ma_sinh_vien = $ma_sinh_vien";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result)['total'];
    }
    public function lay_so_lan_dat_giai_1($ma_sinh_vien){
        $query = "SELECT COUNT(*) as total FROM thanh_vien_nhom, nhom 
        WHERE thanh_vien_nhom.ma_sinh_vien = $ma_sinh_vien AND thanh_vien_nhom.ma_nhom = nhom.ma_nhom and nhom.ma_giai_thuong > 0";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result)['total'];
    }
    public function lay_so_lan_dat_giai_2($ma_sinh_vien){
        $query = "SELECT COUNT(*) as total FROM nhom WHERE nhom.ma_sinh_vien = $ma_sinh_vien and nhom.ma_giai_thuong > 0";
        $result = mysqli_query($this->conn, $query);
        return mysqli_fetch_assoc($result)['total'];
    }
    public function doi_mat_khau($ma_khau, $ma_sinh_vien){
        $query = "UPDATE sinh_vien SET mat_khau='$ma_khau' WHERE ma_vien_vien = $ma_sinh_vien";
        try{
            return mysqli_query($this->conn, $query);
        }
        catch(Exception $e){
            return false;
        }
    }
}


?>