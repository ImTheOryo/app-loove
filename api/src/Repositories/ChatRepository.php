<?php

namespace App\Repositories;

use App\Models\ChatMessage;
use App\Models\ChatSummary;

class ChatRepository extends BaseRepository{

    public function get_match (int $user_id) {
        $result = [];

        $match = $this
            ->query("SELECT CASE WHEN user_id_1 = :user_id THEN user_id_2 ELSE user_id_1 END AS other_user_id FROM `likes` WHERE (user_id_2 = :user_id OR user_id_1 = :user_id) AND is_match = 1;")
            ->fetchAll(["user_id" => $user_id])
        ;

        empty($match) ? response_json(204) : null;

        foreach ($match as $item) {

            $user_image = $this
                ->query("SELECT `image_name` FROM image WHERE user_id = :user_id AND image_primary = 1")
                ->fetch(["user_id" => $item['other_user_id']])
            ;

            $user_name = $this
                ->query("SELECT `first_name` FROM user WHERE id = :user_id")
                ->fetch(["user_id" => $item['other_user_id']])
            ;

            $count_message_unseen = $this
                ->query("SELECT count(*) AS `message_unseen` FROM messages WHERE user_id_send_to = :user_id AND user_id_sender = :user_id_sender AND seen = 0")
                ->fetch(["user_id" => $user_id,  "user_id_sender" => $item['other_user_id']])
            ;

            $count_message_unseen = $count_message_unseen["message_unseen"] > 9 ? "9+" : $count_message_unseen["message_unseen"];
            $result[] = new ChatSummary($item["other_user_id"], $user_name["first_name"], $user_image["image_name"], $count_message_unseen);
        }

        response_json(200, $result);
    }

    public function get_chat (int $user_id_1,  int $user_id_2) {
        $result = [];
        $messages = $this
            ->query("SELECT user_id_sender, user_id_send_to, message, time, seen FROM messages WHERE user_id_send_to = :user_id_1 AND user_id_sender = :user_id_2 OR user_id_send_to = :user_id_2 AND user_id_sender = :user_id_1")
            ->fetchAll(["user_id_1" => $user_id_1, "user_id_2" => $user_id_2])
        ;

        $image_1 = $this
            ->query("SELECT image_name FROM image WHERE user_id = :user_id AND image_primary = 1")
            ->fetch(["user_id" => $user_id_1])
        ;

        $image_2 = $this
            ->query("SELECT image_name FROM image WHERE user_id = :user_id AND image_primary = 1")
            ->fetch(["user_id" => $user_id_2])
        ;

        $name = $this
            ->query("SELECT `first_name` FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $user_id_2])
        ;

        $result[] = $image_1["image_name"];
        $result[] = $image_2["image_name"];
        $result[] = $name["first_name"];
        !isset($messages) ? response_json(204) : null;
        foreach ($messages as $message) {
            $result[] = new ChatMessage($message["user_id_sender"],  $message["user_id_send_to"], $name["first_name"], $message["message"], $message["time"], $message["seen"]);
        }
        response_json(200, $result);
    }

    public function seen_messages (int $user_id_1, int $user_id_2) {
        $this
            ->query("UPDATE messages SET seen = 1 WHERE user_id_send_to = :user_1 AND user_id_sender = :user_2")
            ->execute(["user_1" => $user_id_1, "user_2" => $user_id_2])
        ;
        response_json(200);
    }

    public function send_message (int $user_id_1, int $user_id_2, string $message) {
        $time = date("H:i:s");
        $this
            ->query("INSERT INTO messages (user_id_sender, user_id_send_to, message, time) VALUES (:user_id_1, :user_id_2, :message, :time) ")
            ->execute(["user_id_1" => $user_id_1, "user_id_2" => $user_id_2, "message" => $message,  "time" => $time])
        ;
        response_json(200);
    }
}