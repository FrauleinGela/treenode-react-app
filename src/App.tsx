import { useEffect } from 'react';

export function App() {
  // Do not hesitate to refactor this effect or use a different library to retrieve data
  // it's only provided here as an example on how to fetch the data from the server
  useEffect(() => {
    fetch('http://localhost:8010/api/v1/tree')
      .then((r) => r.json())
      .then(console.log);
  }, []);

  return <h1>Corti Frontend Home Assignment</h1>;
}
