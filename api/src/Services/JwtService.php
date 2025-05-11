<?php

namespace App\Services;

use DateTimeImmutable;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JwtService
{
    private string $secret;
    private string $algorithm = 'HS256';

    public function __construct()
    {
        $this->secret = $_ENV['JWT_SECRET'];
    }

    public function generate(array $payload, int $expiration = 60): string
    {
        $time = new DateTimeImmutable();
        $payload['iat'] = $time->getTimestamp();
        $payload['exp'] = $time->modify("+{$expiration} minutes")->getTimestamp();

        return JWT::encode($payload, $this->secret, $this->algorithm);
    }

    public function verify(string $token)
    {
        try {
            $token = preg_match('/^Bearer\s+([A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+)$/', $token, $matches) ? $matches[1] : null;
            return JWT::decode($token, new Key($this->secret, $this->algorithm));
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}