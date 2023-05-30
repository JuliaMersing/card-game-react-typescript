import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CardGame } from './components/CardGame/CardGame';

export const App: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CardGame />} />
			</Routes>
		</BrowserRouter>
	);
};
