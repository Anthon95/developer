<?php

include("../config.php");

if(!isset($_SESSION['user'])){
    header("Location: index.php");
}

if(!isset($_GET['id'])){
    die("No post has been supplied");
}

mysqli_query($link,"DELETE FROM announcements WHERE id = ".$_GET['id']);
header("Location: announcements.php");