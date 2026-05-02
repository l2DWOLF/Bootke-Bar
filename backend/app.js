import express from 'express';
import { connectToDB } from './DB/dbService.js';
import router from './router/router.js';
import corsMiddleware from './middleware/cors.js';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { createError } from './utils/errorHandler.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8181;
app.use(corsMiddleware);
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
    const message = err || "Internal Server Error";
    return handleError(res, 500, message);
});

app.get("/", (req, res) => {
    res.send("Bootke API is Running");
});

app.listen(PORT, async () => {
    console.log(chalk.bgHex('#125125125').bold.cyanBright(" Server is listening to Port " + PORT + ". "));

    try {
        await connectToDB();
    } catch (error) {
        createError("DB Connection Failure: ", error);
        process.exit(1);
    };
});