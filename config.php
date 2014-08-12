<?php

session_start();

$config['DB']['server'] = "localhost";
$config['DB']['username'] = "root";
$config['DB']['password'] = "";
$config['DB']['database'] = "aycmedia-test";

$link = mysqli_connect($config['DB']['server'],$config['DB']['username'],$config['DB']['password'],$config['DB']['database']);

if($link==FALSE)
{
    die(mysqli_connect_error());
}
mysqli_set_charset($link,"utf8");
