<?php

namespace App\Controllers;

use App\Repositories\ReportRepository;

class ReportController extends BaseController {
    private ReportRepository $repository;
    public function __construct () {
        $this->repository = new ReportRepository();
    }

    public function get_report_reason () {
        $this->repository->get_report_reason();
    }

}