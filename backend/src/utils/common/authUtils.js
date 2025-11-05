import jwt from 'jsonwebtoken';

import { JWT_EXPIRY, JWT_SECERT } from '../../config/serverConfig.js';

export const createJWT=(payload)=>{
    return jwt.sign(payload, JWT_SECERT,{
        expiresIn: JWT_EXPIRY
    });
};