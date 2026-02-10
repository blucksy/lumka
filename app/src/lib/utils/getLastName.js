export default function getLastName(fullName) {
	return fullName.split(' ').slice(-1)[0].toLowerCase();
}
