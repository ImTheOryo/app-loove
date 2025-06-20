-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 20 juin 2025 à 21:25
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app_loove`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int NOT NULL,
  `first_name` varchar(65) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_role` int NOT NULL,
  `image_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `mail`, `password`, `id_role`, `image_name`) VALUES
(1, 'Enory', 'D\'Huysser', 'enory.dhuysser@harmony.fr', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 3, 'ltd3mv1wvuqphm.webp'),
(3, 'Cecile', 'Fischer', 'cecile.fischer@harmony.fr', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 2, 'f4817f7ffea248c4b80c6d8fb7ad50a5.webp'),
(4, 'Thomas', 'Malandain', 'thomas.malandain@harmony.fr', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 2, 'c63ae8c7-b25c-4cd3-9519-95bb87925b10.webp');

-- --------------------------------------------------------

--
-- Structure de la table `admin_role`
--

CREATE TABLE `admin_role` (
  `id` int NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `admin_role`
--

INSERT INTO `admin_role` (`id`, `role`) VALUES
(1, 'Support'),
(2, 'Modérateur'),
(3, 'Fondateur');

-- --------------------------------------------------------

--
-- Structure de la table `gender`
--

CREATE TABLE `gender` (
  `id` int NOT NULL,
  `gender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `gender`
--

INSERT INTO `gender` (`id`, `gender`) VALUES
(1, 'Homme'),
(2, 'Femme'),
(3, 'Au-delà de la binarité');

-- --------------------------------------------------------

--
-- Structure de la table `hobby`
--

CREATE TABLE `hobby` (
  `id` int NOT NULL,
  `hobby` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `hobby`
--

INSERT INTO `hobby` (`id`, `hobby`) VALUES
(1, '📚 Lecture'),
(2, '🏊 Natation'),
(3, '👨‍🍳 Cuisine'),
(4, '🎮 Jeux vidéo'),
(5, '🥾 Randonnée'),
(6, '📸 Photographie'),
(7, '⛰️ Voyage'),
(8, '🎶 Musique'),
(9, '🪩 Danse'),
(10, '🧑‍🎨 Peinture'),
(11, '🧑‍🌾 Jardinage'),
(12, '🧵 Couture'),
(13, '✍️ Écriture'),
(14, '🧘 Yoga'),
(15, '♟️ Échecs'),
(16, '🚴‍♂️ Cyclisme'),
(17, '🎣 Pêche'),
(18, '⚽️ Football'),
(19, '🏀 Basketball'),
(20, '🏃 Course à pied');

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int NOT NULL,
  `image_name` text NOT NULL,
  `user_id` int NOT NULL,
  `image_primary` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `image_name`, `user_id`, `image_primary`) VALUES
