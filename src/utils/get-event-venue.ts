import {EventVenue, EventVenueAddress} from '../app/event-types';

function getAddress(eventVenueAddress:EventVenueAddress){
  let address = ''
  for (let key in eventVenueAddress) {
    address = eventVenueAddress[key] ? address + `${eventVenueAddress[key]}, ` : '';
  }
  return address;
}

export default function getEventVenue(eventVenue:EventVenue){
  const start = eventVenue.name ? eventVenue.name : getAddress(eventVenue.address);
  const city = eventVenue.city && eventVenue.city.name ? `${eventVenue.city.name},` : '';
  const end = eventVenue.country && eventVenue.country.name ?
    eventVenue.country.name
    : (eventVenue.state && eventVenue.state.name ? eventVenue.state.name : '');
  return `${start} ${city} ${end}`;
}