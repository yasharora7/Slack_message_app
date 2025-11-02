import mongoose from 'mongoose';

import {NODE_ENV, PROD_DB_URL,DEV_DB_URL} from './serverConfig.js';

export default async function connectDB(){
    try{
        if(NODE_ENV==='development'){
            await mongoose.connect(DEV_DB_URL);
        }else if(NODE_ENV==='production'){
            await mongoose.connect(PROD_DB_URL);
        }
        console.log(`Connect to mongodb database from ${NODE_ENV} enviroment`);
    } catch(error){
        console.log('Error connecting to database',error);
    }
}
