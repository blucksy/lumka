export default function formatDate(start: string, end: string): string {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const s = new Date(start);
	const e = end ? new Date(end) : null;

	const sMonth = months[s.getMonth()];
	const sDay = s.getDate();
	const sYear = s.getFullYear();

	if (!e) {
		return `${sMonth} ${sDay}, ${sYear}`;
	}

	const eMonth = months[e.getMonth()];
	const eDay = e.getDate();
	const eYear = e.getFullYear();

	// Same month + same year
	if (sYear === eYear && s.getMonth() === e.getMonth()) {
		return `${sMonth} ${sDay} - ${eDay}, ${sYear}`;
	}

	// Same year, different months
	if (sYear === eYear) {
		return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${sYear}`;
	}

	// Different years
	return `${sMonth} ${sDay}, ${sYear} - ${eMonth} ${eDay}, ${eYear}`;
}
