<?php

namespace App\Controllers;

use App\Repositories\SubscriptionRepository;

class SubscriptionController extends BaseController {
    private SubscriptionRepository $repository;

    public function __construct() {
        $this->repository = new SubscriptionRepository();
    }

    public function get_subscription(): void {
        $this->repository->get_subscription();
    }

    public function subscribe_user (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $user_id = $object->id;
        $subscription_time = $object->subscription;
        $this->repository->subscribe_user($user_id, $subscription_time);
    }

    public function check_subscription ($user_id): void {
        $this->repository->check_subscription($user_id);
    }
}