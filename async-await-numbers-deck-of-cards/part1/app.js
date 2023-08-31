let favNumber = 12;
let baseURL = "http://numbersapi.com";
let nums = [7, 12, 25]

//1
async function getFact() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
}
getFact();


//2
async function getFacts() {
    let data = await $.getJSON(`${baseURL}/${nums}?json`);
    console.log(data);
}
getFacts();

//3
async function getFourFacts() {
    let facts = await Promise.all(
        Array.from({length: 4}, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
      });
}
getFourFacts();