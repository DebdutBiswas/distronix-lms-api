SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `distronixlms`
--

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--

CREATE TABLE `Books` (
  `id` int UNSIGNED NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(510) DEFAULT NULL,
  `publisher` varchar(510) DEFAULT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `available` int UNSIGNED NOT NULL DEFAULT '0',
  `lent` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `subject` smallint UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Books`
--

INSERT INTO `Books` (`id`, `isbn`, `name`, `author`, `publisher`, `reg_date`, `available`, `lent`, `active`, `subject`) VALUES
(1, '978-8-4915-0809-0', 'Book1', 'Author1', 'Publisher1', '2022-01-07 20:10:39', 20, 0, 1, 2),
(2, '978-8-4915-0709-0', 'Book2', 'Author1', 'Publisher1', '2022-01-07 20:11:40', 34, 0, 1, 1),
(3, '978-4-8602-5537-6', 'Book3', 'Author3', 'Publisher3', '2022-01-07 20:12:40', 42, 3, 1, 3),
(4, '978-8-5018-0709-0', 'Book4', 'Author3', 'Publisher2', '2022-01-07 20:16:43', 100, 6, 1, 6),
(5, '978-8-6018-0709-0', 'Book5', 'Author2', 'Publisher1', '2022-01-07 20:24:56', 90, 5, 1, 2),
(6, '976-9-8602-5537-6', 'Book6', 'Author2', 'Publisher1', '2022-01-07 21:31:30', 10, 0, 1, 5),
(7, '977-8-6918-0709-6', 'Book7', 'Author2', 'Publisher1', '2022-01-07 21:34:52', 80, 0, 1, 5),
(8, '977-8-6918-7196-6', 'Book8', 'Author1', 'Publisher3', '2022-01-08 15:52:00', 8, 0, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `id` int UNSIGNED NOT NULL,
  `record_id` int UNSIGNED NOT NULL,
  `pay_amount` double UNSIGNED NOT NULL DEFAULT '0',
  `pay_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int UNSIGNED NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`id`, `record_id`, `pay_amount`, `pay_date`, `updated_by`, `updated_on`) VALUES
(1, 4, 10.56, '2022-01-09 06:37:16', 2, '2022-01-09 06:37:16'),
(2, 2, 50.43, '2022-01-01 00:00:00', 1, '2022-01-09 06:58:09'),
(3, 5, 30, '2022-01-06 00:00:00', 2, '2022-01-09 06:46:44'),
(4, 3, 45.2, '2022-01-10 00:00:00', 2, '2022-01-09 07:00:11'),
(5, 5, 6.5, '2022-01-03 00:00:00', 1, '2022-01-09 07:00:55'),
(6, 5, 56, '2022-01-08 00:00:00', 2, '2022-01-09 07:04:02');

-- --------------------------------------------------------

--
-- Table structure for table `Records`
--

