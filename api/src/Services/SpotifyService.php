<?php

namespace App\Services;

use App\Middleware\SpotifyMiddleware;
use App\Models\MusicCard;
use GuzzleHttp\Psr7\Request;

class SpotifyService {
    private string $token;
    private SpotifyMiddleware $spotifyMiddleware;
    public function __construct() {
        $this->spotifyMiddleware = new SpotifyMiddleware();
        $this->token = $this->spotifyMiddleware->get_access_token();
    }

    public function get_infos_by_id_track($id_track): MusicCard {
        $url = "https://api.spotify.com/v1/tracks/$id_track";

        $response = $this->spotifyMiddleware->http_client->getAsync($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->token,
                'Content-Type' => 'application/json',
            ],
        ])->wait();

        $data = json_decode($response->getBody(), true);

        return new MusicCard($data);
    }

    public function get_music_by_title($title): array {
        $result = [];

        $url = "https://api.spotify.com/v1/search?q=$title&type=track&limit=3";

        $response = $this->spotifyMiddleware->http_client->getAsync($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->token,
                'Content-Type' => 'application/json',
            ]
        ])->wait();

        $data = json_decode($response->getBody(), true);

        foreach ($data["tracks"]["items"] as $music) {
            $result[] = new MusicCard($music);
        }

        return $result;
    }
}