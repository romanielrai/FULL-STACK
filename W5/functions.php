<?php

// Format name properly (capitalize words)
function formatName($name) {
    return ucwords(strtolower(trim($name)));
}

// Check if email is valid
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Clean skills string and convert to array
function cleanSkills($string) {
    $string = trim($string);
    $skills = explode(",", $string);
    return array_map("trim", $skills);
}

// Save student info to file
function saveStudent($name, $email, $skillsArray) {
    $skills = implode(" | ", $skillsArray);
    $data = $name . "," . $email . "," . $skills . PHP_EOL;

    file_put_contents("students.txt", $data, FILE_APPEND);
}

// Handle file upload safely
function uploadPortfolioFile($file) {
    $allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    $maxSize = 2 * 1024 * 1024; // 2MB

    if ($file["error"] !== 0) {
        throw new Exception("File upload error.");
    }

    if (!in_array($file["type"], $allowedTypes)) {
        throw new Exception("Invalid file type.");
    }

    if ($file["size"] > $maxSize) {
        throw new Exception("File size exceeds 2MB.");
    }

    $ext = pathinfo($file["name"], PATHINFO_EXTENSION);
    $newName = "portfolio_" . time() . "." . $ext;

    if (!move_uploaded_file($file["tmp_name"], "uploads/" . $newName)) {
        throw new Exception("Failed to move uploaded file.");
    }

    return $newName;
}