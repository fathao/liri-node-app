var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require('./key');

function myTweets() {
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
}

function spotifyThisSong(songName) {
  var client = new Spotify(keys.spotify); //put in local 

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
}

function movieThis(movieName) {
  request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb, function (error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

      // Then we print out the imdbRating
      var movieData = JSON.parse(body);
      console.log("The movie name is: " + movieData.Title);
      console.log("The year released: " + movieData.Year);
      console.log("IMDB rating: " + movieData.imdbRating);
      console.log("Rotten tomatoes rating: " + movieData.Ratings[1].Value);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
    }
  });
}

// --------------------------------------------
// Main
// --------------------------------------------

var DEFAULT_MOVIE = 'Mr.NoBody';
var DEFAULT_SONG = 'The Sign';

function miniPrograms(command, argument) {
  switch(command) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      spotifyThisSong(argument || DEFAULT_SONG);
      break;
    case "movie-this":
      movieThis(argument || DEFAULT_MOVIE);
      break;
    default:
      console.error("Invalid command");
  }
}

var command = process.argv[2];
var argument = process.argv[3];
if (command === "do-what-it-says") {
  var data = fs.readFileSync("random.txt", "UTF8");
  var dataArr = data.split(",");
  command = dataArr[0];
  argument = dataArr[1];
}
miniPrograms(command, argument);

/*
if (input === "my-tweets") {
  myTweets();
} else if (input === "spotify-this-song") {
  spotifyThisSong(process.argv[3] || 'The Sign');
} else if (input === "movie-this") {
  movieThis(process.argv[3] || 'Mr.NoBody');
} else if (input === "do-what-it-says") {
  fs.readFile("random.txt", "UTF8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var command = dataArr[0];
    if (command === "my-tweets") {
      myTweets();
    } else if (command === "spotify-this-song") {
      spotifyThisSong(dataArr[1] || 'The Sign');
    } else if (command === "movie-this") {
      movieThis(dataArr[1] || 'Mr.NoBody');
    }
  })

}
*/