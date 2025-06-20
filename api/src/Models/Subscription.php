<?php

namespace App\Models;

class Subscription {
    public $time;
    public $price;

    public function __construct($data)
    {
        $this->time = $data["time"];
        $this->price = $data["amount"];
    }
}