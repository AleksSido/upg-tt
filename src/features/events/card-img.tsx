import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
	src: string;
	srcSet: string;
	alt: string;
}

export default function EventCardImg({ src, srcSet, alt }: Props) {
	return (
		<LazyLoadImage
			className="event-card__img"
			src={src}
			srcSet={srcSet}
			alt={alt}
		/>
	);
}
