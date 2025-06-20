<?php

namespace App\Models;
class UserList {
    public $id;
    public $name;
    public $mail;
    public $ddn;
    public $subscription;
    public $image;
    public $status;
    public function __construct($data, $image) {
        $this->id = $data["id"];
        $this->name = $data["first_name"];
        $this->mail = $data["mail"];
        $this->ddn = $data["birth_date"];
        $this->subscription = $data["premium"];
        $this->status = $data["status"];
        $this->image = $image["image_name"];
    }
}