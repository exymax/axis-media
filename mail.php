<?php
require_once 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$resultData = [];
$validationRules = [
    'email' => function ($email) {
        return true;
    },
    'company' => function ($company) {
        return true;
    },
    'fullname' => function ($fullname) {
        return true;
    },
    'phone' => function ($phone) {
        return true;
    },
];

function isMailDataValid($data, $validationRules) {
    if (array_intersect_key($validationRules, $data) === array_keys($validationRules)) {
        foreach (array_keys($validationRules) as $field) {
            if (!$validationRules[$field]($data[$field])) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

if (isset($_POST['send_mail']) && isMailDataValid($_POST, $validationRules)) {
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 2;
        $mail->isSMTP();
        $mail->Host = 'smtp1.example.com;smtp2.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'user@example.com';
        $mail->Password = 'secret';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress('joe@example.net', 'Joe User');
        $mail->addAddress('ellen@example.com');
        $mail->addReplyTo('info@example.com', 'Information');
        $mail->addCC('cc@example.com');
        $mail->addBCC('bcc@example.com');

        //Content
        $mail->isHTML();
        $mail->Subject = 'Here is the subject';
        $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {

    }
    $resultData['result'] = true;
} else {
    $resultData['result'] = false;
}

echo json_encode($resultData);