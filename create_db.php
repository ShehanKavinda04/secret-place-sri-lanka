<?php
try {
    $dbh = new PDO('mysql:host=127.0.0.1', 'root', '');
    $dbh->exec('CREATE DATABASE IF NOT EXISTS secret_place');
    echo 'Database created successfully';
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
