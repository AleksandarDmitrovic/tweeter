/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweets-container').append(createTweetElement(tweet));
  });
}

const createTweetElement = function(tweet) {
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

renderTweets(data);

});
