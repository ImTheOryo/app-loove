<?php

namespace App\Controllers;

use App\Repositories\ProfileRepository;
use App\Repositories\UserRepository;

class ProfileController extends BaseController {
    private $repository;

    public function __construct () {
        $this->repository = new ProfileRepository();
    }

    public function get_user ($user_id) {
        $this->repository->get_user($user_id);
    }

    public function get_user_infos(int $user_id): void {
        $this->repository->get_user_infos($user_id);
    }

    public function get_biography(int $user_id): void {
        $this->repository->get_biography($user_id);
    }

    public function update_biography(int $user_id): void {
        $data = file_get_contents("php://input");
        $biography = json_decode($data);
        $this->repository->update_biography($user_id, clean_string($biography));
    }

    public function get_hobbies(): void {
        $this->repository->get_hobbies();
    }

    public function get_hobby(int $user_id): void {
        $this->repository->get_hobby($user_id);
    }

    public function update_hobby(int $user_id, int $hobby_id): void {
        $this->repository->update_hobby($user_id, $hobby_id);
    }
}