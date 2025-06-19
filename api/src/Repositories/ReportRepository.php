<?php

namespace App\Repositories;

use App\Models\Report;
use App\Models\ReportManagement;

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

    public function report_user($user_reporter_id, $user_reported_id, $reason_id, $message): void {
        $count = $this
            ->query("SELECT COUNT(*) AS already_reported FROM report WHERE user_id_reporter = :user_id_reporter AND user_id_reported = :user_id_reported")
            ->fetch([
                'user_id_reporter' => $user_reporter_id,
                'user_id_reported' => $user_reported_id
            ])
        ;

        if ($count['already_reported'] === 0) {
            $this
                ->query("INSERT INTO report (user_id_reported, user_id_reporter, reason_id, message, status)VALUES (:user_reported_id, :user_reporter, :reason, :message, :status)")
                ->execute([
                    'user_reported_id' => $user_reported_id,
                    'user_reporter' => $user_reporter_id,
                    'reason' => $reason_id,
                    'message' => $message,
                    'status' => 1
                ])
            ;

            response_json(201);
        } else {
            response_json(400, 'Already Reported');
        }
    }

    public function get_all_reports(): void {
        $statuses = [
            1 => 'Non traité',
            2 => 'En cours de traitement',
            3 => 'Fermé'
        ];

        $result = [];

        foreach ($statuses as $status => $label) {
            $data = $this
                ->query("SELECT id, message, reason_id, user_id_reported FROM report WHERE status = :status")
                ->fetchAll(['status' => $status]);

            $result[$label] = array_map(fn($report) => new Report($report), $data);
        }

        response_json(200, $result);
    }

    public function get_report(int $report_id): void {

        $report = $this
            ->query("SELECT id, user_id_reported, reason_id, message, status  FROM report WHERE id = :report_id")
            ->fetch(["report_id" => $report_id])
        ;

        $result[] = new ReportManagement($report);

        response_json(200, $result);

    }

}