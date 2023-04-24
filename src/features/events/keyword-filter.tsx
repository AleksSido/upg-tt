import Input from '../../components/input/input';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectEventKeyword, updateEventKeyword } from './eventListRequestSlice';
import { resetEventId } from './preview/eventPreviewRequestSlice';

export default function KeywordFilter(){
  const keyword = useAppSelector(selectEventKeyword);
  const dispatch = useAppDispatch();
  const onChange = (value:string) => {
    dispatch(updateEventKeyword(value));
    dispatch(resetEventId());
  };

  return (
    <Input
      value={keyword}
      onChange={onChange}
      placeholder={'Search for events...'}
    />
  );
}
