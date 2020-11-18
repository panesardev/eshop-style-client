export function timeStamp(): string {
	// eg: 2:55 AM/PM | 11 OCT 2020
	const date: Date = new Date();
	const timeStamp = `${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} ~ ${date.getDate()} ${month(date.getMonth())} ${date.getFullYear()}`;
	return timeStamp;
}

function month(n: number): string {
	switch (n) {
		case 0: return 'Jan';
		case 1: return 'Feb';
		case 2: return 'Mar';
		case 3: return 'Apr';
		case 4: return 'May';
		case 5: return 'Jun';
		case 6: return 'Jul';
		case 7: return 'Aug';
		case 8: return 'Sept';
		case 9: return 'Oct';
		case 10: return 'Nov';
		case 11: return 'Dec';
		default: return '';
	}
}