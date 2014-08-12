<?php

include("../config.php");

if(isset($_SESSION['user'])){
    session_destroy();
}

header("Location: /aycmedia-test");