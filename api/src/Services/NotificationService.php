<?php

namespace App\Services;

use \Pusher\PushNotifications\PushNotifications;

class NotificationService{
    private $beamsClient;
    public function __construct () {
         $this->beamsClient= new PushNotifications(array(
            "instanceId" => $_ENV['PUSHER_NOTIF_INSTANCE_ID'],
            "secretKey" => $_ENV['PUSHER_NOTIF_PRIMARY_KEY'],
        ));


    }

    public function send_notification_new_match($send_to, $name) {

        $this->beamsClient->publishToInterests(
            ["$send_to"],
            [
                "fcm" => [
                    "notification" => [
                        "title" => "Nouveau Match",
                        "body" => "Vous avez matcher avec $name",
                        "icon" => "https://harmony-api.dev/upload/file-8KYZZBsr5h5zenqsuTiFpy.png",
                    ]
                ],
                "web" => [
                    "notification" => [
                        "title" => "Nouveau Match",
                        "body" => "Vous avez matcher avec $name",
                        "icon" => "https://harmony-api.dev/upload/file-8KYZZBsr5h5zenqsuTiFpy.png",
                    ]
                ]
            ]
        );
    }

}