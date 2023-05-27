import React from 'react';

interface CardImageProps {
	src: string;
	alt: string;
}

export const CardImage: React.FunctionComponent<CardImageProps> = ({
	src,
	alt,
}: CardImageProps) => {
	return <img src={src} alt={alt} className="max-w-xs" />;
};
