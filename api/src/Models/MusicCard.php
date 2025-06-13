<?php

namespace App\Models;
class MusicCard {
    public $music_id;
    public $music_name;
    public $music_artist;
    public $image_url;
    public function __construct($data) {
        $this->music_id = $data["id"];
        $this->music_name = $data["name"];
        $this->music_artist = $data["album"]["artists"][0]["name"];
        $this->image_url = $data["album"]["images"][0]["url"];
    }
}