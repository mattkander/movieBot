/**
 * Created by MatthewK on 12/9/2016.
 */
console.log("movieBot is starting")

//Imports the package
var Twit = require('twit');
var imdb = require('imdb-api');
//isolates keys in a separate file. Pulls in through an export. Creates a config object.
var config = require("./config");
//prints out all available info within the config object.
//console.log(config);

var T = new Twit(config);

//opens the stream
var stream = T.stream('user');
//anytime someone follows me
stream.on('tweet', replyWithRating);

function replyWithRating(eventMsg) {
    if(eventMsg.text.contains("@movievsbot")) {
        console.log("Entering reply with Rating");
        var movieTitle = getMovieName(eventMsg);
        var movieRating = getMovieRating(eventMsg);
        console.log("print movierating object");
        console.log(movieRating);
        console.log("completed movierating object");


        console.log(movieTitle);

        console.log(movieRating);
        tweet(movieTitle, movieRating);
    }
}

function getMovieRating(movie) {
    console.log('json transfer function');
    var movieObj = {};
    imdb.get(movie).then(function(data) {
        movieObj = data;
        console.log("data title: "+data.title);
        console.log("movie title: "+movieObj.title);
        console.log(movieObj.rating);
        return movieObj;
    });

    console.log(movieObj);
}


function writeTwitterMessage(eventMsg) {
    var fs = require('fs');
    var json = JSON.stringify(eventMsg,null,2);
    fs.writeFile("tweet.json", json);
}

function getMovieName(eventMsg){
    //Take in tweet contents
    // Get movie title
    //Retrieve score from imdb
    //compose reply tweet
    //send out reply tweet.
    var tweetContents = eventMsg.text;
    //Strips the id. Leaves tweet content.
    console.log("Starting strip "+tweetContents);
    for (var i=0; i<tweetContents.length; i++) {
        if (tweetContents[i]==' '){
            tweetContents = tweetContents.substr(i,tweetContents.length+1);
            break;
        }
    }
    return tweetContents;

}

function tweet(movieTitle, movieRating) {
    T.post('statuses/update', {status: movieTitle+" "+movieRating}, function (err, data, response) {
        console.log("Tweet out")
    })
}


function followed(eventMsg){
    console.log('Follow event');
    var name = eventMsg.source.name;
    console.log("Name field is: "+name);
    var screenName = eventMsg.source.screen_name;
    tweet('@'+screenName+' you followed a work in progress');

}

//Calls the GetMovie function which will link to the IMDB api.
//Returns movie json object.
//getMovie("The Green Mile");

function getMovie(movieTitle){
    var movie;
    imdb.get(movieTitle).then(function(data) {
        movie = data;
    });
    }


/*

The below sets an interval to tweet out every 20 seconds.

setInterval(tweet, 1000*20)

 var r = Math.floor(Math.random()*100);

 var tweetContent = {status: 'Troy Smells '+r+"% worse than yesterday"};
 */

function tweet(movieTitle, movieRating) {
    T.post('statuses/update', {status: movieTitle+" "+movieRating}, function (err, data, response) {
        console.log("Tweet out")
    })
}

function tweeted(err, data, response){
    if (err){
        console.log("Something went wrong!");

    }else{
        console.log("Great Success");
    }
}



function getFollowers() {
    T.get('followers/ids', {screen_name: 'badseedtech'}, function (err, data, response) {
        console.log(data)
    })
}


