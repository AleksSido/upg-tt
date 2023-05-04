import Layout from '../layout/layout';

interface Props {
	error: any;
}

export default function ErrorFallback({ error }: Props) {
	alert('Error!');

	return (
		<Layout pageTitle="Music events" menu={<div />} topSlot={<div />}>
			<div>
				<p style={{ color: 'red' }}>Something went wrong:</p>
				<pre style={{ color: 'red' }}>{error?.message}</pre>
				<a href="/">Go to Main Page</a>
			</div>
		</Layout>
	);
}
