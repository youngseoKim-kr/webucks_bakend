CREATE TABLE products_allergies 
(
    id int not null,
    product_id int,
    allergy_id int,
    create_at datetime default now(), 
    PRIMARY KEY (id),
    foreign key (product_id) references products (id),
    foreign key (allergy_id) references allergies (id)
)