SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


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

CREATE TABLE `Payments` (
  `id` int UNSIGNED NOT NULL,
  `record_id` int UNSIGNED NOT NULL,
  `pay_amount` double UNSIGNED NOT NULL DEFAULT '0',
  `pay_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int UNSIGNED NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

CREATE TABLE `Roles` (
  `id` tinyint UNSIGNED NOT NULL,
  `role_name` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `superuser` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Subjects` (
  `id` smallint UNSIGNED NOT NULL,
  `subject_name` varchar(128) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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


ALTER TABLE `Books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `Subject_Attribute_On_Subjects` (`subject`);

ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RecordId_Attribute_On_Records` (`record_id`),
  ADD KEY `UserId_Attribute_On_Users` (`updated_by`);

ALTER TABLE `Records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `BookId_Attribute_On_Books` (`book_id`),
  ADD KEY `UpdatedBy_Attribute_On_Users` (`updated_by`),
  ADD KEY `UserId_Attribute2_On_Users` (`user_id`);

ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Subjects`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `Role_Attribute_On_Roles` (`role`);


ALTER TABLE `Books`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `Payments`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `Records`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `Roles`
  MODIFY `id` tinyint UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `Subjects`
  MODIFY `id` smallint UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `Users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;


ALTER TABLE `Books`
  ADD CONSTRAINT `Subject_Attribute_On_Subjects` FOREIGN KEY (`subject`) REFERENCES `Subjects` (`id`);

ALTER TABLE `Payments`
  ADD CONSTRAINT `RecordId_Attribute_On_Records` FOREIGN KEY (`record_id`) REFERENCES `Records` (`id`),
  ADD CONSTRAINT `UserId_Attribute_On_Users` FOREIGN KEY (`updated_by`) REFERENCES `Users` (`id`);

ALTER TABLE `Records`
  ADD CONSTRAINT `BookId_Attribute_On_Books` FOREIGN KEY (`book_id`) REFERENCES `Books` (`id`),
  ADD CONSTRAINT `UpdatedBy_Attribute_On_Users` FOREIGN KEY (`updated_by`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `UserId_Attribute2_On_Users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Users`
  ADD CONSTRAINT `Role_Attribute_On_Roles` FOREIGN KEY (`role`) REFERENCES `Roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
