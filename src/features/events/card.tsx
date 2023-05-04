import { Suspense, lazy } from 'react';
import { Event } from '../../app/event-types';
import './events.scss';
import EventPreview from './preview/preview';
import EventCardTriangle from './card-triangle';
import { useAppDispatch } from '../../app/hooks';
import { setEventId } from './preview/eventPreviewRequestSlice';
import getSourcesForImg from '../../utils/handle-img';

interface Props {
	event: Event;
}

const EventCardImg = lazy(() => import('./card-img'));

export default function EventCard({ event }: Props) {
	const dispatch = useAppDispatch();

	const maxWidth = 332;
	const { src, srcSet } = getSourcesForImg(maxWidth, event.images.card);

	return (
		<>
			<div
				className="event-card"
				style={{ maxWidth: `${maxWidth}px` }}
				onClick={() => dispatch(setEventId(event.id))}
			>
				<Suspense
					fallback={<p className="event-card__fallback">{event.name}</p>}
				>
					<EventCardImg src={src} srcSet={srcSet} alt={event.name} />
				</Suspense>
				<EventCardTriangle id={event.id} />
			</div>
			<EventPreview event={event} />
		</>
	);
}
