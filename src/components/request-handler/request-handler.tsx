import './request-handler.scss';

interface Props {
	error: any;
	isLoading?: boolean;
	children: JSX.Element | JSX.Element[];
	isEmptyResponse?: boolean;
	emptyResponseMsg?: string;
}

export default function RequestHandler({
	error,
	isLoading,
	isEmptyResponse,
	children,
	emptyResponseMsg,
}: Props) {
	if (error) {
		alert('Error!');
	}

	if (isLoading) {
		return (
			<div className="loading-msg">
				<div className="loading-msg__text">... request in process</div>
			</div>
		);
	}

	if (isEmptyResponse) {
		return <div className="loading-msg__text">{emptyResponseMsg}</div>;
	}

	return <>{children}</>;
}
