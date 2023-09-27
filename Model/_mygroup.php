<?php
class Group{
    public function __construct($conn){
        $this->conn = $conn;
    }
    public function getMyGroup($ma_sinh_vien){
        $myGroup = [];
        $query = "
        SELECT nhom.ma_nhom, nhom.ten_nhom, nhom.ngay_tao,
            de_tai.ten_de_tai,
            sinh_vien.ten_sinh_vien,
            giang_vien.ten_giang_vien,
            giai_thuong.ten_giai_thuong
        FROM nhom, de_tai, sinh_vien, giang_vien, giai_thuong 
        WHERE nhom.ma_sinh_vien = $ma_sinh_vien
        	and nhom.ma_de_tai = de_tai.ma_de_tai
            and nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
            and nhom.ma_giang_vien = giang_vien.ma_giang_vien
            and nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $myGroup[] = $row;
        }
        return $myGroup;
    }
    public function getGroup($ma_sinh_vien){
        $group = [];
        $query = "
        SELECT nhom.ma_nhom, nhom.ten_nhom, nhom.ngay_tao,
            de_tai.ten_de_tai,
            sinh_vien.ten_sinh_vien,
            giang_vien.ten_giang_vien,
            giai_thuong.ten_giai_thuong
        FROM thanh_vien_nhom, nhom, de_tai, sinh_vien, giang_vien, giai_thuong 
        WHERE thanh_vien_nhom.ma_sinh_vien = $ma_sinh_vien
        	and thanh_vien_nhom.ma_nhom = nhom.ma_nhom
        	and nhom.ma_de_tai = de_tai.ma_de_tai
            and nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
            and nhom.ma_giang_vien = giang_vien.ma_giang_vien
            and nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $group[] = $row;
        }
        return $group;  
    }
    public function getGroupAll(){
        $group = [];
        $query = "
        SELECT nhom.ma_nhom, nhom.ten_nhom, nhom.ngay_tao,
            de_tai.ten_de_tai,
            sinh_vien.ten_sinh_vien,
            giang_vien.ten_giang_vien,
            giai_thuong.ten_giai_thuong
        FROM nhom, de_tai, sinh_vien, giang_vien, giai_thuong 
        WHERE nhom.ma_de_tai = de_tai.ma_de_tai
            and nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
            and nhom.ma_giang_vien = giang_vien.ma_giang_vien
            and nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $group[] = $row;
        }
        return $group;
    }
    public function getSearchResult($ma_nhom){
        $group = [];
        $query = "
        SELECT nhom.ma_nhom, nhom.ten_nhom, nhom.ngay_tao,
            de_tai.ten_de_tai,
            sinh_vien.ten_sinh_vien,
            giang_vien.ten_giang_vien,
            giai_thuong.ten_giai_thuong
        FROM nhom, de_tai, sinh_vien, giang_vien, giai_thuong 
        WHERE nhom.ma_nhom = $ma_nhom
        	and nhom.ma_de_tai = de_tai.ma_de_tai
            and nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
            and nhom.ma_giang_vien = giang_vien.ma_giang_vien
            and nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $group[] = $row;
        }
        return $group;
    }
    public function roiNhom($ma_nhom,$ma_sinh_vien){
        $query = "
        DELETE FROM thanh_vien_nhom 
        WHERE thanh_vien_nhom.ma_nhom = $ma_nhom
        AND thanh_vien_nhom.ma_sinh_vien = $ma_sinh_vien
        ";
        try{
            return mysqli_query($this->conn, $query);
        }
        catch(Exception $e){
            return false;
        }
    }
    private function da_trao_giai($ma_nhom){
        $query = "SELECT COUNT(nhom.ma_giai_thuong) as total FROM nhom WHERE nhom.ma_nhom = $ma_nhom AND nhom.ma_giai_thuong > -1";
        $result = mysqli_query($this->conn, $query);
        return (int)mysqli_fetch_assoc($result)["total"] > 0;
    }
    private function da_trong_nhom($ma_sinh_vien,$ma_nhom){
        $query = "SELECT COUNT(nhom.ma_sinh_vien) as total FROM nhom WHERE nhom.ma_sinh_vien = $ma_sinh_vien and nhom.ma_nhom = $ma_nhom";
        $result = mysqli_query($this->conn, $query);
        return (int)mysqli_fetch_assoc($result)["total"] > 0;
    }
    public function joinGroup($ma_nhom, $ma_sinh_vien){
        try{
            if($this->da_trong_nhom($ma_sinh_vien,$ma_nhom) || $this->da_trao_giai($ma_nhom)){
                return false;
            }
            else{
                return mysqli_query($this->conn,
                    "INSERT INTO thanh_vien_nhom(ma_nhom, ma_sinh_vien)
                        VALUES ('$ma_nhom','$ma_sinh_vien')");
            }
        }
        catch(Exception $e){
            return false;
        }
    }
    public function getTableGroup($start, $limit){
        $group = [];
        $query = "
        SELECT nhom.ma_nhom, nhom.ten_nhom, nhom.ngay_tao,
            de_tai.ten_de_tai,
            sinh_vien.ten_sinh_vien,
            giang_vien.ten_giang_vien,
            giai_thuong.ten_giai_thuong
        FROM nhom, de_tai, sinh_vien, giang_vien, giai_thuong 
        WHERE nhom.ma_de_tai = de_tai.ma_de_tai
            and nhom.ma_sinh_vien = sinh_vien.ma_vien_vien 
            and nhom.ma_giang_vien = giang_vien.ma_giang_vien
            and nhom.ma_giai_thuong = giai_thuong.ma_giai_thuong
        
        LIMIT $start, $limit
        ";
        $result = mysqli_query($this->conn, $query);
        while($row = mysqli_fetch_assoc($result)){
            $group[] = $row;
        }
        return $group;
    }
    public function getTotalPage(){
        $query = "
        SELECT COUNT(*) as toltal 
        FROM nhom
        ";
        $result = mysqli_query($this->conn, $query);
        return  mysqli_fetch_assoc($result)["toltal"];
    }
    public function deleteGroup($ma_nhom){
        $query = "DELETE FROM nhom WHERE nhom.ma_nhom = $ma_nhom";
        try{
            return mysqli_query($this->conn, $query);
        }
        catch(Exception $e){
            return false;
        }
    }
}
?>