(1, 'Qm2B8Y9tLW5x.webp', 2, 1),
(2, 'L7pN9QmX4TBW.webp', 2, 0),
(3, 'T7X9mQW4Np3BL.webp', 2, 0),
(4, 'B5Y8Q2NmXtLW.webp', 2, 0),
(5, 'Lp92XY5mTQ3B.webp', 2, 0),
(6, 'QX3T7m9N5W4p.webp', 3, 1),
(7, 'Y9T7LQW3pX2B.webp', 3, 0),
(8, 'Z3X7pLa92TQB.webp', 3, 0),
(9, 'W4NzQ3T9B7pX.webp', 2, 0),
(11, '3n3Ppam7vgaVa1iaRUc9Lp.webp', 4, 1),
(12, '7ouMYWpwJ422jRcDASZB7P.webp', 4, 0),
(13, '1dGr1c8CrMLDpV6mPbImSI.webp', 4, 0),
(14, '2TpxZ7JUBn3uw46aR7qd6V.webp', 5, 1),
(15, '6rqhFgbbKwnb9MLmUQDhG6.webp', 5, 0),
(16, '0eGsygTp906u18L0Oimnem.webp', 5, 0),
(17, '5JZ7CnR6gTvEMKX4g70Amv.webp', 6, 1),
(18, '1zHlj4dQ8ZAtrayhuDDmkY.webp', 6, 0),
(19, '6habFhsOp2NvshLv26DqMb.webp', 6, 0),
(20, '6WrI0LAC5M1Rw2MnX2ZvEg.webp', 7, 1),
(21, '3tjFYV6RSFtuktYl3ZtYcq.webp', 7, 0),
(22, '4uLU6hMCjMI75M1A2tKUQC.webp', 7, 0),
(23, '5CtI0qwDJkDQGwXD1H1cLb.webp', 8, 1),
(24, '1zHlj4dQ8ZAtrayhuDDmkA.webp', 8, 0),
(25, '4MJst57HZgEosZqZv26FYB.webp', 9, 1),
(26, '2GFTSN2RM8L9IQS8A5WxCy.webp', 9, 0),
(27, '7dfTFAbmM52ICFdMm2C6xT.webp', 10, 1),
(28, '8xJ57bCNeJGoPtK2Fhs9RA.webp', 10, 0),
(29, '9AGT6wZLRJP34NdFy7TbQJ.webp', 11, 1),
(30, '5JK3T3GSXYL8CPZM92FDXW.webp', 11, 0),
(31, '6NP8YGMZ3JK5CXLD1WF9TB.webp', 12, 1),
(32, '3FDQ84P7XLZ9GKJ2MB6TYR.webp', 12, 0),
(33, '8G3FD12P6XJWMTZ9LKCYR5.webp', 13, 1),
(34, '1LMZ5YFGX8TWRPJK7C92TD.webp', 13, 0),
(35, '7KP8L1GWRF29XJT6ZMC3FD.webp', 13, 0),
(36, '2KPGM3F8XJWRT95LYCZ7FD.webp', 13, 0),
(37, '9XZTYLC5F7MGWR3JP82KD1.webp', 13, 0),
(46, '68486bc40808b.webp', 85, 1),
(47, '68486bc4081df.webp', 85, 0),
(48, '684bc960471ff.webp', 86, 0),
(49, '684bc960473b2.webp', 86, 1),
(54, '6854859da8323.webp', 1, 1),
(56, '6854940bce149.webp', 1, 0),
(57, '68552d1711d27.webp', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `user_id_1` int NOT NULL,
  `user_id_2` int NOT NULL,
  `user_1_skip` tinyint(1) NOT NULL DEFAULT '0',
  `user_2_skip` tinyint(1) NOT NULL DEFAULT '0',
  `is_match` tinyint(1) NOT NULL DEFAULT '0',
  `chat_id` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `user_id_1`, `user_id_2`, `user_1_skip`, `user_2_skip`, `is_match`, `chat_id`) VALUES
(1, 1, 2, 0, 0, 1, '6852fd8904f35'),
(2, 1, 4, 0, 0, 1, '6852fded43e15'),
(4, 1, 85, 0, 0, 1, '6853dc4b364d8'),
(5, 11, 1, 0, 0, 1, '6853dc4b364d9'),
(6, 13, 1, 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `chat_room_id` text NOT NULL,
  `id_sender` int NOT NULL,
  `message` text NOT NULL,
  `time` time NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `chat_room_id`, `id_sender`, `message`, `time`, `seen`) VALUES
