<?php
class Group{
    public function __construct($conn){
        $this->conn = $conn;
    }
    public function getMyGroup($ma_sinh_vien){
        $myGroup = [];
        $query = "
        SELECT * FROM nhom WHERE ma_sinh_vien = $ma_sinh_vien
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
        SELECT nhom.* 
        FROM nhom, thanh_vien_nhom 
        WHERE thanh_vien_nhom.ma_sinh_vien = $ma_sinh_vien
        and nhom.ma_nhom = thanh_vien_nhom.ma_nhom
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
        SELECT nhom.* 
        FROM nhom
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
        SELECT nhom.* 
        FROM nhom 
        WHERE ma_nhom = $ma_nhom
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
    public function joinGroup($ma_nhom, $ma_sinh_vien){
        try{
            return mysqli_query($this->conn,
                "INSERT INTO thanh_vien_nhom(ma_nhom, ma_sinh_vien)
                VALUES ('$ma_nhom','$ma_sinh_vien')");
        }
        catch(Exception $e){
            return false;
        }
    }
    public function getTableGroup($start, $limit){
        $group = [];
        $query = "
        SELECT nhom.* 
        FROM nhom
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
}
?>