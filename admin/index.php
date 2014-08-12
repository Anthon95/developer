<?php

include("../config.php");

if(isset($_SESSION['user'])){
    header("Location: announcements.php");
}

if(!empty($_POST)){
    if(!empty($_POST['username']) && !empty($_POST['password'])){
        $query = mysqli_query($link,"SELECT id FROM users WHERE username='".$_POST['username']."' AND password='".sha1($_POST['password'])."'");
        $result = mysqli_fetch_row($query);

        $_SESSION['user'] = "admin";
        header("Location: announcements.php");
    }
    else{
        echo "Invalid username or password";
    }
}

?>

<!DOCTYPE html>
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Admin</title>
 </head>
 <body>
  <h1>Welcome to the Admin Area</h1>
    <div>Please connect here</div>
 <form action="index.php" method="post">
     Username
     <input type="text" name="username">
     Password
     <input type="password" name="password">
     <input type="submit" value="Connect">
 </form>
 </body>
</html>