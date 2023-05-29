import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
	test('should match snapshot', () => {
		render(<Header title="Card Game" />);
		const header = screen.getByText('Card Game');
		expect(header).toMatchSnapshot;
	});
});
