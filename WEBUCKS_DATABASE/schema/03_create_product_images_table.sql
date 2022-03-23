CREATE TABLE product_images 
(
    id int not null,
    image_url VARCHAR(3000) not null,
    product_id int not null,
    create_at datetime default now(),
    primary key (id),
    foreign key (product_id) references products (id) 
);