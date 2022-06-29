import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Form() {
  const [name, setName] = useState('');
  const [sort, setSort] = useState('ASC');
  const { data, setDados, state,
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
    // console.log(options.filter((item) => item.value !== column));
    setOptions(options.filter((item) => item.value !== column));
  };

  const removeButton = (column) => {
    const array = filterByNumericValues.filter((item) => item.column !== column);
    setFilterByNumericValues(array);
    setOptions([...options, { select: column, value: column }]);
  };

  const removeFiltro = () => {
    setFilterByNumericValues([]);
    setOptions(option);
  };

  const criarOption = (item, index) => (
    <option key={ index } value={ item.value }>
      {item.select}
    </option>);
  // req 7
  const handleOrder = () => {
    const menos = -1;
    const filtrarLetras = state
      .sort((a, b) => {
        if (sort === 'DESC') {
          if (b[dadosFiltro.column] === 'unknown') return menos;
          return Number(b[dadosFiltro.column]) - Number(a[dadosFiltro.column]);
        }
        if (sort === 'ASC') {
          if (a[dadosFiltro.column] === 'unknown') return menos;
          return Number(a[dadosFiltro.column]) - Number(b[dadosFiltro.column]);
        }
        return true;
      });

    const newArray = [...filtrarLetras];
    console.log(newArray);
    setState(newArray);
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
            {options.map(criarOption)}
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
        <label htmlFor="coluna">
          Ordenar
          <select
            data-testid="column-sort"
            name="coluna"
            id="coluna"
            onChange={ ({ target }) => {
              setDadosFiltro({ ...dadosFiltro, column: target.value });
            } }
          >
            {option.map(criarOption)}
          </select>
        </label>
      </form>
      {/* requisito 7  */}
      <label htmlFor="ascendente">
        Ascendente
        <input
          id="ascendente"
          name="ascendente"
          value="ASC"
          type="radio"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setSort(target.value) }
        />
      </label>
      <label htmlFor="descendente">
        Descendente
        <input
          id="descendente"
          name="ascendente"
          value="DESC"
          type="radio"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setSort(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrder }
      >
        Ordenar
      </button>
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
