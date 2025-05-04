<?php

namespace App\Core;

use App\Services\JwtService;
use Exception;
use ReflectionClass;
use App\Controllers\BaseController;

class Routeur
{

  public function __construct (
    private array $routes = []
  )
  {
  }

  public function addRoute (string|array $methods, string $path, string $controller, string $action, $restriction = "")
  {
    if (is_string($methods)) {
      $methods = [$methods];
    }

    $this -> routes[] = new Route($path, $controller, $action, $methods, $restriction);
  }

  public function request (Request $request): Response
  {
    $response = new Response(404, "Route not found");

    /** @var Route $route */
    foreach ($this -> routes as $route) {
      if ($route -> isValidFor($request)) {

        if ($route -> getRestriction() != "") {
          if (isset(getallheaders()['Authorization'])) {
            $jwt = new JwtService();
            $header = $jwt -> verify(getallheaders()['Authorization']);
            if ($header -> status !== $route -> getRestriction()) {
              response_json(403);
            }
          } else {
            response_json(401);
          }
        }

        $reflected_controller = new ReflectionClass($route -> getController());

        $exploded_uri = explode('/', trim($request -> uri));
        $indexes = $this -> indexOfParams($route -> getPath());
        $params = array_filter($exploded_uri, function ($v, $k) use ($indexes) {
          return in_array($k, $indexes, true);
        }, ARRAY_FILTER_USE_BOTH);

        /** @var BaseController $controller */
        $controller = $reflected_controller -> newInstance();
        $controller -> setRequest($request);

        try {
          response_json(200, call_user_func_array([$controller, $route -> getAction()],$params));
        } catch (Exception $e) {
          response_json(404, $e -> getMessage());
        }
      }
    }

    return $response;
  }

  private function indexOfParams (string $path): array
  {
    $exploded_path = explode('/', trim($path));
    $indexes = [];

    foreach ($exploded_path as $key => $value) {
      if (str_contains($value, '{') && str_contains($value, '}')) {
        $indexes[] = $key;
      }
    }
    return $indexes;
  }

}