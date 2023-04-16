CREATE TABLE Users (
    user_id serial PRIMARY KEY,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    address varchar(255) NULL,
    city varchar(255) NULL,
    zipcode VARCHAR(10) NULL,
    country VARCHAR(50) NULL,
    phone VARCHAR(15) NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT U_EMAIL UNIQUE (email)
);


CREATE TABLE Event (
    event_id serial PRIMARY KEY,
    title VARCHAR(255),
    start_date TIMESTAMP NULL,
    end_date TIMESTAMP NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
)

CREATE TABLE EventDetails (
    event_details_id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    budget NUMERIC(10,2) NOT NULL,
    cost NUMERIC(10,2) NOT NULL DEFAULT(0),
    deposit NUMERIC(10,2) NOT NULL DEFAULT(0),
    supplier_name VARCHAR(255) NOT NULL,
    supplier_phone VARCHAR(15) NULL,
    supplier_email VARCHAR(255) NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Event (event_id)
)