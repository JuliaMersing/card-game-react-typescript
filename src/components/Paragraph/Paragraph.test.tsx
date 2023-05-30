import { render, screen } from '@testing-library/react';
import { Paragraph } from './Paragraph';

describe('Paragraph component', () => {
	test('should match snapshot', () => {
		render(<Paragraph children={52} />);
		const paragraph = screen.getByText('You have 52 remaining cards');
		expect(paragraph).toMatchSnapshot;
	});
});
