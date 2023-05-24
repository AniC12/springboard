let form = document.querySelector('#create-meme');
let myMemes = document.querySelector("div");
let url = document.querySelector('#image-url');
let topInput = document.querySelector('#top-text');
let botInput = document.querySelector('#bottom-text');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let imagelink = url.value;
    
    let memeDiv = document.createElement('div');
    memeDiv.className = "meme-div";
    myMemes.appendChild(memeDiv);
    
    let memeImg = document.createElement('img');
    memeImg.src = imagelink;
    memeImg.className = "meme-img";
    memeDiv.appendChild(memeImg);
    
    let topText = document.createElement('div');
    topText.className = "img-toptext";
    topText.innerText = topInput.value;
    memeDiv.appendChild(topText);

    let botText = document.createElement('div');
    botText.className = "img-bottext";
    botText.innerText = botInput.value;
    memeDiv.appendChild(botText);

    let button = document.createElement('button');
    button.className = "remove-btn";
    button.innerText = "Remove"
    memeDiv.appendChild(button);

    url.value = '';
    topInput.value = '';
    botInput.value = '';
});

myMemes.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.remove();
    }
});