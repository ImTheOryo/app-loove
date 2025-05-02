<?php

namespace App\Models;

class User
{

  public function __construct (
    public string $id,
    public string $name,
    public string $mail,
    public string $password,
  )
  {
  }
}