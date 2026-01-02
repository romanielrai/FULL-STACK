<?php
include 'db.php';

if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];

    $stmt = $conn->prepare("INSERT INTO students (name, email, course) VALUES (:name, :email, :course)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':course', $course);

    if($stmt->execute()){
        echo "Student added successfully!<br>";
        echo "<a href='index.php'>Back to Student List</a>";
    } else {
        echo "Error adding student.";
    }
}
?>

<h2>Add New Student</h2>
<form method="post" action="">
    Name: <input type="text" name="name" required><br><br>
    Email: <input type="email" name="email" required><br><br>
    Course: <input type="text" name="course" required><br><br>
    <input type="submit" name="submit" value="Add Student">
</form>