import Input from '../../components/input/input';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectEventKeyword, updateEventKeyword } from './eventListRequestSlice';

export default function KeywordFilter(){
  const keyword = useAppSelector(selectEventKeyword);
  const dispatch = useAppDispatch();

  return (
    <Input
      value={keyword}
      onChange={(value) => dispatch(updateEventKeyword(value))}
      placeholder={'Search for events...'}
    />
  );
}