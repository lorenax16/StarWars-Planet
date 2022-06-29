import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Form() {
  const [name, setName] = useState('');
  const { data, setDados,
    setState, filterByNumericValues,
    setDadosFiltro, dadosFiltro, setFilterByNumericValues } = useContext(Context);

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
  // requisito 5 array de options para guardar em um estado

  const option = [
    { value: 'population', select: 'population' },
    { value: 'orbital_period', select: 'orbital_period' },
    { value: 'diameter', select: 'diameter' },
    { value: 'rotation_period', select: 'rotation_period' },
    { value: 'surface_water', select: 'surface_water' },
  ];
  const [options, setOptions] = useState(option);

  const handleBotao = () => {
    const { column } = dadosFiltro;
    console.log(options.filter((item) => item.value !== column));
    setOptions(options.filter((item) => item.value !== column));
  };

  const removeButton = (column) => {
    const array = filterByNumericValues.filter((item) => item.column !== column);
    setFilterByNumericValues(array);
    setOptions([...options, { select: column, value: column }]);
  };

  const removeFiltro = () => {
    setFilterByNumericValues([]);
  };

  return (
    <div>
      <form>
        <h1>Planetas Star Wars</h1>
        <label htmlFor="buscar">
          Filtrar pelo Nome:
          <input
            value={ name }
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
              setDadosFiltro({ ...dadosFiltro, column: target.value });
            } }
          >
            {options.map((item, index) => (
              <option key={ index } value={ item.value }>
                {item.select}
              </option>))}
          </select>
        </label>
        <label htmlFor="operador">
          Operador
          <select
            data-testid="comparison-filter"
            name="operador"
            id="operador"
            onChange={ ({ target }) => setDadosFiltro({
              ...dadosFiltro, comparison: target.value }) }
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
          onClick={ () => {
            setFilterByNumericValues([...filterByNumericValues, dadosFiltro]);
            handleBotao();
          } }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeFiltro }
        >
          Remover todas filtragens
        </button>
      </form>
      <div>
        {
          filterByNumericValues.map((item) => (
            <div
              key={ item.column }
              data-testid="filter"
            >
              {`${item.column} ${item.comparison} ${item.value}`}
              <button
                type="button"
                onClick={ () => removeButton(item.column) }
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Form;
