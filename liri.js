var Twitter = require('twitter');
var keys = require('./key');


var input = process.argv[2];



if (input === "my-tweets") {
  var client = new Twitter(keys.twitter);
  var params = {
    screen_name: 'realDonaldTrump',
    count: 20
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    tweets.forEach(function(tweet, index) {
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

