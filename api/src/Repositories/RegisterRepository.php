<?php

namespace App\Repositories;
use App\Services\MailService;

class RegisterRepository extends BaseRepository {
    public function register_mail ($email): void {
        $count = $this
            ->query("SELECT COUNT(*) AS `count_mail` FROM user WHERE mail = :mail")
            ->fetch(['mail' => $email]);
        ;
        $count['count_mail'] > 0 ? response_json(208) : null;

        $code = rand(1000, 9999);

        $insert_mail = $this
            ->query("INSERT INTO user (mail, verify_code) VALUES (:mail, :code)")
            ->execute(['mail' => $email,  'code' => $code])
        ;

        $mail = new MailService();

        $mail->send_to($email);
        $mail->set_subject("Code de vérification");

        $mail->set_HTML_body_with_code("/../../templates/Mail.php",['code' => "$code"] );

        $mail->send_mail();

    }

    public function verify_mail ($mail, $code): void {
        $code_to_verify = $this
            ->query("SELECT COUNT(*) AS `code_verify` FROM user WHERE mail = :mail AND verify_code = :code")
            ->fetch(['mail' => $mail, 'code' => $code])
        ;

        if ($code_to_verify['code_verify'] > 0 ) {
            $this
                ->query("UPDATE user SET verify_code = null, verify = 1 WHERE mail = :mail")
                ->execute(['mail' => $mail])
            ;
            response_json(200);
        } else {
            response_json(204);
        }
    }

    public function register_password ($mail, $password): void {
        $password = password_hash($password, PASSWORD_BCRYPT);

        $this
            ->query("UPDATE user SET password = :password WHERE mail = :mail")
            ->execute(["password" => $password, "mail" => $mail])
        ;

        response_json(200);
    }


    public function register_infos ($mail, $ddn, $age, $first_name, $current): void {
        $this
            ->query("UPDATE user SET first_name = :first_name, current = :current, birth_date = :ddn, age = :age, min_age = :age, max_age = :max_age WHERE mail = :mail")
            ->execute(['first_name' => $first_name, 'current' => $current,'ddn' => $ddn, 'age' => $age, 'max_age' => $age + 3, 'mail' => $mail])
        ;
        response_json(200);
    }

    public function register_gender ($mail, $gender): void {
        $this
            ->query("UPDATE user SET gender_id = :gender WHERE mail = :mail")
            ->execute(['gender' => $gender, 'mail' => $mail])
        ;

        response_json(200);
    }

    public function register_looking ($mail, $looking): void {
        $this
            ->query("UPDATE user SET wanna_see_id = :looking WHERE mail = :mail")
            ->execute(['looking' => $looking, 'mail' => $mail])
        ;

        response_json(200);
    }

    public function register_relation ($mail, $relation): void {
        $this
            ->query("UPDATE user SET search_type_id = :relation WHERE mail = :mail")
            ->execute(['relation' => $relation, 'mail' => $mail])
        ;
        response_json(200);
    }

    public function register_images ($images, $mail): void {
        $id = $this
            ->query("SELECT id FROM user WHERE mail = :mail")
            ->fetch(['mail' => $mail])
        ;

        foreach ($images as $image) {
            $this
                ->query("INSERT INTO image (image_name, user_id, image_primary) VALUES (:image_name, :user_id, :image_primary)")
                ->execute(['image_name' => $image['name'], 'user_id' => $id['id'], 'image_primary' => $image['primary']])
            ;
        }

        response_json(200);
    }

    public function register_biography ($mail, $biography): void {
        $this
            ->query("UPDATE user SET biography = :biography WHERE mail = :mail")
            ->execute(['biography' => $biography, 'mail' => $mail])
        ;
        response_json(200);
    }
}