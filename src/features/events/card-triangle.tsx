import { useAppSelector } from '../../app/hooks';
import { selectEventId } from './preview/eventPreviewRequestSlice';

interface Props {
  id: string;
}

export default function EventCardTriangle({ id }:Props){
  const eventId = useAppSelector(selectEventId);
  const isSelected = id === eventId;
  return (
    isSelected ? (
      <div className="event-card__triangle"/>
    ) : null
  );
}
