<?php

session_start();

$config['DB']['server'] = "localhost";
$config['DB']['username'] = "develop";
$config['DB']['password'] = "v7yJ5I3Gzv8T";
$config['DB']['database'] = "develop";

$link = mysqli_connect($config['DB']['server'],$config['DB']['username'],$config['DB']['password'],$config['DB']['database']);

if($link==FALSE)
{
    die(mysqli_connect_error());
}
mysqli_set_charset($link,"utf8");
