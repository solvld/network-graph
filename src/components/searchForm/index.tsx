import { FormEvent, useState } from 'react';
import { useSearch } from '../../services/queries';

export function SearchForm() {
  const [address, setAddress] = useState<string>('');

  const { mutate, isPending } = useSearch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ address });

    setAddress('');
  };
  return (
    <>
      <div className="w-full h-8 flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type address"
            className="input input-bordered w-full max-w-xs"
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
          <button type="submit" disabled={isPending} className="btn">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
