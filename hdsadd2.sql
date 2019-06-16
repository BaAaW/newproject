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
/*Table structure for table `producttype` */

DROP TABLE IF EXISTS `producttype`;

CREATE TABLE `producttype` (
  `pdid` int(11) NOT NULL AUTO_INCREMENT,
  `pdname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`pdid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `producttype` */

insert  into `producttype`(`pdid`,`pdname`) values (1,'汽车保险'),(2,'人寿保险'),(3,'旅游保险'),(4,'健康保险'),(5,'少儿保险'),(6,'人身意外险'),(7,'家庭保险'),(8,'财富规划保险'),(9,'企业保险'),(10,'贷款保证保险'),(11,'免费定制');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
