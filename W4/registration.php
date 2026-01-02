<?php
// initialize the error array
$errors = [];
$values = [];

// password validation regex
$password_pattern = '/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/';

// Handle submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $values['name'] = trim($_POST['name'] ?? '');
    $values['email'] = trim($_POST['email'] ?? '');
    $values['address'] = trim($_POST['address'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validation
    if ($values['name'] === '') {
        $errors['name'] = "Name is required";
    }

    if ($values['email'] === '') {
        $errors['email'] = "Email is required";
    } elseif (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format";
    }

    if ($values['address'] === '') {
        $errors['address'] = "Address is required";
    }

    if ($password === '') {
        $errors['password'] = "Password is required";
    } elseif (!preg_match($password_pattern, $password)) {
        $errors['password'] = "Password must contain at least 8 characters, including a number and a special character";
    }

    // If no errors, save to JSON
    if (empty($errors)) {
        $users_file = 'users.json';

        if (!file_exists($users_file)) {
            file_put_contents($users_file, json_encode([]));
        }

        $users_data = file_get_contents($users_file);
        $users_array = json_decode($users_data, true);
        if ($users_array === null) $users_array = [];

        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        $new_user = [
            'name' => $values['name'],
            'email' => $values['email'],
            'address' => $values['address'],
            'password' => $password_hash
        ];
        $users_array[] = $new_user;

        if (file_put_contents($users_file, json_encode($users_array, JSON_PRETTY_PRINT))) {
            echo "Registration successful!";
        } else {
            echo "Error: Could not save user data.";
        }
        exit;
    } else {
        foreach ($errors as $field => $error_message) {
            echo "<p>$error_message</p>";
        }
    }

} else {
    echo "Invalid request method.";
}
?>