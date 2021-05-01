const googleApis = require('googleapis');
const path = require('path');
const responseParser = require(path.join(__dirname, 'responseParser'));
const Video = require(path.join(__dirname, '../models/video'));

// For multiple Google API keys, please specify as a single string separated by `|`
const AUTH_KEY = process.env.API_KEY.split(` | `); 

let youtubeAPI = new googleApis.youtube_v3.Youtube({
  auth: AUTH_KEY.shift(), // Pop and take the first element in an array, when exhausted shift to next, and so on
})

const params = {
    part: ['snippet'],
    maxResults: 100,
    order: 'ViewCount',
    type: ['video'],
    publishedAfter: '2020-01-01T00:00:00Z',
    q: 'songs'
}

exports.refreshData = () => {
    console.log('Refreshing Data');
    youtubeAPI.search.list(params).then(response => {
        const results = responseParser.parseApiResponse(JSON.parse(JSON.stringify(response.data)));
        // Dump data retrieved from Google API to MongoDB
        return Video.insertMany(results, { ordered: false});
    })
    .then(_response => {
         console.log("Refreshed Successfully !!!");
    })
    .catch(err => {
        if(err.errors[0].message === process.env.QUOTA_EXCEEDED_ERROR_MSG && AUTH_KEY.length){
            const newApiKey = AUTH_KEY.shift();
            youtubeAPI = new googleApis.youtube_v3.Youtube({
                auth: newApiKey
              });
              // Replace old API key with the newer one
            console.log(`Quota exceeded for current API key. Updating to new API key: ${newApiKey}`);
        }
        else{
            console.log(`Failed to refresh! Retrying in ${process.env.YOUTUBE_API_REFRESH_INTERVAL}s. Error:\n${err}`)
        }
        
    })
}
