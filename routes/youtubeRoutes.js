const express = require('express');

const router = express.Router();
const path = require('path');

const controllers = require(path.join('..', 'controllers', 'youtubeController'));

router.get('/', controllers.getIndex); // This is for index.html

router.get('/list', controllers.getList); // This route is to fetch the data in paginated manner

router.get('/search', controllers.getSearchList); // This helps to search for using title and description

module.exports = router;