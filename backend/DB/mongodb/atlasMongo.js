/* import chalk from 'chalk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const AtlasAPI = process.env.ATLAS_API;

export const connectToAtlasDB = async () => {
    try {
        await mongoose.connect(AtlasAPI);
        console.log(chalk.bgHex('#125125125').bold.cyan(" Connection to Atlas DB Established Successfully. "));
    } catch (error) {
        console.error("Failed to connect to AtlasDB, Error: \n" + error);
    }
}; */