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
  }
  
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
        <p class="text">${escape(tweetData.content.text)}</p>
        <footer class="tweet-footer">
          <p>${tweetData["created_at"]}</p>
          <div class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </div>
        </footer>
      </article>
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

  
  $('#tweet-form').submit(function(event){
    event.preventDefault();
    // Prevent redirect

    $('.over-alert').slideUp(1000);
    $('.empty-alert').slideUp(1000);

    if($('#tweet-text').val().length <= 0) { 
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
      .then ((res) => {
        console.log("Success")
        loadTweets()
      })
     }
    // $('#tweet-text').val('');
    // $('.counter').val(140);
  })
  
    
  const loadTweets = function () {
    $.ajax ({
      url: '/tweets',
      method: "GET",
    })
    .then ((res) => {
      $('.posted-tweet').empty();
      renderTweets(res)
      // $("#tweet-text").replaceWith(`<textarea name="text" id="tweet-text"></textarea>`)
    })
    $('#tweet-text').val('');
    $('.counter').val(140);
  }


});