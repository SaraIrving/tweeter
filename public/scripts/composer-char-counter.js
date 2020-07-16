$(document).ready(function() {
  // --- our code goes here ---
  console.log("Scripts loaded!");
  
  $("#tweet-text").keydown(function () {
    const value = $(this).val().length;
    const maxValue = 140;
    const counter = $(this).parent().find('.counter');

    counter.val(maxValue - value);
    counter.val() < 0 ?  counter.css("color", "red") : counter.css("color", "black");
  })



});
