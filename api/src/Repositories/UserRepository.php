<?php

namespace App\Repositories;

use App\Services\JwtService;

class UserRepository extends BaseRepository
{

    public function log_in(string $email, string $password): void
    {
        $admin = false;
        if (str_contains($email, $_ENV['DOMAIN_ADMIN_MAIL'])) {
            $admin = true;

            $result = $this
                ->query("SELECT * FROM admin WHERE mail= :mail")
                ->fetch(['mail' => $email]);
        } else {
            $result = $this
                ->query("SELECT * FROM user WHERE mail= :mail")
                ->fetch(['mail' => $email]);
        }

        if (empty($result)) {
            response_json(401, "incorrect mail or password");
        } else {
            if (password_verify($password, $result["password"])) {
                $jwt = new JwtService();
                if ($admin) {
                    $token = $jwt->generate(['status' => $_ENV['JWT_ADMIN_KEY']]);
                    session_start();
                    response_json(200, [['status' => 'admin'], ['id' => $result['id']]], $token);
                } else {
                    $token = $jwt->generate(['status' => $_ENV['JWT_USER_KEY']]);
                    session_start();
                    response_json(200, [['status' => 'user'], ['id' => $result['id']]], $token);
                }
            }
            response_json(401, 'incorrect mail or password');
        }
    }

    public function get_all_users(): void
    {
        $result = $this
            ->query("SELECT id, name, mail FROM user")
            ->fetchAll();

        if (empty($result)) {
            response_json(204, "no users");
        } else {
            response_json(200, $result);
        }
    }

    public function get_discovery (int $id): void {

        $result = [];

        $users = $this
            ->query("SELECT `id`, `first_name`, `age`, `current`, `biography`, `search_type_id`  FROM user WHERE id != :id")
            ->fetchAll(['id' => $id])
        ;

        empty($users) ? response_json(204, "no users") : null;

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
}