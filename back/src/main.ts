import express from 'express';
import dotenv from 'dotenv';
import { Client } from 'pg';
import { setupMiddleware } from '@/middleware/middleware';


dotenv.config();
const app = express();

setupMiddleware(app);

export const client = new Client({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: 5432,
});

client.connect()
    .then(() => {
        console.log("Connected to PostgreSQL")
        app.listen(
            process.env.PORT,
            () => console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch(err => console.error("Connection error", err.stack))
