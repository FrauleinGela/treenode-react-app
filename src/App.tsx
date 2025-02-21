import { StrictMode } from 'react';
import { Tree } from './tree/Tree';

export function App() {
  return (
    <StrictMode>
        <div className="border-2 border-black flex flex-col">
          <header className="h-[100px] border-b-2 border-black flex items-center">
            <h1 className="text-xl font-bold p-4">Home Assignment</h1>
          </header>
          <main className="flex flex-1">
            <Tree />
          </main>
        </div>
    </StrictMode>
  );
}
