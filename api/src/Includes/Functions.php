<?php

function response_json (int $http_code, array|string $data, string|null $token = null)
{
  $response = ["data" => $data];
  if (isset($token)) {
    $response["token"] = $token;
  }
  http_response_code($http_code);
  header("Content-Type: application/json");
  echo json_encode($response);
  exit();
}