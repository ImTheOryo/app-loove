<?php

function response_json(int $http_code, array|string|null $body = null, string|null $token = null)
{
    $response = [];
    if (isset($body)) {
        $response["body"] = $body;
    }
    if (isset($token)) {
        $response["token"] = $token;
    }
    http_response_code($http_code);
    header("Content-Type: application/json");
    echo json_encode($response);
    exit();
}

function clean_string(string $value): string
{
    return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}