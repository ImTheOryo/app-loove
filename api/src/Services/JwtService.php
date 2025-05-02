<?php

namespace App\Services;

use DateTimeImmutable;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
  private string $secret;
  private string $algorithm = 'HS256';

  public function __construct ()
  {
    $this -> secret = $_ENV['JWT_SECRET'];
  }

  public function generate (array $payload, int $expiration = 15): string
  {
    $time = new DateTimeImmutable();
    $payload['iat'] = $time;
    $payload['exp'] = $time -> modify("+{$expiration} minutes") -> getTimestamp();

    return JWT ::encode($payload, $this -> secret, $this -> algorithm);
  }

  public function verify (string $token): ?\stdClass
  {
    try {
      return JWT ::decode($token, new Key($this -> secret, $this -> algorithm));
    } catch (Exception) {
      return null;
    }
  }
}