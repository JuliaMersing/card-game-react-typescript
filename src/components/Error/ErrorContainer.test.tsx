import { render, screen } from '@testing-library/react';
import { ErrorContainer } from './ErrorContainer';

describe('ErrorContainer component', () => {
	test('should match snapshot', () => {
		render(<ErrorContainer message="You have to draw a card first!" />);
		const error = screen.getByText('You have to draw a card first!');
		expect(error).toMatchSnapshot;
	});
});
