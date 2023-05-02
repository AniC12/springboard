console.log("Let's get this party started!");

let gifArea = $("#gif-area");
let input = $("#gif-search");

function addGif(res) {
    let numResults = res.data.data.length;
    if (numResults) {
        let randomIdx = Math.floor(Math.random() * numResults);
        let newCol = $("<div>");
        let newGif = $("<img>", {src: res.data.data[randomIdx].images.original.url});
        newCol.append(newGif);
        gifArea.append(newCol);
    }
}


$(".submit-button").on("click", async function (event) {
    event.preventDefault();

    let searchTerm = input.val();
    input.val("");

    const res = await axios.get('http://api.giphy.com/v1/gifs/search?', {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    console.log(res.data);
    addGif(res);
});

$("#remove").on("click", function() {
    gifArea.empty();
});