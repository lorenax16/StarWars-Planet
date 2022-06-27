import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  // requisito 1 llamar la api y guardar las informaciones en la variable data para enviarla por contex
  const [data, setData] = useState([]);
  // requisito 2 gerenciar os dados de data em dados porque ele vai ser modificado
  const [dados, setDados] = useState([]);
  // requisito 3 estado para filtrar
  // const [filterTipo, setFilterTipo] = useState('population');
  // const [operador, setOperador] = useState('maior que');
  const [state, setState] = useState([]);
  // const [valor, setValor] = useState('0');
  const [coluna, setColuna] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [dadosColuna, setdadosColuna] = useState(['population',
    'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [dadosFiltro, setDadosFiltro] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  // useEffect(() => {
  //   console.log(dadosFiltro);
  // }, [dadosFiltro]);

  useEffect(() => {
    const api = async () => {
      try {
        const url = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const resposta = await url.json();
        const filtro = resposta.results;
        // console.log(filtro);
        setData(filtro);
        setDados(filtro);
        setState(filtro);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, []);

  // useEffect(() => {
  //   const types = filterByNumericValues.map((filtro) => filtro.filterTipo);
  //   setColuna(dadosColuna.filter((item) => !(types.includes(item))));
  // }, [filterByNumericValues, dadosColuna]);

  const contextValue = {
    data,
    setData,
    dados,
    setDados,
    coluna,
    setColuna,
    dadosColuna,
    setdadosColuna,
    // filterTipo,
    // setFilterTipo,
    filterByNumericValues,
    setFilterByNumericValues,
    // operador,
    // setOperador,
    // setValor,
    // valor,
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
