<?php

namespace App\Controllers;

use App\Repositories\RegisterRepository;
use Exception;
class RegisterController extends BaseController {

    private RegisterRepository $repository;
    public function __construct() {
        $this->repository = new RegisterRepository();
    }
    public function register_mail (): void {
       $mail = $_POST["mail"];
       $this->repository->register_mail($mail);
    }

    public function verify_mail (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $mail = $object->email;
        $code = $object->code;
        $this->repository->verify_mail($mail, $code);
    }

    public function register_password (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $password = $object->password;
        $mail = $object->mail;
        $this->repository->register_password($mail, $password);
    }

    public function register_infos (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $mail = $object->email;
        $ddn = $object->ddn;
        $age = $object->age;
        $first_name = $object->firstName;
        $current = $object->current;

        $this->repository->register_infos($mail, $ddn, $age, $first_name, $current);
    }

    public function register_gender (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $gender = $object->item;
        $mail = $object->mail;

        $this->repository->register_gender($mail, $gender);
    }

    public function register_looking (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $looking = $object->item;
        $mail = $object->mail;

        $this->repository->register_looking($mail, $looking);
    }

    public function register_relation (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $mail = clean_string($object->mail);
        $relation = clean_string($object->relation);

        $this->repository->register_relation($mail, $relation);
    }

    public function register_images (): void {
        $index = 0;
        $imageArray = [];
        $primary_images = $_POST["primaryIndex"];
        $email = $_POST["email"];
        $images = $_FILES;
        foreach ($images as $image) {
            try {
                $ext =  pathinfo($image["name"],PATHINFO_EXTENSION);
                $name = uniqid() . "." . $ext;
                move_uploaded_file($image["tmp_name"], $_SERVER["DOCUMENT_ROOT"] . "upload/" . $name );
                $imageArray[] = [
                    "name" => $name,
                    "primary" => $primary_images == $index ? 1 : 0,
                ];
            }
            catch (Exception $e) {
                var_dump($e->getMessage());
            }
            $index++;
        }
        $this->repository->register_images($imageArray, $email);
    }

    public function register_biography (): void {
        $raw = file_get_contents("php://input");
        $object = json_decode($raw);
        $biography = $object->biography;
        $email = $object->email;
        $this->repository->register_biography($biography, $email);
    }


}