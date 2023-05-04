import { EventVenue, EventVenueAddress } from '../app/event-types';

function getAddress(eventVenueAddress: EventVenueAddress) {
	let address = '';
	Object.values(eventVenueAddress).forEach((item) => {
		address = item ? `${address}${item}` : '';
	});
	return address;
}

export default function getEventVenue(eventVenue: EventVenue) {
	const start = eventVenue.name
		? eventVenue.name
		: getAddress(eventVenue.address);
	const city =
		eventVenue.city && eventVenue.city.name ? `${eventVenue.city.name},` : '';
	const stateName =
		eventVenue.state && eventVenue.state.name ? eventVenue.state.name : '';
	const end =
		eventVenue.country && eventVenue.country.name
			? eventVenue.country.name
			: stateName;
	return `${start} ${city} ${end}`;
}
