/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function() {

  const createTweetElement = function (tweetData) {
    //create the $tweet element
    let $tweet = `
      <article class="tweet-article">
        <header class="tweet-header">
          <div class="display-info">
            <img class="small-avatar" src="${tweetData["user"].avatars}"> 
            <p>${tweetData["user"].name}</p>
          </div>
          <p class="hidden-handle">${tweetData["user"].handle}</p>
        </header>
        <p class="text">${tweetData["content"].text}</p>
        <footer class="tweet-footer">
          <p>${tweetData["created_at"]}</p>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
      <br>
        `;
    return $tweet;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweetObj of tweets) {
      let $createdTweet = createTweetElement(tweetObj);
      // console.log($createdTweet);
      //.posted-tweet is the class of the element that will contain these article elements 
      $('.posted-tweet').prepend($createdTweet);
    }
  }


  //ajax accepts an url as an argument 
  //ajax accepts an object with key:value pairs that configure the ajax request
  //what url do we give to ajax?
  //how to use .sterilize?? want to turn the form data into a query string
  //send the query string in the data field of the ajax request 

  // Click action; when action get data.
  // First step user action: click!
  // $('#submit_tweet').click(function(e){

  //   // Prevent redirect
  //   e.preventDefault();

  //   // Capture data e.g. $('tweet-form')
  //   // serialize data
  //   const data = $('.tweet-form').serialize()
    
  //   // Pass data async to url => tweets
  //   $.ajax({
  //     async: true,
  //     url: '/tweets',
  //     type: "POST" ,
  //     data
  //   })
    
  // })


  
  $('#tweet-form').submit(function(event){
    event.preventDefault();
    // Prevent redirect
    
    if($('#tweet-text').val().length <= 0) { 
      alert("Tweet is empty!");
     } else if ($('#tweet-text').val().length > 140) {
       alert("Tweet is too long!");
     } else {
       // Pass data async to url => tweets
       $.ajax({
        url: '/tweets',
        method: "POST" ,
        data: $(this).serialize(),
      })
      .then ((res) => {
        console.log("Success")
        loadTweets()
      })
     }
    })
  
    
  const loadTweets = function () {
    $.ajax ({
      url: '/tweets',
      method: "GET",
    })
    .then ((res) => {
      $('.posted-tweet').empty();
      renderTweets(res)
      $("#tweet-text").replaceWith(`<textarea name="text" id="tweet-text"></textarea>`)
    })
  }



//const $tweet = $(`<article class="tweet">Hello world</article>`);

  //const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like

  //$('.posted-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  //renderTweets(data);


});