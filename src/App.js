import React from 'react';
import './App.css';
import Table from './componentes/Table';
import ContexProvider from './context/ContextProvider';

function App() {
  return (
    <ContexProvider>
      <Table />
    </ContexProvider>
  );
}

export default App;
