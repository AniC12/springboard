$(function () {
    $('#movieForm').submit(function (event) {
        event.preventDefault();

        let title = $('#titleInput').val();
        let rating = $('#ratingInput').val();

        let movieItem = $('<li class="movieItem">' +
            '<span class="title">' + title + '</span>' +
            '<span class="rating">Rating: ' + rating + '</span>' +
            '<button class="removeBtn">Remove</button>' +
            '</li>');

        $('#moviesUL').append(movieItem);
        $('#titleInput').val('');
        $('#ratingInput').val('');
    });

    // Handle movie item removal
    $('#moviesList').on('click', '.removeBtn', function () {
        $(this).closest('.movieItem').remove();
    });

    // Handle movie list sorting
    $('#moviesList').on('change', 'select', function () {
        let sortValue = $(this).val();
        let movieList = $('#moviesUL');
        let movieItems = movieList.children('.movieItem');

        // Sort movie items based on sortValue
        movieItems.sort(function (a, b) {
            let aValue = '';
            let bValue = '';
            if (sortValue === 'title') {
                aValue = $(a).find('.title').text();
                bValue = $(b).find('.title').text();
            } else if (sortValue === 'rating') {
                aValue = parseFloat($(a).find('.rating').text().split(': ')[1]);
                bValue = parseFloat($(b).find('.rating').text().split(': ')[1]);
            }

            if (aValue < bValue) {
                return -1;
            } else if (aValue > bValue) {
                return 1;
            } else {
                return;
            }
        });
    });
});
