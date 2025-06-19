<?php

namespace App\Repositories;

use App\Services\NotificationService;
use DateTime;

class DiscoveryRepository extends BaseRepository{

    public function get_discovery(int $id): void
    {
        $result = [];

        // Récupération des préférences de l'utilisateur
        $user_filter = $this
            ->query("SELECT min_age, max_age, distance, wanna_see_id, latitude, longitude, gender_id FROM user WHERE id = :id")
            ->fetch(['id' => $id]);

        if (!$user_filter) {
            response_json(404, ['error' => 'User not found']);
            return;
        }

        $gender_conditions = "";
        $gender_params = [];

        switch ($user_filter['wanna_see_id']) {
            case 1:
                $gender_conditions = "AND u.gender_id = :male";
                $gender_params['male'] = 1;
                break;
            case 2:
                $gender_conditions = "AND u.gender_id = :female";
                $gender_params['female'] = 2;
                break;
            case 3:
                $gender_conditions = "AND u.gender_id IN (:male, :female, :non_binary)";
                $gender_params['male'] = 1;
                $gender_params['female'] = 2;
                $gender_params['non_binary'] = 3;

                break;
            default:
                response_json(400, ['error' => 'Invalid wanna_see_id']);
                return;
        }

        $users = $this
            ->query("
            SELECT u.id, u.first_name, u.age, u.current,
                   (
                       6371 * ACOS(
                           COS(RADIANS(:latitude)) * COS(RADIANS(u.latitude)) *
                           COS(RADIANS(u.longitude) - RADIANS(:longitude)) +
                           SIN(RADIANS(:latitude)) * SIN(RADIANS(u.latitude))
                       )
                   ) AS distance
            FROM user u
                     LEFT JOIN likes l1 ON u.id = l1.user_id_2 AND l1.user_id_1 = :user_id
                     LEFT JOIN likes l2 ON u.id = l2.user_id_1 AND l2.user_id_2 = :user_id
            WHERE u.id != :user_id
              AND u.age BETWEEN :min_age AND :max_age
              AND (l1.id IS NULL OR l1.is_match = 0)
              AND (l2.id IS NULL OR l2.is_match = 0)
              AND (
                  6371 * ACOS(
                      COS(RADIANS(:latitude)) * COS(RADIANS(u.latitude)) *
                      COS(RADIANS(u.longitude) - RADIANS(:longitude)) +
                      SIN(RADIANS(:latitude)) * SIN(RADIANS(u.latitude))
                  )
              ) <= :distance
              $gender_conditions
            ORDER BY distance ASC
        ")
            ->fetchAll(array_merge(
                [
                    'user_id'   => $id,
                    'latitude'  => $user_filter['latitude'],
                    'longitude' => $user_filter['longitude'],
                    'min_age'   => $user_filter['min_age'],
                    'max_age'   => $user_filter['max_age'],
                    'distance'  => $user_filter['distance'],
                ],
                $gender_params
            ));

        if (empty($users)) {
            response_json(204, ['message' => 'No users found']);
            return;
        }

        foreach ($users as $user) {
            $image = $this
                ->query("SELECT image_name FROM image WHERE user_id = :id AND image_primary = 1")
                ->fetchAll(['id' => $user['id']]);

            $result[] = [
                'infos' => $user,
                'image' => $image,
                'distance' => round($user['distance']) . ' km'
            ];
        }

        response_json(200, $result);
    }



    public function like_user(int $user_id, int $user_like): void
    {
        $likeStatus = $this
            ->query("SELECT user_1_skip FROM likes WHERE user_id_1 = :user_like AND user_id_2 = :user_id")
            ->fetch(['user_like' => $user_like, 'user_id' => $user_id])
        ;

        if (!$likeStatus) {

            $this
                ->query("INSERT INTO likes (user_id_1, user_id_2) VALUES (:user_id, :user_like)")
                ->execute(['user_id' => $user_id, 'user_like' => $user_like])
            ;
            response_json(200);
        } else if ($likeStatus['user_1_skip'] == 0) {

            $user_names = $this
                ->query("SELECT id, first_name FROM user WHERE id IN (:user_id, :user_like)")
                ->fetchAll(['user_id' => $user_id, 'user_like' => $user_like])
            ;

            $names = [];
            foreach ($user_names as $row) {
                $names[$row['id']] = $row['first_name'];
            }

            $notification = new NotificationService();

            $notification->send_notification_new_match($user_id, $names[$user_like]);
            $notification->send_notification_new_match($user_like, $names[$user_id]);

            $chat_id = uniqid();

            $this
                ->query("UPDATE likes SET is_match = 1, chat_id = :chat_id WHERE user_id_1 = :user_like AND user_id_2 = :user_id")
                ->execute(['chat_id' => $chat_id, 'user_like' => $user_like, 'user_id' => $user_id])
            ;


            response_json(200);
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

    public function get_likes ($user_id): void {
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

    public function message_user ($user_id, $user_send_to, $message): void {
        $likeStatus = $this
            ->query("SELECT user_1_skip FROM likes WHERE user_id_1 = :user_like AND user_id_2 = :user_id")
            ->fetch(['user_like' => $user_send_to, 'user_id' => $user_id])
        ;

        $chat_id = uniqid();
        $chat_repository = new ChatRepository();

        if (!$likeStatus) {
            $this
                ->query("INSERT INTO likes (user_id_1, user_id_2, chat_id, is_match) VALUES (:user_id, :user_like, :chat_id, 1)")
                ->execute(['user_id' => $user_id, 'user_like' => $user_send_to, "chat_id" => $chat_id])
            ;

        } else {
            $this
                ->query("UPDATE likes SET chat_id = :chat_id, is_match = 1 WHERE user_id_1 = :user_id AND user_id_2 = :user_id_2")
                ->execute(['chat_id' => $chat_id, 'user_id' => $user_send_to,  'user_id_2' => $user_id])
            ;
        }

        $chat_repository->send_message($chat_id, $user_id, $message);

        response_json(200);

    }

    public function get_filter ($user_id): void {
        $filter = $this
            ->query("SELECT min_age, max_age, distance, wanna_see_id FROM user WHERE id = :user_id")
            ->fetch(['user_id' => $user_id])
        ;

        response_json(200, $filter);
    }

    public function update_filter ($user_id, $filter): void {
        $this
            ->query("UPDATE user SET min_age = :min_age, max_age = :max_age, distance = :range, wanna_see_id = :wanna_see_id WHERE id = :user_id")
            ->execute(["min_age" => $filter['min_age'], "max_age" => $filter['max_age'], "range" => $filter['range'], "wanna_see_id" => $filter["wanna_see_id"] ,"user_id" => $user_id])
        ;

        response_json(200);
    }
}