/* import { connectToAtlasDB } from "./mongodb/atlasMongo.js"; */
import { connectToLocalMongo } from "./mongodb/localMongo.js";
import config from 'config';

const ENVIRONMENT = config.get("ENVIRONMENT");

export const connectToDB = async () => {
    try {
        if (ENVIRONMENT === "development") {
            await connectToLocalMongo();
/*             await seedInitialUsers();
            await seedInitialCards(); */
        }
        else if (ENVIRONMENT === "production") {
            /* await connectToAtlasDB(); */
/*             await seedInitialUsers();
            await seedInitialCards(); */
        }
        else{
            let error = new Error('Enviroment Type Invalid');
            error.status = 400;
            throw error; 
        };
    } catch (error) {
        throw error;
    };
};