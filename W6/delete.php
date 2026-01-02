<?php
include 'db.php';

if(isset($_GET['id'])){
    $id = $_GET['id'];

    $stmt = $conn->prepare("DELETE FROM students WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Student deleted successfully!<br>";
        echo "<a href='index.php'>Back to Student List</a>";
    } else {
        echo "Error deleting student.";
    }
} else {
    echo "No student ID provided.";
}
?>