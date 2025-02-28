-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: emoji_feedback
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'fingergod','fingergod@gmail.com','$2a$12$eY3y.IElibHxPb7q8PRhZucsDIGvNuwCwaPTzgTL9nuU/J9sLbgRu','2025-02-28 05:42:58');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `emoji` varchar(10) NOT NULL,
  `sentiment_score` decimal(3,2) DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `feedback_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,2,1,'😞',NULL,NULL,'2025-02-16 13:22:59',2),(2,2,6,'😍',NULL,NULL,'2025-02-16 13:23:16',5),(3,2,8,'🙂',NULL,NULL,'2025-02-16 13:23:19',4),(4,2,10,'🤬',NULL,NULL,'2025-02-16 13:23:24',1),(5,2,15,'😞',NULL,NULL,'2025-02-16 13:23:29',2),(6,2,1,'😞',NULL,NULL,'2025-02-17 09:02:04',2),(7,2,1,'😍',NULL,NULL,'2025-02-17 13:16:10',5),(8,2,5,'😍',NULL,NULL,'2025-02-17 20:19:32',5),(9,2,7,'😍',NULL,NULL,'2025-02-19 10:51:30',5),(10,2,17,'🤬',NULL,NULL,'2025-02-19 10:51:58',1),(11,7,1,'🤷',0.00,NULL,'2025-02-19 12:50:51',3),(12,7,6,'😃',1.00,NULL,'2025-02-19 12:51:17',5),(13,7,17,'😍',1.00,NULL,'2025-02-19 12:51:25',5),(14,2,2,'👎',-1.00,NULL,'2025-02-20 10:22:13',1);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `avg_rating` decimal(3,2) DEFAULT '0.00',
  `total_ratings` int DEFAULT '0',
  `pin` varchar(4) NOT NULL,
  `pin_expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'Bistro Delight','New York, NY','2025-02-15 09:01:27','Cozy spot for fine dining',3.00,4,'',NULL),(2,'Urban Eats','Los Angeles, CA','2025-02-15 09:01:27','Fast and fresh meals',1.00,1,'',NULL),(3,'Sunset Grill','Miami, FL','2025-02-15 09:01:27','Great views, great food',0.00,0,'',NULL),(4,'Green Haven','San Francisco, CA','2025-02-15 09:01:27','Healthy and organic dishes',0.00,0,'',NULL),(5,'The Classic Diner','Chicago, IL','2025-02-15 09:01:27','Old-school comfort food',5.00,1,'',NULL),(6,'Spice Symphony','Houston, TX','2025-02-15 09:01:27','Authentic Indian flavors',5.00,2,'',NULL),(7,'Burger Haven','Dallas, TX','2025-02-15 09:01:27','Juicy burgers with crispy fries',5.00,1,'',NULL),(8,'Sushi World','Seattle, WA','2025-02-15 09:01:27','Fresh sushi and Japanese cuisine',4.00,1,'',NULL),(9,'Pasta Paradise','Boston, MA','2025-02-15 09:01:27','Italian pasta dishes made fresh',0.00,0,'',NULL),(10,'Taco Fiesta','San Diego, CA','2025-02-15 09:01:27','Mexican tacos and margaritas',1.00,1,'',NULL),(11,'Café Serene','Denver, CO','2025-02-15 09:01:27','Relaxing atmosphere with artisan coffee',0.00,0,'',NULL),(12,'Steakhouse Prime','Las Vegas, NV','2025-02-15 09:01:27','Premium steaks and fine wine',0.00,0,'',NULL),(13,'Seafood Shack','San Francisco, CA','2025-02-15 09:01:27','Fresh seafood daily',0.00,0,'',NULL),(14,'BBQ Barn','Austin, TX','2025-02-15 09:01:27','Slow-cooked barbecue and smoked meats',0.00,0,'',NULL),(15,'Mediterranean Delights','Phoenix, AZ','2025-02-15 09:01:27','Greek and Middle Eastern flavors',2.00,1,'',NULL),(16,'Vegan Vibes','Portland, OR','2025-02-15 09:01:27','Plant-based meals and smoothies',0.00,0,'',NULL),(17,'Peking House','New York, NY','2025-02-15 09:01:27','Authentic Chinese cuisine',3.00,2,'',NULL),(18,'Dessert Dreams','Philadelphia, PA','2025-02-15 09:01:27','Cakes, pastries, and sweet treats',0.00,0,'',NULL),(19,'Breakfast Bliss','Atlanta, GA','2025-02-15 09:01:27','All-day breakfast and brunch',0.00,0,'',NULL),(20,'The Local Pub','Nashville, TN','2025-02-15 09:01:27','Craft beers and comfort food',0.00,0,'',NULL),(21,'Farm-to-Table','Charlotte, NC','2025-02-15 09:01:27','Locally sourced organic ingredients',0.00,0,'',NULL),(22,'Fusion Feast','San Jose, CA','2025-02-15 09:01:27','Creative fusion dishes from around the world',0.00,0,'',NULL),(23,'Gourmet Pizza','Indianapolis, IN','2025-02-15 09:01:27','Wood-fired pizzas with premium toppings',0.00,0,'',NULL),(24,'Street Bites','Columbus, OH','2025-02-15 09:01:27','Global street food experience',0.00,0,'',NULL),(25,'Waffle Wonderland','Milwaukee, WI','2025-02-15 09:01:27','Belgian waffles with toppings galore',0.00,0,'',NULL),(26,'Hot Pot Haven','Baltimore, MD','2025-02-15 09:01:27','Authentic hot pot dining',0.00,0,'',NULL),(27,'Korean BBQ Spot','Salt Lake City, UT','2025-02-15 09:01:27','Grilled meats and Korean delicacies',0.00,0,'',NULL),(28,'Dim Sum Delight','Kansas City, MO','2025-02-15 09:01:27','Traditional Chinese dumplings and buns',0.00,0,'',NULL),(29,'Tropical Treats','Honolulu, HI','2025-02-15 09:01:27','Hawaiian poke and fresh fruits',0.00,0,'',NULL),(30,'Haileys','Munich, Germany','2025-02-28 06:27:42','Croissant Paradise',0.00,0,'9337','2025-03-01 22:27:42');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentiment_reports`
--

DROP TABLE IF EXISTS `sentiment_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentiment_reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `total_feedback` int DEFAULT '0',
  `positive_feedback` int DEFAULT '0',
  `negative_feedback` int DEFAULT '0',
  `neutral_feedback` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `restaurant_id` (`restaurant_id`),
  CONSTRAINT `sentiment_reports_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentiment_reports`
