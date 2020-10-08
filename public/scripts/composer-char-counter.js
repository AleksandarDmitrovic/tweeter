//Tweet Character Count Tracker

const charCountTracker = () => {
  $(document).ready(function() {
    $("#tweet-text").on("input", function() {
      let tweetChar = $(this).val().length;
      let charCount = 140 - tweetChar;
  
      if (charCount >= 0) {
        $("#char-count").css("color", "black");
        $("#char-count").text(charCount);
      } else if (charCount < 0) {
        $("#char-count").css("color", "red");
        $("#char-count").text(charCount);
      }
  
    });
  });
};

charCountTracker();