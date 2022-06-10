import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { data } = useContext(Context);
  // console.log(data);
  return (

    <div>
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
        {data.map((elapi) => (
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
    </div>
  );
}

export default Table;
