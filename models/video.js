// Following is the Schema for the data stored in MongoDB.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    video_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
    },
    description:{
        type: String,
        trim: true,
    },
    thumbnail:{
        type: String,
        trim: true,
    },
    channel_id:{
        type: String,
        trim: true,
    },
    channel_title:{
        type: String,
        trim: true
    },
    publish_time:{
        type: Date,
        trim: true
    }
});

module.exports = mongoose.model('Video', videoSchema);