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

    public function get_dashboard(): void{
        $this->repository->get_dashboard();
    }

    public function get_admins_by_reports ($report_id): void {
        $this->repository->get_admins_by_reports($report_id);
    }

    public function get_chat_by_report ($report_id): void {
        $this->repository->get_chat_by_report($report_id);
    }
}