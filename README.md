# FamPay Assignment - YouTube Trending API

## Contents
- [Getting Started](#getting-started)
- [Running locally](#running-locally)
  - [Using Docker](#using-docker)
  - [The .env file](#the-env-file)
- [API endpoints](#api-endpoints)
    - [1. /list](#1-list)
    - [2. /search](#2-search)

## Getting Started
Start by cloning the repository using: `https://github.com/Amarjeet2629/Fampay-Assignment.git` followed by `cd Fampay-Assignment`.

Install all the dependencies (including the dev dependencies) using the `npm install` or `npm i` command. Once the dependencies are installed, use `npm start` to start the server.

## Running locally
#### NOTE: Multiple Google API keys can be specified to avoid quota exceed errors. To do this, specify them as a single string, separated using ` | ` (space-pipe-space). Example:
`API_KEY = 'KEY1 | KEY2 | KEY3 | KEY4'`
### Using Docker
Use the following command to build and start the app:
```bash
sudo docker build -t fampay-assignment .
sudo docker run -it -p PORT_OF_YOUR_CHOICE:3000 fampay-assignment
```
#### NOTE: When on docker, build times may stretch to north of 120 seconds. Please be patient during the same.

### The `.env` file
The `.env` file holds the important variables for the whole application which include the MongoDB URL,API keys, etc.

## API endpoints
#### 1. `/list`
```
URL: /list/?page='PAGE_NUMBER'
Request type: GET
Optional data parameters: page
```

NOTE: The `page` parameter is optional and defaults to page 1.

#### 2. `/search`
```
URL1: /search?title='YOUR_STRING'
URL2: /search?desc='YOUR_STRING'
URL3: /search?title='YOUR_STRING&desc='YOUR_STRING'
Request type: GET
Data parameters: title and desc (You can use anyone of the 3 urls.)
```

