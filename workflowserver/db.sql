/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - operationalflow
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`operationalflow` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `operationalflow`;

/*Table structure for table `formdetails` */

DROP TABLE IF EXISTS `formdetails`;

CREATE TABLE `formdetails` (
  `typeofform` varchar(255) default NULL,
  `formval` varchar(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `formdetails` */

insert  into `formdetails`(`typeofform`,`formval`) values ('Leave','[\'FormLabel&&Leave form\', \'Input&&Name\', \'Input&&Email\', \'Input&&Mobile\', \'Input&&Id no\', \'Select&&Male-Female-Others\', \'Checkbox&&HR\']'),('Promotion','[\'FormLabel&&Promotion form\', \'Input&&Name\', \'Input&&Surname\', \'Input&&Mobile \', \'Select&&Mumbai-Pune-Kolkata\', \'Checkbox&&HR-Project manager\']'),('Appraisal','[\'FormLabel&&Leave form\', \'Input&&Name\', \'Input&&DFSdsdf\', \'Select&&Male-Female-Others\', \'Select&&fdsddfsfd\']');

/*Table structure for table `userapply` */

DROP TABLE IF EXISTS `userapply`;

CREATE TABLE `userapply` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `usertype` varchar(255) default NULL,
  `inputval` varchar(255) default NULL,
  `whoaccess` varchar(255) default NULL,
  `typeofapply` varchar(255) default NULL,
  `status` varchar(255) default 'None',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `userapply` */

insert  into `userapply`(`id`,`username`,`usertype`,`inputval`,`whoaccess`,`typeofapply`,`status`) values (1,'y','Junior','[\'Yash\', \'Salvi\', \'9930090883\', \'Pune\']','HR','Promotion','None'),(2,'y','Junior','[\'Yash\', \'Salvi\', \'9930090883\', \'Pune\']','Project manager','Promotion','Accepted'),(6,'y','Junior','[\'adssdf\', \'yashsalvi1999@gmail.com\', \'Female\']','HR','Leave','Accepted'),(7,'y','Junior','[\'adssdf\', \'yashsalvi1999@gmail.com\', \'Female\']','Team Leader','Leave','Accepted');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `mobile` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `type` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`mobile`,`password`,`type`) values (1,'y','yashsalvi1999@gmail.com','9930090883','y','Junior'),(2,'fdgfg','f@gmail.com','9930090883','dfgffd','dfgdfg'),(3,'h','yashsalvi1999@gmail.com','9930090444','h','HR');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
