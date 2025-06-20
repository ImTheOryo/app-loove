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


    public function get_filter(int $user_id): void {
        $this->repository->get_filter($user_id);
    }

    public function like_user (int $user_id, int $user_like): void {
        $this->repository->like_user($user_id, $user_like);
    }

    public function skip_user (int $user_id, int $user_like): void {
        $this->repository->skip_user($user_id, $user_like);
    }

    public function message_user (int $user_id, int $user_send_to): void {
        $raw = file_get_contents("php://input");
        $data = json_decode($raw);
        $message = $data->message;
        $this->repository->message_user($user_id, $user_send_to, $message,);
    }

    public function get_likes (int $user_id) {
        $this->repository->get_likes($user_id);
    }

    public function update_filter (int $user_id): void {
        $raw = file_get_contents("php://input");
        $data = json_decode($raw);
        $filter["min_age"] = $data->minAge;
        $filter["max_age"] = $data->maxAge;
        $filter["range"] = $data->range;
        $filter["wanna_see_id"] = $data->wannaSeeId;

        $this->repository->update_filter($user_id, $filter);
    }

}