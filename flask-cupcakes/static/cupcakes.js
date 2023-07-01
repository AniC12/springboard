// Function to get cupcakes from the API and update the cupcake list
function getCupcakes() {
    axios.get('/api/cupcakes')
        .then(function(response) {
            let cupcakes = response.data.cupcakes;
            let cupcakeList = $('#cupcakes-list');
            cupcakeList.empty();

            for (let i = 0; i < cupcakes.length; i++) {
                let cupcake = cupcakes[i];
                let listItem = $('<li>').text(cupcake.flavor + ' - ' + cupcake.size);
                cupcakeList.append(listItem);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

// Function to handle form submission
$('#new-cupcake-form').submit(function(event) {
    event.preventDefault();

    let flavor = $('#flavor-input').val();
    let size = $('#size-input').val();
    let rating = parseFloat($('#rating-input').val());
    let image = $('#image-input').val();

    axios.post('/api/cupcakes', {
        flavor: flavor,
        size: size,
        rating: rating,
        image: image
    })
    .then(function(response) {
        getCupcakes();
        $('#flavor-input').val('');
        $('#size-input').val('');
        $('#rating-input').val('');
        $('#image-input').val('');
    })
    .catch(function(error) {
        console.log(error);
    });
});

// Initial call to get cupcakes when the page loads
getCupcakes();