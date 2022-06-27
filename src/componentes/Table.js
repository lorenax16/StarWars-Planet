import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  // requisito 1 recibo la informacion de la api por la variable data que viene por el context y la uso en el map
  const { state } = useContext(Context);
  // console.log(state);
  // console.log(data);
  return (

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {state.map((elapi) => (
          <tr key={ elapi.name }>
            <td>{elapi.name}</td>
            <td>{elapi.rotation_period}</td>
            <td>{elapi.orbital_period}</td>
            <td>{elapi.diameter}</td>
            <td>{elapi.climate}</td>
            <td>{elapi.gravity}</td>
            <td>{elapi.terrain}</td>
            <td>{elapi.surface_water}</td>
            <td>{elapi.population}</td>
            <td>{elapi.films}</td>
            <td>{elapi.created}</td>
            <td>{elapi.edited}</td>
            <td>{elapi.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
