import React from 'react';
import Context from './Context';

function dataContexProvider({ children }) {
  // const [] = useState([]);
  // const contexValue = { }
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  );
}

export default dataContexProvider;
