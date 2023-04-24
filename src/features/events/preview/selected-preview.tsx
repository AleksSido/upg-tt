import { Event } from '../../../app/event-types';
import Button from '../../../components/button/button';
import formatEventDate from '../../../utils/format-event-date';
import getEventVenue from '../../../utils/get-event-venue';
import { useAppSelector } from '../../../app/hooks';
import { selectEventId, resetEventId } from './eventPreviewRequestSlice';
import getSourcesForImg from '../../../utils/handle-img';
import type { AppDispatch } from '../../../app/store';
import {STATIC_TEXT} from '../../../app/constants';

interface Props {
  event: Event;
  dispatch: AppDispatch;
}

export default function SelectedEventPreview({ event, dispatch }:Props){
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