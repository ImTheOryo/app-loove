<?php

namespace App\Controllers;

use App\Core\Request;

abstract class BaseController
{

    protected Request $request;

    public function setRequest(Request $request)
    {
        $this->request = $request;
    }

    protected function getRequest(): Request
    {
        return $this->request;
    }
}