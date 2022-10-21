import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import readFile from './readFile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <h1>
        EasyMus
      </h1>
      {/* Seleccion de fichero - Matriz */}
      <input type="file" id="myfile" name="myfile"></input><br/>
      
      <button onclick="readFile()">Calcualr</button>
      {/* <input type="submit" value="Calcular" /> */}
      
      {/* Seleccion del tipo de Metrica */}
      {/* <label for="metrics">Tipo de Metrica</label>
      <select id="metrics" name="metricslist" form="metricsform">
        <option value="m1">Correlación de Pearson</option>
        <option value="m2">Distancia coseno</option>
        <option value="m3">Distancia Euclídea</option>
      </select><br/> */}

      {/* Numero de vecinos */}
      {/* <label for="neighbour">Numero de vecinos</label>
      <input type="text" id="fname" name="fname"/><br/> */}

      {/* Seleccion del tipo de prediccion */}
      {/* <label for="cars">Tipo de prediccion: </label>
      <select id="prediction" name="predictionslist" form="predictionform">
        <option value="p1">Predicción simple</option>
        <option value="p2">Diferencia con la media</option>
      </select><br/> */}

      {/* Enviar todos los datos para calcular */}
  </React.StrictMode>
);
