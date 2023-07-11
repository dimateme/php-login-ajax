<?php

//force the user to be logged in, or redirect.
function ForceLogin(){
    if(isset($_SESSION['user_id'])){
//        header("Location: login_a/dashboard.php?message=welcome"); exit;
        // The user is allowed here
    } else {
        // The user is not allowed here.
        header("Location: /login_a/index.php"); exit;
    }
}
function ForceDashboard(){
    if(isset($_SESSION['user_id'])){
        // The user is allowed here but redirect anyway
        header("Location: /login_a/dashboard.php?"); exit;

    } else {
        // The user is not allowed here.

    }
}
?>
