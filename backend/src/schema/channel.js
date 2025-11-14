import mongoose from 'mongoose';

const channelSchema= new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Channel name is required']
        }
    },
    { timestamp: true}
);

const Channel=mongoose.model('Channel', channelSchema);
export default Channel;