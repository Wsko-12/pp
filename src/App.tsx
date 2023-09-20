import React from 'react';
import './App.css';
import {Canvas} from "@react-three/fiber";
import {Deck} from "./Components/Deck/Deck";

function App() {
  return (
      <div style={{ width: "100vw", height: "100svh" }}>
          <Canvas flat linear >
                <Deck />

          </Canvas>
      </div>
  );
}

export default App;
