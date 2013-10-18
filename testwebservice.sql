-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Gazda: localhost
-- Timp de generare: 18 Oct 2013 la 16:49
-- Versiune server: 5.6.12-log
-- Versiune PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Bază de date: `testwebservice`
--
CREATE DATABASE IF NOT EXISTS `testwebservice` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `testwebservice`;

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `deseuri`
--

CREATE TABLE IF NOT EXISTS `deseuri` (
  `id_deseu` int(11) NOT NULL AUTO_INCREMENT,
  `denumire` varchar(250) NOT NULL,
  PRIMARY KEY (`id_deseu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `imagini`
--

CREATE TABLE IF NOT EXISTS `imagini` (
  `id_imag` varchar(25) NOT NULL,
  `path` varchar(500) NOT NULL,
  `verificata` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Salvarea datelor din tabel `imagini`
--

INSERT INTO `imagini` (`id_imag`, `path`, `verificata`) VALUES
('1382045736.6826WRTPIC', './library/img/', 0);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `inregistrari`
--

CREATE TABLE IF NOT EXISTS `inregistrari` (
  `id_inreg` int(11) NOT NULL AUTO_INCREMENT,
  `data_inreg` date NOT NULL,
  `ora_inreg` time NOT NULL,
  `tip_deseu` tinyint(4) NOT NULL,
  `id_imag` varchar(25) NOT NULL,
  `latitudine` double NOT NULL,
  `longitudine` double NOT NULL,
  `nume_ecologist` varchar(250) NOT NULL,
  `prenume_ecologist` varchar(500) NOT NULL,
  `nr_tel` int(18) NOT NULL,
  PRIMARY KEY (`id_inreg`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Salvarea datelor din tabel `inregistrari`
--

INSERT INTO `inregistrari` (`id_inreg`, `data_inreg`, `ora_inreg`, `tip_deseu`, `id_imag`, `latitudine`, `longitudine`, `nume_ecologist`, `prenume_ecologist`, `nr_tel`) VALUES
(3, '2013-10-18', '00:35:36', 1, '1382045736.6826WRTPIC', 234, 23, 'Vasile', 'Grigore', 2147483647);

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `text` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structura de tabel pentru tabelul `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_u` int(11) NOT NULL AUTO_INCREMENT,
  `nume` varchar(250) NOT NULL,
  `prenume` varchar(500) NOT NULL,
  `denumire_firma` varchar(1200) NOT NULL,
  `username_u` varchar(100) NOT NULL,
  `password_u` varchar(100) NOT NULL,
  PRIMARY KEY (`id_u`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Salvarea datelor din tabel `users`
--

INSERT INTO `users` (`id_u`, `nume`, `prenume`, `denumire_firma`, `username_u`, `password_u`) VALUES
(1, 'Utilizator', 'Test', 'S.C. Demo S.R.L.', 'test', 'a'),
(2, 'Doe', 'John', 'Anonymous', 'john', 'a');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
