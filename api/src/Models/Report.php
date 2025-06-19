<?php

namespace App\Models;

class Report {
    public $id;
    public $reason;
    public $message;
    public $reported;

    public function __construct($data) {
        $this->id = $data['id'];
        $this->reason = $data['reason_id'];
        $this->message = $data['message'];
        $this->reported = $data['user_id_reported'];

    }

}