
CREATE TABLE items(
  id serial not null,
  description varchar(30) not null
);

INSERT INTO items (description) VALUES 
('db-item1'),
('db-item2'),
('db-item3');

