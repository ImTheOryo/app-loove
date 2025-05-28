<?php

namespace App\Models;

class ChatMessage {

    public function __construct(
        public int $id_sender,
        public int $id_receiver,
        public string $other_user_name,
        public string $message,
        public string $date,
        public int $seen
    )
    {
    }
}