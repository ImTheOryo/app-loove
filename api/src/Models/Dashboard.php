<?php


namespace App\Models;

class Dashboard
{
    public int $users;
    public int $premiumUsers;
    public int $totalReports;
    public int $unresolvedReports;

    public int $inProgressReports;

    public int $closedReports;

    public string $totalRevenue;

    public function __construct($data)
    {
        $this->users = $data[0]['user_count'];
        $this->premiumUsers = $data[1]['premium_count'];
        $this->totalReports = $data[2]['total_reports'];
        $this->unresolvedReports = $data[2]['unresolved_report_count'];
        $this->inProgressReports = $data[2]['in_progress_report_count'];
        $this->closedReports = $data[2]['resolved_report_count'];
        $this->totalRevenue = $data[3]['total_earned'] . " €";

    }

}