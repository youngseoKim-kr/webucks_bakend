CREATE TABLE allergies 
(
    id int not null,
    name varchar(200) UNIQUE not null,
    create_at datetime default now(), 
    PRIMARY KEY (id)
);