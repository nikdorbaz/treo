<?php

if (empty($_POST) || $_POST['name'] === ''|| $_POST['firma'] === ''|| $_POST['email'] === '') {
    header("HTTP/1.0 400");
    exit;
}

require_once 'vendor/autoload.php';

use Zend\Mail\Message;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions;

function genMailBody($post)
{
    $formName = $post['name'];
    $formFirm = $post['firma'];
    $formEmail = $post['email'];
    $formPhone = $post['phone'];
    $formPackage = $post['package'];
    $formStorage = $post['storage'];
    $formComment = $post['comment'];

    $mailBody = "Name: {$formName}<br>Firmenname: {$formFirm}<br>E-Mail: {$formEmail}";

    if ($formPhone !== "") {
        $mailBody .= "<br>Telefon: {$formPhone}";
    }

    $mailBody .= "<br>Paket: {$formPackage}<br>Kapazität: {$formStorage}";

    if ($formComment !== "") {
        $mailBody .= "<br>Kommentar: {$formComment}";
    }

    return $mailBody;
}

$mailServer = '';
$mailUsername = '';
$mailPassword = '';
$mailTo = '';


$mailSubject = "Anfrage von treo24.cloud";
$mailBody = genMailBody($_POST);


$message = new Message();
$message->addFrom($mailUsername);
$message->addTo($mailTo);
$message->setSubject($mailSubject);
$message->setBody($mailBody);

$headers = $message->getHeaders();
$headers->removeHeader('Content-Type');
$headers->addHeaderLine('Content-Type', 'text/html; charset=UTF-8');

$transport = new SmtpTransport();
$options   = new SmtpOptions([
    'name'              => $mailServer,
    'host'              => $mailServer,
    'connection_class'  => 'login',
    'connection_config' => [
        'username' => $mailUsername,
        'password' => $mailPassword,
    ],
]);
$transport->setOptions($options);
$transport->send($message);
