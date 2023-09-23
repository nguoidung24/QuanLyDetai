<?php
require_once "ConnectDatabase.php";
class TaiKhoan
{
    public function __construct($id, $fullname, $username, $gender, $phone, $birthday, $password)
    {
        $this->id = $id;
        $this->fullname = $fullname;
        $this->username = $username;
        $this->gender = $gender;
        $this->phone = $phone;
        $this->birthday = $birthday;
        $this->password = $password;
    }
    private function validateUsername()
    {
        $row =  Database::getTable("SELECT * FROM tai_khoan WHERE username = '$this->username'");
        return $row == [];
    }
    public function validate()
    {
        $this->error = [];
        if (!preg_match("/^[0-9]+$/", $this->id))
            array_push($this->error, "ID không hợp lệ");
        if (!preg_match("/^[A-Z a-z à-ỹ À-Ỹ \s]{1,100}$/", $this->fullname))
            array_push($this->error, "Tên hiển thị không hợp lệ");
        if (!preg_match("/^[0-9A-Za-z]{8,16}$/", $this->username))
            array_push($this->error, "Tên Tài khoản không hợp lệ");
        if (!$this->validateUsername())
            array_push($this->error, "Tên Tài khoản đã tồn tại");
        if (!preg_match("/^Nam|Nữ$/", $this->gender))
            array_push($this->error, "Giới tính không hợp lệ");
        if (!preg_match("/^[0-9]{10,10}$/", $this->phone))
            array_push($this->error, "Số điện thoại không hợp lệ");
        if (!preg_match("/^[0-9A-Za-z]{8,16}$/", $this->password))
            array_push($this->error, "Mật khẩu không hợp lệ");
        return $this->error;
    }
    public function insertString()
    {
        return "INSERT INTO tai_khoan (fullname, username, password, birthday, gender, phone) VALUES ('$this->fullname','$this->username','$this->password','$this->birthday','$this->gender','$this->phone')";
    }
    public function updateString()
    {
        return "UPDATE tai_khoan SET fullname='$this->fullname',username='$this->username',password='$this->password',birthday='$this->birthday',gender='$this->gender',phone='$this->phone' WHERE id = '$this->id'";
    }    
    public function deleteString()
    {
        return "DELETE FROM tai_khoan WHERE id = '$this->id'";
    }
}
