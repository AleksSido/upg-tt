import debounce from 'lodash.debounce';
import { useEffect, useState, useMemo } from 'react';
import { useGetEventsQuery } from '../../app/apiSlice';
import RequestHandler from '../../components/request-handler/request-handler';
import Card from './card';
import { useAppSelector } from '../../app/hooks';
import {
	selectEventGenreId,
	selectEventKeyword,
} from './eventListRequestSlice';
import { EventListRequest } from '../../app/event-types';

export default function EventList() {
	const genreIdList = useAppSelector(selectEventGenreId);
	const keyword = useAppSelector(selectEventKeyword);
	// for debounce events request
	const [eventListRequest, setEventListRequest] = useState<EventListRequest>({
		genreId: genreIdList,
		keyword,
	});
	const debouncedSetEventListRequest = useMemo(
		() => debounce(setEventListRequest, 500),
		[]
	);

	useEffect(() => {
		debouncedSetEventListRequest({ genreId: genreIdList, keyword });
	}, [debouncedSetEventListRequest, genreIdList, keyword]);

	const { data, error, isLoading } = useGetEventsQuery(eventListRequest);
	const eventList = data
		? data.map((item, i) => <Card key={`event_${i}`} event={item} />)
		: [];

	return (
		<RequestHandler
			error={error}
			isLoading={isLoading}
			isEmptyResponse={!eventList.length}
			emptyResponseMsg="No events found!"
		>
			<div className="events-list">{eventList}</div>
		</RequestHandler>
	);
}
