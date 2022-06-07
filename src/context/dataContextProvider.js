import React, { useState } from 'react';
import dataContext from './dataContext';

function dataContexProvider({children}){
    //const [] = useState([]);
    //const contexValue = { }
    return(
      <dataContext.Provider value={ {} }>
        {children}
      </dataContext.Provider>
    )
}

export default dataContexProvider;