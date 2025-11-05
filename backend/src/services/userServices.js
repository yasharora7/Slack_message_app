import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import userRepository from '../repositories/userRepository.js';
import ValidationError from '../utils/errors/validationError.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';


export const signUpService = async (data) => {
    try{
        const newUser = await userRepository.create(data);
        return newUser;
    }catch(error){
        // console.log(error)
        // console.log(error.name, error.cause.code)
        console.log('User service error', error);
        if (error.name === 'ValidationError'){
            console.log("AASDASDnside",error)
            throw new ValidationError({error:error.errors}, error.message);
        }
        // console.log("yasdf")
        if(error.name==='MongooseError' && error.cause.code===11000){
            console.log("1111fdafasdf")
            throw new ValidationError(
                {
                    error:['A user with same email or username already exists']
            },
            'A user with same email or username already exists'
            );
        }
    }
};

export const signInService= async (data)=>{
    try{
        const user= await userRepository.getByEmail(data.email);
        console.log(data);
        if(!user){
            console.log("asdfghjk")
            throw new ClientError({
                explanation:'Invalid data sent from the client',
                message:'No registered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            });
        }

        const isMatch = bcrypt.compareSync(data.password, user.password);

        if(!isMatch){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Invalid password, please try again',
                statusCode: StatusCodes.BAD_REQUEST
            });
        }
        return {
            username:user.username,
            avatar:user.avatar,
            email:user.email,
            token:createJWT({id:user._id, email: user.email})
        };
    } catch(error){
        console.log('User service error', error);
        throw error;
    }
}