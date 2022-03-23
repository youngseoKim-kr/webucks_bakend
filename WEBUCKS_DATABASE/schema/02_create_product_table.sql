CREATE TABLE products 
(
    id int not null auto_increment, 
    korean_name varchar(200) unique not null, 
    english_name varchar(200) not null,
     category_id int not null, 
     create_at datetime default now(), 
     primary key (id), 
     foreign key (category_id) references categories (id) 
);