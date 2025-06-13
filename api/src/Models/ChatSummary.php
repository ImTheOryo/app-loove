<?php

namespace App\Models;

class ChatSummary {

    public function __construct(
        public int $user_id,
        public string $first_name,
        public string $image_name,
        public string | int $count_message,
    )
    {}
}