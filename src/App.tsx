import Graph from './components/graph';
import { SearchForm } from './components/searchForm';
import { transformServerData } from './lib/utils';
import { useSearch } from './services/queries';

export default function App() {
  const { mutate, isPending, data } = useSearch();
  return (
    <>
      <SearchForm mutate={mutate} disable={isPending} />
      {data && <Graph data={transformServerData(data)} />}
    </>
  );
}
