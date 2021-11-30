-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Dim 17 Octobre 2021 à 23:14
-- Version du serveur :  5.7.35-0ubuntu0.18.04.2
-- Version de PHP :  7.2.24-0ubuntu0.18.04.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `jobboard`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisement`
--

CREATE TABLE `advertisement` (
  `id_adv` int(255) NOT NULL,
  `nom_adv` varchar(50) NOT NULL,
  `desc_courte` varchar(255) NOT NULL,
  `desc_long` text NOT NULL,
  `type_adv` varchar(50) NOT NULL,
  `date_ajout` date NOT NULL,
  `date_fin` date NOT NULL,
  `id_comp` int(50) DEFAULT NULL,
  `id_apply` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `advertisement`
--

INSERT INTO `advertisement` (`id_adv`, `nom_adv`, `desc_courte`, `desc_long`, `type_adv`, `date_ajout`, `date_fin`, `id_comp`, `id_apply`) VALUES
(3, 'Recherche d\'un professeur Java', 'Un enseignant', '1- Missions\r\n2- Compétences', 'CDD', '2021-10-04', '2021-10-09', 3, NULL),
(4, 'Recherche de zouzou', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et viverra nisi', 'CDD', '2021-10-14', '2021-10-30', 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `apply`
--

CREATE TABLE `apply` (
  `id_apply` int(255) NOT NULL,
  `id_comp` int(255) NOT NULL,
  `id_adv` int(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `cv` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `apply`
--

INSERT INTO `apply` (`id_apply`, `id_comp`, `id_adv`, `customer_name`, `cv`, `content`) VALUES
(2, 3, 3, '', 'test', 'blahblablablabla'),
(3, 3, 3, '', 'testcv', 'testcontent'),
(4, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(5, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(6, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(7, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(8, 3, 3, '', 'testcv', 'testcontent'),
(9, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(10, 3, 3, 'ADMIN', 'testcv', 'testcontent'),
(11, 1, 3, 'CMP', 'testcv', 'testcontent'),
(12, 1, 3, 'CMP', 'testcv', 'testcontent'),
(13, 1, 3, 'CMP', 'testcv', 'testcontent'),
(14, 1, 3, 'CMP', 'testcv', 'testcontent'),
(15, 1, 3, 'CMP', 'testcv', 'testcontent'),
(16, 1, 3, 'CMP', 'testcv', 'testcontent'),
(17, 1, 3, 'CMP', 'testcv', '[object Object]'),
(18, 1, 3, 'CMP', 'testcv', ''),
(19, 1, 3, 'CMP', 'testcv', ''),
(20, 1, 3, 'CMP', 'testcv', ''),
(21, 1, 3, 'CMP', 'testcv', 'azeaze'),
(22, 1, 3, 'CMP', 'testcv', 'azeaze'),
(23, 1, 3, 'CMP', 'testcv', 'jknl'),
(24, 1, 3, 'CMP', 'eee', 'ezz');

-- --------------------------------------------------------

--
-- Structure de la table `compagnie`
--

CREATE TABLE `compagnie` (
  `id_comp` int(255) NOT NULL,
  `name_comp` varchar(50) NOT NULL,
  `info_comp` text NOT NULL,
  `secteur` varchar(255) NOT NULL,
  `id_adv` int(255) DEFAULT NULL,
  `id_apply` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `compagnie`
--

INSERT INTO `compagnie` (`id_comp`, `name_comp`, `info_comp`, `secteur`, `id_adv`, `id_apply`) VALUES
(1, 'google', 'nous sommes ...', 'BIG DATA', 1, NULL),
(2, 'Facebook', 'Situé à lyon', 'Big Data', NULL, NULL),
(3, 'Epitech', 'Né en 1999 ...', 'Enseignement', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `compagnie` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `customers`
--

INSERT INTO `customers` (`id`, `email`, `NAME`, `password`, `compagnie`) VALUES
(85, 'ADMIN@ADMIN', 'ADMIN', 'admin', 0),
(88, 'CMP@test', 'CMP', 'test', 0),
(89, 'zouzou@zouzouaze', 'aze', 'azeaze', 1),
(92, 'privesam69@gmail.com', 'samy', 'zz', 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id_adv`),
  ADD KEY `C2` (`id_comp`),
  ADD KEY `id_apply` (`id_apply`);

--
-- Index pour la table `apply`
--
ALTER TABLE `apply`
  ADD PRIMARY KEY (`id_apply`),
  ADD KEY `id_comp` (`id_comp`),
  ADD KEY `id_adv` (`id_adv`);

--
-- Index pour la table `compagnie`
--
ALTER TABLE `compagnie`
  ADD PRIMARY KEY (`id_comp`),
  ADD KEY `c3` (`id_adv`),
  ADD KEY `id` (`id_apply`);

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id_adv` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `apply`
--
ALTER TABLE `apply`
  MODIFY `id_apply` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `compagnie`
--
ALTER TABLE `compagnie`
  MODIFY `id_comp` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `advertisement`
--
ALTER TABLE `advertisement`
  ADD CONSTRAINT `id_apply` FOREIGN KEY (`id_apply`) REFERENCES `apply` (`id_apply`);

--
-- Contraintes pour la table `apply`
--
ALTER TABLE `apply`
  ADD CONSTRAINT `id_adv` FOREIGN KEY (`id_adv`) REFERENCES `advertisement` (`id_adv`);

--
-- Contraintes pour la table `compagnie`
--
ALTER TABLE `compagnie`
  ADD CONSTRAINT `id` FOREIGN KEY (`id_apply`) REFERENCES `apply` (`id_apply`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
