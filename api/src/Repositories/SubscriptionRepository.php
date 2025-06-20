<?php

namespace App\Repositories;

use App\Models\Subscription;
use App\Services\JwtService;
use DateInterval;
use DateTime;

class SubscriptionRepository extends BaseRepository {
    public function subscribe_user($user_id, $subscription_time_in_months): void {
        $today = new DateTime();
        $jwt = new JwtService();
        $token = $jwt->generate(['status' => $_ENV['JWT_USER_KEY'], 'subscription' => 1]);

        $price = $this
            ->query("SELECT amount FROM subscription WHERE time = :time")
            ->fetch(['time' => $subscription_time_in_months])
        ;

        $this
            ->query("INSERT INTO transaction (amount, date) VALUES (:amount, :date)")
            ->execute(['amount' => $price['amount'], 'date' => $today->format('Y-m-d H:i:s')])
        ;


        $count = $this
            ->query("SELECT COUNT(*) AS already_premium FROM premium WHERE user_id = :user_id")
            ->fetch(['user_id' => $user_id])
        ;

        if ($count['already_premium'] > 0) {

            $time = $this
                ->query("SELECT date_end FROM premium WHERE user_id = :user_id")
                ->fetch(['user_id' => $user_id])
            ;

            $date_end = new DateTime($time['date_end']);

            if ($today > $date_end) {

                $new_end_time = (clone $today)->add(new DateInterval('P' . $subscription_time_in_months . 'M'));
                $this
                    ->query("UPDATE premium SET date_debut = :date_debut, date_end = :date_end WHERE user_id = :user_id")
                    ->execute([
                        "date_debut" => $today->format('Y-m-d H:i:s'),
                        "date_end" => $new_end_time->format('Y-m-d H:i:s'),
                        "user_id" => $user_id
                    ])
                ;
                response_json(200, null, $token);
            } else {

                $new_end_time = $date_end->add(new DateInterval('P' . $subscription_time_in_months . 'M'));
                $this
                    ->query("UPDATE premium SET date_end = :date_end WHERE user_id = :user_id")
                    ->execute([
                        "date_end" => $new_end_time->format('Y-m-d H:i:s'),
                        "user_id" => $user_id
                    ])
                ;
                response_json(200, null, $token);
            }
        } else {
            $new_end_time = (clone $today)->add(new DateInterval('P' . $subscription_time_in_months . 'M'));
            $this
                ->query("INSERT INTO premium (user_id, date_debut, date_end) VALUES (:user_id, :date_debut, :date_end)")
                ->execute([
                    "user_id" => $user_id,
                    "date_debut" => $today->format('Y-m-d H:i:s'),
                    "date_end" => $new_end_time->format('Y-m-d H:i:s')
                ])
            ;
            response_json(200, null, $token);

        }
    }

    public function check_subscription($user_id): bool {
        $today = new DateTime();

        $res = $this
            ->query("SELECT date_end FROM premium WHERE user_id = :user_id")
            ->fetch(['user_id' => $user_id])
        ;

        if ($res && isset($res['date_end'])) {

            $is_subscription_expired = $today->format('Y-m-d') < $res['date_end'];

            $status = $is_subscription_expired ? 1 : 0;
            $this
                ->query("UPDATE user SET premium = :status WHERE id = :user_id")
                ->execute(['status' => $status, 'user_id' => $user_id]);

            return $is_subscription_expired;
        }

        return false;
    }

    public function get_subscription(): void {
        $result = [];
        $subscriptions = $this
            ->query('SELECT * FROM subscription')
            ->fetchAll()
        ;
        foreach ($subscriptions as $subscription) {
            $result[$subscription["time"]."-months"] = new Subscription($subscription);
        }
        response_json(200, $result);
    }
}