(1, '6852fd8904f35', 1, 'Hello', '19:55:00', 1),
(2, '6852fded43e15', 1, 'Je teste', '19:57:00', 0),
(3, '6853b4b5b4d55', 1, 'Hello', '08:56:00', 0),
(4, '6853dc4b364d8', 1, 'Helklo', '11:45:00', 0),
(5, '6852fd8904f35', 1, 'Hello comment vas tu ? ', '00:48:00', 1),
(6, '6852fd8904f35', 2, 'Ca va et toi ', '00:48:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `premium`
--

CREATE TABLE `premium` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `date_debut` date NOT NULL,
  `date_end` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `premium`
--

INSERT INTO `premium` (`id`, `user_id`, `date_debut`, `date_end`) VALUES
(3, 1, '2023-06-16', '2029-03-16');

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `id` int NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `question`) VALUES
(1, 'Quelle chanson te met toujours de bonne humeur ?'),
(2, 'Si tu pouvais avoir une chanson pour représenter ton groupe d\'amis, laquelle choisirais-tu ?'),
(3, 'Quelle chanson te rappelle une soirée mémorable ?'),
(4, 'Quelle chanson décrit ton état d\'esprit en ce moment ?'),
(5, 'Quelle est la chanson qui te fait toujours chanter, même si tu es seul ?'),
(6, 'Quelle chanson est ton hymne pour les jours difficiles ?'),
(7, 'Si on organisait une fête, quelle chanson serait sur ta playlist obligatoire ?'),
(8, 'Quelle chanson t\'évoque des vacances parfaites ?'),
(9, 'Quelle chanson te rappelle ton ami(e) le/la plus proche ?'),
(10, 'Quelle chanson te fait penser à ton endroit préféré au monde ?'),
(11, 'Quelle chanson décrit ta vision de l\'amour ?'),
(12, 'Quelle chanson te rappelle ton plus beau rendez-vous ?'),
(13, 'Si tu pouvais dédier une chanson à ton futur partenaire, laquelle serait-ce ?'),
(14, 'Quelle chanson représente le mieux ta personnalité ?'),
(15, 'Quelle chanson t\'inspire quand tu penses à une relation idéale ?'),
(16, 'Quelle chanson te donne instantanément le sourire ?'),
(17, 'Quelle chanson jouerait en fond sonore lors de ton premier baiser ?'),
(18, 'Si tu devais choisir une chanson pour un slow avec ton partenaire, laquelle choisirais-tu ?'),
(19, 'Quelle chanson te motive à sortir de ta zone de confort ?'),
(20, 'Quelle chanson jouerait lors de ton mariage rêvé ?');

-- --------------------------------------------------------

--
-- Structure de la table `question_answer`
--

