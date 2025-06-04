<?php

namespace App\Repositories;

class ReportRepository extends BaseRepository {
    public function get_report_reason () {
        $reasons = [];
        $res = $this
            ->query("SELECT reason FROM report_reason")
            ->fetchAll()
        ;

        foreach ($res as $reason) {
            $reasons[] = $reason['reason'];
        }

        response_json(200, $reasons);
    }
}