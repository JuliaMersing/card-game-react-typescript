import React, { useState } from 'react';

interface ErrorProps {
	message: string;
	onClose?: () => void; // Add the onClose prop to the interface
}

export const ErrorContainer: React.FunctionComponent<ErrorProps> = ({
	message,
	onClose,
}: ErrorProps) => {
	const [showAlert, setShowAlert] = useState(true);

	return (
		<>
			{showAlert ? (
				<div className="container-error">
					<span className="error-message">{message}</span>
					<button
						className="button-error"
						onClick={() => {
							setShowAlert(false);
							if (onClose) {
								onClose();
							}
						}}
					>
						<span>x</span>
					</button>
				</div>
			) : null}
		</>
	);
};

export const ClosingErrorContainer: React.FunctionComponent = () => {
	return (
		<>
			<ErrorContainer message="You have to draw a card first!" />
		</>
	);
};
