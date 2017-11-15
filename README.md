# Node AI

LIRI - Language Interpretation and Recognition Interface

## Overview

LIRI has 3 main functions.

Display your latest tweets. For this version, to make it interesting, we have picked to display Donald Trump's tweets.
Display song information gathered from the Spotify API
Display movie information gathered from the OMDB API
Instructions

Clone this repo
In your terminal/bash, navigate to the directory of the cloned repo
Type these commands
node liri.js my-tweets
this will show Donald Trump's last 20 tweets and when they were created at your terminal/bash window
node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in the terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then the program will default to "The Sign" by Ace of Base
node liri.js movie-this '<movie name here>'
This will output the following information to your terminal/bash window
 * Title of the movie.
 * Year the movie came out.
 * IMDB Rating of the movie.
 * Rotten Tomatoes Rating of the movie.
 * Country where the movie was produced.
 * Language of the movie.
 * Plot of the movie.
 * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'
node liri.js do-what-it-says
LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
If the text inside random.txt says spotify-this-song,"I Want it That Way" then it will display the information about the song in the terminal/bash window as per above
Feel free to change the text in that document to test out the other commands
