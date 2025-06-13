<?php

namespace App\Models;

class Admin {
    public $name;
    public $role;
    public $image;

    public function __construct($data)
    {
        $this->name = $data['first_name'] . ' ' . $data['last_name'];
        $this->role = $data['role'];
        $this->image = $data['image_name'];
    }
}