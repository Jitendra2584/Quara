$(document).ready(function() {
    var csrftoken = getCookie('csrftoken');
    var isClickable = true;

    function updateLikeButton(button, isLiked) {
        if (isLiked) {
            button.text('Liked');
        } else {
            button.text('Like');
        }
    }

    $('.like-btn').each(function() {
        var answerId = $(this).data('answer-id');
        var likeCountElement = $(this).siblings('.like-count');
        var button = $(this);

        $.ajax({
            type: 'GET',
            url: '/is_liked/' + answerId + '/',
            success: function(data) {
                var isLiked = data.is_liked;
                updateLikeButton(button, isLiked);

                // Set the 'data-is-liked' attribute on the button
                button.attr('data-is-liked', isLiked);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });

        $(this).click(function() {
            if (isClickable) {
                isClickable = false;

                var isLiked = button.attr('data-is-liked') === 'true';

                $.ajax({
                    type: 'POST',
                    url: '/like/' + answerId + '/',
                    data: {
                        'csrfmiddlewaretoken': csrftoken,
                    },
                    success: function(data) {
                        likeCountElement.text(data.likes);

                        // Toggle the 'is_liked' attribute and update the button text accordingly
                        isLiked = !isLiked;
                        button.attr('data-is-liked', isLiked);
                        updateLikeButton(button, isLiked);
                    },
                    error: function(error) {
                        console.log('Error:', error);
                    },
                    complete: function() {
                        setTimeout(function() {
                            isClickable = true;
                        }, 5000);
                    }
                });
            }
        });
    });

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }
});









