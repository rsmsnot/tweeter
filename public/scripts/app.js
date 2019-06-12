/* eslint-disable no-console */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// calculate time ago
function timeAgo(ts) {
    const d = new Date();
    const nowTs = Math.floor(d.getTime() / 1000);
    const seconds = nowTs - ts;

    if (seconds > 2 * 24 * 3600) {
        return "a few days ago";
    }
    if (seconds > 24 * 3600) {
        return "yesterday";
    }

    if (seconds > 3600) {
        return "a few hours ago";
    }
    if (seconds > 1800) {
        return "Half an hour ago";
    }
    if (seconds > 60) {
        return Math.floor(seconds / 60) + " minutes ago";
    }
    return "A long time ago"
}
    // let seconds = Number(ts);
    // let d = Math.floor(Number(ts) / (3600 * 24));
    // let h = Math.floor(Number(ts) % (3600 * 24) / 3600);
    // let m = Math.floor(Number(ts) % 3600 / 60);
    // let s = Number(ts)
    // console.log(seconds);

    // console.log(d, h, m, s)
    // if (d > 365) {
    //     return d % 365 + " years ago";
    // }
    // if (d > 31 && d < 365) {
    //     return d % 31 + " months ago";
    // }
    // if (h > 24 && d < 31) {
    //     return d + " days ago";
    // }
    // if (m > 60 && h < 24) {
    //     return h + " hours ago";
    // }
    // if (s > 60 && m < 60) {
    //     return m + " minutes ago";
    // }
    // if (s < 60) {
    //     return s + " seconds ago";
    // }
    // if(totalDays > 365) {
    //     return Math.round(totalDays / 365) + " years ago"
    // }
// }



$(document).ready(function () {
    function createTweetElement(tweetData) {

        var newTweet = $("<article>").addClass("tweet");

        let header = $("<header>").appendTo(newTweet);
        $("<img>")
            .addClass("avatar")
            .attr("src", tweetData.user.avatars.small)
            .appendTo(header);
        $("<div>")
            .addClass("username")
            .text(tweetData.user.name)
            .appendTo(header);
        $("<div>")
            .addClass("handle")
            .text(tweetData.user.handle)
            .appendTo(header);

        let mainText = $("<p>").text(tweetData.content.text).appendTo(newTweet);

        let footer = $('<footer>').text(timeAgo(tweetData.created_at)).appendTo(newTweet);

        return newTweet;
    }

    const tweetData = []

    function renderTweets(tweets) {
        for (let people of tweets) {
            $('.tweet-container').prepend(createTweetElement(people));
        }
    }
    renderTweets(tweetData);

    



    $(function () {
        var form = $('form');

        $("form").submit(function (event) {
            event.preventDefault();
            var formData = $(form).serialize()
            console.log(formData)
            if($(".text-area").val().length > 140) {
                console.log( "Too many characters")
                return

            } 
            if($(".text-area").val().length === 0) {
                console.log("NOTHING")
                return
            }

            $.post( "/tweets", formData, function callbackFunction() {
                $(".tweet-container").empty();
                loadTweets();
            })
            
        });
    });


    function loadTweets() {
        $.get("/tweets") 
            .then((getTweets)=> {
                renderTweets(getTweets);
                console.log(getTweets)
            });
            
    }  
    loadTweets(); 
});