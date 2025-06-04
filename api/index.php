<?php
date_default_timezone_set("Europe/Paris");

$allowed_origins = [
    "https://harmony-api.dev"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Vary: Origin");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTION");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Token");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


use App\Controllers\ProfileController;
use App\Controllers\UsersController;
use App\Controllers\DiscoveryController;
use App\Controllers\ChatController;
use App\Controllers\ReportController;
use App\Core\Routeur;
use App\Kernel;

require 'src/Includes/Functions.php';
require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$routeur = new Routeur();

// Login / Register [All]
$routeur->addRoute(['POST'], "/login", UsersController::class, 'login');

// Discovery [User]
$routeur->addRoute(['GET'], "/discovery/{user_id}", DiscoveryController::class, 'get_discovery', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/like/{user_id}/{user_like}", DiscoveryController::class, 'like_user',  $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/skip/{user_id}/{user_skip}", UsersController::class, 'skip_user',   $_ENV['JWT_USER_KEY']);



// See Who Like [User]
$routeur->addRoute(['GET'], "/likes/{user_id}", DiscoveryController::class, 'get_likes', $_ENV['JWT_USER_KEY']);

// Chat [User]
$routeur->addRoute(['GET'], "/match/{user_id}",ChatController::class,'get_match', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/chatroom/{user_id_1}/{user_id_2}", ChatController::class,'get_chatroom', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/chat/{chat_room_id}", ChatController::class,'get_chat', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/chat/{chat_room_id}/{user_id_sender}", ChatController::class,'seen_messages', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/chat/{chat_room_id}/{user_sender}", ChatController::class,'send_message', $_ENV['JWT_USER_KEY']);

// Report [User]
$routeur->addRoute(['GET'], "/reason", ReportController::class, 'get_report_reason', $_ENV['JWT_USER_KEY']);

// Profile [User]
$routeur->addRoute(['GET'], "/profile/{user_id}", ProfileController::class, 'get_user', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/profile/extended/{user_id}", ProfileController::class, 'get_user_infos', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/biography/{user_id}", ProfileController::class, 'get_biography', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/biography/{user_id}", ProfileController::class, 'update_biography', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/hobbies", ProfileController::class, 'get_hobbies', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/hobby/{user_id}",  ProfileController::class, 'get_hobby', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/hobby/{user_id}/{hobby_id}", ProfileController::class, 'update_hobby', $_ENV['JWT_USER_KEY']);

// Listing [Admin]
$routeur->addRoute(['GET'], '/users', UsersController::class, 'get_all_users', $_ENV['JWT_ADMIN_KEY']);

new Kernel($routeur);