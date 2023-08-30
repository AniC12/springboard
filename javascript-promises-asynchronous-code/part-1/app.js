let url = 'http://numbersapi.com'
let favNumber = 12

//1
$.getJSON(`${url}/${favNumber}?json`)
    .then(data => {
        console.log(data);
    });

//2
let favNumbers = [7, 10, 12];
$.getJSON(`${url}/${favNumbers}?json`)
    .then(data => {
        console.log(data);
    });

//3
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${url}/${favNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});