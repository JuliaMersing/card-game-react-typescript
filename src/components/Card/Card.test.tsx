import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card component', () => {
	test('should match snapshot', () => {
		render(
			<Card
				code={'6H'}
				image={'https://deckofcardsapi.com/static/img/6H.png'}
			/>
		);
		const card = screen.getByAltText(/6H/i);
		expect(card).toMatchSnapshot();
	});
});
