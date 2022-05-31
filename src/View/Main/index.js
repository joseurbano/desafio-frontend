import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import ListPokemon from "./../../Components/ListPokemon";
import PieChart from "../../Components/PieChart";
import BarChart from "../../Components/BarChart";

const pokeapiUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=151";

export default function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [counterType, setCounterType] = useState();
  const [counterAbilities, setCounterAbilities] = useState();
  const [loading, setLoading] = useState(false);

  async function searchingAPI() {
    let result = [];
    //dataAPI.results = busca de todos os pokemons{nome,url}
    const dataAPI = await fetch(pokeapiUrl).then((response) => response.json());

    //busca de todas as informações em sequencia
    for (const pokemonInfo of dataAPI.results) {
      const pokemon = await fetch(pokemonInfo.url).then((response) =>
        response.json()
      );
      result.push(pokemon);
    }
    return result;
  }

  function settingTypes(listPokemons) {
    let result = [];
    for (const pokemon of listPokemons) {
      for (const element of pokemon.types) {
        if (result.findIndex((i) => i === element.type.name) === -1) {
          result.push(element.type.name);
        }
      }
    }
    return result;
  }

  function initCountType(types) {
    let result = [];
    types.forEach((type) => {
      result.push({ name: type, value: 0 });
    });
    return result;
  }
  function initCountAbilities() {
    let result = [];
    const abilities = ["1", "2", "3", "4"];

    abilities.forEach((ability) => {
      result.push({ name: ability, value: 0 });
    });
    return result;
  }

  useEffect(() => {
    searchingAPI().then((result) => {
      setPokemons(result);
      setLoading(true);

      const types = settingTypes(result);
      let auxCounterType = initCountType(types);
      let auxCounterAbilities = initCountAbilities();
      result.forEach((pokemon) => {
        auxCounterAbilities[pokemon.abilities.length - 1].value++;
        pokemon.types.forEach((type) => {
          const index = auxCounterType.findIndex(
            (i) => i.name === type.type.name
          );
          if (auxCounterType[index]) {
            auxCounterType[index].value++;
          }
        });
      });
      setCounterAbilities(auxCounterAbilities);
      setCounterType(auxCounterType);
    });
  }, []);

  return (
    <div className="app">
      <div className="row-charts">
        <PieChart title="Nº de Pokemons por Tipo" data={counterType} />
        <BarChart
          title="Nº de Pokemons por Quantidade de Habilidades"
          data={counterAbilities}
        />
      </div>
      <ListPokemon data={pokemons} loading={loading} />
    </div>
  );
}
