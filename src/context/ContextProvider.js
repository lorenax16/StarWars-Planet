import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [dados, setDados] = useState([]);
  const [state, setState] = useState([]);
  // const [coluna, setColuna] = useState(['population',
  //   'orbital_period',
  //   'diameter', 'rotation_period', 'surface_water']);
  // const [dadosColuna, setdadosColuna] = useState(['population',
  //   'orbital_period',
  //   'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [dadosFiltro, setDadosFiltro] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  useEffect(() => {
    const api = async () => {
      try {
        const url = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const resposta = await url.json();
        const filtro = resposta.results;
        setData(filtro);
        setDados(filtro);
        setState(filtro);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, []);

  const contextValue = {
    data,
    setData,
    dados,
    setDados,
    // coluna,
    // setColuna,
    // dadosColuna,
    // setdadosColuna,
    filterByNumericValues,
    setFilterByNumericValues,
    state,
    setState,
    dadosFiltro,
    setDadosFiltro,

  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
