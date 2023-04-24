import './loading-bar.scss';
import { useEffect, useState } from 'react';

interface Props {
  isFetching: boolean;
}

export default function LoadingBar({ isFetching }:Props){
  const [className, setClassName] = useState<string>('loading-bar__progress');

  useEffect(()=>{
    if (isFetching) {
      setClassName('loading-bar__progress loading-bar__progress_start');
    } else {
      setClassName('loading-bar__progress loading-bar__progress_end');
    }
  }, [isFetching]);

  return (
    <div className="loading-bar">
      <div className={className}/>
    </div>
  );
}
