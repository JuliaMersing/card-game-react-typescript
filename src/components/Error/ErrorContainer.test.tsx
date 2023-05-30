import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorContainer } from './ErrorContainer';

describe('ErrorContainer component', () => {
	test('should match snapshot', () => {
		render(<ErrorContainer message="You have to draw a card first!" />);
		const error = screen.getByText('You have to draw a card first!');
		expect(error).toMatchSnapshot();
	});

	test('should call onClose when button is clicked', () => {
		const mockHandleOnClose = jest.fn();
		render(
			<ErrorContainer
				message="You have to draw a card first!"
				onClose={mockHandleOnClose}
			/>
		);

		const closeButton = screen.getByRole('button');
		userEvent.click(closeButton);

		expect(mockHandleOnClose).toHaveBeenCalledTimes(1);
	});
});
