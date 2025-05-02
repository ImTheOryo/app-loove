<?php

namespace App\Repositories;

class ReportRepository extends BaseRepository
{

  public function get_reports ()
  {
    $result = $this
      -> query("SELECT * FROM `report`")
      -> fetchAll();

    if (empty($result)) {
      response_json(false, "No reports found.");
    }

    response_json(true, $result);
  }

}