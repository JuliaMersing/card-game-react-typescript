import React from 'react';
import { Card } from './Card';
import { CardData } from '../services/api';

interface CardsPileProps {
	cards: CardData[];
}

export const CardsPile: React.FC<CardsPileProps> = ({
	cards,
}: CardsPileProps) => {
	const cardsList = cards.map((card) => {
		return (
			<li key={card.code}>
				<Card image={card.image} code={card.code} />
			</li>
		);
	});

	return <ul className="cards-list">{cardsList}</ul>;
};
