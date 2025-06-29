CREATE DATABASE  IF NOT EXISTS `animal_shelter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `animal_shelter`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: animal_shelter
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal`
--

DROP TABLE IF EXISTS `animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `age` varchar(255) DEFAULT NULL,
  `animal_type` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `temperament` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `child_safe` bit(1) DEFAULT NULL,
  `friendly` bit(1) DEFAULT NULL,
  `microchip` bit(1) DEFAULT NULL,
  `special_food` bit(1) DEFAULT NULL,
  `sterilized` bit(1) DEFAULT NULL,
  `adopted` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal`
--

LOCK TABLES `animal` WRITE;
/*!40000 ALTER TABLE `animal` DISABLE KEYS */;
INSERT INTO `animal` VALUES (2,'5 ani','Caine','German Shepherd','http://localhost:8090/api/images/german_shepherd.webp','Bella','Mare','Protectiv','femela',_binary '\0',_binary '',_binary '',_binary '\0',_binary '',_binary ''),(14,'8 ani','Caine','Bichon','http://localhost:8090/api/images/2b4f2d54-d53a-40ea-9e90-ac37e20fcc94_DSC_0994.jpg','Ramsey','Medie','Protectiv','mascul',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0',_binary '\0'),(15,'1 an','Caine','Pechinez','http://localhost:8090/api/images/1d363bfc-0be3-434d-a3c2-62bbbec1f1f8_ChatGPT Image Jun 22, 2025, 05_56_18 PM.png','Lucky','Mica','Jucăuș','mascul',_binary '',_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0'),(16,'1 an','Pisica','Tărcată','http://localhost:8090/api/images/5f32b403-d468-4c04-9498-2e657b11c1be_profil luffy.png','Luffy','Medie','Energic','mascul',_binary '',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0'),(17,'3 ani','Caine','Bichon ','http://localhost:8090/api/images/247ee87f-dbbb-4c7a-a727-afae244c6daa_profil.png','Matty','Mica','Liniștit','mascul',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '\0'),(18,'2 ani','Pisica','Europeană','http://localhost:8090/api/images/0d15b139-0b21-430c-addd-2d088d26e78c_profil miti.png','Miți','Mica','Afectuos','mascul',_binary '',_binary '',_binary '',_binary '\0',_binary '',_binary '\0'),(19,'5 ani','Caine','Border Collie','http://localhost:8090/api/images/f479a9a7-196c-4e1f-8882-26b971eb1a70_profil vacuta.png','Văcuță','Mare','Prietenos','mascul',_binary '',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal_image`
--

DROP TABLE IF EXISTS `animal_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `animal_id` bigint NOT NULL,
  `position` int NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKe1ssstcnvyc678x6acwr2to1a` (`animal_id`),
  CONSTRAINT `FKe1ssstcnvyc678x6acwr2to1a` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_image`
--

LOCK TABLES `animal_image` WRITE;
/*!40000 ALTER TABLE `animal_image` DISABLE KEYS */;
INSERT INTO `animal_image` VALUES (10,'http://localhost:8090/api/images/796df271-897b-4011-9b63-e40204b42267_3.jpg',14,2),(11,'http://localhost:8090/api/images/0d9d4715-05d1-42f1-b083-02639d8011b5_1.jpg',14,0),(12,'http://localhost:8090/api/images/78219487-74ff-4ea8-9e6f-d8821a832e8f_2.jpg',14,1),(13,'http://localhost:8090/api/images/c35d0e1e-6b71-4720-b601-e475edfadc8a_IMG-20250622-WA0005.jpg',15,0),(14,'http://localhost:8090/api/images/a79b4cba-db3b-4363-b184-554d888fafe8_IMG-20250622-WA0004.jpg',15,1),(15,'http://localhost:8090/api/images/a21db743-5af9-4897-ba94-9415571568d1_IMG-20250622-WA0019.jpg',16,0),(16,'http://localhost:8090/api/images/36c8ccc0-d618-467c-9f50-08cbcff88258_poza 1.png',16,1),(17,'http://localhost:8090/api/images/e862ffbb-fbf8-4ce1-9ad8-fb3fc5093739_IMG-20250622-WA0011.jpg',17,0),(18,'http://localhost:8090/api/images/96f67992-e4ac-49fa-959a-20f9df0ea98a_IMG-20250622-WA0012.jpg',17,1),(19,'http://localhost:8090/api/images/9d2b49ff-081c-4cdc-b9a9-bb5d603a1b9f_IMG-20250622-WA0020.jpg',17,2),(20,'http://localhost:8090/api/images/45bd1138-f251-42f1-bc34-fe6480181d04_IMG-20250622-WA0014.jpg',18,0),(21,'http://localhost:8090/api/images/e5e35e40-dc6d-4303-aab6-1659f9a910e6_IMG-20250622-WA0016.jpg',18,1),(22,'http://localhost:8090/api/images/684d08c1-f1a3-425b-ba3c-8b855a398998_IMG-20250622-WA0022.jpg',19,0),(23,'http://localhost:8090/api/images/cadc6eae-4400-470d-9b02-3e3f1b40523f_IMG-20250622-WA0023.jpg',19,1);
/*!40000 ALTER TABLE `animal_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2rx4oikd7rs8ddja8k9xc25my` (`user_id`),
  CONSTRAINT `FK2rx4oikd7rs8ddja8k9xc25my` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,652,'2025-06-18 00:16:34.707580',1),(2,11,'2025-06-18 23:58:45.953095',1),(3,50,'2025-06-19 01:05:50.409125',1);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'larisamortoiu@yahoo.com','Larisa','Mortoiu','$2a$10$ShdWEfgPrzu3Fa3KIoBBB.kBSIjqp1.CRC2AihwhwfvQV3nrLsEfG','ADMIN'),(3,'lari@yahoo.com','Larisaaa','Mortoiuuu','$2a$10$4BmNmpe5qBojOKc33nZp8.4C7Y3Tn692ujAbTcyA7kh2sU5Rmxrl.','ADMIN'),(4,'test@yahoo.com','test','user','$2a$10$8iww7kv2CSulFtTCG6LFxu5NpziKD36j91CWhn9zI1SBpJG3V0ee6','USER'),(5,'admin@yahoo.com','Admin','Account','$2a$10$UobcPHC.pI2dsdXltijN.eo0cc3n088HBH50GuLXTmVWpjm4DZqNS','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_appointment`
--

DROP TABLE IF EXISTS `visit_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_appointment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `appointment_date` date DEFAULT NULL,
  `observations` varchar(1000) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` enum('APPROVED','PENDING','REJECTED') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKgfxbn6b5ehmx1c9v9ejrutq69` (`user_id`),
  CONSTRAINT `FK109ovuevc0a0ail6njug62q6d` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_appointment`
--

LOCK TABLES `visit_appointment` WRITE;
/*!40000 ALTER TABLE `visit_appointment` DISABLE KEYS */;
INSERT INTO `visit_appointment` VALUES (14,'2025-06-18','-','0788888888',3,'APPROVED'),(16,'2025-06-23','Voi veni dimineața','0712345678',1,'PENDING');
/*!40000 ALTER TABLE `visit_appointment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-27  3:46:09
