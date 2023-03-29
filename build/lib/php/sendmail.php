<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$titleMail = "Заявка с сайта intercont.ae";
$nameSender = "Ваш сайт intercont.ae";
$mailSender = "office@intercont.ae ";
$redirect = "https://intercont.ae/success.html";

$title = $titleMail;

// $file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = $titleMail;
foreach ($_POST as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid; width: 200px;'>&nbsp;$key:&nbsp;</td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>&nbsp;$value&nbsp;&nbsp;</b></td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  // $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  // $mail->SMTPAuth   = true;

  // Настройки вашей почты
  // $mail->Host       = ''; // SMTP сервера вашей почты
  // $mail->Username   = ''; // Логин на почте
  // $mail->Password   = ''; // Пароль на почте
  // $mail->SMTPSecure = 'ssl';
  // $mail->Port       = 25;

  $mail->setFrom($mailSender, $nameSender); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress($mailSender, $nameSender);

  // Прикрипление файлов к письму
  // if (!empty($file['name'][0])) {
  //   for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
  //     $filename = $file['name'][$ct];
  //     if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
  //       $mail->addAttachment($uploadfile, $filename);
  //       $rfile[] = "Файл $filename прикреплён";
  //     } else {
  //       $rfile[] = "Не удалось прикрепить файл $filename";
  //     }
  //   }
  // }

  // Отправка сообщения
  $mail->isHTML(true);
  // $mail->Subject = $title;
  $mail->Subject = 'Contact form: ' . $_POST['Name'];
  $mail->Body = $body;

  $mail->send();
  header("Location: $redirect");
  exit();
} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}