const idKeys = new Set(['number', 'account', 'book']);

export default function parseObject<T>(str: string): T {
	return JSON.parse(str, function(key, val) {
		if (idKeys.has(key) && val !== undefined) {
			return String(val) as UUID; // Support old format
		}

		return val;
	}) as T;
}
