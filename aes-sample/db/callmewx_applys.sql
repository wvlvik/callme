-- phpMyAdmin SQL Dump
-- version 4.2.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 14, 2018 at 04:14 PM
-- Server version: 5.5.40
-- PHP Version: 5.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wxcallme`
--

-- --------------------------------------------------------

--
-- Table structure for table `callmewx_applys`
--

CREATE TABLE IF NOT EXISTS `callmewx_applys` (
`id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `image` varchar(256) NOT NULL,
  `type` tinyint(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `supercode_id` varchar(64) NOT NULL,
  `create_date` bigint(128) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `callmewx_applys`
--
ALTER TABLE `callmewx_applys`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `callmewx_applys`
--
ALTER TABLE `callmewx_applys`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=1;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;