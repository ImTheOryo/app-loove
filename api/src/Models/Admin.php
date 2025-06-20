<?php

namespace App\Models;

class Admin {
    public $id;
    public $name;
    public $role;
    public $image;

    public function __construct($data)
    {
        $this->id = $data['id'];
        $this->name = $data['first_name'] . ' ' . $data['last_name'];
        $this->role = $data['role'];
        $this->image = $data['image_name'];
    }
}