// const e = require("express");


$(document).ready(function () {
  $("#tweet-text").on("input", function (e) {
    let tweetChar = $(this).val().length
    let charCount = 140 - tweetChar;

    // let charCountWithThis = $(this)[0].nextElementSibling.children[1]//---Accessing the output html tag with name counter
    // charCountWithThis = $(charCountWithThis)[0].innerText;          //---with the method compass wants. I choose to make an
    // console.log('charCountWithThis :', charCountWithThis);          //-- id for this output instead

    if (charCount >= 0) {
      $("#char-count").css("color", "black");
      $("#char-count").text(charCount);
    } else if (charCount < 0) {
      $("#char-count").css("color", "red");
      $("#char-count").text(charCount);
    }


  });
});