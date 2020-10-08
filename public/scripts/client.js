/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //Escape function to prevent XSS
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
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
    <button><i class="fas fa-heart"></i></button>
    </div>
    </footer>
    </article>`;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });
  };

  // Ajax post request -shorthand with promise
  $('form').on('submit', function(event) {
    event.preventDefault();
    let $tweet = $(this).serialize();

    //Validation of input tweet
    $input = $('#tweet-text').val();
    if (!$input) {
      $("#error-message").text("Please write a tweet");
      $('.validation').slideDown();
    } else if ($input.length > 140) {
      $("#error-message").text("Tweet too long. Please keep it short and sweet");
      $('.validation').slideDown();
    } else {
      $('.validation').slideUp();
      $.ajax('/tweets', { method: 'POST', data: $tweet })
        .then(() => {
          loadtweets();
          $('#tweet-text').val('');
          $("#char-count").text(140);
        })
        .catch((error) => {
          console.log(error);
        });

    }
  });

  // Ajax get request rendering tweets to home page
  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweets)
      .catch((error) => {
        console.log(error);
      });
  };

  loadtweets();
  
  //Nav Toggle Button for the tweet form
  $("#display-tweet-form").on("click", () => {
    $('.new-tweet').slideToggle();
    $('#tweet-text').focus();

  });
  
  //Exectuted on scroll
  $(window).on("scroll", function() {
    $('#scroll-up').show();
    $("#display-tweet-form").hide();
  });
  
  //Scroll to Top Button
  $("#scroll-up").on("click", () => {
    $('.new-tweet').slideDown('fast',() => {
      $('#scroll-up').hide(() => {
        $("#display-tweet-form").show();
      });
    });
    $('#tweet-text').focus();
  });


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