CREATE TABLE `question_answer` (
  `id` int NOT NULL,
  `id_question` int NOT NULL,
  `id_user` int NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `question_answer`
--

INSERT INTO `question_answer` (`id`, `id_question`, `id_user`, `answer`) VALUES
(4, 19, 3, '4LhDEsC2tzaVuZbWAaCLrP'),
(5, 9, 3, '0EgLxY52mpGsXETyEsgVlP'),
(6, 20, 3, '4sPLv86vGC9Y84pys78v9k'),
(7, 1, 4, '3n3Ppam7vgaVa1iaRUc9Lp'),
(8, 4, 4, '7ouMYWpwJ422jRcDASZB7P'),
(9, 7, 4, '1dGr1c8CrMLDpV6mPbImSI'),
(10, 2, 5, '2TpxZ7JUBn3uw46aR7qd6V'),
(11, 6, 5, '6rqhFgbbKwnb9MLmUQDhG6'),
(12, 3, 6, '0eGsygTp906u18L0Oimnem'),
(13, 8, 6, '5JZ7CnR6gTvEMKX4g70Amv'),
(14, 9, 7, '1zHlj4dQ8ZAtrayhuDDmkY'),
(15, 12, 7, '6habFhsOp2NvshLv26DqMb'),
(16, 13, 8, '6WrI0LAC5M1Rw2MnX2ZvEg'),
(17, 16, 8, '3tjFYV6RSFtuktYl3ZtYcq'),
(18, 11, 9, '4uLU6hMCjMI75M1A2tKUQC'),
(19, 19, 9, '5CtI0qwDJkDQGwXD1H1cLb'),
(20, 20, 9, '3n3Ppam7vgaVa1iaRUc9Lp'),
(21, 1, 10, '7ouMYWpwJ422jRcDASZB7P'),
(22, 5, 10, '1dGr1c8CrMLDpV6mPbImSI'),
(23, 14, 11, '2TpxZ7JUBn3uw46aR7qd6V'),
(24, 18, 11, '6rqhFgbbKwnb9MLmUQDhG6'),
(31, 3, 2, '12cZWGf5ZgLcKubEW9mx5q'),
(33, 4, 1, '0EgLxY52mpGsXETyEsgVlP'),
(34, 7, 86, '1Yk0cQdMLx5RzzFTYwmuld'),
(35, 8, 2, '60a0Rd6pjrkxjPbaKzXjfq'),
(38, 8, 2, '1RiCNSkK4AfT1j8ZM4JnVs'),
(41, 7, 1, '1lbNgoJ5iMrMluCyhI4OQP');

-- --------------------------------------------------------

--
-- Structure de la table `report`
--

CREATE TABLE `report` (
  `id` int NOT NULL,
  `user_id_reported` int NOT NULL,
  `user_id_reporter` int NOT NULL,
  `reason_id` int NOT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `report`
--

INSERT INTO `report` (`id`, `user_id_reported`, `user_id_reporter`, `reason_id`, `message`, `status`) VALUES
(3, 4, 1, 3, '', 3),
(4, 8, 1, 3, '', 3),
(7, 4, 2, 3, '', 1),
(15, 1, 85, 1, '', 2),
(16, 3, 85, 2, '', 3),
(17, 7, 10, 5, NULL, 1),
(18, 10, 1, 1, 'Il est vachement chiant', 2),
(20, 11, 9, 1, 'Lisdkjnfkjdsnfkjsd fkdjnsdkjf sdkjf. sdkjf ksd fskd fkjsd fjksd fkjsd fk ', 2),
(21, 1, 2, 2, 'IL M\'A INSUTLER LE BATARD', 3);

-- --------------------------------------------------------

--
-- Structure de la table `report_admin`
--

CREATE TABLE `report_admin` (
  `id` int NOT NULL,
  `report_id` int NOT NULL,
  `admin_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `report_admin`
--

INSERT INTO `report_admin` (`id`, `report_id`, `admin_id`) VALUES
(21, 3, 4),
(24, 15, 3),
(25, 16, 4),
(33, 20, 3),
(38, 18, 3),
(40, 21, 4);

-- --------------------------------------------------------

--
-- Structure de la table `report_reason`
--

CREATE TABLE `report_reason` (
  `id` int NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `report_reason`
--

INSERT INTO `report_reason` (`id`, `reason`) VALUES
(1, 'Harcèlement ou propos abusifs'),
(2, 'Menaces ou intimidation'),
(3, 'Proposition de transferts d\'argent ou d\'investissements suspects'),
(4, 'Utilisation de photos ou de fausses informations'),
(5, 'Photos inappropriées (nudité, violence, etc…)'),
(6, 'Publicité pour d’autres plateformes ou services'),
(7, 'Autre…');

-- --------------------------------------------------------

--
-- Structure de la table `report_status`
--

CREATE TABLE `report_status` (
  `id` int NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `report_status`
--

INSERT INTO `report_status` (`id`, `status`) VALUES
(1, 'Pas encore traité'),
(2, 'En cours de traitement'),
(3, 'Fermé');

-- --------------------------------------------------------

--
-- Structure de la table `search_type`
--

CREATE TABLE `search_type` (
  `id` int NOT NULL,
  `search_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `search_type`
--

INSERT INTO `search_type` (`id`, `search_type`) VALUES
(1, 'No lyrics, just vibes'),
(2, 'Feel first, define later’'),
(3, 'Find someone to feat'),
(4, 'Perfect Harmony');

-- --------------------------------------------------------

--
-- Structure de la table `subscription`
--

CREATE TABLE `subscription` (
  `id` int NOT NULL,
  `time` int NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `subscription`
--

INSERT INTO `subscription` (`id`, `time`, `amount`) VALUES
(1, 1, 29.99),
(2, 6, 89.99),
(3, 12, 149.99);

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `id` int NOT NULL,
  `amount` double NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `transaction`
--

INSERT INTO `transaction` (`id`, `amount`, `date`) VALUES
(1, 149.99, '2025-06-16'),
(2, 29.99, '2025-06-16'),
(3, 29.99, '2025-06-16'),
(4, 29.99, '2025-06-16'),
(5, 149.99, '2025-06-16'),
(6, 89.99, '2025-06-17');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `first_name` varchar(65) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `current` varchar(65) DEFAULT NULL,
  `biography` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `birth_date` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender_id` int DEFAULT NULL,
  `search_type_id` int DEFAULT NULL,
  `wanna_see_id` int DEFAULT NULL,
  `verify` tinyint(1) NOT NULL DEFAULT '0',
  `premium` int NOT NULL DEFAULT '0',
  `min_age` int DEFAULT NULL,
  `max_age` int DEFAULT NULL,
  `distance` int NOT NULL DEFAULT '50',
  `verify_code` int DEFAULT NULL,
  `reset_code` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `first_name`, `mail`, `password`, `current`, `biography`, `birth_date`, `age`, `gender_id`, `search_type_id`, `wanna_see_id`, `verify`, `premium`, `min_age`, `max_age`, `distance`, `verify_code`, `reset_code`, `latitude`, `longitude`, `status`) VALUES
(1, 'Enory', 'oryo@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Harmony Owner', 'Owner of Harmony\n😍Loving My job😍', '2004-05-31', 20, 2, 4, 3, 1, 1, 18, 61, 100, NULL, NULL, 47.923939620455, 1.8782294866972, 2),
(2, 'Julie', 'julie@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Étudiante', 'Hello ! Je m\'appelle Julie, j\'ai 20 ans et je vis à Lyon. Passionnée par les voyages et la photographie, j\'adore capturer les moments uniques et découvrir de nouvelles cultures. Quand je ne suis pas en train d\'explorer de nouveaux horizons, tu me trouveras probablement en train de savourer un bon café dans un petit coin sympa de la ville ou de tester une nouvelle recette en cuisine.\nJ\'aime tout tester 😍', '2005-05-17', 20, 2, 3, 1, 1, 0, 18, 22, 50, NULL, NULL, 47.923874037837, 1.8781273528001, 2),
(3, 'Mark', 'mark@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Étudiant CODA - Orléans', 'Salut, moi c’est Mark, j’ai 20 ans et je viens de Toulouse. Étudiant en informatique, je suis un passionné de technologie et de gaming, mais je sais aussi lâcher mon clavier pour une partie de foot ou une virée en plein air. 🌳⚽\n\nJe suis un gars simple, qui adore rire et profiter des petits plaisirs de la vie. Que ce soit un bon film, une soirée entre amis, ou un road trip improvisé, je suis toujours partant pour des moments authentiques.', '2015-05-12', 20, 1, 1, 3, 1, 0, 18, 22, 50, NULL, NULL, 48.515291977800224, 1.754407095412485, 2),
(4, 'Alice', 'alice@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Développeuse', 'Passionnée par la nature et la lecture.', '2002-08-15', 23, 2, 4, 3, 1, 1, 18, 30, 50, NULL, NULL, 47.923742991425, 1.878075361545, 4),
(5, 'Bob', 'bob@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Designer', 'Fan d\'art et de musique.', '1998-04-12', 27, 1, 1, 2, 1, 1, 22, 35, 50, NULL, NULL, 47.39909724686704, 2.3035798733631037, 2),
(6, 'Chloé', 'chloe@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Étudiante', 'Aime voyager et cuisiner.', '2000-03-25', 25, 2, 3, 1, 1, 0, 20, 28, 50, NULL, NULL, 47.895137581642174, 0.5579527219474002, 2),
(7, 'David', 'david@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Photographe', 'Photographe passionné et amateur de randonnée.', '1995-09-10', 30, 1, 4, 3, 1, 1, 24, 40, 50, NULL, NULL, 47.622510506421975, 2.7540218743160803, 2),
(8, 'Emma', 'emma@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Avocate', 'Toujours prête à relever des défis.', '1996-11-05', 29, 2, 2, 3, 1, 0, 23, 33, 50, NULL, NULL, 47.73275443492558, 1.7080538153754539, 2),
(9, 'François', 'francois@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Enseignant', 'Professeur de mathématiques et grand amateur d\'échecs.', '1988-12-19', 37, 1, 1, 2, 1, 0, 28, 45, 50, NULL, NULL, 48.474744230547806, 1.920087917015562, 2),
(10, 'Gabrielle', 'gabrielle@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Musicienne', 'Pianiste et chanteuse à ses heures perdues.', '2001-06-14', 24, 2, 4, 3, 1, 0, 18, 29, 50, NULL, NULL, 47.77036479346407, 1.7494883113992232, 2),
(11, 'Hugo', 'hugo@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Ingénieur', 'Ingénieur en informatique et passionné de jeux vidéo.', '1993-02-07', 32, 1, 3, 2, 1, 0, 25, 40, 50, NULL, NULL, 47.923747382371, 1.8780940615107, 2),
(12, 'Isabelle', 'isabelle@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Médecin', 'Médecin généraliste qui adore le yoga.', '1990-10-01', 35, 2, 2, 1, 1, 0, 30, 38, 50, NULL, NULL, 47.90788512376844, 2.30882928758973, 2),
(13, 'Jacques', 'jacques@gmail.com', '$2y$10$psKAmjuZfsqd9sCrRP9zPu1A9kRDeyp8YxRC1yV/1Z5kMxHiOdYcO', 'Entrepreneur', 'Entrepreneur dans la tech et amateur de cyclisme.', '1985-05-22', 40, 1, 1, 3, 1, 0, 30, 45, 50, NULL, NULL, 47.59824327606138, 3.0378419326847803, 2),
(85, 'Enory', 'biwomix300@lewou.com', '$2y$10$5AdL.NwGrrNAEEeZtuS1f.V1.8CWxHOevTKoXxIZJIThKtyYt7SrC', 'Etudiant', NULL, '2004-08-31', 20, 1, 4, 2, 1, 0, 20, 23, 50, NULL, NULL, 47.923832900362, 1.8781478639718, 2),
(86, 'Enory', 'loset49379@forcrack.com', '$2y$10$yn5I1zAoqFg1EbyzbMsMLesKjRhtD7xUey5N3ZfH6be761ZButYy.', 'Etudiant', NULL, '2000-07-31', 24, 1, 1, 2, 1, 0, 24, 27, 50, NULL, '6853cd55aae1e', 48.0223640248097, 2.1359772680151456, 2);

-- --------------------------------------------------------

--
-- Structure de la table `user_hobby`
--

CREATE TABLE `user_hobby` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `hobby_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_hobby`
--

INSERT INTO `user_hobby` (`id`, `user_id`, `hobby_id`) VALUES
(1, 2, 16),
(2, 2, 5),
(3, 2, 13),
(4, 2, 2),
(5, 2, 18),
(6, 3, 15),
(7, 3, 4),
(8, 3, 2),
(11, 2, 7),
(12, 2, 6),
(13, 3, 18),
(14, 3, 15),
(15, 4, 1),
(16, 4, 7),
(17, 5, 3),
(18, 5, 8),
(19, 6, 2),
(20, 6, 13),
(21, 7, 5),
(22, 7, 6),
(23, 8, 10),
(24, 8, 8),
(25, 9, 15),
(26, 9, 17),
(27, 10, 8),
(28, 10, 14),
(29, 11, 4),
(30, 11, 16),
(31, 12, 9),
(32, 12, 14),
(33, 13, 4),
(34, 13, 16),
(59, 1, 9),
(72, 1, 1),
(73, 1, 4),
(77, 1, 14),
(78, 1, 17),
(79, 2, 1),
(84, 1, 3),
(85, 1, 8),
(86, 1, 16),
(87, 1, 15);

-- --------------------------------------------------------

--
-- Structure de la table `user_status`
--

CREATE TABLE `user_status` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_status`
--

INSERT INTO `user_status` (`id`, `status`) VALUES
(1, 'Non complété'),
(2, 'Activé'),
(3, 'Désactivé'),
(4, 'Banni');

-- --------------------------------------------------------

--
-- Structure de la table `wanna_see`
--

CREATE TABLE `wanna_see` (
  `id` int NOT NULL,
  `wanna_see` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `wanna_see`
--

INSERT INTO `wanna_see` (`id`, `wanna_see`) VALUES
(1, 'Hommes'),
(2, 'Femmes'),
(3, 'Les deux');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_role` (`id_role`);

--
-- Index pour la table `admin_role`
--
ALTER TABLE `admin_role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `hobby`
--
ALTER TABLE `hobby`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_chat_id` (`chat_id`(255)),
  ADD KEY `user_id_1` (`user_id_1`),
  ADD KEY `user_id_2` (`user_id_2`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sender` (`id_sender`);

--
-- Index pour la table `premium`
--
ALTER TABLE `premium`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `question_answer`
--
ALTER TABLE `question_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_answer_ibfk_1` (`id_question`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_reported` (`user_id_reported`),
  ADD KEY `user_id_reporter` (`user_id_reporter`),
  ADD KEY `status` (`status`),
  ADD KEY `report_ibfk_3` (`reason_id`);

--
-- Index pour la table `report_admin`
--
ALTER TABLE `report_admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `report_id` (`report_id`);

--
-- Index pour la table `report_reason`
--
ALTER TABLE `report_reason`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `report_status`
--
ALTER TABLE `report_status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `search_type`
--
ALTER TABLE `search_type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gender_id` (`gender_id`),
  ADD KEY `search_type_id` (`search_type_id`),
  ADD KEY `wanna_see_id` (`wanna_see_id`),
  ADD KEY `status` (`status`);

--
-- Index pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hobby_id` (`hobby_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `wanna_see`
--
ALTER TABLE `wanna_see`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `admin_role`
--
ALTER TABLE `admin_role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `gender`
--
ALTER TABLE `gender`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `hobby`
--
ALTER TABLE `hobby`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `premium`
--
ALTER TABLE `premium`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `question_answer`
--
ALTER TABLE `question_answer`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `report`
--
ALTER TABLE `report`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `report_admin`
--
ALTER TABLE `report_admin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `report_reason`
--
ALTER TABLE `report_reason`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `report_status`
--
ALTER TABLE `report_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `search_type`
--
ALTER TABLE `search_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT pour la table `user_status`
--
ALTER TABLE `user_status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `wanna_see`
--
ALTER TABLE `wanna_see`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `admin_role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id_1`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id_2`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`id_sender`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `premium`
--
ALTER TABLE `premium`
  ADD CONSTRAINT `premium_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `question_answer`
--
ALTER TABLE `question_answer`
  ADD CONSTRAINT `question_answer_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `question` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `question_answer_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`user_id_reported`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`user_id_reporter`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `report_ibfk_3` FOREIGN KEY (`reason_id`) REFERENCES `report_reason` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `report_ibfk_4` FOREIGN KEY (`status`) REFERENCES `report_status` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `report_admin`
--
ALTER TABLE `report_admin`
  ADD CONSTRAINT `report_admin_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `report_admin_ibfk_2` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`search_type_id`) REFERENCES `search_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`wanna_see_id`) REFERENCES `wanna_see` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_ibfk_4` FOREIGN KEY (`status`) REFERENCES `user_status` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user_hobby`
--
ALTER TABLE `user_hobby`
  ADD CONSTRAINT `user_hobby_ibfk_1` FOREIGN KEY (`hobby_id`) REFERENCES `hobby` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `user_hobby_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
