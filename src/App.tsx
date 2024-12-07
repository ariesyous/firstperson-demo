import React from 'react';
import { Scene } from './components/Scene';

function App() {
  return (
    <div className="w-full h-screen">
      <Scene />
      <div className="fixed top-4 left-4 bg-black/50 text-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Controls</h2>
        <ul className="space-y-1">
          <li>WASD - Move</li>
          <li>Mouse - Look around</li>
          <li>Shift - Sprint</li>
          <li>Click to start</li>
        </ul>
      </div>
    </div>
  );
}

export default App;