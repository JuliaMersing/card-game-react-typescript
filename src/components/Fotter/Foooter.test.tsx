import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
	test('should match snapshot', () => {
		render(<Footer footerMessage="Hope you have fun!" />);
		const footer = screen.getByText('Hope you have fun!');
		expect(footer).toMatchSnapshot;
	});
});
