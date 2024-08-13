import { FormEvent, useState } from 'react';

interface SearchFormParams {
  mutate: (input: { address: string }) => void;
  disable: boolean;
}

export function SearchForm({ mutate, disable }: SearchFormParams) {
  const [address, setAddress] = useState<string>('0xABCDEF123456');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (address) {
      mutate({ address });
      setAddress('');
    } else return;
  };
  return (
    <>
      <div className="w-full h-14 flex justify-center mt-8">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Type address"
            className="input input-bordered w-full max-w-xs"
            onChange={e => setAddress(e.target.value)}
            value={address}
          />
          <button type="submit" disabled={disable} className="btn">
            Search
          </button>
        </form>
      </div>
    </>
  );
}
