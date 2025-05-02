<?php

namespace App\Repositories;

use App\Models\User;
use Exception;

class UserRepository extends BaseRepository
{

  public function log_in (string $email, string $password)
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
      response_json(false, "incorrect mail or password");
    } else {
      if (password_verify($password, $result["password"])) {

        if ($admin) {
          response_json(true, 'admin_auth');
        } else {
          response_json(true, 'user_auth');
        }
      }

      response_json(false, 'incorrect mail or password');
    }
  }

  public function get_all_users ()
  {
    $result = $this
      -> query("SELECT id, name, mail FROM user")
      -> fetchAll();

    if (empty($result)) {
      response_json(false, "no users");
    } else {
      response_json(true, $result);
    }
  }


}