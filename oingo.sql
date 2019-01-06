/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : proj

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 17/12/2018 19:05:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `nid` int(11) NOT NULL,
  `ctext` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createdBy` int(11) NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE,
  KEY `nid` (`nid`) USING BTREE,
  KEY `createdBy` (`createdBy`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`nid`) REFERENCES `note` (`nid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES (1, 1, 'A', 2);
INSERT INTO `comment` VALUES (2, 1, 'B', 3);
INSERT INTO `comment` VALUES (3, 1, 'C', 2);
INSERT INTO `comment` VALUES (4, 1, 'Cool!!!!', 1);
INSERT INTO `comment` VALUES (11, 1, 'sfasd', 3);
INSERT INTO `comment` VALUES (12, 1, 'sfasd', 3);
INSERT INTO `comment` VALUES (13, 15, 'fkts', 3);
INSERT INTO `comment` VALUES (14, 15, 'Your Comment', 3);
INSERT INTO `comment` VALUES (15, 19, 'Your Comment', 3);
COMMIT;

-- ----------------------------
-- Table structure for filter
-- ----------------------------
DROP TABLE IF EXISTS `filter`;
CREATE TABLE `filter` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `ffrom` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ftag` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `flongi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `flati` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fradius` int(11) DEFAULT NULL,
  `fuid` int(11) DEFAULT NULL,
  `fsid` int(11) DEFAULT NULL,
  `ftime` datetime DEFAULT NULL,
  `fstate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `isvalid` int(11) DEFAULT NULL,
  PRIMARY KEY (`fid`) USING BTREE,
  KEY `fuid_fk` (`fuid`) USING BTREE,
  KEY `filter_ibfk_1` (`fsid`) USING BTREE,
  CONSTRAINT `filter_ibfk_1` FOREIGN KEY (`fsid`) REFERENCES `schedule` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fuid_fk` FOREIGN KEY (`fuid`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of filter
-- ----------------------------
BEGIN;
INSERT INTO `filter` VALUES (1, 'self', '#TS', '121', '121', 1000000, 3, 4, '2018-12-11 19:26:04', 'Boring', 0);
INSERT INTO `filter` VALUES (2, 'all', '#DB', '-73.982861', '40.696173', 100000, 3, 1, '2018-12-13 12:56:58', 'Working on Poject', 1);
INSERT INTO `filter` VALUES (3, 'all', '#TS', '-73.982861', '40.696173', 100000, 3, 1, '2018-12-13 17:24:18', 'Working on Poject', 1);
INSERT INTO `filter` VALUES (4, 'all', '#DB', '-73.982861', '40.696173', 199999, 3, 22, '2018-12-13 18:54:53', 'fucking', 1);
INSERT INTO `filter` VALUES (5, 'all', '#DB', '-73.982861', '40.696173', 199999, 3, 23, '2018-12-13 18:55:55', 'fucking', 1);
INSERT INTO `filter` VALUES (6, 'all', '#123', '-73.982861', '40.696173', 100, 2, 25, '2018-12-17 07:56:05', 'happy', NULL);
INSERT INTO `filter` VALUES (7, 'all', '#DB', '-73.96850744819642', '40.69580528507789', 100, 3, 31, '2018-12-17 15:04:39', 'happy', NULL);
INSERT INTO `filter` VALUES (8, 'all', '#DB', '-73.96850744819642', '40.69580528507789', 100, 3, 33, '2018-12-17 15:50:22', 'happy', NULL);
COMMIT;

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `uid1` int(11) NOT NULL,
  `uid2` int(11) NOT NULL,
  PRIMARY KEY (`uid1`,`uid2`) USING BTREE,
  KEY `uid2_fk` (`uid2`) USING BTREE,
  CONSTRAINT `uid1_fk` FOREIGN KEY (`uid1`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `uid2_fk` FOREIGN KEY (`uid2`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of friend
-- ----------------------------
BEGIN;
INSERT INTO `friend` VALUES (2, 3);
INSERT INTO `friend` VALUES (9, 3);
INSERT INTO `friend` VALUES (10, 3);
INSERT INTO `friend` VALUES (3, 7);
INSERT INTO `friend` VALUES (3, 8);
COMMIT;

-- ----------------------------
-- Table structure for friendrequest
-- ----------------------------
DROP TABLE IF EXISTS `friendrequest`;
CREATE TABLE `friendrequest` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `ruid1` int(11) NOT NULL,
  `ruid2` int(11) NOT NULL,
  PRIMARY KEY (`rid`) USING BTREE,
  KEY `ruid_fk` (`ruid1`) USING BTREE,
  KEY `ruid2` (`ruid2`) USING BTREE,
  CONSTRAINT `friendrequest_ibfk_1` FOREIGN KEY (`ruid2`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ruid_fk` FOREIGN KEY (`ruid1`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of friendrequest
-- ----------------------------
BEGIN;
INSERT INTO `friendrequest` VALUES (2, 1, 3);
INSERT INTO `friendrequest` VALUES (4, 7, 3);
INSERT INTO `friendrequest` VALUES (5, 3, 8);
INSERT INTO `friendrequest` VALUES (6, 3, 9);
INSERT INTO `friendrequest` VALUES (7, 3, 10);
INSERT INTO `friendrequest` VALUES (9, 2, 3);
INSERT INTO `friendrequest` VALUES (10, 2, 3);
INSERT INTO `friendrequest` VALUES (11, 3, 2);
INSERT INTO `friendrequest` VALUES (12, 3, 3);
INSERT INTO `friendrequest` VALUES (13, 2, 3);
INSERT INTO `friendrequest` VALUES (14, 3, 2);
INSERT INTO `friendrequest` VALUES (15, 2, 3);
INSERT INTO `friendrequest` VALUES (16, 3, 1);
COMMIT;

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `nid` int(11) NOT NULL AUTO_INCREMENT,
  `ntext` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ntime` datetime NOT NULL,
  `nlongi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nlati` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nradius` int(11) NOT NULL,
  `nsid` int(11) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `visibility` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `commentable` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`nid`) USING BTREE,
  KEY `cretedBy` (`createdBy`) USING BTREE,
  KEY `sid_fk` (`nsid`) USING BTREE,
  CONSTRAINT `cretedBy` FOREIGN KEY (`createdBy`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `sid_fk` FOREIGN KEY (`nsid`) REFERENCES `schedule` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of note
-- ----------------------------
BEGIN;
INSERT INTO `note` VALUES (1, 'A', '2018-12-11 10:21:50', '-73.983041', '40.695872', 100000, 1, 1, 'all', '1');
INSERT INTO `note` VALUES (2, 'B', '2018-12-11 09:11:15', '-73.983142', '40.695772', 100000, 1, 7, 'friend', '0');
INSERT INTO `note` VALUES (3, 'C  ', '2018-12-11 09:12:20', '-73.983243', '40.695672', 100000, 1, 2, 'friend', '1');
INSERT INTO `note` VALUES (10, 'cindycong', '2018-12-01 11:08:19', '-73.983344', '40.695572', 100000, 12, 10, 'friend', '1');
INSERT INTO `note` VALUES (14, 'saddddd', '2018-12-11 11:08:19', '-73.983445', '40.695472', 100000, 16, 8, 'all', '1');
INSERT INTO `note` VALUES (15, 'hello world', '2018-12-12 11:08:19', '-73.983546', '40.695372', 100000, 17, 9, 'all', '1');
INSERT INTO `note` VALUES (18, 'shopping', '2018-12-13 16:48:32', '-73.9792494', '40.6915024', 20000, 20, 2, 'all', '1');
INSERT INTO `note` VALUES (19, 'eating', '2018-12-13 16:50:50', '-73.9794944', '40.6933024', 20000, 21, 3, 'all', '1');
INSERT INTO `note` VALUES (20, '111', '2018-12-17 07:54:33', '-74.0408729', '40.7270596', 100, 24, 2, 'all', 'all');
INSERT INTO `note` VALUES (21, '1111', '2018-12-17 08:01:01', '-74.0408729', '40.7270596', 100, 26, 3, 'all', 'all');
INSERT INTO `note` VALUES (22, 'HHHH', '2018-12-17 08:05:47', '-74.0408503', '40.727072299999996', 1000, 27, 3, 'all', '1');
INSERT INTO `note` VALUES (23, '111', '2018-12-17 14:23:43', '-73.9865366', '40.6943072', 100, 28, 2, 'all', '1');
INSERT INTO `note` VALUES (24, '111', '2018-12-17 14:33:58', '-73.9865165', '40.6943218', 100, 29, 2, 'all', '1');
INSERT INTO `note` VALUES (25, 'eating', '2018-12-17 15:01:35', '-73.9864011', '40.6945888', 100, 30, 2, 'all', '1');
INSERT INTO `note` VALUES (26, '111', '2018-12-17 15:48:23', '-73.9864134', '40.6945164', 100, 32, 2, 'all', '1');
COMMIT;

-- ----------------------------
-- Table structure for notetag
-- ----------------------------
DROP TABLE IF EXISTS `notetag`;
CREATE TABLE `notetag` (
  `tname` varchar(225) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nid` int(11) NOT NULL,
  PRIMARY KEY (`tname`,`nid`) USING BTREE,
  KEY `notetag_ibfk_1` (`nid`) USING BTREE,
  CONSTRAINT `notetag_ibfk_1` FOREIGN KEY (`nid`) REFERENCES `note` (`nid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of notetag
-- ----------------------------
BEGIN;
INSERT INTO `notetag` VALUES ('#DB', 1);
INSERT INTO `notetag` VALUES ('#IFA', 1);
INSERT INTO `notetag` VALUES ('#TS', 2);
INSERT INTO `notetag` VALUES ('#DB', 3);
INSERT INTO `notetag` VALUES ('#TS', 10);
INSERT INTO `notetag` VALUES ('#DB', 15);
INSERT INTO `notetag` VALUES ('#DB', 18);
INSERT INTO `notetag` VALUES ('#DB', 19);
INSERT INTO `notetag` VALUES ('#123', 20);
INSERT INTO `notetag` VALUES ('#DB', 21);
INSERT INTO `notetag` VALUES ('#DB', 22);
INSERT INTO `notetag` VALUES ('#123', 23);
INSERT INTO `notetag` VALUES ('#123', 24);
INSERT INTO `notetag` VALUES ('#DB', 25);
INSERT INTO `notetag` VALUES ('#DB', 26);
COMMIT;

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `starttime` datetime DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `repetition` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of schedule
-- ----------------------------
BEGIN;
INSERT INTO `schedule` VALUES (1, '2018-12-11 13:41:33', '2018-12-30 13:39:08', 24);
INSERT INTO `schedule` VALUES (3, '2018-12-11 13:41:28', '2018-12-25 13:39:10', 24);
INSERT INTO `schedule` VALUES (4, '2018-12-01 10:08:19', '2018-12-25 10:08:19', 24);
INSERT INTO `schedule` VALUES (12, '2018-12-01 10:08:19', '2018-12-25 10:08:19', 24);
INSERT INTO `schedule` VALUES (16, '2018-12-01 10:08:19', '2018-12-30 10:08:19', 24);
INSERT INTO `schedule` VALUES (17, '2018-12-01 10:08:19', '2018-12-30 10:08:19', 24);
INSERT INTO `schedule` VALUES (20, '2018-12-01 00:00:00', '2018-12-31 00:00:00', 0);
INSERT INTO `schedule` VALUES (21, '2018-12-01 00:00:00', '2018-12-31 00:00:00', 0);
INSERT INTO `schedule` VALUES (22, '2018-12-11 19:26:04', '2018-12-15 19:26:04', 0);
INSERT INTO `schedule` VALUES (23, '2018-12-11 19:26:04', '2018-12-15 19:26:04', 0);
INSERT INTO `schedule` VALUES (24, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (25, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (26, '2018-12-13 11:08:19', '2018-12-14 11:08:19', 0);
INSERT INTO `schedule` VALUES (27, '2018-12-01 00:00:00', '2018-12-31 00:00:00', 0);
INSERT INTO `schedule` VALUES (28, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (29, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (30, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (31, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (32, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
INSERT INTO `schedule` VALUES (33, '2018-12-21 11:08:19', '2018-12-21 11:08:19', 0);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uemail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ustate` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ulongi` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ulati` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ucurrentTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'ZT', 'ZT@outlook.com', '123456', 'CSing', '-73.982861', '40.696173', '2018-12-17 14:42:23');
INSERT INTO `user` VALUES (2, 'A', 'A', 'A', 'A', '-73.982861', '40.696173', '2018-12-17 15:02:12');
INSERT INTO `user` VALUES (3, 'b', 'b', 'b', 'Working on Poject', '-73.96850744819642', '40.69580528507789', '2018-12-13 21:31:50');
INSERT INTO `user` VALUES (7, 'c', 'ZT1@outlook.com', 'c', 'A', '-73.982860', '40.696173', '2018-12-17 14:42:27');
INSERT INTO `user` VALUES (8, 'ZT', 'ZT2@outlook.com', '123456', 'CSing', '123', '123', '2018-12-17 14:42:33');
INSERT INTO `user` VALUES (9, 'ZT', 'ZT3', '123456', 'CSing', '123', '123', '2018-12-17 14:42:36');
INSERT INTO `user` VALUES (10, 'ZT', 'Z@outlook.com', '123456', 'CSing', '123', '123', '2018-12-17 14:42:39');
INSERT INTO `user` VALUES (11, 'ts', 'ts', 'ts', 'fuckin', '-73.9794944', '40.6913024', NULL);
INSERT INTO `user` VALUES (12, 'cc', 'cc', 'bdb480de655aa6ec75ca058c849c4faf3c0f75b1', 'happy', '-73.98640820000001', '40.6945312', NULL);
INSERT INTO `user` VALUES (13, 'cc', 'coco@nyu.edu', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'happy', '-73.9864134', '40.6945164', NULL);
COMMIT;
