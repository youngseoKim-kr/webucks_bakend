CREATE TABLE categories
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
); 

CREATE TABLE products_likes
(
  id INT NOT NULL AUTO_INCREMENT,
  users_id int not null,
  product_id int not null,
  Is_like boolean not null default 1,
  create_at datetime default now(), 
  PRIMARY KEY (id),
   foreign key (product_id) references products (id),
   foreign key (users_id) references users (id)
); 


CREATE TABLE products_P_comments
(
  id INT NOT NULL AUTO_INCREMENT,
  users_id int not null,
  product_id int not null,
  content VARCHAR(500) not null,
  create_at datetime default now(), 
  correction_at datetime default now(), 
  delete_at datetime default now(), 
  PRIMARY KEY (id),
  foreign key (product_id) references products (id),
  foreign key (users_id) references users (id)
); 

CREATE TABLE products_C_comments
(
  id INT NOT NULL AUTO_INCREMENT,
  parent_id int not null,
  content VARCHAR(500) not null,
  create_at datetime default now(), 
  correction_at datetime default now(), 
  delete_at datetime default now(), 
  PRIMARY KEY (id),
  foreign key (parent_id) references products_P_comments(id)
); 
