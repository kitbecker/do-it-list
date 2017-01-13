-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jan 13, 2017 at 03:38 AM
-- Server version: 5.5.49-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doitlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` int(3) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `group_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `group_description`) VALUES
(1, 'Work', 'Things that need to be done at work.'),
(2, 'Education', 'Things to learn. Projects to execute. Experiments to ponder.'),
(3, 'Home', 'Things to do around the house.');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(4) NOT NULL,
  `group_id` int(4) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `group_id`, `name`, `description`, `done`) VALUES
(1, 1, 'work item 1', 'Work item 1 description.  ', 0),
(2, 1, 'work item 2', 'Description for item 2.', 0),
(8, 3, 'Home Item 1', 'Description for item 1.', 0),
(9, 3, 'Home Item 2', NULL, 0),
(10, 3, 'Home Item 3', NULL, 0),
(98, 2, 'test', NULL, 0),
(99, 2, 'View Done items option', NULL, 0),
(100, 2, 'add group function', NULL, 0),
(101, 2, 'delete group', NULL, 0),
(102, 2, 'edit group', NULL, 0),
(103, 2, 'add description', NULL, 0),
(104, 2, 'save description', NULL, 0),
(105, 2, 'edit description', NULL, 0),
(106, 2, 'delete done items', NULL, 0),
(107, 2, 'sub groups', NULL, 0),
(108, 2, 'drag and drop positioning?', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=109;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
