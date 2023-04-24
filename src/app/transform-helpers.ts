import { EVENT_CARD_IMAGE_RATIO, EVENT_PREVIEW_IMAGE_RATIO } from './constants';

export function transformDate(responseEventDate:any){
  if (responseEventDate) {
    const { localDate, localTime } = responseEventDate;
    return { localDate, localTime };
  } else {
    return undefined;
  }
}

export function transformEvent(responseEvent:any) {
  const { id, name, images, dates, classifications, _embedded } = responseEvent;
  const cardImages = images.filter((item:any) => item.ratio === EVENT_CARD_IMAGE_RATIO);
  const previewImages = images.filter((item:any) => item.ratio === EVENT_PREVIEW_IMAGE_RATIO);
  const { start, end } = dates;
  const venues = _embedded.venues.map((item:any) => {
    const { city, country, state, address, name } = item;
    return { city, country, state, address, name };
  });
  const transformedClassifications = classifications.map((item:any) => {
    const { genre } = item;
    const { id, name } = genre;
    return { genre: { id, name} };
  });
  return {
    id,
    name,
    images: {
      card: cardImages,
      preview: previewImages
    },
    dates: {
      start: transformDate(start),
      end: transformDate(end)
    },
    venues,
    classifications: transformedClassifications
  };
}

export function transformGenre(responseGenre:any){
  const { id, name } = responseGenre;
  return { id, name };
}
