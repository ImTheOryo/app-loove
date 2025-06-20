<?php

namespace App\Models;

class ReportManagement {
    public $id;
    public $reason;
    public $message;
    public $reported;

    public $status;

    public function __construct($data) {
        $this->id = $data['id'];
        $this->reason = $data['reason_id'];
        $this->message = $data['message'];
        $this->reported = $data['user_id_reported'];
        $this->status = $data['status'];

    }

}