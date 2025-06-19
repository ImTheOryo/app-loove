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


use App\Controllers\AdminController;
use App\Controllers\ProfileController;
use App\Controllers\RegisterController;
use App\Controllers\SubscriptionController;
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

// Admin side [Admin]
$routeur->addRoute(['GET'], "/users", UsersController::class, 'get_all_users', $_ENV['JWT_ADMIN_KEY']);
$routeur->addRoute(['GET'], "/admin/{admin_id}", AdminController::class, 'get_admin', $_ENV['JWT_ADMIN_KEY']);
$routeur->addRoute(['GET'], "/reports", ReportController::class, 'get_all_reports', $_ENV['JWT_ADMIN_KEY']);
$routeur->addRoute(['GET'], "/report/{report_id}", ReportController::class, 'get_report', $_ENV['JWT_ADMIN_KEY']);
$routeur->addRoute(['GET'], "/dashboard", AdminController::class, 'get_dashboard', $_ENV['JWT_ADMIN_KEY']);

// Login [All]
$routeur->addRoute(['POST'], "/login", UsersController::class, 'login');

// Register [All]
$routeur->addRoute(['POST'], "/register/mail", RegisterController::class, 'register_mail');
$routeur->addRoute(['POST'], "/register/verify", RegisterController::class, 'verify_mail');
$routeur->addRoute(['POST'], "/register/password", RegisterController::class, 'register_password');
$routeur->addRoute(['POST'], "/register/infos", RegisterController::class, 'register_infos');
$routeur->addRoute(['POST'], "/register/gender", RegisterController::class, 'register_gender');
$routeur->addRoute(['POST'], "/register/looking", RegisterController::class, 'register_looking');
$routeur->addRoute(['POST'], "/register/relation", RegisterController::class, 'register_relation');
$routeur->addRoute(['POST'], "/register/images", RegisterController::class, 'register_images');
$routeur->addRoute(['POST'], "/register/biography", RegisterController::class, 'register_biography');

// Discovery [User]
$routeur->addRoute(['GET'], "/discovery/{user_id}", DiscoveryController::class, 'get_discovery', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/like/{user_id}/{user_like}", DiscoveryController::class, 'like_user',  $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/skip/{user_id}/{user_skip}", DiscoveryController::class, 'skip_user',   $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/message/{user_id}/{user_send_to}", DiscoveryController::class, 'message_user',  $_ENV['JWT_USER_KEY']);

// Filter [User]
$routeur->addRoute(['GET'], "/filter/{user_id}", DiscoveryController::class, 'get_filter',  $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/filter/{user_id}", DiscoveryController::class, 'update_filter',  $_ENV['JWT_USER_KEY']);

// See Who Like [User]
$routeur->addRoute(['GET'], "/likes/{user_id}", DiscoveryController::class, 'get_likes', $_ENV['JWT_USER_KEY']);

// Localisation [User]
$routeur->addRoute(["POST"], "/localisation", UsersController::class, 'set_localisation', $_ENV['JWT_USER_KEY']);

// Chat [User]
$routeur->addRoute(['GET'], "/match/{user_id}",ChatController::class,'get_match', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/chatroom/{user_id_1}/{user_id_2}", ChatController::class,'get_chatroom', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/chat/{chat_room_id}", ChatController::class,'get_chat', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/chat/{chat_room_id}/{user_id_sender}", ChatController::class,'seen_messages', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/chat/{chat_room_id}/{user_sender}", ChatController::class,'send_message', $_ENV['JWT_USER_KEY']);

// Report [User]
$routeur->addRoute(['GET'], "/reason", ReportController::class, 'get_report_reason', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['POST'], "/report/{user_reporter_id}/{user_reported_id}", ReportController::class, 'report_user', $_ENV['JWT_USER_KEY']);

// Profile [User]
$routeur->addRoute(['GET'], "/profile/{user_id}", ProfileController::class, 'get_user', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/profile/extended/{user_id}", ProfileController::class, 'get_user_infos', $_ENV['JWT_USER_KEY']);

// Profile Bio [User]
$routeur->addRoute(['GET'], "/biography/{user_id}", ProfileController::class, 'get_biography', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/biography/{user_id}", ProfileController::class, 'update_biography', $_ENV['JWT_USER_KEY']);

// Profile Hobbies [User]
$routeur->addRoute(['GET'], "/hobbies", ProfileController::class, 'get_hobbies', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/hobby/{user_id}",  ProfileController::class, 'get_hobby', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/hobby/{user_id}/{hobby_id}", ProfileController::class, 'update_hobby', $_ENV['JWT_USER_KEY']);

// Profile Musics [All]
$routeur->addRoute(['GET'], "/musics/{user_id}", ProfileController::class, 'get_musics');
$routeur->addRoute(['DELETE'], "/music/{qa_id}",  ProfileController::class, 'delete_music');
$routeur->addRoute(['GET'], "/questions", ProfileController::class, 'get_questions');
$routeur->addRoute(['GET'], "/music/title/{title}", ProfileController::class, 'get_music_title');
$routeur->addRoute(['POST'], "/music/{user_id}", ProfileController::class, 'add_music');

// Profile General Infos [User]
$routeur->addRoute(['GET'], "/gender/{user_id}", ProfileController::class, 'get_gender', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/gender/{user_id}/{gender_id}", ProfileController::class, 'update_gender', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['GET'], "/relation/{user_id}", ProfileController::class, 'get_relation', $_ENV['JWT_USER_KEY']);
$routeur->addRoute(['PATCH'], "/relation/{user_id}/{relation_id}",  ProfileController::class, 'update_relation', $_ENV['JWT_USER_KEY']);

// Subscription [User]
$routeur->addRoute(['POST'], "/subscription", SubscriptionController::class, 'subscribe_user', $_ENV['JWT_USER_KEY']);

new Kernel($routeur);