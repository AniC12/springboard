import React, { useEffect, useState } from "react";
import Card from "./Card";
import DrawButton from "./DrawButton";
import RemainingCards from "./RemainingCards";
import ShuffleButton from "./ShuffleButton";
import axios from "axios";

function Deck() {
    const [curCard, setCurCard] = useState(null);
    const [deckId, setDeckId] = useState('');
    const [remaining, setRemaining] = useState(52);
    const [isShuffling, setisShuffling] = useState(false);

    useEffect(() => {
        createNewDeck();
    }, []);

    const createNewDeck = async () => {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
        setDeckId(res.data.deck_id);
        setRemaining(52);
    };

    const shuffleDeck = async () => {
        if (!deckId) return;

        setisShuffling(true);
        try {
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
            setCurCard(null);
            setRemaining(52);
        } catch (error) {
            console.error('Error shuffling the deck:', error);
        } finally {
            setisShuffling(false);
        }
    };

    const drawCard = async () => {
        if (remaining === 0) {
            alert('Error: no cards remaining!');
            return;
        }
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            setCurCard(res.data.cards[0].image);
            setRemaining(res.data.remaining);
        } catch (error) {
            console.error('Error drawing a card:', error);
        }
    };

    return (
        <div>
            <Card image={curCard} />
            <RemainingCards count={remaining} />
            <DrawButton onClick={drawCard} />
            <ShuffleButton onClick={shuffleDeck} disabled={isShuffling} />
        </div>
    );
}

export default Deck;