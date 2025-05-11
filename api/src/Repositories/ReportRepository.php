<?php

namespace App\Repositories;

class ReportRepository extends BaseRepository
{

    public function get_reports()
    {
        $result = $this
            ->query("SELECT * FROM `report`")
            ->fetchAll();

        if (empty($result)) {
            response_json(204, "No reports found.");
        }
        response_json(200, $result);
    }

}