$(document).ready(function() {
  //alerts that scripts have loaded
  console.log("Scripts loaded!");
  
  //keeps track of how many characters the tweet being typed contains
  $("#tweet-text").keydown(function() {
    const value = $(this).val().length;
    const maxValue = 140;
    const counter = $(this).parent().find('.counter');

    counter.val(maxValue - value);
    counter.val() < 0 ?  counter.css("color", "red") : counter.css("color", "black");
  });

});
