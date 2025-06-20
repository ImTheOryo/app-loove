<?php

namespace App\Repositories;

use App\Services\SpotifyService;

class ProfileRepository extends BaseRepository {
    public function get_user ($user_id): void{

        $res = $this
            ->query("SELECT u.first_name, u.age, i.image_name FROM user AS u INNER JOIN image AS i ON i.user_id = u.id WHERE u.id = :user_id AND i.image_primary = 1;")
            ->fetch(["user_id" => $user_id]);
        ;

        response_json(200, $res);

    }

    public function get_user_infos(int $user_id): void {
        $result = [];
        $images = [];
        $hobbies = [];

        $res_user_infos = $this
            ->query("SELECT u.first_name, u.age, u.current, u.search_type_id, u.biography FROM user AS u WHERE id = :id")
            ->fetch(["id" => $user_id]);

        $image_primary = $this
            ->query("SELECT image_name FROM image WHERE user_id = :id AND image_primary = 1")
            ->fetch(['id' => $user_id])
        ;

        $res_images = $this
            ->query("SELECT image_name FROM image WHERE user_id = :id AND image_primary = 0")
            ->fetchAll(['id' => $user_id])
        ;

        $res_hobbies = $this
            ->query("SELECT h.hobby FROM user_hobby AS uh LEFT JOIN hobby AS h ON uh.hobby_id = h.id WHERE user_id = :id")
            ->fetchAll(['id' => $user_id])
        ;


        $res_musics = $this
            ->query("SELECT q.question, qa.answer FROM question_answer AS qa LEFT JOIN question AS q on q.id = qa.id_question WHERE id_user = :id")
            ->fetchAll(['id' => $user_id])
        ;

        $result['user_infos'] = $res_user_infos;

        $result['image_primary'] = $image_primary['image_name'];

        foreach ($res_images as $image) {
            $images[] = $image['image_name'];
        }
        $result['images'] = $images;

        foreach ($res_hobbies as $hobby){
            $hobbies[] = $hobby['hobby'];
        }
        $result['hobbies'] = $hobbies;

        $result['musics'] = $res_musics;

        response_json(200, $result);
    }

