<?php

function response_json (string|bool $success, array|string $data)
{
  header("Content-Type: application/json");
  echo json_encode(["success" => $success, "data" => $data]);
  exit();
}