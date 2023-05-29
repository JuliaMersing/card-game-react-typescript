export const get = (key: string, defaultData: string) => {
	const data = localStorage.getItem(key);
	if (data === null) {
		return defaultData;
	} else {
		return JSON.parse(data);
	}
};

export const set = (key: string, value: string) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const objToExport = {
	get: get,
	set: set,
};
