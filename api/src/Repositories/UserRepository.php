<?php

namespace App\Repositories;

use App\Models\UserList;
use App\Services\JwtService;
use App\Services\MailService;
use DateTime;

class UserRepository extends BaseRepository {

    public function log_in($email, $password): void
    {
        $subscription_repo = new SubscriptionRepository();
        $admin = false;
        if (str_contains($email, $_ENV['DOMAIN_ADMIN_MAIL'])) {
            $admin = true;

            $result = $this
                ->query("SELECT * FROM admin WHERE mail= :mail")
                ->fetch(['mail' => $email])
            ;
        } else {
            $result = $this
                ->query("SELECT * FROM user WHERE mail= :mail")
                ->fetch(['mail' => $email])
            ;
        }

        if (empty($result)) {
            response_json(401, "incorrect mail or password");
        } else {
            if (password_verify($password, $result["password"])) {
                $jwt = new JwtService();
                if ($admin) {
                    $token = $jwt->generate(['status' => $_ENV['JWT_ADMIN_KEY']]);
//                    session_start();
                    response_json(200, [['status' => 'admin'], ['id' => $result['id']]], $token);
                } else {
                    $subscription = $subscription_repo->check_subscription($result['id']);
                    $token = $jwt->generate(['status' => $_ENV['JWT_USER_KEY'], 'subscription' => $subscription]);
//                    session_start();
                    response_json(200, [['status' => 'user'], ['id' => $result['id']], ['subscription' => $result['status']]], $token);
                }
            }
            response_json(401, 'incorrect mail or password');
        }
    }

    public function get_all_users(): void {
        $table = [];

        $result = $this
            ->query("SELECT user.id, user.first_name, user.mail, user.birth_date, user.premium, us.status FROM user INNER JOIN user_status AS us ON us.id = user.status")
            ->fetchAll();

        if (empty($result)) {
            response_json(204);
        } else {
           foreach ($result as $user) {
               $image = $this
                   ->query("SELECT image_name FROM image WHERE user_id= :id AND image_primary = 1")
                   ->fetch(['id' => $user['id']]);
               $table[] = new UserList($user, $image);
           }

           response_json(200, $table);
        }
    }

    public function set_localisation($id, $latitude, $longitude): void {
        $this
            ->query("UPDATE user set latitude= :latitude, longitude= :longitude where id= :id")
            ->execute(['latitude' => $latitude, 'longitude' => $longitude, 'id' => $id])
        ;
        response_json(200);
    }

    public function reset_password($email): void {


        if (
            $this
                ->query("SELECT COUNT(*) FROM user WHERE mail= :mail")
                ->fetch(['mail' => $email]) > 0
        ) {
            $mail_service = new MailService();
            $code = uniqid();
            $url = $_ENV["DOMAIN_URL"] . $code;

            $this
                ->query("UPDATE user SET reset_code = :reset_code WHERE mail= :mail")
                ->execute(['reset_code' => $code, 'mail' => $email])
            ;

            $mail_service->send_to($email);
            $mail_service->set_subject("Réinitialisation de mot de passe");
            $mail_service->set_HTML_body_with_code("/../../templates/ResetPasswordMail.php", ['reset_password' => "$url"]);
            $mail_service->send_mail();
        }
    }

}