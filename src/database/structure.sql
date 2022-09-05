-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema shoocity_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema shoocity_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `shoocity_db` DEFAULT CHARACTER SET utf8 ;
USE `shoocity_db` ;

-- -----------------------------------------------------
-- Table `shoocity_db`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(100) NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(500) NOT NULL,
  `street` VARCHAR(500) NOT NULL,
  `number` VARCHAR(25) NOT NULL,
  `birthdate` DATE NULL DEFAULT NULL,
  `role` VARCHAR(50) NOT NULL,
  `gender` VARCHAR(15) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(200) NULL DEFAULT 'default.jpg',
  `banner` VARCHAR(200) NULL DEFAULT 'default-banner.jpg',
  `cash` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `creation_date` DATETIME NULL DEFAULT NULL,
  `last_updated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Brands` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `logo` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Categories` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Products` (
  `id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `brand_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `model` VARCHAR(100) NOT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `price` DECIMAL(15,2) NOT NULL,
  `discount` DECIMAL(5,1) NOT NULL,
  `image` VARCHAR(200) NULL DEFAULT 'default.png',
  `gender` VARCHAR(50) NOT NULL,
  `stock` INT(5) NOT NULL,
  `category_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `colors_hexa` VARCHAR(200) NULL DEFAULT NULL,
  `size_eur` INT(5) NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NULL,
  `last_updated` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `brand_id_idx` (`brand_id` ASC),
  INDEX `category_id_idx` (`category_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_products_brand_id`
    FOREIGN KEY (`brand_id`)
    REFERENCES `shoocity_db`.`Brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `shoocity_db`.`Categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `shoocity_db`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Favorites` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `product_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id_idx` (`product_id` ASC),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_favorites_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `shoocity_db`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `shoocity_db`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Shopping_carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Shopping_carts` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `transaction_number` INT(20) NULL DEFAULT NULL,
  `status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `fk_shopping_cart_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `shoocity_db`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `shoocity_db`.`Items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `shoocity_db`.`Items` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `shopping_cart_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `product_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `quantity` INT(5) NOT NULL,
  `purchase_value` DECIMAL(15,2) NOT NULL,
  `purchase_date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `shop_cart_id_idx` (`shopping_cart_id` ASC),
  INDEX `product_id_idx` (`product_id` ASC),
  CONSTRAINT `fk_items_shopping_cart_id`
    FOREIGN KEY (`shopping_cart_id`)
    REFERENCES `shoocity_db`.`Shopping_carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_items_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `shoocity_db`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
