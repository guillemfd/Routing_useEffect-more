import "./App.css";
import axios from "axios";

import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("name");
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    console.log("MOUNTING");
    const fetchData = async () => {
      const pokeInfo = await axios(
        "https://pokeapi.co/api/v2/pokemon/pikachu"
      );
      setPokemon(pokeInfo.data);
    };
    fetchData();

    return ()=>{
      console.log("COMPONENT UNMOUNT")
    } //--> solo se activa cuando el componente se desmonta
  }, []); // --> solo se activa tras el primer renderizado del componente

  useEffect(() => {
    console.log("COUNTER HA CAMBIADO");
  }, [counter]); //--> solo se activa tras el primer renderizado del componente y siempre que counter cambie de valor

  useEffect(() => {
    console.log("IRONHACK!!");
  }, [name]);

  return (
    <div className="App">
      <h1>App Component</h1>
      <button onClick={() => setCounter(counter + 1)}>CHANGE COUNTER</button>
      <h2>{counter}</h2>
      <h2>{pokemon ? pokemon.name : "Loading..."}</h2>
    </div>
  );
}

export default App;

// El useEffect() siempre se va a ejecutar una vez cuando el componente se monta y luego lo volverá a hacer cada vez que las dependencias que hemos definido dentro del array (en el segundo argumento) cambien

// Siempre que queramos ejecutar código una vez (y solo una vez) en nuestro componente, lo pondremos dentro de un useEffect() con el array de dependencias vacio. Esto sería el equivalente a el componentDidMount() de un componente de clase. Este efecto es util cuando vamos a hacer llamadas a bases de datos, APIs, etc. (codigo externo que solo necesitamos cargar una vez)


//Si queremos ejecutar código cuando un componente se desmonta, tenemos que hacerlo dentro del return de el useEffect() con el array de dependencia vacio. Este return siempre va a devolver una función, y dentro de esta tenemos que poner el codigo que queremos que se ejecute.