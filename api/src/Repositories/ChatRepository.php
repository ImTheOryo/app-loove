<?php

namespace App\Repositories;

use App\Models\ChatMessage;
use App\Models\ChatSummary;
use Pusher\Pusher;
class ChatRepository extends BaseRepository{

    public function get_match (int $user_id) {
        $result = [];

        $match = $this
            ->query("SELECT CASE WHEN user_id_1 = :user_id THEN user_id_2 ELSE user_id_1 END AS other_user_id, chat_id AS chat_room_id FROM `likes` WHERE (user_id_2 = :user_id OR user_id_1 = :user_id) AND is_match = 1;")
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
                ->query("SELECT count(*) AS `message_unseen` FROM messages WHERE id_sender != :user_id AND chat_room_id = :chat_room_id AND seen = 0")
                ->fetch(["user_id" => $user_id,  "chat_room_id" => $item['chat_room_id']])
            ;

            $count_message_unseen = $count_message_unseen["message_unseen"] > 9 ? "9+" : $count_message_unseen["message_unseen"];
            $result[] = new ChatSummary($item["other_user_id"], $user_name["first_name"], $user_image["image_name"], $count_message_unseen);
        }

        response_json(200, $result);
    }

    public function get_chatroom (int $user_id_1, int $user_id_2) {
        $match = $this
            ->query("SELECT chat_id AS chat_room_id FROM likes WHERE ((user_id_1 = :user_id_1 AND user_id_2 = :user_id_2) OR (user_id_1 = :user_id_2 AND user_id_2 = :user_id_1)) AND is_match = 1;")
            ->fetch(["user_id_1" => $user_id_1,  "user_id_2" => $user_id_2])
        ;

        response_json(200, $match);
    }
    public function get_chat (string $chat_room_id) {
        $result = [];

        $users = $this
            ->query("SELECT user_id_1, user_id_2 FROM likes WHERE chat_id = :chat_id")
            ->fetch(["chat_id" => $chat_room_id])
        ;

        $messages = $this
            ->query("SELECT id_sender, message, time, seen FROM messages WHERE chat_room_id = :chat_room_id")
            ->fetchAll(["chat_room_id" => $chat_room_id])
        ;

        $image_1 = $this
            ->query("SELECT image_name FROM image WHERE user_id = :user_id AND image_primary = 1")
            ->fetch(["user_id" => $users["user_id_1"]])
        ;

        $first_name_1 = $this
            ->query("SELECT first_name FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $users["user_id_1"]])
        ;

        $first_name_2 = $this
            ->query("SELECT first_name FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $users["user_id_2"]])
        ;

        $image_2 = $this
            ->query("SELECT image_name FROM image WHERE user_id = :user_id AND image_primary = 1")
            ->fetch(["user_id" => $users["user_id_2"]])
        ;


        $result["avatar"] = ["avatar_user_". $users["user_id_1"] => $image_1["image_name"], "avatar_user_" . $users["user_id_2"] => $image_2["image_name"]];
        $result["name"] = ["first_name_" . $users["user_id_1"] => $first_name_1['first_name'], "first_name_" . $users["user_id_2"] => $first_name_2['first_name']];
        !isset($messages) ? response_json(204) : null;
        foreach ($messages as $message) {
            $result["messages"][] = new ChatMessage($message["id_sender"],  $message["message"], $message["time"], $message["seen"]);
        }
        response_json(200, $result);
    }

    public function seen_messages (string $chat_room_id, int $user_id_sender) {
        $this
            ->query("UPDATE messages SET seen = 1 WHERE chat_room_id = :chat_room_id AND id_sender = :user_id")
            ->execute(["chat_room_id" => $chat_room_id, "user_id" => $user_id_sender])
        ;
        response_json(200);
    }

    public function send_message (string $chat_room_id, int $user_sender, string $message) {

        $options = array(
            'cluster' => 'eu',
            'useTLS' => true
        );
        $pusher = new Pusher(
            'eb2dcd14b6f9f622e656',
            'b8a91e025f95545e5285',
            '1999255',
            $options
        );

        $data = ['message'=> $message];
        $pusher->trigger($chat_room_id, 'message', $data);


        $time = date("H:i");
        $this
            ->query("INSERT INTO messages (chat_room_id, id_sender, message, time) VALUES (:chat_room_id, :id_sender, :message, :time) ")
            ->execute(["chat_room_id" => $chat_room_id, "id_sender" => $user_sender, "message" => $message,  "time" => $time])
        ;
        response_json(200);
    }
}