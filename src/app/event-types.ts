export type EventKeyword = string;
export type EventListRequest = {
  genreId: EventGenreId[];
  keyword: EventKeyword;
};

export type EventImage = {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: false;
  attribution: string;
};
export type EventDate = {
  localDate: string;
  localTime: string;
};
export type EventVenueAddress = {
  [key:string]: string | undefined;
  line1: string;
  line2?: string;
  line3?: string;
};
export type EventVenue = {
  city: {
    name: string;
  };
  country?: {
    countryCode: string;
    name: string;
  };
  state?: {
    stateCode: string;
    name: string;
  };
  address: EventVenueAddress;
  name?: string;
};
export type EventGenreId = string;
export type EventGenre = {
  id: EventGenreId;
  name: string;
};
type EventClassification = {
  genre: EventGenre;
};
export type EventId = string;
export type Event = {
  id: EventId;
  name: string;
  images: {
    card: EventImage[];
    preview: EventImage[];
  };
  dates: {
    start: EventDate;
    end?: EventDate;
  };
  venues: EventVenue[];
  classifications: EventClassification[];
};
export type Events = Event[];
