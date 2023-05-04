import { EVENT_CARD_IMAGE_RATIO, EVENT_PREVIEW_IMAGE_RATIO } from './constants';

export function transformDate(responseEventDate: any) {
	if (responseEventDate) {
		const { localDate, localTime } = responseEventDate;
		return { localDate, localTime };
	}
	return undefined;
}

function getVenues(responseVenues: any[]) {
	return responseVenues.map((item: any) => {
		const { city, country, state, address, name } = item;
		return { city, country, state, address, name };
	});
}

function getClassifications(responseClassifications: any[]) {
	return responseClassifications.map((item: any) => {
		const { genre } = item;
		const { id, name } = genre;
		return { genre: { id, name } };
	});
}

export function transformEvent(responseEvent: any) {
	const {
		id,
		name,
		images,
		dates,
		classifications,
		_embedded: responseEmbedded,
	} = responseEvent;
	const cardImages = images.filter(
		(item: any) => item.ratio === EVENT_CARD_IMAGE_RATIO
	);
	const previewImages = images.filter(
		(item: any) => item.ratio === EVENT_PREVIEW_IMAGE_RATIO
	);
	const { start, end } = dates;
	const venues = getVenues(responseEmbedded.venues);
	const transformedClassifications = getClassifications(classifications);
	return {
		id,
		name,
		images: {
			card: cardImages,
			preview: previewImages,
		},
		dates: {
			start: transformDate(start),
			end: transformDate(end),
		},
		venues,
		classifications: transformedClassifications,
	};
}

export function transformGenre(responseGenre: any) {
	const { id, name } = responseGenre;
	return { id, name };
}
