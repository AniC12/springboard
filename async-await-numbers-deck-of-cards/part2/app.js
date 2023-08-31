$(function() {
    let baseURL = "https://deckofcardsapi.com/api/deck";

    //1
    async function getSingleCard() {
        let data = await $.getJSON(`${baseURL}/new/draw/?count=1`);
        let { suit, value} = data.cards[0];
        console.log(`${value} of ${suit}`);
    }
    getSingleCard();

    //2
    async function getTwoCards() {
        let first = await $.getJSON(`${baseURL}/new/draw/?count=1`);
        let deckId = first.deck_id;
        let second = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
        [first, second].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value} of ${suit}`);
          });
    }
    getTwoCards();

    //3
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');
    
        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function() {
          let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
          let cardSrc = cardData.cards[0].image;
          $cardArea.append(
            $('<img>', {
              src: cardSrc
            })
          );
          if (cardData.remaining === 0) $btn.remove();
        });
      }
      setup();
});


    