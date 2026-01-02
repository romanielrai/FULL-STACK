<?php
include 'db.php';

if(isset($_GET['id'])){
    $id = $_GET['id'];

    // Fetch student data
    $stmt = $conn->prepare("SELECT * FROM students WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $student = $stmt->fetch(PDO::FETCH_ASSOC);
}

if(isset($_POST['update'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $course = $_POST['course'];

    $stmt = $conn->prepare("UPDATE students SET name=:name, email=:email, course=:course WHERE id=:id");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':course', $course);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        header("Location: index.php");
    } else {
        echo "Error updating student.";
    }
}
?>

<h2>Edit Student</h2>
<form method="post" action="">
    Name: <input type="text" name="name" value="<?php echo $student['name']; ?>" required><br><br>
    Email: <input type="email" name="email" value="<?php echo $student['email']; ?>" required><br><br>
    Course: <input type="text" name="course" value="<?php echo $student['course']; ?>" required><br><br>
    <input type="submit" name="update" value="Update Student">
</form>