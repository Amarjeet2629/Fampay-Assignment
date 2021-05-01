const path = require('path');
const Video = require(path.join(__dirname, "../models/video"));


exports.getList = (req, res, next) => {
    let page = 0;
    let skipValue = 0;
    // Checking if page is passed with url or not
    if(req.query.page !== undefined){
        if(isNaN(+req.query.page)){
            // This ensures that only integers are passed as page number
            return res.status(500).json({"error": "Only integers are allowed for page"});
        }
        page = +req.query.page - 1;
        skipValue = page * process.env.VIDEOS_PER_PAGE;
    }
    Video.find().sort({publish_time: -1}).skip(skipValue).limit(10).then(result => {
        return res.status(200).json({"message": "Fetched successfully", result});
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getSearchList = (req, res,  next) => {
    if(req.query.title || req.query.desc){
        
        `a\bc ensures that if no string is passed then use 
        such a string which ensures that match doesn't happen at any cost`

        const titleSearch = req.query.title ? req.query.title.split(' ') : ["a\bc"];  
        const descSearch = req.query.desc ? req.query.desc.split(' ') : ["a\bc"];

        // Partial Match is taken care off by these for loops
        for(let idx = 0; idx < titleSearch.length; idx++){
            titleSearch[idx] = new RegExp(titleSearch[idx]);
        }
        for(let idx = 0; idx < descSearch.length; idx++){
            descSearch[idx] = new RegExp(descSearch[idx]);
        }

        const regexSearchOptions = {
            "$or": [
                {"title": {
                    "$in": titleSearch
                }},
                {"description": {
                    "$in": descSearch
                }}
            ]
        };
        Video.find(regexSearchOptions).sort({publish_time: -1}).limit(50).then(result => {
            return res.status(200).json({"message": "Fetched Successfully", result});
        })
        .catch(err => {
            console.log(err);
        })
    }
    else{
        return res.status(500).json({"message": "Please input a string"});
    }

}

exports.getIndex = (req, res, next) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../static/index.html'))
}