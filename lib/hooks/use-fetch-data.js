'use client';

import { useState, useEffect } from 'react';

export function useFetchData(fetchData) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    console.log('hook UE')
        const res = async () => {
            try {
                const res = await fetchData();
                console.log('hook res:', res);
                setData(res);
            } catch (err) {
                console.log('useFetch Error: ', err)
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        res();
    }, []);

    return { data, loading, error };
}

// import { useFetchData } from './useMyData';
//
// function MyComponent() {
//   const { data, loading, error } = useFetchData(fetchData);
//
//   if (loading) return <p>Loading…</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   return <div>{JSON.stringify(data)}</div>;
// }
