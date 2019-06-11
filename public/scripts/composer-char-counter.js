// console.log('test');

$(document).ready(function() {
    // console.log("testing");
    let characterLimit = 140;

    $('.new-tweet textarea').on("keyup", function(){
       let counter = $(this).siblings(".counter");
       let characterCount = $(this).val().length;
       let charactersRemaining = characterLimit - characterCount;
    //    console.log( characterCount, charactersRemaining);
       $(counter).text(charactersRemaining);


    });
  });