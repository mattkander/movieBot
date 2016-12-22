/**
 * Created by MatthewK on 12/9/2016.
 */
console.log("movieBot is starting")

//Imports the package
var Twit = require('twit');

//isolates keys in a separate file. Pulls in through an export. Creates a config object.
var config = require("./config");
//prints out all available info within the config object.
//console.log(config);

var T = new Twit(config);

//opens the stream
var stream = T.stream('user');
//anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg){
    console.log('Follow event');
    var name = eventMsg.source.name;
    console.log("Name field is: "+name);
    var screenName = eventMsg.source.screen_name;
    tweet('@'+screenName+' you followed a work in progress');

}

/*

The below sets an interval to tweet out every 20 seconds.

setInterval(tweet, 1000*20)

 var r = Math.floor(Math.random()*100);

 var tweetContent = {status: 'Troy Smells '+r+"% worse than yesterday"};
 */

function tweet(txt) {
    T.post('statuses/update', {status: txt}, function (err, data, response) {
        console.log(txt);
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


