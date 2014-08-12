<?php

include("../config.php");

if(!isset($_SESSION['user'])){
    header("Location: index.php");
}

if(!isset($_GET['id'])){
    die("No post has been supplied");
}

if(!empty($_POST)){

    if(!empty($_POST['title']) && !empty($_POST['description']) && !empty($_POST['date'])){
        mysqli_query($link,"UPDATE announcements SET title='".$_POST['title']."', description='".$_POST['description']."', datestamp='".$_POST['date']."' WHERE id=".$_GET['id']);
        header("Location: announcements.php");
    }
    else {
        echo "Missing important information";
    }

}

$query = mysqli_query($link,"SELECT * FROM announcements WHERE id=".$_GET['id']);
$result = mysqli_fetch_row($query);

?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Admin</title>
</head>
<body>
<h1>Edit post number <?php echo $result[0]; ?></h1>

<form action="edit.php?id=<?php echo $result[0]; ?>" method="post">
    Title *<br>
    <input type="text" name="title" value="<?php echo $result[1] ?>"><br><br>
    Description *<br>
    <textarea name="description"><?php echo $result[2] ?></textarea><br><br>
    Date stamp *<br>
    <input type="date" name="date" value="<?php echo $result[3] ?>"><br><br>
    <input type="submit" value="Edit post">
</form>
</body>
</html>