import LoadingBar from '../../components/loading-bar/loading-bar';
import { clientApi } from '../../app/apiSlice';
import { useAppSelector } from '../../app/hooks';
import { selectEventGenreId, selectEventKeyword } from './eventListRequestSlice';

export default function ListLoadingBar(){
  const genreIdList = useAppSelector(selectEventGenreId);
  const keyword = useAppSelector(selectEventKeyword);
  const { isFetching } = clientApi.endpoints.getEvents.useQueryState({ genreId: genreIdList, keyword});

  return (
    <LoadingBar isFetching={isFetching}/>
  );
}
