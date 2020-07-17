/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  //This function evaluates the text inputted by the user and re-encodes the text so that any unsafe characters are converted into a safe 'encoded' representation
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  //This function creates the new $tweet element
  const createTweetElement = function(tweetData) {
    
    let $tweet = `
      <article class="tweet-article">
        <header class="tweet-header">
          <div class="display-info">
            <img class="small-avatar" src="${tweetData["user"].avatars}"> 
            <p>${tweetData["user"].name}</p>
          </div>
          <p>${tweetData["user"].handle}</p>
        </header>
        <body class="text-body">
          <p class="text">${escape(tweetData.content.text)}</p>
        </body>
        <footer class="tweet-footer">
          <p>${moment(tweetData.created_at).fromNow()}</p>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
        `;
    return $tweet;
  };

  //This function renders the created tweet to the page and adds it to the top of the list of tweets displayed
  const renderTweets = function(tweets) {
    for (tweetObj of tweets) {
      let $createdTweet = createTweetElement(tweetObj);
      //.posted-tweet is the class of the element that will contain these article elements
      $('.posted-tweet').prepend($createdTweet);
    }
  };

  
  //ajax POST request
  //validates input to ensure it is not empty or more than 140 characters, if so, returns error message
  $('#tweet-form').submit(function(event){
    event.preventDefault();

    $('.over-alert').slideUp(1000);
    $('.empty-alert').slideUp(1000);

    if ($('#tweet-text').val().length <= 0) {
      $('.empty-alert').slideDown(1000);
    } else if ($('#tweet-text').val().length > 140) {
       $('.over-alert').slideDown(1000);
    } else {
      
      // Pass data async to url => tweets
      $.ajax({
        url: '/tweets',
        method: "POST" ,
        data: $(this).serialize(),
      })
        .then((res) => {
          console.log("Success")
          loadTweets()
        })
    }
  });
  
  //ajax GET request
  //loads current collection of tweets onto the page
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: "GET",
    })
      .then ((res) => {
        $('.posted-tweet').empty();
        renderTweets(res);
      })
    $('#tweet-text').val('');
    $('.counter').val(140);
  };

});