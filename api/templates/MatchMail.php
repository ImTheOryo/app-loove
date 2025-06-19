<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #fbd3d9;
            color: #ff576c;
            text-align: center;
            padding: 20px;
            position: relative;
        }
        .header img {
            max-width: 60px;
            position: absolute;
            top: 5px;
            left: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }
        .profile-image {
            margin: 20px auto;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .footer {
            background-color: #f0f0f0;
            color: #999;
            text-align: center;
            font-size: 14px;
            padding: 10px;
        }


        @media only screen and (max-width: 600px) {
            .container {
                width: 90%;
                margin: 10px auto;
            }
            .header h1 {
                font-size: 20px;
            }
            .content p {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="https://www.dropbox.com/scl/fi/0stcrwtnz708u5us34zae/HarmonyLogo.png?rlkey=bo3evkxqm9cpm2b1d5rn48ld0&st=lt2do7j9&dl=1" alt="Logo Harmony">
        <h1>Nouveau Match</h1>
    </div>
    <div class="content">
        <p>Félicitations, vous avez un nouveau match !</p>
        <div class="profile-image">
            <img src="{{profile_image_url}}" alt="Photo de Profil">
        </div>
        <h3>
            {{first_name}}
        </h3>
        <p>Rendez-vous sur l'application pour discuter et organiser votre rencontre.</p>
    </div>
    <div class="footer">
        <p>&copy; 2025 Harmony. Tous droits réservés.</p>
    </div>
</div>
</body>
</html>