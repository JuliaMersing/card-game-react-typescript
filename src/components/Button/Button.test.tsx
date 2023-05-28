import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
	const setUp = () => {
		const mockHandleShuffle = jest.fn();
		const mockHandleDraw = jest.fn();
		const mockHandleShowPile = jest.fn();

		const { container: shuffleContainer, getByRole: getByRoleShuffle } = render(
			<Button onClick={mockHandleShuffle}>Shuffle</Button>
		);
		const { container: drawContainer, getByRole: getByRoleDraw } = render(
			<Button onClick={mockHandleDraw}>Draw</Button>
		);
		const { container: pileContainer, getByRole: getByRolePile } = render(
			<Button onClick={mockHandleShowPile}>See Pile</Button>
		);

		return {
			shuffleContainer,
			drawContainer,
			pileContainer,
			getByRoleShuffle,
			getByRoleDraw,
			getByRolePile,
			mockHandleShuffle,
			mockHandleDraw,
			mockHandleShowPile,
		};
	};

	test('should call mockHandleShuffle, mockHandleDraw, and mockHandleShowPile', async () => {
		const {
			getByRoleShuffle,
			getByRoleDraw,
			getByRolePile,
			mockHandleShuffle,
			mockHandleDraw,
			mockHandleShowPile,
		} = setUp();

		const shuffleButton = getByRoleShuffle('button', { name: /Shuffle/i });
		const drawButton = getByRoleDraw('button', { name: /Draw/i });
		const pileButton = getByRolePile('button', { name: /See Pile/i });

		await userEvent.click(shuffleButton);
		await userEvent.click(drawButton);
		await userEvent.click(pileButton);

		expect(mockHandleShuffle).toHaveBeenCalledTimes(1);
		expect(mockHandleDraw).toHaveBeenCalledTimes(1);
		expect(mockHandleShowPile).toHaveBeenCalledTimes(1);
	});
});
