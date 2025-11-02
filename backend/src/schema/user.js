import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    email:{ type:String, required: [true, 'Email is required'], unique:[true, 'Email already exists'], match:[ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'please fill a valid email']},

    password:{type:String, require:[true,'password is required']},
    username:{
        type:String,
        required:[true, 'username is require'],
        unique:[true, 'username is already exists'],
        match:[ /^[a-zA-Z0-9]+$/, 'username constains only letters and numbers']
    },
    avatar:{
        type:String
    },
}, 
    {timestamps:true}
);

userSchema.pre('save', function saveruser(next){
    const user=this;
    user.avatar=`http://robohash.org/${user.username}`;
    next();
});

const user=mongoose.model('User',userSchema);

export default user;