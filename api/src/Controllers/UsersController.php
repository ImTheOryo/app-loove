<?php

namespace App\Controllers;

use App\Repositories\UserRepository;
use Exception;

class UsersController extends BaseController
{

    public function login()
    {

        try {
            $email = clean_string($_POST['mail']);
            $password = clean_string($_POST['password']);
        } catch (Exception $e) {
            response_json(400, $e->getMessage());
        }

        $repository = new UserRepository();

        $repository->log_in($email, $password);

    }

    public function get_all_users()
    {
        $repository = new UserRepository();
        $repository->get_all_users();
    }

    public function get_discovery(string $user_id) {
        try {
        } catch (Exception $e) {
            response_json(400, $e->getMessage());
        }

        $repository = new UserRepository();

        $repository->get_discovery($user_id);
    }

}