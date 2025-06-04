<?php

namespace App\Controllers;

use App\Repositories\ChatRepository;
class ChatController extends BaseController {
    private ChatRepository $repository;
    public function __construct() {
        $this->repository = new ChatRepository();
    }

    public function get_match (int $user_id) {
        $this->repository->get_match($user_id);
    }

    public function get_chatroom (int $user_id_1, int $user_id_2) {
        $this->repository->get_chatroom($user_id_1, $user_id_2);
    }

    public function get_chat (string $chat_room_id) {
        $this->repository->get_chat($chat_room_id);
    }

    public function seen_messages (string $chat_room_id, int $user_id_sender) {
        $this->repository->seen_messages($chat_room_id, $user_id_sender);
    }

    public function send_message (string $chat_room_id, int $user_sender) {
        $message =file_get_contents("php://input");
        $this->repository->send_message($chat_room_id, $user_sender, $message);
    }
}