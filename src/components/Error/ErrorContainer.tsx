import React, { useState } from 'react';

interface ErrorProps {
	message: string;
}

export const ErrorContainer: React.FunctionComponent<ErrorProps> = ({
	message,
}: ErrorProps) => {
	const [showAlert, setShowAlert] = useState(true);
	return (
		<>
			{showAlert ? (
				<div className="container-error">
					<span className="error-message">{message}</span>
					<button className="button-error" onClick={() => setShowAlert(false)}>
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
			return <ErrorContainer message="You have to draw a card first!" />;
		</>
	);
};
