/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.5.38 : Database - cpic
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
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
  `fkpdid` int(11) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `fkpdid` (`fkpdid`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`fkpdid`) REFERENCES `producttype` (`pdid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='保险产品信息表';

/*Data for the table `product` */

insert  into `product`(`pid`,`pname`,`description`,`minduration`,`unit1`,`maxduration`,`unit2`,`minage`,`maxage`,`salearea`,`picsrc`,`vipprice`,`score`,`fkpdid`) values (1,'个人意外综合保险','综合保障意外+医疗+伤残补助，最高可达100万',1,'年',1,'年',16,65,'全国','market/upload/resources/image/2017/06/01/36532.jpg',55,5,6),(2,'吉祥人生','身故保障 全残保障',3,'年',20,'年',18,65,'全国','market/upload/resources/image/2017/06/06/37515.jpg',NULL,5,6),(3,'“燃动力”运动意外伤害保险',NULL,1,'天',1,'年',3,65,'全国','market/upload/resources/image/2019/05/17/50269.jpg',NULL,5,6),(4,'附加定期寿险','这是一款附加的定期寿险产品',10,'年',30,'年',18,60,'全国','market/upload/resources/image/2017/06/06/37518.jpg',NULL,5,6),(5,'吉祥宝D两全保险','有事百万保障护驾； 没事高额增值返还； 交费期短保障期长',25,'年',25,'年',18,50,'广东省, 陕西省','market/upload/resources/image/2017/06/06/37521.jpg',NULL,5,6),(6,'个人意外伤害保险','身故 残疾 意外门急诊 医疗费用 医疗补贴',1,'年',1,'年',1,60,'全国','market/upload/resources/image/2017/06/06/37511.jpg',NULL,5,6),(7,'“乐行人生”铁路乘客意外伤害保险','保意外 保行李 全程安心',0,'天',3,'天',0,70,'全国','market/upload/resources/image/2017/06/01/36467.jpg',3,5,6),(8,'世纪行人身意外伤害保险（B款）','保险责任细分，根据需求自由组合',1,'年',1,'年',18,65,'全国','market/upload/resources/image/2017/06/06/37512.jpg',NULL,5,6);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
