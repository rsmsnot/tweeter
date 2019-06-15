

// CALCULATE RELATIVE TIME FUNCTION
function timeAgo(ts) {
    let now = new Date();
    let difference = (now - ts) / 1000;
    let seconds = Math.round(difference);
    let minutes = Math.round(difference / 60);
    let hours = Math.round(difference / 3600);
    let days = Math.round(difference / 86400);
    let months = Math.round(difference / 2600640);
    let years = Math.round(difference / 31207680);

    if (seconds < 60) {
        return seconds + " seconds ago";
    } else if (minutes < 60) {
        return minutes + " minutes ago";
    } else if (hours < 24) {
        return hours + " hours ago";
    } else if (days < 30) {
        return days + " days ago";
    } else if (months < 12) {
        return months + " months ago";
    } else {
        return years + " years";
    }
}


//CREATE TWEET FUNCTION

$(document).ready(function () {
    function createTweetElement(tweetData) {

        let newTweet = $("<article>").addClass("tweet");

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

        $("<p>").text(tweetData.content.text).appendTo(newTweet);

        $('<footer>').text(timeAgo(tweetData.created_at)).appendTo(newTweet);

        return newTweet;
    }


    // RENDER TWEETS FUNCTION

    function renderTweets(tweets) {
        for (let people of tweets) {
            $('.tweet-container').append(createTweetElement(people));
        }
    }


    // TOGGLE FORM BUTTON

    $("#toggleFormButton").click(function () {
        $("#tweetForm").slideToggle(() => {
            $('.text-area').focus();
        });
    });


    // FORM SUBMISSION ERRORS

    var form = $('form');
    let textArea = $('.text-area');

    form.submit(function (event) {
        event.preventDefault();
        var formData = form.serialize()
        if (textArea.val().length > 140) {
            $("#alert1").slideToggle();
            return;

        }
        if (textArea.val().length === 0) {
            $("#alert2").slideToggle();
            if (textArea.val().length > 0) {
                return;
            }
        }


        //POST TWEET AND RESET TEXT AREA BACK TO DEFAULT
        $.post("/tweets", formData, function () {
            $(".tweet-container").empty();
            loadTweets();
            $('#output').val('');

        })
    });


    // LOAD EXISTING TWEETS

    function loadTweets() {
        $.get("/tweets").then((getTweets) => {
            renderTweets(getTweets);
        });

    }
    loadTweets();
});