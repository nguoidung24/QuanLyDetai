<?php
    session_start();
    if(isset($_GET["formSubmit"])){
        $userName = $_GET["userName"];
        $password = $_GET["password"];
        if($userName == 1 && $password == 1){
            $_SESSION["login"] = 1;
            header("location: index.php");
        }
    }
?>
<!DOCTYPE html>
<html>

    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href='../assets/css/bootstrap_5.css' rel='stylesheet'>
        <link rel="stylesheet" href="../assets/css/style_login_2.css">
        <title>Page Title</title>

    </head>

    <body>
        <form>
            <div class="container col-11 col-lg-5 card p-4 rounded-4 ">
                <div class="row mt-3">
                    <div class="col text-center">
                        <h3>Đăng Nhập</h3>
                    </div>
                </div>
                <div class="row p-4 pb-2">
                    <div class="col">
                        <div class="form-floating">
                            <input placeholder=" " name="userName" class="form-control shadow bg-dark text-light my-padding" type="text">
                            <label>Tên tài khoản</label>
                        </div>
                    </div>
                </div>
                <div class="row p-4 pt-0 pb-3">
                    <div class="col">
                        <div class="form-floating">
                            <input placeholder=" " name="password" class="form-control shadow bg-dark text-light my-padding" type="password">
                            <label>Mật khẩu</label>
                        </div>
                    </div>
                </div>
                <div class="row p-4 pt-0">
                    <div class="col">
                        <button name="formSubmit" class="btn shadow btn-outline-primary">Đăng Nhập</button>
                        <a href="#" class="button-link">Quên mật khẩu?</a>
                    </div>
                </div>
            </div>
        </form>
    </body>

</html>