import { Event } from '../../../app/event-types';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectEventId } from './eventPreviewRequestSlice';
import SelectedEventPreview from './selected-preview';

interface Props {
  event: Event;
}

export default function EventPreview({ event }:Props){
  const dispatch = useAppDispatch();
  const eventId = useAppSelector(selectEventId);
  const isSelected = event.id === eventId;

  return (
    isSelected ? (<SelectedEventPreview event={event} dispatch={dispatch}/>) : null
  );
}
