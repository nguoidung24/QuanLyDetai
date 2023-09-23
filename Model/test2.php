<?php
require "ConnectDatabase.php";
require "taikhoan.php";

header('Content-Type: application/json');
$json = file_get_contents('php://input');
$dataReques = json_decode($json, true);
$data = $dataReques["data"];
$query = "";

$taiKhoan = new TaiKhoan($data['id'],$data['fullname'],$data['username'],$data['gender'],$data['phone'],$data['birthday'],$data['password']);

switch($dataReques['expect']){
    case "insert":
        $query = $taiKhoan->insertString();
        break;
    case "update":
        $query = $taiKhoan->updateString();
        break;
    case "delete":
        $query = $taiKhoan->deleteString();
        break;
    default:
        $query="";
}
$errors = $taiKhoan->validate();
$response = [
    "result" => false,
    "errors" => $errors
];
if($errors == []){
    if($query != ""  && Database::executeQuery($query)){
        $response = [
            "result" => true,
            "errors" => ["Thành công"]
        ];
    }
}

echo json_encode($response);
