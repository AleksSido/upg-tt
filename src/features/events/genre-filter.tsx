import { useState } from 'react';
import { useGetGenresQuery } from '../../app/apiSlice';
import RequestHandler from '../../components/request-handler/request-handler';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
	selectEventGenreId,
	resetEventGenreId,
	toggleEventGenreId,
} from './eventListRequestSlice';
import { EventGenreId } from '../../app/event-types';
import useWindowWidth from '../../hooks/useWindowWidth';
import { resetEventId } from './preview/eventPreviewRequestSlice';

function getClassName(genreId: EventGenreId, genreIdList: EventGenreId[]) {
	return genreIdList.includes(genreId)
		? 'genre-filter__item genre-filter__item_active'
		: 'genre-filter__item';
}

export default function GenreFilter() {
	const [isFullList, setIsFullList] = useState<boolean>(false);
	const genreIdList = useAppSelector(selectEventGenreId);
	const dispatch = useAppDispatch();

	const windowWidth = useWindowWidth();
	const isOnlyFullList = windowWidth < 901;

	const { data = [], error } = useGetGenresQuery();
	const fullGenreList = data.map((item, i) => {
		const onClick = () => {
			dispatch(toggleEventGenreId(item.id));
			dispatch(resetEventId());
		};
		return (
			<div
				key={`genre-${i}`}
				className={getClassName(item.id, genreIdList)}
				onClick={onClick}
			>
				{item.name}
			</div>
		);
	});
	const shortGenreList = isOnlyFullList ? [] : fullGenreList.slice(0, 4);
	const startIndex = isOnlyFullList ? 0 : 4;
	for (let i = startIndex; i < data.length; i += 1) {
		if (genreIdList.includes(data[i].id)) {
			shortGenreList.push(fullGenreList[i]);
		}
	}

	const onAllGenreClick = () => {
		dispatch(resetEventGenreId());
		dispatch(resetEventId());
	};

	return (
		<RequestHandler error={error}>
			<div className="genre-filter">
				<div
					className={
						genreIdList.length
							? 'genre-filter__item'
							: 'genre-filter__item genre-filter__item_active genre-filter__item_no-cursor'
					}
					onClick={genreIdList.length ? onAllGenreClick : undefined}
				>
					All genres
				</div>
				{isFullList ? fullGenreList : shortGenreList}
				<div
					className="genre-filter__item"
					onClick={() => setIsFullList(!isFullList)}
				>
					{isFullList ? 'Less...' : 'More...'}
				</div>
			</div>
		</RequestHandler>
	);
}
