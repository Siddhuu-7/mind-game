import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

export default function Input() {
  const [grids, setGrids] = useState(0);

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col text-center">
          <h3>Select Grids</h3>
          <select
            value={grids}
            onChange={(e) => setGrids(Number(e.target.value))} // Set grids based on selected value
            className="form-select" // Bootstrap class for styling
          >
            <option value={0}>Select...</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={28}>28</option>
            <option value={32}>32</option>

          </select>
        </div>
      </div>
    </div>
    <App grids={grids}/>
    </>
  );
}
