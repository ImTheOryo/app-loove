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
        .button {
            display: inline-block;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #ff576c;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
        }
        .footer {
            background-color: #f0f0f0;
            color: #999;
            text-align: center;
            font-size: 14px;
            padding: 10px;
        }

        /* Responsive Styles */
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
            .button {
                font-size: 14px;
                padding: 10px 16px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.dropbox.com/scl/fi/0stcrwtnz708u5us34zae/HarmonyLogo.png?rlkey=bo3evkxqm9cpm2b1d5rn48ld0&st=lt2do7j9&dl=1" alt="Logo Harmony">
            <h1>Réinitialisation de votre mot de passe</h1>
        </div>
        <div class="content">
            <p>Bonjour,</p>
            <p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte Harmony.</p>
            <p>Si vous avez initié cette demande, cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href="{{reset_link}}" class="button">Réinitialiser mon mot de passe</a>
            <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet e-mail ou contactez notre support si vous avez des inquiétudes.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Harmony. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
