import React from 'react';
import './App.css';
import dataContexProvider from './context/dataContextProvider'

function App() {
  return (
    <dataContexProvider>
      <span>Hello, App!</span>
    </dataContexProvider>
  );
}

export default App;
