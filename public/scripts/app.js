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
    //     {
    //         "user": {
    //             "name": "Newton",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
    //                 "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
    //                 "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    //             },
    //             "handle": "@SirIsaac"
    //         },
    //         "content": {
    //             "text": "If I have seen further it is by standing on the shoulders of giants"
    //         },
    //         "created_at": 1461
    //     },
    //     {
    //         "user": {
    //             "name": "Descartes",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
    //                 "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
    //                 "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
    //             },
    //             "handle": "@rd"
    //         },
    //         "content": {
    //             "text": "Je pense , donc je suis"
    //         },
    //         "created_at": 1461113959088
    //     },
    //     {
    //         "user": {
    //             "name": "Johann von Goethe",
    //             "avatars": {
    //                 "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
    //                 "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
    //                 "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
    //             },
    //             "handle": "@johann49"
    //         },
    //         "content": {
    //             "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    //         },
    //         "created_at": 1461113796368
    //     }
    // ];



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