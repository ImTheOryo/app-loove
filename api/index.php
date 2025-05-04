<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

use App\Controllers\UsersController;
use App\Core\Routeur;
use App\Kernel;

require 'src/Includes/Functions.php';
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv ::createImmutable(__DIR__);
$dotenv -> safeLoad();

$routeur = new Routeur();
$routeur -> addRoute(['POST'], '/login', UsersController::class, 'login');
$routeur -> addRoute(['GET'], '/users', UsersController::class, 'get_all_users', $_ENV['JWT_ADMIN_KEY']);

new Kernel($routeur);