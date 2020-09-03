import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [state, setState] = useState([])
  // [] guardo los valores ingresados a mi lista que empieza sin nada.
  const valor = (capturaevento) => {
    if (capturaevento.keyCode === 13) {
      //key13 es para que se mande toda la palabra con el enter 
      // para evitar que se mande el formulario preventDefault
      capturaevento.preventDefault();
      // archivando mis valores en el state ... sprit operator
      setState([...state, { label: capturaevento.target.value, done: false }])
      //label para guardar elemento objeto, agrega objetos
      // false cerrar

      // aca hice la sincronizacion con mi api, se muestra en insomnia, se ve en la pantalla
      fetch("https://assets.breatheco.de/apis/fake/todos/user/fandrea", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...state, { label: capturaevento.target.value, done: false }])
        //json.stringify lo pone json lo que mando
      })

        .then(respuestadeapi => respuestadeapi.json())
        .then(data => console.log(data))




      console.log(state);


      // para borrar el input, comillas en blannnco
      capturaevento.target.value = "";
    }

    //toma todo los cambios ingresados en mi cuadrito input
  }
  //console.log(state);
  
  //ver datos en la web, uso useEffect para llamarlav 
  const verlistaweb = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/fandrea")
 
  .then (respuestadeapi => respuestadeapi.json())
  .then(data => setState(data))
  }
  

  useEffect(() => {
      verlistaweb();
  }, [])
  // para que se ejecute de ultimo, para que no dependa del fetch, debido a que si hay un problema no se ejecuta mi pagina



  const borra = (i) => {
    //haciendo borrar, colocar [] porque usa es arreglo
    state.splice(i, 1);
    setState([...state]);
    //console.log(state, i);

    // para sincronizar mi api y borrar
    fetch("https://assets.breatheco.de/apis/fake/todos/user/fandrea", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([...state,])
      //json.stringify lo pone json lo que mando
    })

      .then(respuestadeapi => respuestadeapi.json())
      .then(data => console.log(data))




  }
  return (
    <div className="App">
      <header className="App-header">
        <p>LISTA DE TAREAS</p>
        <input className="form-control form-control-lg" type="text" placeholder="Lista de tarea"
          onKeyDown={(capturaevento) => valor(capturaevento)} />
        {/* mezcla de html con js llaves */}
        {/* html ... para escribir dentro de html en el js uso llaves */}
        <ul>
          {
            //lista de mis actividades
            state.map((l, i) => {
              console.log(l)
              return (
                <li key={i} >{l.label} <img onClick={() => borra(i)} src="https://laletra.org/wp-content/uploads/2019/10/letters-2077251_960_720.png" width="30" alt="" /> </li>
                //agregar label para que muestre la palabra
              )
            })

          }
        </ul>
      </header>
    </div>
  );
}

export default App;
