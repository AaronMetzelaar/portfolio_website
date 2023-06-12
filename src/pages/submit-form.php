<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $subject = "Portfolio Form Submission";
  $body = "Name: $name\n\nEmail: $email\n\nMessage: $message";
  $to = "aaronmetzelaar@gmail.com";

  $headers = "From: $name <$email>";
  $success = mail($to, $subject, $body, $headers);

  if ($success) {
    echo "Thank you for your submission!";
  } else {
    echo "Oops! An error occurred while sending the email.";
  }
}
?>