-- Populating 'Brands' table...
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('1', 'Asics');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('2', 'Adidas');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('3', 'Nike');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('4', 'Puma');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('5', 'Reebok');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('6', 'New Balance');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('7', 'Brooks');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('8', 'Mizuno');
INSERT INTO `shoocity_db`.`brands` (`id`, `name`) VALUES ('9', 'Saucony');

-- Populating 'Categories' table...
INSERT INTO `shoocity_db`.`categories` (`id`, `name`) VALUES ('1', 'Track & Field');
INSERT INTO `shoocity_db`.`categories` (`id`, `name`) VALUES ('2', 'Running');
INSERT INTO `shoocity_db`.`categories` (`id`, `name`) VALUES ('3', 'Urban');
INSERT INTO `shoocity_db`.`categories` (`id`, `name`) VALUES ('4', 'Football');
INSERT INTO `shoocity_db`.`categories` (`id`, `name`) VALUES ('5', 'Training');

-- Populating 'Users' table...
INSERT INTO `shoocity_db`.`users` (`id`, `fullname`, `username`, `password`, `email`, `street`, `number`, `birthdate`, `role`, `gender`, `country`, `avatar`, `banner`, `cash`) VALUES ('1', 'Tomas Yu Nakasone', 'Yuchan', '$2b$10$1QXwZ6uyxkmwhAMi8mMxlOAf.kdPNT3NfBTK5Vtt5EHtYwhNKOzaa', 'yu.nakasone@gmail.com', 'Av Falsa', '123', '1999-09-10', 'admin', 'male', 'Argentina', 'userProfile-f3fdb169-4979-4964-bd8b-921befddc1b4.jfif', 'userBanner-73a775d1-7896-4619-ab07-bfba80f3dfa6.jpg', '50000');
INSERT INTO `shoocity_db`.`users` (`id`, `fullname`, `username`, `password`, `email`, `street`, `number`, `birthdate`, `role`, `gender`, `country`, `avatar`, `banner`, `cash`) VALUES ('2', 'Marina Arakaki', 'Mari', '$2b$10$p90D7Z913vWRdUfPCiZs3uyoSn/EOvSndBzBemA739mZykYyTSJaW', 'mari@gmail.com', 'Av false', '234', '1999-08-01', 'customer', 'female', 'Argentina', 'userProfile-670bc523-4987-48ab-a706-6b4ece8d0981.jpg', 'userBanner-03a4e201-8384-4445-8e40-7bb5b4e3eca6.jpg', '50000');
INSERT INTO `shoocity_db`.`users` (`id`, `fullname`, `username`, `password`, `email`, `street`, `number`, `birthdate`, `role`, `gender`, `country`, `avatar`, `banner`, `cash`) VALUES ('3', 'Martina Estevez', 'Martina', '$2b$10$JEQQDBPgErWKbdUN4wja1uKdyq3tXz9gzX/X2opKGO1XnCjBcpmi.', 'martina@gmail.com', 'Av falsa', '789', '2022-09-02', 'admin', 'female', 'Argentina', 'userProfile-f872e404-0820-461a-9870-3fd50e9e9afd.jpg', 'default-banner.jpg', '50000');
INSERT INTO `shoocity_db`.`users` (`id`, `fullname`, `username`, `password`, `email`, `street`, `number`, `birthdate`, `role`, `gender`, `country`, `avatar`, `banner`, `cash`) VALUES ('4', 'Franco Estevez', 'Franco', '$2b$10$AuGwRImRNC7CNnNBle7P4.7lEYKXBjpAWQwx0QW9Ppyg.bFWTXDNW', 'franco@gmail.com', 'Av false', '678', '2022-09-02', 'admin', 'male', 'Argentina', 'userProfile-451d88ac-81b6-4d94-aee3-3636d7cfbfc1.jpg', 'default-banner.jpg', '50000');
INSERT INTO `shoocity_db`.`users` (`id`, `fullname`, `username`, `password`, `email`, `street`, `number`, `birthdate`, `role`, `gender`, `country`, `avatar`, `banner`, `cash`) VALUES ('5', 'Random', 'Random', '$2b$10$YYwGl.tAp/H0CUnnlmYf/eBtuDqVTaIrCdM73wSRY9v7K2wP2St0C', 'random@gmail.com', 'Av Random', '1', '2022-09-02', 'customer', 'male', 'Argentina', 'default.jpg', 'default-banner.jpg', '50000');


-- Populating 'Products' table...
INSERT INTO `shoocity_db`.`products` (`id`, `user_id`, `brand_id`, `model`, `description`, `price`, `discount`, `image`, `gender`, `stock`, `category_id`, `colors_hexa`, `size_eur`) VALUES ('1', '1', '1', 'Evo Ride 2', 'Recomendado para atletismo de pista', '40000', '5', 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/052/002/689/original/1011B017_401.png.png?action=crop&width=2000', 'other', '5', '2', '#10141d,#ffc0cb', '38');
INSERT INTO `shoocity_db`.`products` (`id`, `user_id`, `brand_id`, `model`, `description`, `price`, `discount`, `image`, `gender`, `stock`, `category_id`, `colors_hexa`, `size_eur`) VALUES ('2', '2', '3', 'Zoom Rival S', 'Spikes para atletismo: 100, 200 y 400mts', '25000', '10', 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/039/511/324/original/907564_300.png.png?action=crop&width=750', 'other', '10', '1', '#f2f3f3', '39');
INSERT INTO `shoocity_db`.`products` (`id`, `user_id`, `brand_id`, `model`, `description`, `price`, `discount`, `image`, `gender`, `stock`, `category_id`, `colors_hexa`, `size_eur`) VALUES ('3', '1', '2', 'Ultraboost 21', 'Recomendadas para Running', '32000', '15', 'https://www.pngkit.com/png/full/391-3912534_0-triple-white-sample-original-adidas-ultra-boost.png', 'other', '15', '2', '#f2f3f3', '40');
INSERT INTO `shoocity_db`.`products` (`id`, `user_id`, `brand_id`, `model`, `description`, `price`, `discount`, `image`, `gender`, `stock`, `category_id`, `colors_hexa`, `size_eur`) VALUES ('4', '3', '3', 'Air Max 1 SP', 'Zapatillas urbanas/deportivas', '35000', '20', 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/004/469/979/original/AA0869_100.png.png?action=crop&width=1250', 'other', '20', '3', '#73e350', '41');
INSERT INTO `shoocity_db`.`products` (`id`, `user_id`, `brand_id`, `model`, `description`, `price`, `discount`, `image`, `gender`, `stock`, `category_id`, `colors_hexa`, `size_eur`) VALUES ('5', '4', '5', 'Floatride', 'Recomendadas para Cross', '30000', '25', 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/048/365/595/original/FW9629.png.png?action=crop&width=1250', 'other', '25', '2', '#b5e63d,#4a97bf', '42');






