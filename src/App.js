import React from 'react';
import './App.css';
import Form from './componentes/Form';
import Table from './componentes/Table';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <Form />
      <Table />
    </ContextProvider>
  );
}

export default App;
