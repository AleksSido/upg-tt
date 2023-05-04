import Layout from './components/layout/layout';
import EventList from './features/events/list';
import GenreFilter from './features/events/genre-filter';
import ListLoadingBar from './features/events/list-loading-bar';
import KeywordFilter from './features/events/keyword-filter';

function App() {
	return (
		<Layout
			pageTitle="Music events"
			menu={<GenreFilter />}
			topSlot={<KeywordFilter />}
			headerLoadingBar={<ListLoadingBar />}
		>
			<EventList />
		</Layout>
	);
}

export default App;
