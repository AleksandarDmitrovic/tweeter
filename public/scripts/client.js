/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //Escape function to prevent XSS
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="tweet">
    <header>
    <a class="username-avatar"><img src=${tweet.user.avatars} alt="">${tweet.user.name}</a>
    <a class="username-link" href="">${tweet.user.handle}</a>
    </header>
    <main>
    <p>${escape(tweet.content.text)}</p>
    </main>
    <footer>
    <div>${tweet.created_at}</div>
    <div class="links">
    <button><i class="fas fa-flag"></i></button>
    <button><i class="fas fa-retweet"></i></button>
    <button><i class="fas fa-heart"></i>"</button>
    </div>
    </footer>
    </article>`
    return $tweet;
  };

  const renderTweets = function (tweets) {
    tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });
  };

  // Ajax post request -shorthand with promise

  $('form').on('submit', function (event) {
    event.preventDefault()
    let $tweet = $(this).serialize();

    //validation
    $input = $('#tweet-text').val();
    if (!$input) {
      alert("No Tweet Present");
    } else if ($input.length > 140) {
      alert("Tweet is too long");
    } else {
      $.ajax('/tweets', { method: 'POST', data: $tweet })
        .then(function (newTweet) {
          loadtweets();
        })
        .catch(function (error) {
          console.log(error);
        })

    }
  });

  // Ajax get request rendering tweets to home page
  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweets) {
        renderTweets(tweets);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  loadtweets();

});




//-----------------------------------------------------------------------------

  // // AJAX REQUEST LONG FORM --- For my own notes to learn from ---
  // $('form').on('submit', function (event) {
  //   event.preventDefault();
  //   const $tweet = $(this).serialize();
  //   $.ajax({
  //     url: '/tweets',
  //     method: 'POST',
  //     data: $tweet,
  //     success: function(newTweet) {
  //     console.log('Success', newTweet)
  //     },
  //     error: function(error) {
  //       console.log(error);
  //     }
  //   });
  // });