<?php

namespace App\Controllers;

use App\Repositories\UserRepository;
use Exception;

class UsersController extends BaseController
{
    private $userRepository;

    function __construct(){
        $this->userRepository = new UserRepository();
    }
    public function login()
    {
        try {
            $email = clean_string($_POST['mail']);
            $password = clean_string($_POST['password']);
        } catch (Exception $e) {
            response_json(400, $e->getMessage());
        }

        $this->userRepository->log_in($email, $password);

    }

    public function get_all_users()
    {
        $this->userRepository->get_all_users();
    }

}