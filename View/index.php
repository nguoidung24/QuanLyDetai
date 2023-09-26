<?php
session_start();
if (!isset($_SESSION['login']))
  header("location: login.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='../assets/css/NAV_MAIN_style.css' rel='stylesheet'>
  <script src="../assets/javascript/loadFunction.js"></script>
  <script src="../assets/javascript/react_18.js"></script>
  <script src="../assets/javascript/reactDOM_18.js"></script>
  <script src="../assets/javascript/babel.js"></script>
  <script src="../assets/javascript/tailwind.js"></script>
  <script src="../assets/javascript/tailwindConfig.js"></script>
  <link rel="icon" type="image/x-icon" href="../assets/img/favicon.png">
  <title>Quản Lý Sinh Viên</title>
</head>

<!-- <body class="bg-bodygreen"> -->
<body class="truncate p-0 m-0">

  <div id="load" class="absolute animate-ping top-2/4 left-2/4 translatex-2/4 translate-y-2/4">
    <svg style="color:#636363" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
      <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
    </svg>
  </div>
  <div id="mask">
    <div id="root"></div>
  </div>
  <script src="../Control/javascript/index.js" type="text/babel"></script>
  <script src="../Control/javascript/home.js" type="text/babel"></script>
  <script type="text/babel">
    const container = document.getElementById('root');
    ReactDOM.createRoot(container).render(<Menu
      ten_sinh_vien="<?php echo $_SESSION['ten_sinh_vien']; ?>"
      ma_sinh_vien="<?php echo $_SESSION['ma_sinh_vien']; ?>"
    />);
  </script>
  <script src="../Control/javascript/account.js" type="text/babel"></script>
  <script src="../Control/javascript/group.js" type="text/babel"></script>
  <script src="../Control/javascript/mygroup.js" type="text/babel"></script>
  <script src="../Control/javascript/dang_ky_de_tai.js" type="text/babel"></script>
  <script src="../Control/javascript/de_tai_cua_ban.js" type="text/babel"></script>
  <script src="../Control/javascript/profile.js" type="text/babel"></script>

</body>

</html>