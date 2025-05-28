<?php

namespace App\Controllers;

use App\Repositories\ChatRepository;
class ChatController extends BaseController {
    private ChatRepository $repository;
    private string $pusher_cluster;
    private bool $pusher_use_tls;
    private string $pusher_key;
    private string $pusher_secret;

    private string $pusher_app_id;
    public function __construct() {
        $this->repository = new ChatRepository();
        $this->pusher_cluster = $_ENV['PUSHER_CLUSTER'];
        $this->pusher_key = $_ENV['PUSHER_KEY'];
        $this->pusher_secret = $_ENV['PUSHER_SECRET'];
        $this->pusher_use_tls = true;
    }

    public function get_match (int $user_id) {
        $this->repository->get_match($user_id);
    }

    public function get_chat (int $user_id_1, int $user_id_2) {
        $this->repository->get_chat($user_id_1, $user_id_2);
    }

    public function seen_messages (int $user_id_1, int $user_id_2) {
        $this->repository->seen_messages($user_id_1, $user_id_2);
    }

    public function send_message (int $user_id_1, int $user_id_2) {
        $message = clean_string($_POST['message']);
        $this->repository->send_message($user_id_1, $user_id_2, $message);
    }
}