<?php

namespace App\Repositories;

class DiscoveryRepository extends BaseRepository{

    public function get_discovery (int $id): void {

        $result = [];

        $users = $this
            ->query("SELECT `id`, `first_name`, `age`, `current`, `biography`, `search_type_id`  FROM user WHERE id != :id")
            ->fetchAll(['id' => $id])
        ;

        empty($users) ? response_json(204) : null;

        foreach ($users as $user) {
            $images = $this
                    ->query("SELECT image_name, image_primary FROM image WHERE user_id = :id")
                ->fetchAll(['id' => $user['id']])
            ;

            $hobbies = $this
                ->query("SELECT h.hobby FROM user_hobby AS uh LEFT JOIN hobby AS h ON uh.hobby_id = h.id WHERE user_id = :id")
                ->fetchAll(['id' => $user['id']])
            ;

            $musics = $this
                ->query("SELECT q.question, qa.answer FROM question_answer AS qa LEFT JOIN question AS q on q.id = qa.id_question WHERE id_user = :id")
                ->fetchAll(['id' => $user['id']])
            ;

            $result[] = [
                'infos' => $user,
                'images' => $images,
                'hobbies' => $hobbies,
                'musics' => $musics,
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
}