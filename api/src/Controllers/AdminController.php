<?php

namespace App\Controllers;

use App\Repositories\AdminRepository;

class AdminController extends BaseController {
    private AdminRepository $repository;

    public function __construct(){
        $this->repository = new  AdminRepository();
    }

    public function get_admin ($admin_id) {
        $this->repository->get_admin($admin_id);
    }
}