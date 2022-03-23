CREATE TABLE nutritions 
(
    id int not null,
    product_id int not null,
    caffein float null,
    fat float null,
    sugar float null,
    sodium float null,
    create_at datetime default now(), 
    primary key (id),
    foreign key (product_id) references products (id)
)