CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(12) NOT NULL
);

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    num_seats INT NOT NULL,
    price_per_day DECIMAL(10,2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE agencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    opening_hours VARCHAR(255),
    phone_number VARCHAR(12) NOT NULL
);

CREATE TABLE payments(
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    status BOOLEAN,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status BOOLEAN, 
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
    agency_id INT REFERENCES agencies(id) ON DELETE SET NULL,
    payment_id INT REFERENCES payments(id) ON DELETE SET NULL
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    content VARCHAR(1000) NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    time_stamp TIMESTAMP NOT NULL,
    is_user_message BOOLEAN NOT NULL
);
