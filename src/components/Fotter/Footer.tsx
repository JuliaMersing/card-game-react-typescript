import React from 'react';

interface FooterProps {
	footerMessage: string;
}

export const Footer: React.FC<FooterProps> = ({
	footerMessage,
}: FooterProps) => {
	return (
		<div className="container mx-auto px-4 py-8 animate-pulse">
			<div className="flex items-center justify-center">
				<h2 className="text-purple-600 text-lg font-bold">{footerMessage}</h2>
			</div>
		</div>
	);
};
