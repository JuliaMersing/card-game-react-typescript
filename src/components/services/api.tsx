import axios from 'axios';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export interface Card {
	code: string;
	image: string;
}

export async function getDeck(shuffle = false) {
	const response = await axios.get(`${API_BASE_URL}/new/`);
	const deckId = response.data.deck_id;
	if (shuffle) {
		await shuffleDeck(deckId);
	}
	return deckId;
}

export async function shuffleDeck(deckId: string) {
	const response = await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
	return response.data;
}

export async function drawCard(deckId: string) {
	const response = await axios.get(`${API_BASE_URL}/${deckId}/draw/?count=1`);
	return response.data;
}

export async function addToPile(
	deckId: string,
	pileName: string,
	cards: Card[]
) {
	const cardCodes = cards.map((card) => card.code).join(',');
	const response = await axios.get(
		`${API_BASE_URL}/${deckId}/pile/${pileName}/add/?cards=${cardCodes}`
	);
	return response.data;
}

export async function listCardsInPile(deckId: string, pileName: string) {
	const response = await axios.get(
		`${API_BASE_URL}/${deckId}/pile/${pileName}/list/`
	);
	return response.data;
}
