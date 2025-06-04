<?php

namespace App\Models;

class ChatMessage {

    public function __construct(
        public int $id_sender,
        public string $message,
        public string $date,
        public int $seen
    )
    {
    }
}