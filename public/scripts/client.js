/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="tweet">
    <header>
    <a class="username-avatar"><img src=${tweet.user.avatars} alt="">${tweet.user.name}</a>
    <a class="username-link" href="">${tweet.user.handle}</a>
    </header>
    <main>
    <p>${tweet.content.text}</p>
    </main>
    <footer>
    <div>${tweet.created_at}</div>
    <div class="links">
    <button>Many buttons</button>
    <button>Many buttons</button>
    <button>Many buttons</button>
    </div>
    </footer>
    </article>`
    return $tweet;
  };

  const renderTweets = function (tweets) {
    tweetsReversed = tweets.reverse()
    tweetsReversed.forEach(tweet => {
      $('#tweets-container').append(createTweetElement(tweet));
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
          console.log('Success', newTweet);
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
        console.log('Success', tweets);
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