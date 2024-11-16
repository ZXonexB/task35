<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'task35';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM contacts ORDER BY id ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$pdo = null;
?>