--

LOCK TABLES `sentiment_reports` WRITE;
/*!40000 ALTER TABLE `sentiment_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentiment_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (2,4,'718de7da14ec8fb2c1c9f913b7ab5eb3b0e6be9ec5e9a70720d2c72853143505','2025-02-13 01:09:47','2025-02-12 09:09:47'),(3,5,'516fa7de5fdc2a0bf7e4deb449cedc072d69a011c293f950d60e85bdf657a385','2025-02-13 01:15:20','2025-02-12 09:15:20'),(4,6,'5e23380f1a485f7610a794649630429238d8843fd1cb57fc9d2c1a8d6e497c8f','2025-02-13 01:25:27','2025-02-12 09:25:27'),(7,2,'5f997b7b6887789e90f32871be27a53c71ca419631c21f4d9874ea8d3d898e50','2025-02-14 07:23:50','2025-02-13 15:23:50'),(8,2,'cb488953749136b7f84591001b9d3b04a3ff9b6b4c9d7f5d786ec418fed7fdfd','2025-02-16 00:23:57','2025-02-15 08:23:57'),(9,2,'adc1dc5215b7baa17c6cd2c69f640e584214afcf0fce30014a04f506748f7b28','2025-02-17 02:17:40','2025-02-16 10:17:40'),(10,2,'e16ca29f135a31a630c07d85d5a69fe1a5dbbeaa4391028c3a525a972795fe7e','2025-02-18 05:15:53','2025-02-17 13:15:53'),(14,7,'ffae74b76797efc1bde4ebfed23973de468b91b009ef41f1b96d42dfc18b2a6d','2025-02-20 04:27:59','2025-02-19 12:27:59'),(15,2,'7fb8ff49a3e112f13a044aaa693fba8df16c19ac16691976c2203c9e95b5cc0d','2025-02-20 08:01:55','2025-02-19 16:01:55'),(17,2,'0d4e8bb02afd2ee5aeb2c01d5e4513016db8ffbed9e756e7f75d4f4eb2404dfe','2025-02-21 08:29:01','2025-02-20 16:29:01'),(18,2,'196c8ce88b04fc39a3a32475b975166905e951afa506dbb781371985cde02cc2','2025-02-25 23:38:03','2025-02-25 07:38:03'),(19,1,'6c279a8a7c4b1184a1f9016d321aefc00a75381dfd3afd2240992e38e4f5edff','2025-02-28 22:07:08','2025-02-28 06:07:08'),(20,2,'bdf8b9f9b62c3f0fb783854b7045c09d7a19cd34abc952b3035a93e101a60fa9','2025-02-28 22:28:37','2025-02-28 06:28:37');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Philip Ukanwoke','philipukchimaobi@gmail.com','$2a$10$oLvZUg.qJaBHaclvOwJXCOnuDjOKTwWQO5/Tc2LpP4qgFa37dNkDG','2025-02-12 08:42:52'),(2,'Finger God','odesk649@gmail.com','$2a$10$/EMr4M9DoOQMkUsMnE7LTu8AujFtUPuWgqeYDWyB4A5S1iZeO2/Ju','2025-02-12 08:51:19'),(3,'Elsa Jean','elsa123@gmail.com','$2a$10$4.KAJWntT.btYtHtn54hluCqdjAaaLxpZKSL0B5eCVz.4702.5/x.','2025-02-12 09:04:33'),(4,'Collins Dev','collinsdev@gmail.com','$2a$10$qIXSFkviLmTu4SSUhEGuquWtHY6gRERWqhQT0qJzxakijaKlMKkpK','2025-02-12 09:09:47'),(5,'Layo','obueks@gmail.com','$2a$10$mEdbgjVBSSbEMTHIKwE5U..30qsbdJ2.kISKY1HrOw65e5rUMtJ5i','2025-02-12 09:15:20'),(6,'Mathias','mathhy123@gmail.com','$2a$10$di0n4BBrLIvtMfyAkfbcBuqqHg8WAsqzFcB5E1QBQqQISIG3Xho9G','2025-02-12 09:25:27'),(7,'Classy Joe','claasy@gmail.com','$2a$10$9yZsah3DhLi2442gPuGvgupCURJSxSCg7IC/8rDsk1go/Vn9dhLsO','2025-02-19 12:27:59');
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

-- Dump completed on 2025-02-28  0:36:06
