<?php

namespace App\Controllers;

use App\Repositories\UserRepository;

class UsersController extends BaseController
{

  public function login ()
  {

    $email = $_POST['mail'];
    $password = $_POST['password'];

    $repository = new UserRepository();

    $repository -> log_in($email, $password);

  }

  public function get_all_users ()
  {
    $repository = new UserRepository();
    $repository -> get_all_users();
  }

}