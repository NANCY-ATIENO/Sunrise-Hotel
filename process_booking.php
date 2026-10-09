<?php
$roomRates = [
    "single" => 3500,
    "double" => 5000,
    "family" => 7500
];
$breakfastRate = 700;
$transferRate = 2000;


$fullname   = trim($_POST['fullname'] ?? "");
$id_number  = trim($_POST['id_number'] ?? "");
$email      = trim($_POST['email'] ?? "");
$phone      = trim($_POST['phone'] ?? "");
$checkin    = $_POST['checkin'] ?? "";
$nights     = intval($_POST['nights'] ?? 0);
$room_type  = $_POST['room_type'] ?? "";
$guests     = intval($_POST['guests'] ?? 0);
$breakfast  = $_POST['breakfast'] ?? "no";
$transfer   = isset($_POST['transfer']) ? "yes" : "no";

$errors = [];
if ($fullname === "") $errors[] = "Full name is required.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email format.";
if (!preg_match("/^\d{10}$/", $phone)) $errors[] = "Phone must be exactly 10 digits.";
if ($nights < 1 || $nights > 14) $errors[] = "Nights must be between 1 and 14.";
if ($guests < 1) $errors[] = "Guests must be greater than zero.";
if (!array_key_exists($room_type, $roomRates)) $errors[] = "Invalid room type selected.";


if (!empty($errors)) {
    echo "<h2>Booking Error</h2><ul>";
    foreach ($errors as $err) {
        echo "<li>$err</li>";
    }
    echo "</ul><p><a href='booking.html'>Go back to booking form</a></p>";
    exit;
}


$total = 0;
$total += $roomRates[$room_type] * $nights;
if ($breakfast === "yes") {
    $total += $breakfastRate * $guests * $nights;
}
if ($transfer === "yes") {
    $total += $transferRate;
}


echo "<h2>BOOKING CONFIRMED</h2>";
echo "<p>Customer: $fullname</p>";
echo "<p>ID/Passport: $id_number</p>";
echo "<p>Email: $email</p>";
echo "<p>Phone: $phone</p>";
echo "<p>Check-in Date: $checkin</p>";
echo "<p>Room: " . ucfirst($room_type) . " Room</p>";
echo "<p>Guests: $guests</p>";
echo "<p>Number of Nights: $nights</p>";
echo "<p>Breakfast: " . ucfirst($breakfast) . "</p>";
echo "<p>Airport Transfer: " . ucfirst($transfer) . "</p>";
echo "<h3>TOTAL AMOUNT: KSh " . number_format($total) . "</h3>";
echo "<p>Thank you for choosing Sunrise Hotel.</p>";
?>
