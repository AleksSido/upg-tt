import {EventDate} from '../app/event-types';
import moment from 'moment';

export default function formatEventDate(eventDate:EventDate){
  return `${moment(eventDate.localDate).format('dddd')}, 
  ${moment(eventDate.localDate).format('DD.MM.YYYY')} 
  @ ${moment(eventDate.localTime, 'HH:mm:ss').format('HH:mm')}`;
}