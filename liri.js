var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var keys = require('./key');


var input = process.argv[2];


if (input === "my-tweets") {
  var client = new Twitter(keys.twitter);
  var params = {
    screen_name: 'realDonaldTrump',
    count: 20
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    tweets.forEach(function (tweet, index) {
      console.log((index + 1) + ':', tweet.text);
    });

    // var array = [6, 9, 1, 3, 5];
    // for (var index = 0; index < array.length; index++) {
    //   var number = array[index];
    //   console.log(number, index);
    // }

    // [6, 9, 1, 3, 5].forEach(function(number, index) {
    //   console.log(number, index);
    // });
  });
} else if (input === "spotify-this-song") {
  var client = new Spotify(keys.spotify); //put in local 
  var songName = process.argv[3] || 'The Sign';

  client.search({
    type: 'track',
    query: songName
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // for (var i = 0; i < data.tracks.items.length; i++) {
    //   if (data.tracks.items[i].name === "The sign") {
    //     trackInfo = data.tracks.items[i];
    //     break;
    //   }

    // }
    //   trackInfo = trackInfo || data.tracks.items[0];

    var trackInfo = data.tracks.items.filter(function (item) {
      return item.name === songName;
    })[0] || data.tracks.items[0];

    var artists = trackInfo.artists.map(function (artist) {
      return artist.name;
    }).join(', ');
    // var artistNames = [];
    // for (var i = 0; i < artists.length; i++) {
    //   var artist = artists[i];
    //   artistNames.push(artist);
    // }
    // var artistsNamesString = artistNames.join(', ');
    var album = trackInfo.album.name;
    var name = trackInfo.name;
    var url = trackInfo.preview_url || 'No preview url';
    console.log("Artists:", artists);
    console.log("Song name: " + name);
    console.log("Preview Link: " + url);
    console.log("Album Name: " + album);
    //var artists = 
    //console.log(data.tracks.items[0].artists[0].name); 

    // console.log(JSON.stringify(data));
  });
} else if (input === "movie-this") {
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb, function (error, response, body) {

      // If there were no errors and the response code was 200 (i.e. the request was successful)...
      if (!error && response.statusCode === 200) {

        // Then we print out the imdbRating
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        var nodeArgs = process.argv;
        var movieName = "";
        for (var i = 2; i < nodeArgs.length; i++) {
          if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
          } else {
            movieName += nodeArgs[i];
          }
        }
      }
  });
}