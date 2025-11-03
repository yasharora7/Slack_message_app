import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema= new mongoose.Schema({
    email:{ 
        type: String, 
        required: [true, 'Email is required'], unique:[true, 'Email already exists'], 
        match:[ 
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'please fill a valid email address']},

    password:{
        type: String, 
        required:[true,'password is required']},
    username:{
        type: String,
        required:[true, 'Username is require'],
        unique:true,
        minlength:[3,'Username must be atleast 3 characters'],
        match:[ 
            /^[a-zA-Z0-9]+$/, 
            'username consists only letters and numbers']
    },
    avatar:{
        type:String
    },
}, 
    {timestamps:true}
);

userSchema.pre('save', function saveUser(next){
    const user=this;
    const SALT= bcrypt.genSaltSync(9);
    const hashPassword=bcrypt.hashSync(user.password,SALT);
    user.password=hashPassword;
    user.avatar=`http://robohash.org/${user.username}`;
    next();
});

const User=mongoose.model('User',userSchema);

export default User;