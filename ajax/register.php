<?php
// Allow the config
define('__CONFIG__', true);

// Require the config
require_once "../inc/config.php";

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Always return JSON format
    header('Content-Type: application/json');

    $return = [];
    $email =Filter::String($_POST['email']);
//    $email = $_POST['email'];


    // Make sure the user does not exist.
    $findUser = $con->prepare("SELECT user_id FROM users WHERE email = LOWER(:email) LIMIT 1");
    $findUser->bindParam(':email', $email, PDO::PARAM_STR);
    $findUser->execute();

    // Make sure the user CAN be added AND is added
    if($findUser->rowCount()==1){
        // User exists
        // We can also check to see if they are able to log in.
        $return['error'] = "You already have an account";
        $return['is_logged_in'] = false;
    } else {
        // User does not exist, add them now.
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

        $addUser = $con->prepare("INSERT INTO users(email, password) VALUES(LOWER(:email), :password)");
        $addUser->bindParam(':email', $email, PDO::PARAM_STR);
        $addUser->bindParam(':password', $password, PDO::PARAM_STR);
        $addUser->execute();

        $user_id = $con->lastInsertId();

        $_SESSION['user_id'] = (int) $user_id;

        // Return the proper information back to JavaScript to redirect us.

        $return['redirect'] = 'login_a/dashboard.php?message=welcome';
        $return['is_logged_in'] = true;
    }

    // Return the proper information back to JavaScrit to redirect us.

//    $return['redirect'] = 'login_a/index.php';

    echo json_encode($return, JSON_PRETTY_PRINT); exit;
    } else {
        // Die. Kill the script. Redirect the user. Do something regardless.
        exit('INVALID URL');
    }
?>