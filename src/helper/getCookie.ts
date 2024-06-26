export default function getCookie(name: string): string {
	const nameLenPlus = (name.length + 1);
	if (typeof document !== undefined) {
		return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0];
	}
	return ''
}; 