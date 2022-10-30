import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';

class RenderFunction extends React.Component {
    constructor() {
        super();
        this.state = {
            answer: "Answer"
        }
        this.getSum = this.getSum.bind(this)
    }
  
    getSum() {
        var x = parseInt(document
            .getElementById("elementA").value);
  
        var y = parseInt(document
            .getElementById("elementB").value);
  
        console.log(x + y)
        this.setState({
            answer: x + y
        })
    }
  
    render() {
        return (
            <center>
                <h1>
                    We will be calling sum 
                    function from render
                </h1>
                <div>
                    <p id="elementA" 
                        variant="outlined" />  
  
                    <picture id="elementB" 
                        variant="outlined" />
                    <br></br>
                    <br></br>
  
                    <button onClick={this.getSum} 
                        className="btn btn-primary">
                            Get Sum
                    </button>
                    <br></br>
                    <br></br>
                    <p id="elementC" disabled 
                        variant="outlined" 
                        value={this.state.answer} />
                </div>
            </center>
        )
    }
}
export default function App() {
    return (
        <div className="App">
            <RenderFunction />
        </div>
    );
}



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <h1>
//       EasyMus
//     </h1>
//     {/* Seleccion de fichero - Matriz */}
//     <input type="file" id="myfile" name="myfile"></input><br/>
    
//     {/* Seleccion del tipo de Metrica */}
//     <label htmlFor="metrics">Tipo de Metrica</label>
//     <select id="metrics" name="metricslist" form="metricsform" onChange={this.onchange} value={this.state.value}>
//       <option value="Correlación de Pearson">Correlación de Pearson</option>
//       <option value="Distancia coseno">Distancia coseno</option>
//       <option value="Distancia Euclídea">Distancia Euclídea</option>
//     </select><br/>

//     {/* Numero de vecinos */}
//     <label htmlFor="neighbour">Numero de vecinos</label>
//     <input type="text" id="VecinoNumber" name="fname"/><br/>

//     {/* Seleccion del tipo de prediccion */}
//     <label htmlFor="cars">Tipo de prediccion: </label>
//     <select id="prediction" name="predictionslist" form="predictionform" value="Predicción simple">
//       <option value="Predicción simple">Predicción simple</option>
//       <option value="Diferencia con la media">Diferencia con la media</option>
//     </select><br/>

//     {/* Enviar todos los datos para calcular */}
//     <button onClick="show()"> Calcular </button>
//     {/* <input type="submit" value="Calcular"/> */}
//   </React.StrictMode>
// );