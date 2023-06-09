import React from 'react';

interface ButtonProps {
	children: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
	children,
	onClick,
}: ButtonProps) => (
	<button type="submit" className="button" onClick={onClick}>
		{children}
	</button>
);
