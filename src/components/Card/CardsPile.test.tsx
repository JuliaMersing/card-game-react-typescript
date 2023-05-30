import { render, screen } from '@testing-library/react';
import { CardsPile } from './CardsPile';

const mockCards = [
	{ code: 'AH', image: 'https://deckofcardsapi.com/static/img/AH.png' },
	{ code: '2C', image: 'https://deckofcardsapi.com/static/img/2C.png' },
	{ code: 'KD', image: 'https://deckofcardsapi.com/static/img/KD.png' },
];

describe('CardsPile component', () => {
	test('renders a list of cards', () => {
		render(<CardsPile cards={mockCards} />);

		const cardElements = screen.getAllByRole('listitem');
		expect(cardElements).toHaveLength(mockCards.length);
	});
});
