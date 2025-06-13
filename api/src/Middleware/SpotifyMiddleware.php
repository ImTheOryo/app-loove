<?php

namespace App\Middleware;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class SpotifyMiddleware {
    private $client_id;
    private $client_secret;
    private $access_token;
    private $token_expiration;
    public $http_client;

    public function __construct() {
        $this->client_id = $_ENV['SPOTIFY_CLIENT_ID'];
        $this->client_secret = $_ENV['SPOTIFY_CLIENT_SECRET'];
        $this->access_token = null;
        $this->token_expiration = 0;
        $this->http_client = new Client();
    }

    public function get_access_token() {
        if ($this->access_token && time() < $this->token_expiration){
            return $this->access_token;
        }

        return $this->get_token();
    }

    public function get_token() {

        $request = new Request('POST', 'https://accounts.spotify.com/api/token', [
            'Authorization' => 'Basic ' . base64_encode("$this->client_id:$this->client_secret"),
            'Content-Type' => 'application/x-www-form-urlencoded',
        ]);

        $response = $this->http_client->sendAsync($request, [
            'form_params' => [
                'grant_type' => 'client_credentials',
            ],
        ])->wait();

        $response = json_decode($response->getBody(), true);

        if (isset($response)) {
            $this->access_token = $response['access_token'];
            $this->token_expiration = time() + $response['expires_in'];
        }

        return $this->access_token;
    }
}