    public function get_biography(int $user_id): void {
        $res = $this
            ->query("SELECT biography FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $user_id])
        ;

        isset($res['biography']) ?  response_json(200, $res) : response_json(204);

    }

    public function update_biography(int $user_id, string $biography): void {
        $this
            ->query("UPDATE user SET biography = :biography WHERE id = :user_id")
            ->execute(["biography" => $biography, "user_id" => $user_id]);
        ;

        response_json(200);
    }

    public function get_hobbies(): void {

        $res = $this
            ->query("SELECT * FROM hobby")
            ->fetchAll()
        ;

        response_json(200, $res);
    }

    public function get_hobby(int $user_id): void {
        $res = $this
            ->query("SELECT hobby_id FROM user_hobby WHERE user_id = :user_id")
            ->fetchAll(["user_id" => $user_id])
        ;

        response_json(200, $res);
    }

    public function update_hobby(int $user_id, int $hobby_id): void {
        $count = $this
            ->query("SELECT COUNT(*) as count FROM user_hobby WHERE user_id = :user_id AND hobby_id = :hobby_id")
            ->fetch(["user_id" => $user_id, "hobby_id" => $hobby_id])
        ;

        if ($count['count'] > 0) {
            $this
                ->query("DELETE FROM user_hobby WHERE user_id = :user_id AND hobby_id = :hobby_id")
                ->execute(["user_id" => $user_id, "hobby_id" => $hobby_id])
            ;

            response_json(200);
        } else {
            $this
                ->query("INSERT INTO user_hobby (user_id, hobby_id) VALUES (:user_id, :hobby_id)")
                ->execute(["user_id" => $user_id, "hobby_id" => $hobby_id])
            ;
            response_json(201);
        }
    }

    public function get_musics(int $user_id): void {
        $spotify = new SpotifyService();
        $result = [];
        $res = $this
            ->query("SELECT q.question, qa.answer, qa.id FROM question_answer AS qa LEFT JOIN question AS q ON q.id = qa.id_question WHERE id_user = :user_id")
            ->fetchAll(["user_id" => $user_id])
        ;

        empty($res) ?  response_json(204) : null;

        foreach ($res as $music) {
            $result[] = [
                "question_id" => $music['id'],
                "question" => $music['question'],
                "answer" => $spotify->get_infos_by_id_track($music['answer'])
            ];
        }

        response_json(200, $result);
    }

    public function delete_music(int $qa_id): void {
        $this
            ->query("DELETE FROM question_answer WHERE id = :id")
            ->execute(["id" => $qa_id])
        ;

        response_json(200);
    }

    public function get_questions(): void {
        $res = $this
            ->query("SELECT * FROM question")
            ->fetchAll()
        ;
        response_json(200, $res);
    }

    public function get_music_title(string $title): void {
        $spotify = new SpotifyService();
        $result = $spotify->get_music_by_title($title);

        response_json(200, $result);

    }

    public function add_music($user_id, $id_question, $answer): void{
        $this
            ->query("INSERT INTO question_answer (id_question, id_user, answer) VALUES (:id_question, :id_user, :answer)")
            ->execute(["id_question" => $id_question, "id_user" => $user_id, "answer" => $answer])
        ;

        response_json(200);
    }

    public function get_gender($user_id): void {
        $gender = $this
            ->query("SELECT gender_id FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $user_id])
        ;

        response_json(200, $gender);
    }

    public function update_gender (int $user_id, int $gender_id): void {
        try {
            $this
                ->query("UPDATE user SET gender_id = :gender_id WHERE id = :user_id")
                ->execute(["user_id" => $user_id, "gender_id" => $gender_id])
            ;
        } catch (\Exception $e) {
            $error = $e->getMessage();
        }

        response_json(200);
    }

    public function get_relation (int $user_id): void {
        $res = $this
            ->query("SELECT search_type_id FROM user WHERE id = :user_id")
            ->fetch(["user_id" => $user_id])
        ;

        response_json(200, $res);
    }

    public function update_relation (int $user_id, int $search_type_id): void {
        try {
            $this
                ->query("UPDATE user SET search_type_id = :search WHERE id = :user_id")
                ->execute(["user_id" => $user_id, "search" => $search_type_id])
            ;
        } catch (\Exception $e) {
            $error = $e->getMessage();
        }

        response_json(200);
    }

    public function get_images(int $user_id): void {
        $images = $this
            ->query("SELECT image_name, image_primary FROM image WHERE user_id = :user_id")
            ->fetchAll(["user_id" => $user_id])
        ;

        response_json(200, $images);
    }

    public function delete_image (string $image_name): void {
        $this
            ->query("DELETE FROM image WHERE image_name = :image_name")
            ->execute(["image_name" => $image_name])
        ;
        response_json(200);
    }

    public function upload_image($images, $user_id): void {
        $count = $this
            ->query("SELECT COUNT(*) AS primary_count FROM image WHERE user_id = :user_id AND image_primary = 1")
            ->fetch(["user_id" => $user_id])
        ;

        if ($count['primary_count'] > 0) {
            foreach ($images as $image) {
                $this
                    ->query("INSERT INTO image (image_name, user_id, image_primary) VALUES (:image_name, :user_id, 0)")
                    ->execute(['image_name' => $image['name'], 'user_id' => $user_id])
                ;
            }
        } else {
            foreach ($images as $image) {
                $this
                    ->query("INSERT INTO image (image_name, user_id, image_primary) VALUES (:image_name, :user_id, :image_primary)")
                    ->execute(['image_name' => $image['name'], 'user_id' => $user_id, 'image_primary' => $image['primary']])
                ;
            }
        }

        response_json(200);
    }

}