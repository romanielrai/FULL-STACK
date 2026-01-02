<?php
require 'db.php';

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $student_id = trim($_POST['student_id']);
    $name = trim($_POST['name']);
    $password = $_POST['password'];

    // Basic validation
    if (empty($student_id) || empty($name) || empty($password)) {
        $error = "All fields are required!";
    } else {

        // Check if student_id already exists
        $check = $pdo->prepare("SELECT student_id FROM students WHERE student_id = :student_id");
        $check->execute([':student_id' => $student_id]);

        if ($check->rowCount() > 0) {
            $error = "Student ID already exists!";
        } else {

            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

            // Insert data
            $sql = "INSERT INTO students (student_id, name, password)
                    VALUES (:student_id, :name, :password)";
            $stmt = $pdo->prepare($sql);

            if ($stmt->execute([
                ':student_id' => $student_id,
                ':name' => $name,
                ':password' => $hashedPassword
            ])) {
                header("Location: login.php");
                exit();
            } else {
                $error = "Registration failed!";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>

<h2>Student Registration</h2>

<?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>

<form method="POST">
    Student ID: <input type="text" name="student_id" required><br><br>
    Name: <input type="text" name="name" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    <button type="submit">Register</button>
</form>

<a href="login.php">Already registered? Login</a>

</body>
</html>
