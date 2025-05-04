<?php

namespace App\Repositories;

use App\Models\User;
use App\Services\JwtService;

class UserRepository extends BaseRepository
{

  public function log_in (string $email, string $password): void
  {
    $admin = false;
    if (strpos($email, $_ENV['DOMAIN_ADMIN_MAIL']) !== false) {
      $admin = true;

      $result = $this
        -> query("SELECT * FROM admin WHERE mail= :mail")
        -> fetch(['mail' => $email]);
    } else {
      $result = $this
        -> query("SELECT * FROM user WHERE mail= :mail")
        -> fetch(['mail' => $email]);
    }

    if (empty($result)) {
      response_json(401, "incorrect mail or password");
    } else {
      if (password_verify($password, $result["password"])) {
        $jwt = new JwtService();
        if ($admin) {
          $token = $jwt -> generate(['status' => $_ENV['JWT_ADMIN_KEY']]);
        } else {
          $token = $jwt -> generate(['status' => $_ENV['JWT_USER_KEY']]);
        }
        response_json(200, $result["id"], $token);
      }

      response_json(401, 'incorrect mail or password');
    }
  }

  public function get_all_users (): void
  {
    $result = $this
      -> query("SELECT id, name, mail FROM user")
      -> fetchAll();

    if (empty($result)) {
      response_json(204, "no users");
    } else {
      response_json(200, $result);
    }
  }


}