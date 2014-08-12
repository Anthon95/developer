<?php

include("../config.php");

if(!isset($_SESSION['user'])){
    header("Location: index.php");
}

if(!empty($_POST)){

    if(!empty($_POST['title']) && !empty($_POST['description']) && !empty($_POST['date'])){
        mysqli_query($link,"INSERT INTO announcements (title,description,datestamp) VALUES ('".$_POST['title']."','".$_POST['description']."','".$_POST['date']."')");
        header("Location: announcements.php");
    }
    else {
        echo "Missing important information";
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
<h1>Create new post</h1>

<form action="create.php" method="post">
    Title *<br>
    <input type="text" name="title"><br><br>
    Description *<br>
    <textarea name="description"></textarea><br><br>
    Date stamp *<br>
    <input type="date" name="date"><br><br>
    <input type="submit" value="Edit post">
</form>
</body>
</html>