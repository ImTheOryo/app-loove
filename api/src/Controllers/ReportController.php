<?php

namespace App\Controllers;

use App\Repositories\ReportRepository;

class ReportController extends BaseController {
    private ReportRepository $repository;
    public function __construct() {
        $this->repository = new ReportRepository();
    }

    public function get_report_reason(): void {
        $this->repository->get_report_reason();
    }

    public function report_user ($user_reporter_id, $user_reported_id): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $reason_id = intval($object->reason_id);
        $message = $object->message ?? null;
        $this->repository->report_user($user_reporter_id, $user_reported_id, $reason_id, $message);
    }

    public function get_all_reports(): void {
        $this->repository->get_all_reports();
    }

    public function get_report(int $report_id): void {
        $this->repository->get_report($report_id);
    }

    public function add_admin (int $report_id, int $admin_id): void {
        $this->repository->add_admin($report_id, $admin_id);
    }

    public function delete_admin (int $report_id, int $admin_id): void {
        $this->repository->delete_admin($report_id, $admin_id);
    }

}