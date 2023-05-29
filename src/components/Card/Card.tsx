import React from 'react';
import { CardData } from '../services/api';

export const Card: React.FunctionComponent<CardData> = ({
	code,
	image,
}: CardData) => {
	return <img src={image} alt={code} className="cards-image" />;
};
