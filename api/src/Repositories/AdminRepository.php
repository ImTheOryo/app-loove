<?php

namespace App\Repositories;

use App\Models\Admin;
use App\Models\ChatMessage;
use App\Models\Dashboard;

class AdminRepository extends BaseRepository {
    public function get_admin ($admin_id): void {

        $result = $this
            ->query("SELECT admin.id, admin.first_name, admin.last_name, admin.image_name, ar.role FROM admin INNER JOIN admin_role AS ar ON admin.id_role = ar.id WHERE admin.id = :admin_id;")
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

    public function get_admins_by_reports ($report_id): void {
        $reportAdmins = $this
            ->query("SELECT admin_id FROM report_admin WHERE report_id = :report_id")
            ->fetchAll(['report_id' => $report_id]);


        $excludeAdmins = array_column($reportAdmins, 'admin_id');

        if (empty($excludeAdmins)) {
            $admins = $this
                ->query("SELECT a.id, a.first_name, a.last_name, a.image_name, ar.role FROM admin AS a INNER JOIN admin_role AS ar WHERE a.id_role = ar.id ")
                ->fetchAll()
            ;
        } else {
            $placeholders = implode(',', $excludeAdmins);
            $admins = $this
                ->query("SELECT a.id, a.first_name, a.last_name, a.image_name, ar.role FROM admin AS a INNER JOIN admin_role AS ar WHERE a.id NOT IN ($placeholders) AND a.id_role = ar.id")
                ->fetchAll()
            ;
        }
        if (empty($admins)) {
            response_json(204);
        }
        foreach ($admins as $admin) {
            $result [] = new Admin($admin);
        }


        response_json(200, $result);
    }

    public function get_chat_by_report($report_id): void {

        $users = $this
            ->query("SELECT user_id_reported, user_id_reporter FROM report WHERE id = :report_id")
            ->fetch(['report_id' => $report_id])
        ;

        $chat_id = $this
            ->query("SELECT chat_id AS chat_room_id FROM likes WHERE ((user_id_1 = :user_id_1 AND user_id_2 = :user_id_2) OR (user_id_1 = :user_id_2 AND user_id_2 = :user_id_1)) AND is_match = 1;")
            ->fetch(["user_id_1" => $users["user_id_reported"],  "user_id_2" => $users["user_id_reporter"]])
        ;

        $messages = $this
            ->query("SELECT id_sender, message, time, seen FROM messages WHERE chat_room_id = :chat_room_id AND id_sender = :id_sender")
            ->fetchAll(["chat_room_id" => $chat_id["chat_room_id"], "id_sender" => $users["user_id_reported"]])
        ;
        if (isset($messages[0])){
            foreach ($messages as $message) {
                $result["messages"][] = new ChatMessage($message["id_sender"],  $message["message"], $message["time"], $message["seen"]);
            }
            response_json(200, $result);
        } else {
            response_json(204);
        }

        var_dump($messages);

    }
}