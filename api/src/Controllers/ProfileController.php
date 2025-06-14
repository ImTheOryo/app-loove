<?php

namespace App\Controllers;

use App\Repositories\ProfileRepository;
use App\Repositories\UserRepository;

class ProfileController extends BaseController {
    private $repository;

    public function __construct () {
        $this->repository = new ProfileRepository();
    }

    public function get_user ($user_id) {
        $this->repository->get_user($user_id);
    }

    public function get_user_infos(int $user_id): void {
        $this->repository->get_user_infos($user_id);
    }

    public function get_biography(int $user_id): void {
        $this->repository->get_biography($user_id);
    }

    public function update_biography(int $user_id): void {
        $data = file_get_contents("php://input");
        $biography = json_decode($data);
        $this->repository->update_biography($user_id, $biography);
    }

    public function get_hobbies(): void {
        $this->repository->get_hobbies();
    }

    public function get_hobby(int $user_id): void {
        $this->repository->get_hobby($user_id);
    }

    public function update_hobby(int $user_id, int $hobby_id): void {
        $this->repository->update_hobby($user_id, $hobby_id);
    }

    public function get_musics(int $user_id): void {
        $this->repository->get_musics($user_id);
    }

    public function delete_music(int $qa_id): void {
        $this->repository->delete_music($qa_id);
    }

    public function get_questions(): void {
        $this->repository->get_questions();
    }

    public function get_music_title(string $title): void {
        $this->repository->get_music_title($title);
    }

    public function add_music (int $user_id): void{
        $raw = file_get_contents("php://input");
        $data = json_decode($raw);
        $question_id = $data->question_id;
        $answer = $data->answer;
        $this->repository->add_music($user_id, $question_id, $answer);
    }

    public function get_gender (int  $user_id): void {
        $this->repository->get_gender($user_id);
    }

    public function update_gender (int $user_id, int $gender_id): void {
        $this->repository->update_gender($user_id, $gender_id);
    }

    public function get_relation (int $user_id): void {
        $this->repository->get_relation($user_id);
    }

    public function update_relation (int $user_id, int $relation_id): void {
        $this->repository->update_relation($user_id, $relation_id);
    }
}