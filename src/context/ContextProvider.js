import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContexProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const api = async () => {
      try {
        const url = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const resposta = await url.json();
        const filtro = resposta.results;
        setData(filtro);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, []);

  const contextValue = {
    data,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

ContexProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContexProvider;
