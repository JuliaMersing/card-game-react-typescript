import React, { useState, useEffect } from 'react';
import {
	getDeck,
	shuffleDeck,
	drawCard,
	addToPile,
	listCardsInPile,
	CardData,
} from '../services/api';
import { get, set } from '../services/localStorage';
import { Header } from '../Header/Header';
import { Button } from '../Button/Button';
import { Paragraph } from '../Paragraph/Paragraph';
import { Card } from '../Card/Card';
import { CardsPile } from '../Card/CardsPile';
import { ErrorContainer } from '../Error/ErrorContainer';
import { Footer } from '../Fotter/Footer';

export const CardGame: React.FunctionComponent = () => {
	const [deckId, setDeckId] = useState(get('deckId', ''));
	const [remaining, setRemaining] = useState(get('remaining', '0'));
	const [cards, setCards] = useState<CardData[]>([]);
	const [card, setCard] = useState<CardData | null>(null);
	const [cardsPile, setCardsPile] = useState(
		get('cardsPile', '<CardData[]>([])')
	);
	const [showPile, setShowPile] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isDeckIdFetched, setIsDeckIdFetched] = useState(false);

	useEffect(() => {
		async function fetchDeck() {
			const newDeckId = await getDeck(true);
			setDeckId(newDeckId);
			const response = await drawCard(newDeckId);
			const { remaining } = response;
			setRemaining(remaining);
			setIsDeckIdFetched(true);
		}
		if (!isDeckIdFetched) {
			fetchDeck();
		}
	}, [isDeckIdFetched]);

	useEffect(() => {
		set('deckId', deckId);
		set('remaining', remaining);
		set('cardsPile', cardsPile);
	}, [deckId, remaining, cardsPile]);

	const resetCards = () => {
		setCards([]);
		setCard(null);
	};

	const resetPile = () => {
		setCardsPile([]);
		setShowPile(false);
	};

	const handleShuffle = async () => {
		await shuffleDeck(deckId);
		resetCards();
		resetPile();
		setRemaining(52);
	};

	const handleDraw = async () => {
		const { cards, remaining } = await drawCard(deckId);
		setCard(cards[0]);
		await addToPile(deckId, 'myPile', cards);
		setRemaining(remaining);
		handleShowPile();
	};

	const handleShowPile = async () => {
		try {
			const response = await listCardsInPile(deckId, 'myPile');
			if (response.piles.myPile.cards === undefined) {
				throw new Error('Cards are undefined');
			}
			setCardsPile(response.piles.myPile.cards);
			setShowPile(true);
		} catch (error) {
			console.error('Error occurred:', error);
			setErrorMessage('null');
		}
	};

	return (
		<div className="container-app">
			{errorMessage && (
				<ErrorContainer message="You have to take a card first!" />
			)}
			<Header title="Card Game" />
			<Paragraph>{remaining}</Paragraph>
			<Button onClick={handleDraw}>Draw</Button>
			{card && <Card image={card.image} code={card.code} />}
			<Button onClick={handleShowPile}>See Pile</Button>
			{showPile && <CardsPile cards={cardsPile} />}
			{cards.map((card) => (
				<Card image={card.image} code={card.code} />
			))}
			<div className="flex justify-center mt-8">
				<Button onClick={handleShuffle}>Shuffle</Button>
			</div>
			<Footer footerMessage="Hope you have fun!"></Footer>
		</div>
	);
};
