-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: shoocity_db
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `logo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Asics','asics-logo.png'),(2,'Adidas','adidas-logo.png'),(3,'Nike','nike-logo.png'),(4,'Puma','puma-logo.png'),(5,'Reebok','reebok-logo.png'),(6,'New Balance','new-balance-logo.png'),(7,'Brooks','brooks-logo.png'),(8,'Mizuno','mizuno-logo.png'),(9,'Saucony','saucony-logo.png');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Track & Field'),(2,'Running'),(3,'Urban'),(4,'Football'),(5,'Training');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_favorites_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favorites_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shopping_cart_id` int(10) unsigned DEFAULT NULL,
  `product_id` int(10) unsigned DEFAULT NULL,
  `quantity` int(5) NOT NULL,
  `purchase_value` decimal(15,2) NOT NULL,
  `purchase_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shop_cart_id_idx` (`shopping_cart_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `fk_items_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_items_shopping_cart_id` FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `brand_id` int(10) unsigned DEFAULT NULL,
  `model` varchar(100) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `discount` decimal(5,1) NOT NULL,
  `image` varchar(200) DEFAULT 'default.png',
  `gender` varchar(50) NOT NULL,
  `stock` int(5) NOT NULL,
  `category_id` int(10) unsigned DEFAULT NULL,
  `colors_hexa` varchar(200) DEFAULT NULL,
  `size_eur` varchar(200) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brand_id_idx` (`brand_id`),
  KEY `category_id_idx` (`category_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_products_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_products_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_products_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (11,31,1,'Evo Ride 2','-',1500.00,5.0,'product-image1663803850123.webp','male',1,1,'#002375,#ffffff,#00c26e','36,37,38,39,40','2022-09-21 23:44:10','2022-09-21 23:44:10'),(12,31,8,'Wave Rider','-',1500.00,5.0,'product-image1663804272784.png','unisex',1,2,'#ffffff,#00ff4c,#e4ff5c','35,36,40','2022-09-21 23:51:12','2022-09-21 23:51:12'),(13,31,2,'UltraBoost 2','-',1000.00,15.0,'product-image1663804318100.png','male',1,2,'#ffffff,#808080,#000000','37,38,39,40','2022-09-21 23:51:58','2022-09-21 23:51:58'),(14,32,1,'GT-1100','-',2000.00,10.0,'product-image1663804387705.png','unisex',1,1,'#ff6600,#001d42,#ffffff','39,40,41,42','2022-09-21 23:53:07','2022-09-21 23:53:07'),(15,32,6,'Fresh Foam','-',1200.00,5.0,'product-image1663804942964.png','unisex',5,3,'#ffffff,#00b3ff,#02265f','34,35,36,39,40,41','2022-09-22 00:02:22','2022-09-22 00:02:22'),(16,32,3,'Fenew','-',800.00,10.0,'product-image1663805002099.webp','female',10,3,'#ffffff,#f48f01,#a6a6a6','34,35,37,38,40','2022-09-22 00:03:22','2022-09-22 00:03:22'),(17,38,5,'Float Ride','-',1500.00,15.0,'product-image1663805088634.webp','female',3,2,'#ffffff,#575757,#99ff9b','41,42,43,44,45','2022-09-22 00:04:48','2022-09-22 00:04:48'),(18,38,4,'Puma Disc','-',1500.00,10.0,'product-image1663806016058.webp','male',10,3,'#ffffff,#000000,#00aaff','34,35,36,39,40','2022-09-22 00:20:16','2022-09-22 00:20:16'),(19,31,3,'SprintStar Green','-',1500.00,15.0,'product-image1663807091876.webp','unisex',5,1,'#ffffff,#000000,#034918','35,36,39,40','2022-09-22 00:38:11','2022-09-22 00:38:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping_carts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `transaction_number` int(20) DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `fk_shopping_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(500) NOT NULL,
  `street` varchar(500) NOT NULL,
  `number` varchar(25) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `country` varchar(100) NOT NULL,
  `avatar` varchar(200) DEFAULT 'default.jpg',
  `banner` varchar(200) DEFAULT 'default-banner.jpg',
  `cash` decimal(15,2) NOT NULL DEFAULT 0.00,
  `creation_date` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'Yu Nakasone','yuchan','$2b$10$VNuoaGxZn3JuJGBS.9EddOJ1T1Jn9QxlJ8g9xnAqTJruMHsvXGh7y','yu.nakasone@gmail.com','asdasd','12345','2022-09-12','admin','male','Argentina','userProfile-7502b2d7-42e6-4bf1-8dbc-0f2f99051ba1.jfif','userBanner-2d4330e0-3743-4fb8-99f8-498c999360bf.jpg',123.00,'2022-09-21 17:33:47','2022-09-21 17:33:47'),(32,'Marii Arakaki','mari','$2b$10$9Hm7luIYwBcqBXskfSwCT.4K0cnsYikZizwi8o7/a62ifageaUoUu','mari@gmail.com','asd','123','2022-09-16','admin','female','Argentina','userProfile-09a26a27-ece8-4704-8e60-5d0c23ab2dca.jpg','userBanner-72109c88-c3ab-4f93-b248-aab26dd7cde5.jpg',123.00,'2022-09-21 03:00:05','2022-09-21 03:00:05'),(37,'Moka Latte','mokamoka','$2b$10$Kb4yLKttyhu9v7hgShk8gOszfFHr1Qs5Pgj6i9007fKk15jFdmoze','moka@gmail.com','asd','123','2022-09-21','admin','female','Bolivia','userProfile-3750a25e-b575-496a-b364-3c770e9cbf1e.jpeg','userBanner-ab6da28f-dc7f-4840-a71f-f76701c1fe1f.jpg',50000000.00,'2022-09-21 03:02:06','2022-09-21 03:02:06'),(38,'Key Nakasone','keynaka','$2b$10$L7BXnbwBkYDCqeTdGCdLmOr7yPUYdWH/OxDAK.2lj2dDjjCxKBT0C','key@gmail.com','asd','123','2022-09-21','admin','male','Argentina','userProfile-2f3eae07-243e-4368-8643-00ba476d9fb4.jfif','userBanner-5e105b7a-06e5-40a1-9575-096c78bd1e90.jpg',123.00,'2022-09-21 17:34:34','2022-09-21 17:34:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-22 20:23:58
