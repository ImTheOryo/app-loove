<?php

namespace App\Repositories;

use App\Models\Admin;
use App\Models\Report;
use App\Models\ReportManagement;

class ReportRepository extends BaseRepository {
    public function get_report_reason (): void {
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
        $result = [];
        $admins= [];
        $report = $this
            ->query("SELECT id, user_id_reported, reason_id, message, status  FROM report WHERE id = :report_id")
            ->fetch(["report_id" => $report_id])
        ;

        $admin = $this
            ->query("SELECT admin_id FROM report_admin WHERE report_id = :report_id")
            ->fetchAll(["report_id" => $report_id])
        ;

        foreach ($admin as $user) {
            $res = $this
                ->query("SELECT a.id, a.first_name, a.last_name, a.image_name, ar.role FROM admin AS a INNER JOIN admin_role AS ar WHERE a.id = :id AND a.id_role = ar.id")
                ->fetch(["id" => $user['admin_id']])
            ;
            $admins[] = new Admin($res);
        };
        $result[] = new ReportManagement($report);
        $result[] = $admins;
        response_json(200, $result);

    }

    public function add_admin(int $report_id, int $admin_id): void {
        $this
            ->query("INSERT INTO report_admin (report_id, admin_id) VALUES (:report_id, :admin_id)")
            ->execute(["report_id" => $report_id, "admin_id" => $admin_id])
        ;

        $count = $this
            ->query("SELECT COUNT(*) AS as_admin FROM report_admin WHERE report_id = :report_id")
            ->fetch(["report_id" => $report_id])
        ;

        if ($count['as_admin'] > 0) {
            $this
                ->query("UPDATE report SET status = 2 WHERE id = :report_id")
                ->execute(["report_id" => $report_id])
            ;
        }

        response_json(201);
    }

    public function delete_admin(int $report_id, int $admin_id): void {
        $this
            ->query("DELETE FROM report_admin WHERE report_id = :report_id AND admin_id = :admin_id")
            ->execute(["report_id" => $report_id, "admin_id" => $admin_id])
        ;

        $count = $this
            ->query("SELECT COUNT(*) AS as_admin FROM report_admin WHERE report_id = :report_id")
            ->fetch(["report_id" => $report_id])
        ;

        if ($count['as_admin'] === 0) {
            $this
                ->query("UPDATE report SET status = 1 WHERE id = :report_id")
                ->execute(["report_id" => $report_id])
            ;
        }
        response_json(200);
    }

    public function close_report (int $report_id): void {
        $this
            ->query("UPDATE report SET status = 3 WHERE id = :report_id")
            ->execute(["report_id" => $report_id])
        ;

        response_json(200);
    }

    public function action_user (string $action, int $user_id): void {
        $action = $action == "ban" ? 4 : 3;
        $this
            ->query("UPDATE user SET status = :action WHERE id = :report_id")
            ->execute(["action" => $action, "report_id" => $user_id])
        ;

        response_json(200);
    }

}