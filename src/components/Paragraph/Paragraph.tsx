import React from 'react';

interface ParagraphProps {
	children: number;
}

export const Paragraph: React.FunctionComponent<ParagraphProps> = ({
	children,
}: ParagraphProps) => {
	return (
		<>
			<div className="flex justify-center mb-8">
				<div className="bg-purple-600 text-white rounded-lg py-2 px-4">
					You have {children} remaining cards
				</div>
			</div>
		</>
	);
};
