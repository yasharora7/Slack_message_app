import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository={
    ...crudRepository(User),

    getByEmail: async function (email){
        const user = await User.findOne({email});
        return user;
    },

    getByUsername: async function (username){
        const user= await User.findOne({username}).select('-password'); // exclude password
        return user;
    }
};

export default userRepository;

// export const getUserByEmail=(email)=>{};

// export const getUserByName=(name)=>{};

// export const createUser=(user)=>{};

// export const getUser=()=>{};

// export const getUserById=(id)=>{};

// export const deleteUser=(id)=>{};

// export const updateUser=(id,user)=>{};

