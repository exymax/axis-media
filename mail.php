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
        $mail->Host = 'smtp.gmail.com	';
        $mail->SMTPAuth = true;
        $mail->Username = 'exymax@gmail.com';
        $mail->Password = 'techsingulariop123';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        //Recipients
        $mail->setFrom($_POST['email'], $_POST['fullname']);
        $mail->addAddress('praxis.media.studio@gmail.com');
        $mail->addCC('cc@example.com');

        //Content
        $mail->isHTML();
        $mail->Subject = 'Сообщение с сайта';
        $mail->Body    = 'Поступило сообщение от';
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