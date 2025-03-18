CREATE DATABASE data_timeline;

\c data_timeline;

CREATE TABLE auth (
    id SERIAL PRIMARY KEY,
    sub TEXT UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_title VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE graphs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    short_title VARCHAR(30) NOT NULL,
    description TEXT,
    source VARCHAR(255),
    license_name VARCHAR(255),
    license_link VARCHAR(2048),
    values JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

