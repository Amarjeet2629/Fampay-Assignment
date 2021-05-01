const express = require('express');
const bodyParser = require('body-parser');
const {google} = require('googleapis');
const mongoose = require('mongoose');
const path = require('path');
const ENV_VARIABLES = require('dotenv').config();
const youtubeRoute = require('./routes/youtubeRoutes');
const app = express();
const caller = require(path.join(__dirname, 'utils', 'apiCaller'));

// Database URL
const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.h3uaf.mongodb.net:27017,cluster0-shard-00-01.h3uaf.mongodb.net:27017,cluster0-shard-00-02.h3uaf.mongodb.net:27017/${process.env.MONGO_DBNAME}?ssl=true&replicaSet=atlas-deri93-shard-0&authSource=admin&retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use(youtubeRoute);

mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(result => {
        console.log("Connection successful!!!");
        const server = app.listen(process.env.PORT);
        caller.refreshData();
        // Below line of code ensure the list is updated in background after some interval of time
        setInterval(caller.refreshData, process.env.YOUTUBE_API_REFRESH_INTERVAL * 1000); 
    })
    .catch(err => {
        console.log(err);
    })
