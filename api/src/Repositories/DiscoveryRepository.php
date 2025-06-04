<?php

namespace App\Repositories;

class DiscoveryRepository extends BaseRepository{

    public function get_discovery (int $id): void {

        $result = [];

        $users = $this
            ->query("
                    SELECT u.id, u.first_name, u.age, u.current
                    FROM user u
                             LEFT JOIN likes l1 ON u.id = l1.user_id_2 AND l1.user_id_1 = :user_id
                             LEFT JOIN likes l2 ON u.id = l2.user_id_1 AND l2.user_id_2 = :user_id
                    WHERE u.id != :user_id
                      AND (l1.id IS NULL OR l1.is_match = 0)
                      AND (l2.id IS NULL OR l2.is_match = 0)")
            ->fetchAll(['user_id' => $id])
        ;

        empty($users) ? response_json(204) : null;

        foreach ($users as $user) {

            $image = $this
                ->query("SELECT image_name FROM image WHERE user_id = :id AND image_primary = 1")
                ->fetchAll(['id' => $user['id']])
            ;

            $result[] = [
                'infos' => $user,
                'image' => $image,
            ];
        }

        response_json(200, $result);
    }

    public function like_user (int $user_id, int $user_like): void{

        $count = $this
            ->query("SELECT SUM(CASE WHEN user_1_skip = 0 THEN 1 ELSE 0 END) AS already_like, SUM(CASE WHEN user_1_skip = 1 THEN 1 ELSE 0 END) AS already_skip FROM `likes` WHERE user_id_1 = :user_id_1 AND user_id_2 = :user_id_2;")
            ->fetch(['user_id_1' => $user_like, 'user_id_2' => $user_id])
        ;

        if ($count["already_like"] == 0 && $count["already_skip"] == 0) {

            $this
                ->query("INSERT INTO `likes` (user_id_1, user_id_2) VALUES (:user_id_1, :user_id_2)")
                ->execute(['user_id_1' => $user_id,  'user_id_2' => $user_like])
            ;
        }
        else if ($count['already_like'] > 0){
            $chat_id = uniqid();
            $this
                ->query("UPDATE `likes` SET is_match = 1, chat_id = :chat_id WHERE user_id_1 = :user_id_1 AND user_id_2 = :user_id_2")
                ->execute(['user_id_1' => $user_like, 'user_id_2' => $user_id,  'chat_id' => $chat_id])
            ;
        }
    }

    public function skip_user (int $user_id, int $user_like): void
    {
        $count = $this
            ->query("SELECT SUM(CASE WHEN user_1_skip = 0 THEN 1 ELSE 0 END) AS already_like, SUM(CASE WHEN user_1_skip = 1 THEN 1 ELSE 0 END) AS already_skip FROM `likes` WHERE user_id_1 = :user_id_1 AND user_id_2 = :user_id_2;")
            ->fetch(['user_id_1' => $user_like, 'user_id_2' => $user_id])
        ;

        if ($count["already_like"] == 0 && $count["already_skip"] == 0) {

            $this
                ->query("INSERT INTO `likes` (user_id_1, user_id_2, user_1_skip) VALUES (:user_id_1, :user_id_2, 1)")
                ->execute(['user_id_1' => $user_id,  'user_id_2' => $user_like])
            ;
        }
        else if ($count['already_like'] > 0 || $count['already_skip'] > 0) {
            $this
                ->query("UPDATE `likes` SET user_id_2 = 1  WHERE user_id_1 = :user_id_1 AND user_id_2 = :user_id_2")
                ->execute(['user_id_1' => $user_like, 'user_id_2' => $user_id])
            ;
        }
    }

    public function get_likes ($user_id): void{
        $result = [];

        $likes = $this
            ->query("SELECT user_id_1 FROM likes WHERE user_id_2 = :user_id_2 AND user_1_skip = 0 AND is_match = 0 AND user_2_skip = 0")
            ->fetchAll(['user_id_2' => $user_id])
        ;

        empty($likes) ? response_json(204) : null;

        foreach ($likes as $like) {

            $image = $this
                ->query("SELECT image_name FROM image WHERE user_id = :id AND image_primary = 1")
                ->fetch(["id" => $like['user_id_1']])
            ;

            $result[] = [
                'id' => $like['user_id_1'],
                'image' => $image['image_name'],
            ];

        }
        response_json(200, $result);
    }
}