<?php

namespace App\Repositories;

use App\Models\Admin;
use App\Models\Dashboard;

class AdminRepository extends BaseRepository {
    public function get_admin ($admin_id) {

        $result = $this
            ->query("SELECT admin.first_name, admin.last_name, admin.image_name, ar.role FROM admin INNER JOIN admin_role AS ar ON admin.id_role = ar.id WHERE admin.id = :admin_id;")
            ->fetch(['admin_id' => $admin_id])
        ;

        $data[] = new Admin($result);

        response_json(200, $data);

    }

    public function get_dashboard(): void {
        $data = [];
        $result = [];
        $data[] = $this
            ->query("SELECT COUNT(*) AS user_count FROM user")
            ->fetch()
        ;

        $data[] = $this
            ->query("SELECT COUNT(*) AS premium_count FROM premium")
            ->fetch()
        ;

        $data[] = $this->query("SELECT 
        COUNT(*) AS total_reports,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS unresolved_report_count,
        SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS in_progress_report_count,
        SUM(CASE WHEN status = 3 THEN 1 ELSE 0 END) AS resolved_report_count
        FROM report")->fetch();

        $data[] = $this
            ->query("SELECT SUM(amount) AS total_earned FROM subscription")
            ->fetch()
        ;

        $result[] = new Dashboard($data);
        response_json(200, $result);

    }
}