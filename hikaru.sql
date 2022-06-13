-- --------------------------------------------------------
-- Host:                         202.61.206.242
-- Server version:               10.6.7-MariaDB-3 - Debian buildd-unstable
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hikaru
DROP DATABASE IF EXISTS `hikaru`;
CREATE DATABASE IF NOT EXISTS `hikaru` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `hikaru`;

-- Dumping structure for table hikaru.accounts
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(26) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.active_tokens
DROP TABLE IF EXISTS `active_tokens`;
CREATE TABLE IF NOT EXISTS `active_tokens` (
  `user_id` int(10) NOT NULL,
  `access_token` varchar(512) NOT NULL,
  `refresh_token` varchar(512) NOT NULL DEFAULT '',
  `expires_in` int(8) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`access_token`) USING BTREE,
  UNIQUE KEY `refresh_token` (`refresh_token`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.beatmaps
DROP TABLE IF EXISTS `beatmaps`;
CREATE TABLE IF NOT EXISTS `beatmaps` (
  `beatmapset_id` int(16) NOT NULL,
  `difficulty_rating` float DEFAULT NULL,
  `beatmap_id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(50) DEFAULT '',
  `status` varchar(50) DEFAULT '',
  `total_length` int(11) DEFAULT 0,
  `user_id` int(11) DEFAULT 0,
  `version` varchar(256) DEFAULT '0',
  `accuracy` float DEFAULT 0,
  `ar` float DEFAULT 0,
  `bpm` float DEFAULT 0,
  `is_convert` bit(1) DEFAULT b'0',
  `count_circles` int(11) DEFAULT 0,
  `count_sliders` int(11) DEFAULT 0,
  `count_spinners` int(11) DEFAULT 0,
  `cs` float DEFAULT 0,
  `deleted_at` datetime DEFAULT '0000-00-00 00:00:00',
  `drain` int(11) DEFAULT 0,
  `hit_length` int(11) DEFAULT 0,
  `is_scoreable` bit(1) DEFAULT b'0',
  `last_updated` datetime DEFAULT '0000-00-00 00:00:00',
  `mode_int` tinyint(4) DEFAULT 0,
  `passcount` int(11) DEFAULT 0,
  `playcount` int(11) DEFAULT 0,
  `ranked` tinyint(2) DEFAULT 0,
  `url` varchar(256) DEFAULT '0',
  `checksum` varchar(256) DEFAULT '0',
  `max_combo` int(11) DEFAULT NULL,
  PRIMARY KEY (`beatmap_id`) USING BTREE,
  UNIQUE KEY `beatmapset_id` (`beatmapset_id`,`beatmap_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3489971 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.beatmapsets
DROP TABLE IF EXISTS `beatmapsets`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.channels
DROP TABLE IF EXISTS `channels`;
CREATE TABLE IF NOT EXISTS `channels` (
  `channel_id` int(11) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `moderated` bit(1) DEFAULT NULL,
  `name` varchar(64) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `target_1` int(11) DEFAULT NULL,
  `target_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`channel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.chat_presence
DROP TABLE IF EXISTS `chat_presence`;
CREATE TABLE IF NOT EXISTS `chat_presence` (
  `user_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `last_read_id` int(11) DEFAULT 0,
  `can_message` bit(1) DEFAULT NULL,
  PRIMARY KEY (`channel_id`,`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.friends
DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.groups
DROP TABLE IF EXISTS `groups`;
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
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.messages
DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `channel_id` int(3) DEFAULT NULL,
  `message_id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `message_content` varchar(512) DEFAULT NULL,
  `is_action` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.mirror
DROP TABLE IF EXISTS `mirror`;
CREATE TABLE IF NOT EXISTS `mirror` (
  `id` int(11) NOT NULL,
  `LM` datetime DEFAULT NULL,
  `CD` text DEFAULT NULL,
  `CL` int(11) DEFAULT NULL,
  `CT` varchar(128) DEFAULT NULL,
  `ETag` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.news
DROP TABLE IF EXISTS `news`;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.rankings
DROP TABLE IF EXISTS `rankings`;
CREATE TABLE IF NOT EXISTS `rankings` (
  `user_id` int(11) DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL,
  `pp` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `score_rank` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.scores
DROP TABLE IF EXISTS `scores`;
CREATE TABLE IF NOT EXISTS `scores` (
  `user_id` int(10) NOT NULL,
  `score_id` int(10) NOT NULL AUTO_INCREMENT,
  `beatmap_id` int(11) DEFAULT NULL,
  `ruleset_id` int(10) NOT NULL DEFAULT 0,
  `passed` tinyint(1) DEFAULT NULL,
  `count_miss` int(8) DEFAULT NULL,
  `count_meh` int(8) DEFAULT NULL,
  `count_ok` int(8) DEFAULT NULL,
  `count_good` int(8) DEFAULT NULL,
  `count_great` int(8) DEFAULT NULL,
  `perfect` tinyint(1) DEFAULT NULL,
  `count_STM` int(8) DEFAULT NULL,
  `count_STH` int(8) DEFAULT NULL,
  `count_LTM` int(8) DEFAULT NULL,
  `count_LTH` int(8) DEFAULT NULL,
  `count_SB` int(8) DEFAULT NULL,
  `count_LB` int(8) DEFAULT NULL,
  `rank` varchar(2) DEFAULT NULL,
  `total_score` int(7) DEFAULT NULL,
  `pp` float DEFAULT NULL,
  `max_combo` int(10) DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_best` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`score_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `avatar_url` varchar(256) DEFAULT 'https://a.hikaru.pw/1/default_av.jpg',
  `country_code` varchar(2) DEFAULT NULL,
  `country_name` varchar(128) DEFAULT NULL,
  `user_id` int(10) NOT NULL,
  `username` varchar(28) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_bot` tinyint(1) DEFAULT 0,
  `is_deleted` tinyint(1) DEFAULT 0,
  `is_online` tinyint(1) DEFAULT 1,
  `is_supporter` tinyint(4) DEFAULT 0,
  `has_supported` tinyint(4) DEFAULT 0,
  `global_rank` int(8) DEFAULT 0,
  `pp` float DEFAULT 0,
  `total_hits` int(16) DEFAULT 0,
  `total_score` bigint(20) DEFAULT 0,
  `play_time` int(11) DEFAULT 0,
  `last_visit` datetime DEFAULT NULL,
  `join_date` datetime DEFAULT NULL,
  `playcount` int(11) DEFAULT 0,
  `play_start` datetime DEFAULT NULL,
  `current_ruleset` tinyint(4) DEFAULT NULL,
  `active_id` int(11) DEFAULT NULL,
  `active_bm_id` int(11) DEFAULT NULL,
  `groups` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `pm_friends_only` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikaru.websocket
DROP TABLE IF EXISTS `websocket`;
CREATE TABLE IF NOT EXISTS `websocket` (
  `connection_id` varchar(64) NOT NULL,
  `connection_token` varchar(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`connection_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for trigger hikaru.mirror_copy_to_dev
DROP TRIGGER IF EXISTS `mirror_copy_to_dev`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `mirror_copy_to_dev` AFTER INSERT ON `mirror` FOR EACH ROW BEGIN
IF NOT EXISTS (SELECT 1 FROM hikarudev.mirror WHERE id = NEW.id) THEN
    INSERT INTO hikarudev.mirror VALUES(NEW.id, NEW.LM, NEW.CD, NEW.CL, NEW.CT, NEW.ETag);
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;


-- Dumping database structure for hikarudev
DROP DATABASE IF EXISTS `hikarudev`;
CREATE DATABASE IF NOT EXISTS `hikarudev` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `hikarudev`;

-- Dumping structure for table hikarudev.accounts
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(28) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.active_tokens
DROP TABLE IF EXISTS `active_tokens`;
CREATE TABLE IF NOT EXISTS `active_tokens` (
  `user_id` int(10) NOT NULL,
  `access_token` varchar(512) NOT NULL,
  `refresh_token` varchar(512) NOT NULL DEFAULT '',
  `expires_in` int(8) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`access_token`) USING BTREE,
  UNIQUE KEY `refresh_token` (`refresh_token`) USING BTREE,
  KEY `FK_active_tokens_accounts` (`user_id`),
  CONSTRAINT `FK_active_tokens_accounts` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.beatmaps
DROP TABLE IF EXISTS `beatmaps`;
CREATE TABLE IF NOT EXISTS `beatmaps` (
  `beatmapset_id` int(16) NOT NULL,
  `difficulty_rating` float DEFAULT NULL,
  `beatmap_id` int(11) NOT NULL AUTO_INCREMENT,
  `mode` varchar(50) DEFAULT '',
  `status` varchar(50) DEFAULT '',
  `total_length` int(11) DEFAULT 0,
  `user_id` int(11) DEFAULT 0,
  `version` varchar(256) DEFAULT '0',
  `accuracy` float DEFAULT 0,
  `cs` float DEFAULT 0,
  `ar` float DEFAULT 0,
  `bpm` float DEFAULT 0,
  `is_convert` bit(1) DEFAULT b'0',
  `count_circles` int(11) DEFAULT 0,
  `count_sliders` int(11) DEFAULT 0,
  `count_spinners` int(11) DEFAULT 0,
  `deleted_at` datetime DEFAULT '0000-00-00 00:00:00',
  `drain` int(11) DEFAULT 0,
  `hit_length` int(11) DEFAULT 0,
  `is_scoreable` bit(1) DEFAULT b'0',
  `last_updated` datetime DEFAULT '0000-00-00 00:00:00',
  `mode_int` tinyint(4) DEFAULT 0,
  `passcount` int(11) DEFAULT 0,
  `playcount` int(11) DEFAULT 0,
  `ranked` tinyint(2) DEFAULT 0,
  `url` varchar(256) DEFAULT '0',
  `checksum` varchar(256) DEFAULT '0',
  `max_combo` int(11) DEFAULT NULL,
  `new_max_combo` int(11) DEFAULT NULL,
  PRIMARY KEY (`beatmap_id`) USING BTREE,
  UNIQUE KEY `beatmapset_id` (`beatmapset_id`,`beatmap_id`,`mode`) USING BTREE,
  CONSTRAINT `FK_beatmaps_beatmapsets` FOREIGN KEY (`beatmapset_id`) REFERENCES `beatmapsets` (`beatmapset_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3623249 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.beatmapsets
DROP TABLE IF EXISTS `beatmapsets`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.channels
DROP TABLE IF EXISTS `channels`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.chat_presence
DROP TABLE IF EXISTS `chat_presence`;
CREATE TABLE IF NOT EXISTS `chat_presence` (
  `user_id` int(11) NOT NULL,
  `channel_id` int(11) NOT NULL,
  `last_read_id` int(11) DEFAULT 0,
  `can_message` bit(1) DEFAULT NULL,
  PRIMARY KEY (`channel_id`,`user_id`) USING BTREE,
  KEY `FK_chat_presence_users` (`user_id`),
  CONSTRAINT `FK_chat_presence_channels` FOREIGN KEY (`channel_id`) REFERENCES `channels` (`channel_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_chat_presence_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.friends
DROP TABLE IF EXISTS `friends`;
CREATE TABLE IF NOT EXISTS `friends` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.groups
DROP TABLE IF EXISTS `groups`;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.messages
DROP TABLE IF EXISTS `messages`;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.mirror
DROP TABLE IF EXISTS `mirror`;
CREATE TABLE IF NOT EXISTS `mirror` (
  `id` int(11) NOT NULL,
  `LM` datetime DEFAULT NULL,
  `CD` text DEFAULT NULL,
  `CL` int(11) DEFAULT NULL,
  `CT` varchar(128) DEFAULT NULL,
  `ETag` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.news
DROP TABLE IF EXISTS `news`;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.rankings
DROP TABLE IF EXISTS `rankings`;
CREATE TABLE IF NOT EXISTS `rankings` (
  `user_id` int(11) DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL,
  `pp` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `score_rank` int(11) DEFAULT NULL,
  KEY `FK_rankings_users` (`user_id`),
  CONSTRAINT `FK_rankings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.ruleset_descriptors
DROP TABLE IF EXISTS `ruleset_descriptors`;
CREATE TABLE IF NOT EXISTS `ruleset_descriptors` (
  `ruleset_id` int(11) NOT NULL AUTO_INCREMENT,
  `ruleset_safe_name` varchar(64) DEFAULT NULL,
  `ruleset_name` varchar(64) DEFAULT NULL,
  `ruleset_description` text DEFAULT NULL,
  PRIMARY KEY (`ruleset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.scores_0
DROP TABLE IF EXISTS `scores_0`;
CREATE TABLE IF NOT EXISTS `scores_0` (
  `user_id` int(16) NOT NULL,
  `score_id` int(16) NOT NULL AUTO_INCREMENT,
  `beatmap_id` int(16) NOT NULL,
  `passed` tinyint(1) NOT NULL DEFAULT 0,
  `mods` text NOT NULL DEFAULT '[]',
  `count_miss` int(16) NOT NULL DEFAULT 0,
  `count_meh` int(16) NOT NULL DEFAULT 0,
  `count_ok` int(16) NOT NULL DEFAULT 0,
  `count_great` int(16) NOT NULL DEFAULT 0,
  `perfect` tinyint(1) NOT NULL DEFAULT 0,
  `count_STM` int(16) NOT NULL DEFAULT 0,
  `count_STH` int(16) NOT NULL DEFAULT 0,
  `count_LTM` int(16) NOT NULL DEFAULT 0,
  `count_LTH` int(16) NOT NULL DEFAULT 0,
  `count_SB` int(16) NOT NULL DEFAULT 0,
  `count_LB` int(16) NOT NULL DEFAULT 0,
  `count_IM` int(16) NOT NULL DEFAULT 0,
  `count_IH` int(16) NOT NULL DEFAULT 0,
  `rank` varchar(2) NOT NULL DEFAULT 'D',
  `total_score` int(16) NOT NULL DEFAULT 0,
  `pp` int(16) DEFAULT NULL,
  `max_combo` int(16) NOT NULL DEFAULT 0,
  `accuracy` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_best` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`score_id`),
  KEY `FK_scores_0_users` (`user_id`),
  KEY `FK_scores_0_beatmaps` (`beatmap_id`),
  CONSTRAINT `FK_scores_0_beatmaps` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps` (`beatmap_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_scores_0_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.scores_1
DROP TABLE IF EXISTS `scores_1`;
CREATE TABLE IF NOT EXISTS `scores_1` (
  `user_id` int(16) NOT NULL,
  `score_id` int(16) NOT NULL AUTO_INCREMENT,
  `beatmap_id` int(16) NOT NULL,
  `passed` tinyint(1) NOT NULL DEFAULT 0,
  `mods` text NOT NULL DEFAULT '[]',
  `count_miss` int(16) NOT NULL DEFAULT 0,
  `count_meh` int(16) NOT NULL DEFAULT 0,
  `count_ok` int(16) NOT NULL DEFAULT 0,
  `count_good` int(16) NOT NULL DEFAULT 0,
  `count_great` int(16) NOT NULL DEFAULT 0,
  `perfect` tinyint(1) NOT NULL DEFAULT 0,
  `count_STM` int(16) NOT NULL DEFAULT 0,
  `count_STH` int(16) NOT NULL DEFAULT 0,
  `count_LTM` int(16) NOT NULL DEFAULT 0,
  `count_LTH` int(16) NOT NULL DEFAULT 0,
  `count_SB` int(16) NOT NULL DEFAULT 0,
  `count_LB` int(16) NOT NULL DEFAULT 0,
  `count_IM` int(16) NOT NULL DEFAULT 0,
  `count_IH` int(16) NOT NULL DEFAULT 0,
  `rank` varchar(2) NOT NULL DEFAULT 'D',
  `total_score` int(16) NOT NULL DEFAULT 0,
  `pp` int(16) DEFAULT NULL,
  `max_combo` int(16) NOT NULL DEFAULT 0,
  `accuracy` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_best` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`score_id`) USING BTREE,
  KEY `FK_scores_1_users` (`user_id`),
  KEY `FK_scores_1_beatmaps` (`beatmap_id`),
  CONSTRAINT `FK_scores_1_beatmaps` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps` (`beatmap_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_scores_1_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.scores_2
DROP TABLE IF EXISTS `scores_2`;
CREATE TABLE IF NOT EXISTS `scores_2` (
  `user_id` int(16) NOT NULL,
  `score_id` int(16) NOT NULL AUTO_INCREMENT,
  `beatmap_id` int(16) NOT NULL,
  `passed` tinyint(1) NOT NULL DEFAULT 0,
  `mods` text NOT NULL DEFAULT '[]',
  `count_miss` int(16) NOT NULL DEFAULT 0,
  `count_meh` int(16) NOT NULL DEFAULT 0,
  `count_ok` int(16) NOT NULL DEFAULT 0,
  `count_good` int(16) NOT NULL DEFAULT 0,
  `count_great` int(16) NOT NULL DEFAULT 0,
  `perfect` tinyint(1) NOT NULL DEFAULT 0,
  `count_STM` int(16) NOT NULL DEFAULT 0,
  `count_STH` int(16) NOT NULL DEFAULT 0,
  `count_LTM` int(16) NOT NULL DEFAULT 0,
  `count_LTH` int(16) NOT NULL DEFAULT 0,
  `count_SB` int(16) NOT NULL DEFAULT 0,
  `count_LB` int(16) NOT NULL DEFAULT 0,
  `count_IM` int(16) NOT NULL DEFAULT 0,
  `count_IH` int(16) NOT NULL DEFAULT 0,
  `rank` varchar(2) NOT NULL DEFAULT 'D',
  `total_score` int(16) NOT NULL DEFAULT 0,
  `pp` int(16) DEFAULT NULL,
  `max_combo` int(16) NOT NULL DEFAULT 0,
  `accuracy` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_best` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`score_id`) USING BTREE,
  KEY `FK_scores_2_users` (`user_id`),
  KEY `FK_scores_2_beatmaps` (`beatmap_id`),
  CONSTRAINT `FK_scores_2_beatmaps` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps` (`beatmap_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_scores_2_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.scores_3
DROP TABLE IF EXISTS `scores_3`;
CREATE TABLE IF NOT EXISTS `scores_3` (
  `user_id` int(16) NOT NULL,
  `score_id` int(16) NOT NULL AUTO_INCREMENT,
  `beatmap_id` int(16) NOT NULL,
  `passed` tinyint(1) NOT NULL DEFAULT 0,
  `mods` text NOT NULL DEFAULT '[]',
  `count_miss` int(16) NOT NULL DEFAULT 0,
  `count_meh` int(16) NOT NULL DEFAULT 0,
  `count_ok` int(16) NOT NULL DEFAULT 0,
  `count_good` int(16) NOT NULL DEFAULT 0,
  `count_great` int(16) NOT NULL DEFAULT 0,
  `perfect` tinyint(1) NOT NULL DEFAULT 0,
  `count_STM` int(16) NOT NULL DEFAULT 0,
  `count_STH` int(16) NOT NULL DEFAULT 0,
  `count_LTM` int(16) NOT NULL DEFAULT 0,
  `count_LTH` int(16) NOT NULL DEFAULT 0,
  `count_SB` int(16) NOT NULL DEFAULT 0,
  `count_LB` int(16) NOT NULL DEFAULT 0,
  `count_IM` int(16) NOT NULL DEFAULT 0,
  `count_IH` int(16) NOT NULL DEFAULT 0,
  `rank` varchar(2) NOT NULL DEFAULT 'D',
  `total_score` int(16) NOT NULL DEFAULT 0,
  `pp` int(16) DEFAULT NULL,
  `max_combo` int(16) NOT NULL DEFAULT 0,
  `accuracy` double NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `user_best` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`score_id`) USING BTREE,
  KEY `FK_scores_3_users` (`user_id`),
  KEY `FK_scores_3_beatmaps` (`beatmap_id`),
  CONSTRAINT `FK_scores_3_beatmaps` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps` (`beatmap_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_scores_3_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `avatar_url` varchar(256) DEFAULT 'https://a.hikaru.pw/1/default_av.jpg',
  `cover_url` varchar(256) DEFAULT 'https://a.hikaru.pw/1/default_cv.jpg',
  `country_code` varchar(2) DEFAULT '',
  `country_name` varchar(128) DEFAULT '',
  `user_id` int(10) NOT NULL,
  `username` varchar(28) DEFAULT NULL,
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
  CONSTRAINT `FK_users_accounts` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_accounts_2` FOREIGN KEY (`username`) REFERENCES `accounts` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users_0
DROP TABLE IF EXISTS `users_0`;
CREATE TABLE IF NOT EXISTS `users_0` (
  `user_id` int(10) NOT NULL,
  `global_rank` int(10) DEFAULT 0,
  `pp` float DEFAULT 0,
  `total_hits` int(16) DEFAULT 0,
  `play_time` int(12) DEFAULT 0,
  `playcount` int(12) DEFAULT 0,
  `total_score` bigint(20) DEFAULT 0,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_users_0_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users_1
DROP TABLE IF EXISTS `users_1`;
CREATE TABLE IF NOT EXISTS `users_1` (
  `user_id` int(10) NOT NULL,
  `global_rank` int(10) DEFAULT 0,
  `pp` float DEFAULT 0,
  `total_hits` int(16) DEFAULT 0,
  `play_time` int(12) DEFAULT 0,
  `playcount` int(12) DEFAULT 0,
  `total_score` bigint(20) DEFAULT 0,
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `FK_users_1_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users_2
DROP TABLE IF EXISTS `users_2`;
CREATE TABLE IF NOT EXISTS `users_2` (
  `user_id` int(10) NOT NULL,
  `global_rank` int(10) DEFAULT 0,
  `pp` float DEFAULT 0,
  `total_hits` int(16) DEFAULT 0,
  `play_time` int(12) DEFAULT 0,
  `playcount` int(12) DEFAULT 0,
  `total_score` bigint(20) DEFAULT 0,
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `FK_users_2_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.users_3
DROP TABLE IF EXISTS `users_3`;
CREATE TABLE IF NOT EXISTS `users_3` (
  `user_id` int(10) NOT NULL,
  `global_rank` int(10) DEFAULT 0,
  `pp` float DEFAULT 0,
  `total_hits` int(16) DEFAULT 0,
  `play_time` int(12) DEFAULT 0,
  `playcount` int(12) DEFAULT 0,
  `total_score` bigint(20) DEFAULT 0,
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `FK_users_3_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table hikarudev.websocket
DROP TABLE IF EXISTS `websocket`;
CREATE TABLE IF NOT EXISTS `websocket` (
  `connection_id` varchar(64) NOT NULL,
  `connection_token` varchar(64) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`connection_id`),
  KEY `FK_websocket_accounts` (`user_id`),
  CONSTRAINT `FK_websocket_accounts` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for trigger hikarudev.mirror_copy_to_live
DROP TRIGGER IF EXISTS `mirror_copy_to_live`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `mirror_copy_to_live` AFTER INSERT ON `mirror` FOR EACH ROW BEGIN
IF NOT EXISTS (SELECT 1 FROM hikaru.mirror WHERE id = NEW.id) THEN
    INSERT INTO hikaru.mirror VALUES(NEW.id, NEW.LM, NEW.CD, NEW.CL, NEW.CT, NEW.ETag);
END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger hikarudev.on_register
DROP TRIGGER IF EXISTS `on_register`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `on_register` AFTER INSERT ON `accounts` FOR EACH ROW BEGIN
INSERT INTO users (user_id, username) VALUES (NEW.user_id, NEW.username);
INSERT INTO users_0 (user_id) VALUES (NEW.user_id);
INSERT INTO users_1 (user_id) VALUES (NEW.user_id);
INSERT INTO users_2 (user_id) VALUES (NEW.user_id);
INSERT INTO users_3 (user_id) VALUES (NEW.user_id);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
