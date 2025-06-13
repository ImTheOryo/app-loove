<?php

namespace App\Repositories;

use App\Models\Admin;

class AdminRepository extends BaseRepository {
    public function get_admin ($admin_id) {

        $result = $this
            ->query("SELECT admin.first_name, admin.last_name, admin.image_name, ar.role FROM admin INNER JOIN admin_role AS ar ON admin.id_role = ar.id WHERE admin.id = :admin_id;")
            ->fetch(['admin_id' => $admin_id])
        ;

        $data[] = new Admin($result);

        response_json(200, $data);

    }
}