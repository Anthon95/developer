<?php

include("../config.php");

if(!isset($_SESSION['user'])){
    header("Location: index.php");
}

$query = mysqli_query($link,"SELECT id, title FROM announcements ");
$result = mysqli_fetch_all($query);

?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Admin</title>
</head>
<body>
<h1>Your announcements</h1>
<ul>
    <?php foreach($result as $announcement){ ?>
        <li><a href="edit.php?id=<?php echo $announcement[0]; ?>"><?php echo $announcement[1]; ?></a> <button onClick="if(confirm('Please confirm choice')){window.location='delete.php?id=<?php echo $announcement[0]; ?>'}">Delete post</button> </li>
    <?php } ?>
</ul>
<a href="create.php">Create new post</a>&nbsp;<a href="logout.php">Logout</a>
</body>
</html>