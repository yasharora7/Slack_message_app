import userRepository from '../repositories/userRepository.js';
import ValidationError from '../utils/errors/validationError.js';


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