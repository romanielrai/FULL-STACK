<?php
require "header.php";
require "functions.php";

$message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $name = formatName($_POST["name"]);
        $email = $_POST["email"];
        $skillsString = $_POST["skills"];

        if (empty($name) || empty($email) || empty($skillsString)) {
            throw new Exception("All fields are required.");
        }

        if (!validateEmail($email)) {
            throw new Exception("Invalid email format.");
        }

        $skillsArray = cleanSkills($skillsString);
        saveStudent($name, $email, $skillsArray);

        $message = "Student saved successfully.";

    } catch (Exception $e) {
        $message = $e->getMessage();
    }
}
?>

<h3>Add Student Info</h3>

<p><?php echo $message; ?></p>

<form method="post">
    Name: <br>
    <input type="text" name="name"><br><br>

    Email: <br>
    <input type="text" name="email"><br><br>

    Skills (comma separated): <br>
    <input type="text" name="skills"><br><br>

    <button type="submit">Save Student</button>
</form>

<?php require "footer.php"; ?>