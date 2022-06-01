import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import ListPokemon from "./../../Components/ListPokemon";
import PieChart from "../../Components/PieChart";
import BarChart from "../../Components/BarChart";
import Loading from "../../Components/Loading";

export default function Main() {
  const [pokemons, setPokemons] = useState([]);
  const [counterType, setCounterType] = useState();
  const [counterAbilities, setCounterAbilities] = useState();
  const [loading, setLoading] = useState(true);

  //contabiliza todos os pokemons por tipo sem buscar as informaçoes completas de cada pokemon
  async function searchingTypesAPI() {
    let arrayTypes = [];

    //dataAPI = todos os tipo de pokemons {name, url}
    const dataAPI = await fetch("https://pokeapi.co/api/v2/type").then(
      (response) => response.json()
    );
    //inicializa arrayType com os tipos e valor inicial do contador igual a zero. Ex: [grass: 0, bug: 0, ...]
    dataAPI.results.forEach((element) => {
      arrayTypes.push({ name: element.name, value: 0 });
    });
    for (const t of dataAPI.results) {
      //t é o tipo e a url. Ex: {name: normal, url: https://pokeapi.co/api/v2/type/1 }
      const type = await fetch(t.url).then((response) => response.json());

      //type são todas as informações do tipo, incluindo todos os pokemons daquele tipo(type.pokemon)
      for (const p of type.pokemon) {
        //idPokemon é o numero final da url do pokemon(https://pokeapi.co/api/v2/pokemon/ID)
        const idPokemon = p.pokemon.url.split("/")[6];
        //verifica se o pokemon é um dos 151 primeiros, somente pela url
        if (idPokemon < 152) {
          const index = arrayTypes.findIndex((t) => t.name === type.name);
          arrayTypes[index].value++;
        } else {
          //todos os proximos pokemons desse tipo serão acima do 151, entao quebra o loop e inicia o próximo tipo
          break;
        }
      }
    }
    return arrayTypes;
  }

  async function searching30Pokemons() {
    let result = [];
    //dataAPI.results = busca de todos os pokemons{nome,url}
    const dataAPI = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=30"
    ).then((response) => response.json());

    //busca de todas as informações em sequencia
    for (const pokemonInfo of dataAPI.results) {
      const pokemon = await fetch(pokemonInfo.url).then((response) =>
        response.json()
      );
      result.push(pokemon);
    }
    return result;
  }

  async function searchingAllPokemonsInfo() {
    let result = [];
    //dataAPI.results = busca de todos os pokemons{nome,url}
    const dataAPI = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=121&offset=30"
    ).then((response) => response.json());

    //busca de todas as informações em sequencia
    for (const pokemonInfo of dataAPI.results) {
      const pokemon = await fetch(pokemonInfo.url).then((response) =>
        response.json()
      );
      result.push(pokemon);
    }
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
    //carregando pieChart Data
    searchingTypesAPI().then((result) => {
      setCounterType(result);
      setLoading(false);
    });
    let _30Pokemons = [];
    //carregando os 30 primeiros pokemons da lista
    searching30Pokemons().then((result) => {
      _30Pokemons = result;
      setPokemons(result);
      setLoading(false);
    });

    //carregando todos os 151 pokemons
    searchingAllPokemonsInfo().then((result) => {
      const allPokemons = _30Pokemons.concat(result);
      setPokemons(allPokemons);
      setLoading(false);
      // carregando barChart data
      let auxCounterAbilities = initCountAbilities();
      allPokemons.forEach((pokemon) => {
        auxCounterAbilities[pokemon.abilities.length - 1].value++;
      });
      setCounterAbilities(auxCounterAbilities);
    });
  }, []);

  return loading ? (
    <div className="app">
      <Loading />
    </div>
  ) : (
    <div className="app">
      <div className="row-charts">
        <PieChart title="Nº de Pokemons por Tipo" data={counterType} />
        <BarChart
          title="Nº de Pokemons por Quantidade de Habilidades"
          data={counterAbilities}
        />
      </div>
      <ListPokemon data={pokemons} loading={loading} />
      {pokemons.length < 151 ? (
        <h1 style={{ textAlign: "center", color: "#fff" }}>
          CARREGANDO MAIS POKEMONS ...
        </h1>
      ) : (
        <div />
      )}
    </div>
  );
}
