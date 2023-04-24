import { useGetEventsQuery } from '../../app/apiSlice';
import RequestHandler from '../../components/request-handler/request-handler';
import Card from './card';
import { useAppSelector } from '../../app/hooks';
import {selectEventGenreId, selectEventKeyword} from './eventListRequestSlice';

export default function EventList(){
  const genreIdList = useAppSelector(selectEventGenreId);
  const keyword = useAppSelector(selectEventKeyword);

  const { data, error, isLoading } = useGetEventsQuery({ genreId: genreIdList, keyword});
  const eventList = data ? data.map((item, i) => (<Card key={`event_${i}`} event={item}/>)) : [];

  return (
    <RequestHandler
      error={error}
      isLoading={isLoading}
      isEmptyResponse={!eventList.length}
      emptyResponseMsg={'No events found!'}
    >
      <div className="events-list">
        {eventList}
      </div>
    </RequestHandler>
  );
}