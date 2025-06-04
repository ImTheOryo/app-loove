<?php

namespace App\Repositories;

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
        $musics = [];

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
}