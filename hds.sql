
DROP TABLE IF EXISTS `certtype`;

CREATE TABLE `certtype` (
  `ceid` int(11) NOT NULL AUTO_INCREMENT,
  `cename` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ceid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='证件类型表';

/*Data for the table `certtype` */

insert  into `certtype`(`ceid`,`cename`) values (1,'身份证'),(2,'护照'),(3,'军官证'),(4,'驾照'),(5,'其他');

/*Table structure for table `content` */

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `ctid` int(11) NOT NULL AUTO_INCREMENT,
  `ctname` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ctid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `content` */

insert  into `content`(`ctid`,`ctname`) values (1,'交通工具'),(2,'人身意外'),(3,'医疗保险'),(4,'其它意外');

/*Table structure for table `contenttoprotection` */

DROP TABLE IF EXISTS `contenttoprotection`;

CREATE TABLE `contenttoprotection` (
  `cttoptid` int(11) NOT NULL AUTO_INCREMENT,
  `fkctid` int(11) DEFAULT NULL,
  `fkptid` int(11) DEFAULT NULL,
  PRIMARY KEY (`cttoptid`),
  KEY `fkctid` (`fkctid`),
  KEY `fkptid` (`fkptid`),
  CONSTRAINT `contenttoprotection_ibfk_1` FOREIGN KEY (`fkctid`) REFERENCES `content` (`ctid`),
  CONSTRAINT `contenttoprotection_ibfk_2` FOREIGN KEY (`fkptid`) REFERENCES `protection` (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `contenttoprotection` */

insert  into `contenttoprotection`(`cttoptid`,`fkctid`,`fkptid`) values (1,1,1),(2,2,1),(3,3,1),(4,1,11),(5,3,3),(6,3,9),(7,4,15),(8,2,8),(9,2,12),(10,2,16),(11,2,14);

/*Table structure for table `features` */

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `fid` int(11) NOT NULL AUTO_INCREMENT,
  `feature` varchar(10) NOT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `features` */

insert  into `features`(`fid`,`feature`) values (1,'身故残疾 '),(2,'行李损失'),(3,'意外医疗 '),(4,'电梯意外'),(5,'自然灾害意外 '),(6,'期满返还'),(7,'保额递增'),(8,'住院补贴 '),(9,'身故、全残');

/*Table structure for table `jobclassification` */

DROP TABLE IF EXISTS `jobclassification`;

CREATE TABLE `jobclassification` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) DEFAULT NULL,
  `cgrade` int(11) DEFAULT NULL,
  `cparent` int(11) DEFAULT NULL,
  `ctype` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='职业分类表';

/*Data for the table `jobclassification` */

insert  into `jobclassification`(`cid`,`cname`,`cgrade`,`cparent`,`ctype`) values (1,'一般职位',1,NULL,NULL),(2,'农畜牧业',1,NULL,NULL),(3,'机关团体公司',2,1,NULL),(4,'工厂',2,1,NULL),(5,'农业',2,2,NULL),(6,'内勤人员(不从事危险工作)',3,3,1),(7,'外勤人员(不属于本表下列职业分类所列者)',3,3,2),(8,'负责人（不亲自作业）',3,4,2),(9,'厂长（不亲自作业）',3,4,2),(10,'农场经营者（不亲自作业）',3,5,1),(11,'农民',3,5,2),(12,'长短工',3,5,3),(13,'果农',3,5,3),(14,'苗圃栽培人员',3,5,2),(15,'花圃栽培人员',3,5,2),(16,'饲养家禽家畜人员',3,5,2),(17,'农业技师、指导员',3,5,2),(18,'农业机械之操作及修理人员',3,5,5),(19,'农具商',3,5,2),(20,'糖场技工',3,5,4),(21,'昆虫（蜜蜂）饲养人员',3,5,3);

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `fkinid` int(11) DEFAULT NULL,
  `fkasid` int(11) DEFAULT NULL,
  `fkjobcid` int(11) DEFAULT NULL,
  `relation` varchar(10) DEFAULT NULL,
  `ostart` date DEFAULT NULL,
  `oend` date DEFAULT NULL,
  `benefitway` varchar(20) DEFAULT NULL,
  `distribution` varchar(20) DEFAULT NULL,
  `premium` double(10,2) DEFAULT NULL,
  `copies` int(11) DEFAULT NULL,
  PRIMARY KEY (`oid`),
  KEY `FK_Relationship_3` (`fkinid`),
  KEY `FK_Relationship_4` (`fkasid`),
  KEY `FK_Relationship_5` (`fkjobcid`),
  CONSTRAINT `FK_Relationship_3` FOREIGN KEY (`fkinid`) REFERENCES `users` (`uid`),
  CONSTRAINT `FK_Relationship_4` FOREIGN KEY (`fkasid`) REFERENCES `users` (`uid`),
  CONSTRAINT `FK_Relationship_5` FOREIGN KEY (`fkjobcid`) REFERENCES `jobclassification` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='保单信息表';

/*Data for the table `orders` */

/*Table structure for table `ordertoprotection` */

DROP TABLE IF EXISTS `ordertoprotection`;

CREATE TABLE `ordertoprotection` (
  `otoptid` int(11) NOT NULL AUTO_INCREMENT,
  `fkptid` int(11) DEFAULT NULL,
  `fkoid` int(11) DEFAULT NULL,
  PRIMARY KEY (`otoptid`),
  KEY `FK_Relationship_10` (`fkptid`),
  KEY `FK_Relationship_11` (`fkoid`),
  CONSTRAINT `FK_Relationship_10` FOREIGN KEY (`fkptid`) REFERENCES `protection` (`ptid`),
  CONSTRAINT `FK_Relationship_11` FOREIGN KEY (`fkoid`) REFERENCES `orders` (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='保单-保项关系表';

/*Data for the table `ordertoprotection` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(20) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `minduration` int(11) DEFAULT NULL,
  `unit1` varchar(10) DEFAULT '年',
  `maxduration` int(10) DEFAULT NULL,
  `unit2` varchar(10) DEFAULT '年',
  `minage` int(11) DEFAULT NULL,
  `maxage` int(11) DEFAULT NULL,
  `salearea` varchar(10) DEFAULT NULL,
  `picsrc` varchar(50) DEFAULT NULL,
  `vipprice` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='保险产品信息表';

/*Data for the table `product` */

insert  into `product`(`pid`,`pname`,`description`,`minduration`,`unit1`,`maxduration`,`unit2`,`minage`,`maxage`,`salearea`,`picsrc`,`vipprice`,`score`) values (1,'个人意外综合保险','综合保障意外+医疗+伤残补助，最高可达100万',1,'年',1,'年',16,65,'全国','market/upload/resources/image/2017/06/01/36532.jpg',55,5),(2,'吉祥人生','身故保障 全残保障',3,'年',20,'年',18,65,'全国','market/upload/resources/image/2017/06/06/37515.jpg',NULL,5),(3,'“燃动力”运动意外伤害保险',NULL,1,'天',1,'年',3,65,'全国','market/upload/resources/image/2019/05/17/50269.jpg',NULL,5),(4,'附加定期寿险','这是一款附加的定期寿险产品',10,'年',30,'年',18,60,'全国','market/upload/resources/image/2017/06/06/37518.jpg',NULL,5),(5,'吉祥宝D两全保险','有事百万保障护驾； 没事高额增值返还； 交费期短保障期长',25,'年',25,'年',18,50,'广东省, 陕西省','market/upload/resources/image/2017/06/06/37521.jpg',NULL,5),(6,'个人意外伤害保险','身故 残疾 意外门急诊 医疗费用 医疗补贴',1,'年',1,'年',1,60,'全国','market/upload/resources/image/2017/06/06/37511.jpg',NULL,5),(7,'“乐行人生”铁路乘客意外伤害保险','保意外 保行李 全程安心',0,'天',3,'天',0,70,'全国','market/upload/resources/image/2017/06/01/36467.jpg',3,5),(8,'世纪行人身意外伤害保险（B款）','保险责任细分，根据需求自由组合',1,'年',1,'年',18,65,'全国','market/upload/resources/image/2017/06/06/37512.jpg',NULL,5);

/*Table structure for table `producttofeatures` */

DROP TABLE IF EXISTS `producttofeatures`;

CREATE TABLE `producttofeatures` (
  `ptofid` int(11) NOT NULL AUTO_INCREMENT,
  `fkfid` int(11) DEFAULT NULL,
  `fkpid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ptofid`),
  KEY `fkfid` (`fkfid`),
  KEY `fkpid` (`fkpid`),
  CONSTRAINT `producttofeatures_ibfk_1` FOREIGN KEY (`fkfid`) REFERENCES `features` (`fid`),
  CONSTRAINT `producttofeatures_ibfk_2` FOREIGN KEY (`fkpid`) REFERENCES `product` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `producttofeatures` */

insert  into `producttofeatures`(`ptofid`,`fkfid`,`fkpid`) values (2,1,1),(3,3,1),(4,1,2),(5,1,4),(6,1,5),(7,5,5),(8,2,7),(9,1,7),(10,1,6),(11,1,8);

/*Table structure for table `producttoprotection` */

DROP TABLE IF EXISTS `producttoprotection`;

CREATE TABLE `producttoprotection` (
  `ptoptid` int(11) NOT NULL AUTO_INCREMENT,
  `fkptid` int(11) DEFAULT NULL,
  `fkpid` int(11) DEFAULT NULL,
  `ptbelong` int(11) DEFAULT NULL,
  `ptgrade` int(11) DEFAULT NULL,
  PRIMARY KEY (`ptoptid`),
  KEY `FK_Relationship_7` (`fkptid`),
  KEY `FK_Relationship_8` (`fkpid`),
  KEY `FK_Relationship_9` (`ptbelong`),
  CONSTRAINT `FK_Relationship_7` FOREIGN KEY (`fkptid`) REFERENCES `protection` (`ptid`),
  CONSTRAINT `FK_Relationship_8` FOREIGN KEY (`fkpid`) REFERENCES `product` (`pid`),
  CONSTRAINT `FK_Relationship_9` FOREIGN KEY (`ptbelong`) REFERENCES `protection` (`ptid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='产品-保项关系表';

/*Data for the table `producttoprotection` */

insert  into `producttoprotection`(`ptoptid`,`fkptid`,`fkpid`,`ptbelong`,`ptgrade`) values (1,1,1,NULL,0),(2,2,1,1,1),(3,3,1,1,1),(4,4,1,1,1),(5,5,1,1,1),(6,6,1,1,1),(7,7,2,NULL,0),(8,8,3,NULL,0),(9,9,3,8,1),(10,10,3,8,1),(13,7,4,NULL,0),(14,11,5,NULL,0),(15,12,5,NULL,0),(16,13,5,NULL,0),(17,14,5,NULL,0),(18,15,6,NULL,0),(19,16,7,NULL,0),(20,17,7,16,1),(21,7,8,NULL,0);

/*Table structure for table `protection` */

DROP TABLE IF EXISTS `protection`;

CREATE TABLE `protection` (
  `ptid` int(11) NOT NULL AUTO_INCREMENT,
  `ptname` varchar(30) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `maxctype` int(11) DEFAULT NULL,
  PRIMARY KEY (`ptid`),
  UNIQUE KEY `uqique` (`ptname`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='保障项目列表';

/*Data for the table `protection` */

insert  into `protection`(`ptid`,`ptname`,`amount`,`maxctype`) values (1,'个人人身意外伤害保险',50000,4),(2,'意外伤害骨折保险',5000,4),(3,'个人意外伤害医疗保险',5000,4),(4,'个人意外伤害住院津贴保险',50,4),(5,'意外伤害一级伤残补助金保险',5000,4),(6,'交通事故意外伤害加倍给付保险',100000,4),(7,'身故或全残保险金',10000,4),(8,'运动意外身故/残疾保险金',200000,4),(9,'运动意外医疗保险金',20000,4),(10,'运动中猝死保险金',200000,4),(11,'民航交通意外',1000000,4),(12,'水陆公共交通意外',1000000,4),(13,'自驾车意外',1000000,4),(14,'8大自然灾害意外身故责任',1000000,4),(15,'教育金给付',10000,4),(16,'意外伤害（身故、残疾）',150000,4),(17,'附加行李物品损失',1000,4);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `fkceid` int(11) DEFAULT NULL,
  `uname` varchar(10) DEFAULT NULL,
  `certnum` varchar(50) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL COMMENT '1男0女',
  `birthdate` date DEFAULT NULL,
  `city` varchar(10) DEFAULT NULL,
  `telnum` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `fkceid` (`fkceid`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`fkceid`) REFERENCES `certtype` (`ceid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表（投保人表）';

/*Data for the table `users` */

insert  into `users`(`uid`,`fkceid`,`uname`,`certnum`,`sex`,`birthdate`,`city`,`telnum`,`email`,`address`,`postcode`) values (1,1,'小明','123456789012345678',0,'2008-06-01','长沙','80088208820','123@qq.com','开福区司马里','10086');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
