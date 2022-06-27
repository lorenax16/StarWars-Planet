import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Form() {
  const [name, setName] = useState('');
  const { data, setDados, coluna,
    setState, setFilterByNumericValues, filterByNumericValues,
    setDadosFiltro, dadosFiltro } = useContext(Context);
  // const [value, setValue] = useState('0');

  useEffect(() => {
    const filterPlanet = data.filter((Planets) => Planets.name
      .toUpperCase()
      .includes(name.toUpperCase()));
    setDados(filterPlanet);

    const comparacion = filterByNumericValues
      .reduce((acumulador, filter) => acumulador.filter((planet) => {
        switch (filter.comparison) {
        case 'maior que':
          return Number(planet[filter.column]) > Number(filter.value);
        case 'menor que':
          return Number(planet[filter.column]) < Number(filter.value);
        case 'igual a':
          return Number(planet[filter.column]) === Number(filter.value);
        default:
          return true;
        }
      }), filterPlanet);
    setState(comparacion);
  }, [name, filterByNumericValues]);

  const handleBotao = () => {
    setFilterByNumericValues((prev) => [...prev, dadosFiltro]);
  };

  return (
    <form>
      <h1>Planetas Star Wars</h1>
      <label htmlFor="buscar">
        Filtrar pelo Nome:
        <input
          value={ name }
          // O toUpperCase()método converte uma string em letras maiúsculas. O toUpperCase()método não altera a string original.
          // https://www.w3schools.com/jsref/jsref_touppercase.asp#:~:text=The%20toUpperCase()%20method%20converts,not%20change%20the%20original%20string.
          onChange={ ({ target: { value } }) => setName(value) }
          id="buscar"
          type="text"
          placeholder="Digite o Nome"
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="coluna">
        Coluna
        <select
          data-testid="column-filter"
          name="coluna"
          id="coluna"
          onChange={ ({ target }) => {
            setDadosFiltro((prev) => ({ ...prev, column: target.value }));
          } }
        >
          {coluna.map((column) => (
            <option key={ column } value={ column }>
              {column}
            </option>))}
        </select>
      </label>
      <label htmlFor="operador">
        Operador
        <select
          data-testid="comparison-filter"
          name="operador"
          id="operador"
          onChange={ ({ target }) => setDadosFiltro((prev) => ({
            ...prev, comparison: target.value })) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        Número
        <input
          data-testid="value-filter"
          id="number"
          name="number"
          type="number"
          placeholder="0"
          onChange={ ({ target }) => setDadosFiltro({
            ...dadosFiltro, value: target.value }) }
          value={ dadosFiltro.value }
        />
      </label>
      <button
        id="buttonFilter"
        data-testid="button-filter"
        type="button"
        onClick={ handleBotao }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Form;
