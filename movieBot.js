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

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
})

T.get('followers/ids', { screen_name: 'badseedtech' },  function (err, data, response) {
    console.log(data)
})