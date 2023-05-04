import moment from 'moment';
import { EventDate } from '../app/event-types';

export default function formatEventDate(eventDate: EventDate) {
	return `${moment(eventDate.localDate).format('dddd')}, 
  ${moment(eventDate.localDate).format('DD.MM.YYYY')} 
  @ ${moment(eventDate.localTime, 'HH:mm:ss').format('HH:mm')}`;
}
