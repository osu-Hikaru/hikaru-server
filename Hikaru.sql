-- --------------------------------------------------------
-- Host:                         37.120.186.220
-- Server version:               10.5.19-MariaDB-0+deb11u2 - Debian 11
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hikarudev
CREATE DATABASE IF NOT EXISTS `hikarudev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `hikarudev`;

-- Dumping structure for table hikarudev.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `username` char(28) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` char(72) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.beatmaps
CREATE TABLE IF NOT EXISTS `beatmaps` (
  `beatmapset_id` int(16) NOT NULL,
  `difficulty_rating` float NOT NULL,
  `id` int(11) NOT NULL,
  `mode` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `total_length` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `version` varchar(256) NOT NULL,
  `accuracy` float NOT NULL,
  `ar` float NOT NULL,
  `bpm` float NOT NULL,
  `convert` int(1) NOT NULL,
  `count_circles` int(11) NOT NULL,
  `count_sliders` int(11) NOT NULL,
  `count_spinners` int(11) NOT NULL,
  `cs` float NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `drain` int(11) NOT NULL,
  `hit_length` int(11) NOT NULL,
  `is_scoreable` int(11) NOT NULL,
  `last_updated` datetime NOT NULL,
  `mode_int` int(11) NOT NULL,
  `passcount` int(11) NOT NULL,
  `playcount` int(11) NOT NULL,
  `ranked` tinyint(2) NOT NULL,
  `url` varchar(256) NOT NULL,
  `checksum` varchar(256) NOT NULL,
  `max_combo` int(11) NOT NULL,
  PRIMARY KEY (`id`,`checksum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.beatmapsets
CREATE TABLE IF NOT EXISTS `beatmapsets` (
  `artist` varchar(128) DEFAULT NULL,
  `artist_unicode` varchar(128) NOT NULL,
  `cover_id` int(11) DEFAULT NULL,
  `creator` varchar(32) NOT NULL,
  `favorite_count` int(11) NOT NULL DEFAULT 0,
  `hype` int(11) DEFAULT NULL,
  `beatmapset_id` int(11) NOT NULL,
  `nsfw` tinyint(1) NOT NULL DEFAULT 0,
  `play_count` int(11) NOT NULL DEFAULT 0,
  `source` varchar(64) DEFAULT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'graveyard',
  `title` varchar(256) DEFAULT NULL,
  `title_unicode` varchar(256) NOT NULL,
  `track_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `video` tinyint(1) NOT NULL DEFAULT 0,
  `download_disabled` tinyint(1) NOT NULL DEFAULT 0,
  `more_information` text DEFAULT NULL,
  `bpm` float NOT NULL DEFAULT 0,
  `can_be_hyped` tinyint(1) NOT NULL DEFAULT 0,
  `discussion_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `discussion_locked` tinyint(1) NOT NULL DEFAULT 1,
  `is_scoreable` tinyint(1) NOT NULL DEFAULT 0,
  `last_updated` datetime DEFAULT NULL,
  `nomination_current` int(11) NOT NULL DEFAULT 2,
  `nomination_required` int(11) NOT NULL DEFAULT 2,
  `ranked` tinyint(4) NOT NULL DEFAULT 0,
  `ranked_date` datetime DEFAULT NULL,
  `storyboard` tinyint(1) NOT NULL DEFAULT 0,
  `submitted_date` datetime DEFAULT NULL,
  `tags` text DEFAULT NULL,
  PRIMARY KEY (`beatmapset_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.channels
CREATE TABLE IF NOT EXISTS `channels` (
  `channel_id` int(11) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `moderated` bit(1) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `target_1` int(11) DEFAULT NULL,
  `target_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`channel_id`) USING BTREE,
  KEY `FK_channels_groups` (`group_id`),
  CONSTRAINT `FK_channels_groups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.chat_presence
CREATE TABLE IF NOT EXISTS `chat_presence` (
  `user_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `last_read_id` int(11) DEFAULT 0,
  `can_message` bit(1) DEFAULT NULL,
  PRIMARY KEY (`channel_id`,`user_id`) USING BTREE,
  KEY `FK_chat_presence_users` (`user_id`),
  CONSTRAINT `FK_chat_presence_channels` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_chat_presence_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_friends_users_2` (`friend_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` text DEFAULT NULL,
  `name` text DEFAULT NULL,
  `short_name` tinytext DEFAULT NULL,
  `playmodes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `has_playmodes` tinyint(1) NOT NULL DEFAULT 0,
  `has_listing` tinyint(1) NOT NULL DEFAULT 0,
  `is_probationary` tinyint(1) NOT NULL DEFAULT 0,
  `colour` tinytext DEFAULT NULL,
  `max_blocks_multi` int(8) DEFAULT 1,
  `max_friends_multi` int(8) DEFAULT 1,
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `channel_id` int(3) DEFAULT NULL,
  `message_id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message_content` varchar(512) DEFAULT NULL,
  `is_action` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE,
  KEY `FK_messages_users` (`user_id`),
  CONSTRAINT `FK_messages_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.mirror
CREATE TABLE IF NOT EXISTS `mirror` (
  `id` int(11) NOT NULL,
  `LM` datetime DEFAULT NULL,
  `CD` text DEFAULT NULL,
  `CL` int(11) DEFAULT NULL,
  `CT` varchar(128) DEFAULT NULL,
  `ETag` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.news
CREATE TABLE IF NOT EXISTS `news` (
  `author` varchar(32) NOT NULL DEFAULT 'Hikaru Team',
  `edit_url` varchar(512) DEFAULT NULL,
  `first_image` varchar(512) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `preview` longtext DEFAULT NULL,
  `published_at` datetime NOT NULL,
  `slug` varchar(256) NOT NULL,
  `title` varchar(256) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.playactivity
CREATE TABLE IF NOT EXISTS `playactivity` (
  `score_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `beatmap_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `ruleset_id` int(4) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `score_id` (`score_id`),
  CONSTRAINT `FK_playactivity_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.rankings
CREATE TABLE IF NOT EXISTS `rankings` (
  `user_id` int(11) DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL,
  `pp` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `score_rank` int(11) DEFAULT NULL,
  KEY `FK_rankings_users` (`user_id`),
  CONSTRAINT `FK_rankings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.rulesets
CREATE TABLE IF NOT EXISTS `rulesets` (
  `ruleset_id` int(11) NOT NULL AUTO_INCREMENT,
  `ruleset_safe_name` varchar(64) DEFAULT NULL,
  `ruleset_name` varchar(64) DEFAULT NULL,
  `ruleset_description` text DEFAULT NULL,
  `ranked` int(11) DEFAULT NULL,
  PRIMARY KEY (`ruleset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.scores
CREATE TABLE IF NOT EXISTS `scores` (
  `score_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `beatmap_id` int(11) NOT NULL,
  `ruleset_id` int(11) NOT NULL,
  `passed` int(1) DEFAULT NULL,
  `mods` longtext DEFAULT NULL,
  `miss` int(11) DEFAULT NULL,
  `meh` int(11) DEFAULT NULL,
  `ok` int(11) DEFAULT NULL,
  `good` int(11) DEFAULT NULL,
  `great` int(11) DEFAULT NULL,
  `perfect` int(1) DEFAULT NULL,
  `small_tick_miss` int(11) DEFAULT NULL,
  `small_tick_hit` int(11) DEFAULT NULL,
  `large_tick_miss` int(11) DEFAULT NULL,
  `large_tick_hit` int(11) DEFAULT NULL,
  `large_bonus` int(11) DEFAULT NULL,
  `small_bonus` int(11) DEFAULT NULL,
  `ignore_miss` int(11) DEFAULT NULL,
  `ignore_hit` int(11) DEFAULT NULL,
  `rank` char(2) DEFAULT NULL,
  `total_score` int(16) DEFAULT NULL,
  `pp` float DEFAULT NULL,
  `max_combo` int(6) DEFAULT NULL,
  `created_at` bigint(20) DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  PRIMARY KEY (`score_id`),
  KEY `FK_scores_users` (`user_id`),
  CONSTRAINT `FK_scores_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users
CREATE TABLE IF NOT EXISTS `users` (
  `avatar_url` varchar(256) DEFAULT 'https://a.hikaru.pw/1/default_av.jpg',
  `cover_url` varchar(256) DEFAULT 'https://a.hikaru.pw/1/default_cv.jpg',
  `country_code` varchar(2) DEFAULT '',
  `country_name` varchar(128) DEFAULT '',
  `user_id` int(10) NOT NULL,
  `username` char(28) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_bot` tinyint(1) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_online` tinyint(1) DEFAULT 1,
  `is_supporter` tinyint(4) DEFAULT 0,
  `has_supported` tinyint(4) DEFAULT 0,
  `last_visit` datetime DEFAULT current_timestamp(),
  `join_date` datetime DEFAULT current_timestamp(),
  `play_start` datetime DEFAULT NULL,
  `pm_friends_only` tinyint(1) DEFAULT 0,
  `current_ruleset` tinyint(4) DEFAULT NULL,
  `active_id` int(11) DEFAULT NULL,
  `active_bm_id` int(11) DEFAULT NULL,
  `groups` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `FK_users_accounts` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.websocket
CREATE TABLE IF NOT EXISTS `websocket` (
  `connection_id` varchar(32) NOT NULL,
  `connection_token` varchar(32) NOT NULL,
  `user_id` int(11) NOT NULL,
  `connection_type` varchar(50) NOT NULL,
  `pending` int(1) NOT NULL DEFAULT 1,
  `expiry` datetime NOT NULL,
  `active` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`connection_id`),
  KEY `FK_websocket_accounts` (`user_id`),
  CONSTRAINT `FK_websocket_accounts` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for trigger hikarudev.new_account_user
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER new_account_user
AFTER INSERT ON accounts
FOR EACH ROW
BEGIN
  INSERT INTO users (user_id, username) VALUES (NEW.user_id, NEW.username);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
