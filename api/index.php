<?php

$allowed_origins = [
    "https://harmony-api.dev",
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTION");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Token");
header("Access-Control-Allow-Credentials: true");



use App\Controllers\UsersController;
use App\Core\Routeur;
use App\Kernel;

require 'src/Includes/Functions.php';
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$routeur = new Routeur();

// Login / Register
$routeur->addRoute(['POST'], '/login', UsersController::class, 'login');

// Discovery [User]
$routeur->addRoute(['GET'], '/discovery/{user_id}', UsersController::class, 'get_discovery', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], '/like/{user_id}/{user_like}', UsersController::class, 'logout',  $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], '/skip/{user_id}/{user_like}', UsersController::class, 'logout',   $_ENV['JWT_USER_KEY']);

// Listing [Admin]
$routeur->addRoute(['GET'], '/users', UsersController::class, 'get_all_users', $_ENV['JWT_ADMIN_KEY']);

new Kernel($routeur);