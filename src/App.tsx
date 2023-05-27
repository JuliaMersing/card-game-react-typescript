import React, { useState, useEffect } from 'react';
import {
	getDeck,
	shuffleDeck,
	drawCard,
	addToPile,
	listCardsInPile,
	Card,
} from './components/services/api';
import { Header } from './components/Header/Header';
import { Button } from './components/Button/Button';
import { Paragraph } from './components/Paragraph/Paragraph';
import { CardImage } from './components/Card/CardImage';

export const App: React.FunctionComponent = () => {
	const [deckId, setDeckId] = useState('');
	const [remaining, setRemaining] = useState(0);
	const [cards, setCards] = useState<Card[]>([]);
	const [card, setCard] = useState<Card | null>(null);
	const [pileCards, setPileCards] = useState<Card[]>([]);
	const [showPile, setShowPile] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		async function fetchDeck() {
			const newDeckId = await getDeck(true);
			setDeckId(newDeckId);
			const response = await drawCard(newDeckId);
			const { remaining } = response;
			setRemaining(remaining);
		}
		fetchDeck();
	}, []);

	const resetCards = () => {
		setCards([]);
		setCard(null);
	};

	const resetPile = () => {
		setPileCards([]);
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
	};

	const handleShowPile = async () => {
		try {
			const response = await listCardsInPile(deckId, 'myPile');
			if (response.piles.myPile.cards === undefined) {
				throw new Error('Cards are undefined');
			}
			setPileCards(response.piles.myPile.cards);
			setShowPile(true);
		} catch (error) {
			console.error('Error occurred:', error);
			setErrorMessage(
				// add a tailwind component here
				'An error occurred while fetching the cards. Please try again.'
			);
		}
	};

	return (
		<div className="container-app">
			<Header />
			<Paragraph>{remaining}</Paragraph>
			<div className="container-draw">
				<div className="container-half">
					<div className="button-wrapper">
						<Button onClick={handleDraw}>Draw</Button>
					</div>
					<div className="flex justify-center">
						{card && (
							<img src={card.image} alt={card.code} className="max-w-xs" />
						)}
					</div>
				</div>
				<div className="container-half">
					<div className="button-wrapper">
						<Button onClick={handleShowPile}>See Pile</Button>
					</div>
					<div className="cards-wrapper">
						{showPile &&
							pileCards.map((card) => (
								<div className="w-1/3 p-2" key={card.code}>
									<CardImage src={card.image} alt={card.code} />
								</div>
							))}
					</div>
				</div>
			</div>
			{errorMessage && <p className="warning">{errorMessage}</p>}
			<div className="cards-wrapper">
				{cards.map((card) => (
					<div className="w-1/3 p-2" key={card.code}>
						<CardImage src={card.image} alt={card.code} />
					</div>
				))}
			</div>
			<div className="flex justify-center mt-8">
				<Button onClick={handleShuffle}>Shuffle</Button>
			</div>
		</div>
	);
};
