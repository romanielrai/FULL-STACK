<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $student_id = $_POST['student_id'];
    $password = $_POST['password'];

    $sql = "SELECT password FROM students WHERE student_id = :student_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':student_id' => $student_id]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['logged_in'] = true;
        $_SESSION['student_id'] = $student_id;
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid Student ID or Password";
    }
}
?>

<form method="POST">
    Student ID: <input type="text" name="student_id" required><br>
    Password: <input type="password" name="password" required><br>
    <button type="submit">Login</button>
</form>