CREATE TABLE `Records` (
  `id` int UNSIGNED NOT NULL,
  `book_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `lent_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `due_date` datetime NOT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `updated_by` int UNSIGNED NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Records`
--

INSERT INTO `Records` (`id`, `book_id`, `user_id`, `lent_date`, `due_date`, `returned`, `updated_by`, `updated_on`) VALUES
(1, 2, 3, '2022-01-08 12:20:25', '2022-01-28 16:01:30', 0, 3, '2022-01-08 12:20:25'),
(2, 4, 2, '2022-01-08 12:21:54', '2022-01-20 14:01:30', 0, 3, '2022-01-08 12:21:54'),
(3, 5, 2, '2022-01-08 12:25:10', '2022-01-18 07:01:30', 0, 2, '2022-01-08 16:29:49'),
(4, 6, 3, '2022-01-08 12:27:01', '2022-01-10 00:00:00', 0, 2, '2022-01-08 12:27:01'),
(5, 3, 2, '2022-01-08 18:34:33', '2022-01-12 00:00:00', 0, 1, '2022-01-08 16:10:14'),
(6, 5, 4, '2022-01-08 19:39:04', '2022-01-01 14:09:04', 0, 3, '2022-01-08 20:03:49'),
(7, 1, 3, '2022-01-08 20:08:30', '2022-01-05 14:09:04', 0, 3, '2022-01-08 20:43:55'),
(8, 6, 4, '2022-01-08 20:44:37', '2022-01-22 00:00:00', 0, 3, '2022-01-08 20:44:37');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` tinyint UNSIGNED NOT NULL,
  `role_name` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `superuser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `role_name`, `active`, `superuser`) VALUES
(1, 'other', 1, 0),
(2, 'student', 1, 0),
(3, 'faculty', 1, 0),
(4, 'librarian', 1, 1),
(5, 'admin', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Subjects`
--

CREATE TABLE `Subjects` (
  `id` smallint UNSIGNED NOT NULL,
  `subject_name` varchar(128) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`id`, `subject_name`, `active`) VALUES
(1, 'others', 1),
(2, 'technology', 1),
(3, 'history', 1),
(4, 'literature', 1),
(5, 'novels', 1),
(6, 'geography', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(65) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `role` tinyint UNSIGNED NOT NULL,
  `reg_by` int UNSIGNED DEFAULT NULL,
  `reg_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `name`, `active`, `role`, `reg_by`, `reg_date`) VALUES
(1, 'admin', '7676aaafb027c825bd9abab78b234070e702752f625b752e55e55b48e607e358', 'Debdut', 1, 5, 1, '2022-01-07 06:23:43'),
(2, 'librarian1', '91a5f61fafcf6540129b79ad19b50f9f9885a5763b7b936ba6c2d38fb4f2102d', 'Anand', 1, 4, 1, '2022-01-07 06:23:43'),
(3, 'debdut', 'b1901bee91f6c6ea59ef0506b77c0fe72b1a697b8a03481886677d7e340cd50f', 'Debdut Biswas', 1, 2, 1, '2022-01-07 09:06:39'),
(4, 'sayan123', '4c81f1852324f0ed8dba459f02889c0d7ae97397b26d18823c2813a42b6b08dc', 'Sayan Panda', 1, 2, 1, '2022-01-07 09:16:03'),
(5, 'sonali', 'cc938f8892f40ecd56ff920df5e805a3b118bdcdbd40f096e1354a08788aae31', 'Sonali Das', 1, 2, 1, '2022-01-07 09:40:03'),
(6, 'bob', 'be5ca1bf6817ec550012e3dc7a258dde9ffe4a1859409fafe46cd7d9ca7c2f84', 'Bob Biswas', 1, 2, 1, '2022-01-07 14:13:13'),
(7, 'kuntal', '8b4b7b276543392579bd43207336c107a6b44e941a3a8ed16d44376bcbfad794', 'Kuntal Laheri', 1, 2, 1, '2022-01-07 15:04:16'),
(8, 'soumik', 'd044e7167af32e0b3f1bf3e8dffbe07b7dad5717f0054809fa7c3a30a6aa5c4e', 'Soumik Dey', 1, 2, 1, '2022-01-07 15:29:56'),
(9, 'tublu', 'efa90ffafb77bb3198b02b67619df0efebef2ef09951638b7397aaac8105000d', 'Sourav Ganguly', 1, 2, 1, '2022-01-07 21:13:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `Subject_Attribute_On_Subjects` (`subject`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RecordId_Attribute_On_Records` (`record_id`),
  ADD KEY `UserId_Attribute_On_Users` (`updated_by`);

--
-- Indexes for table `Records`
--
ALTER TABLE `Records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BookId_Attribute_On_Books` (`book_id`),
  ADD KEY `UpdatedBy_Attribute_On_Users` (`updated_by`),
  ADD KEY `UserId_Attribute2_On_Users` (`user_id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Subjects`
--
ALTER TABLE `Subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Role_Attribute_On_Roles` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Books`
--
ALTER TABLE `Books`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Records`
--
ALTER TABLE `Records`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Subjects`
--
ALTER TABLE `Subjects`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `Subject_Attribute_On_Subjects` FOREIGN KEY (`subject`) REFERENCES `Subjects` (`id`);

--
-- Constraints for table `Payments`
--
ALTER TABLE `Payments`
  ADD CONSTRAINT `RecordId_Attribute_On_Records` FOREIGN KEY (`record_id`) REFERENCES `Records` (`id`),
  ADD CONSTRAINT `UserId_Attribute_On_Users` FOREIGN KEY (`updated_by`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Records`
--
ALTER TABLE `Records`
  ADD CONSTRAINT `BookId_Attribute_On_Books` FOREIGN KEY (`book_id`) REFERENCES `Books` (`id`),
  ADD CONSTRAINT `UpdatedBy_Attribute_On_Users` FOREIGN KEY (`updated_by`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `UserId_Attribute2_On_Users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Role_Attribute_On_Roles` FOREIGN KEY (`role`) REFERENCES `Roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
