import { Event } from '../../../app/event-types';
import Button from '../../../components/button/button';
import formatEventDate from '../../../utils/format-event-date';
import getEventVenue from '../../../utils/get-event-venue';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectEventId, resetEventId } from './eventPreviewRequestSlice';
import getSourcesForImg from '../../../utils/handle-img';

interface Props {
  event: Event;
}

const STATIC_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

export default function EventPreview({ event }:Props){
  const dispatch = useAppDispatch();
  const eventId = useAppSelector(selectEventId);
  const isSelected = event.id === eventId;

  const startDate = formatEventDate(event.dates.start);
  const date = event.dates.end ? `${startDate} - ${formatEventDate(event.dates.end)}` : startDate;
  const venues = event.venues.map((item, i) =>
    (<p key={`event-venue-${i}`} className="event-preview__place">{getEventVenue(item)}</p>));

  const maxWidth = 744;
  const { src, srcSet } = getSourcesForImg(maxWidth, event.images.preview);
  return (
    isSelected ? (
      <div className="event-preview">
        <div className="event-preview__info">
          <h2 className="event-preview__title">{event.name}</h2>
          <p className="event-preview__date">{date}</p>
          {venues}
          <p className="event-preview__text">{STATIC_TEXT}</p>
          <Button onClick={() => dispatch(resetEventId())}>Close details</Button>
        </div>
        <div className="event-preview__img-container">
          <img src={src} srcSet={srcSet} alt={event.name} className="event-preview__img"/>
          <div className="event-preview__img-filter"/>
        </div>
      </div>
    ) : null
  );
}