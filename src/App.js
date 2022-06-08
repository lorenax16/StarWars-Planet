import React from 'react';
import './App.css';
import ContexProvider from './context/ContextProvider';

function App() {
  return (
    <ContexProvider>
      <span>Hello, App!</span>
    </ContexProvider>
  );
}

export default App;
