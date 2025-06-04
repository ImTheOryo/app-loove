<?php

namespace App\Controllers;

use App\Repositories\DiscoveryRepository;

class DiscoveryController extends BaseController {
    private DiscoveryRepository $repository;
    public function __construct(){
        $this->repository = new DiscoveryRepository();;
    }
    public function get_discovery(int $user_id): void {
        $this->repository->get_discovery($user_id);
    }

    public function like_user (int $user_id, int $user_like): void {
        $this->repository->like_user($user_id, $user_like);
    }

    public function skip_user (int $user_id, int $user_like): void {
        $this->repository->skip_user($user_id, $user_like);
    }

    public function get_likes (int $user_id) {
        $this->repository->get_likes($user_id);
    }
}