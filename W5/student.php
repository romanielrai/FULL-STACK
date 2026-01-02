<?php
require "header.php";

if (file_exists("students.txt")) {
    $lines = file("students.txt");
} else {
    $lines = [];
}
?>

<h3>Students List</h3>

<?php
if (empty($lines)) {
    echo "No students found.";
} else {
    echo "<ul>";
    foreach ($lines as $line) {
        list($name, $email, $skills) = explode(",", $line);
        echo "<li>";
        echo "<strong>Name:</strong> $name <br>";
        echo "<strong>Email:</strong> $email <br>";
        echo "<strong>Skills:</strong> $skills";
        echo "</li><br>";
    }
    echo "</ul>";
}
?>

<?php require "footer.php"; ?>