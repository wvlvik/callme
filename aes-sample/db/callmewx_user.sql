-- phpMyAdmin SQL Dump
-- version 4.2.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 14, 2018 at 09:47 AM
-- Server version: 5.5.40
-- PHP Version: 5.6.36

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
-- Table structure for table `callmewx_user`
--

CREATE TABLE IF NOT EXISTS `callmewx_user` (
`id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `register_ip` varchar(32) NOT NULL,
  `last_login_time` bigint(11) NOT NULL,
  `last_login_ip` varchar(32) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `weixin_openid` varchar(128) NOT NULL,
  `avatar` varchar(64) NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `nickname` varchar(64) NOT NULL,
  `count` tinyint(4) NOT NULL,
  `create_date` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `callmewx_user`
--
ALTER TABLE `callmewx_user`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `callmewx_user`
--
ALTER TABLE `callmewx_user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
