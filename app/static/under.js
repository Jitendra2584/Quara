$(document).ready(function() {
    var csrftoken = getCookie('csrftoken'); // Function to get CSRF token from the cookie
    var isClickable = true;

    $('.like-btn').click(function() {
        if (isClickable) {
            isClickable = false;

            var answerId = $(this).data('answer-id');
            var likeCountElement = $(this).siblings('.like-count');

            $.ajax({
                type: 'POST',
                url: '/like/' + answerId + '/',
                data: {
                    'csrfmiddlewaretoken': csrftoken,
                },
                success: function(data) {
                    likeCountElement.text(data.likes);
                },
                error: function(error) {
                    console.log('Error:', error);
                },
                complete: function() {
                    setTimeout(function() {
                        isClickable = true;
                    }, 5000); // Set the clickability to true after 5 seconds (5000 milliseconds)
                }
            });
        }
    });

    // Function to get CSRF token from the cookie
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }
});
