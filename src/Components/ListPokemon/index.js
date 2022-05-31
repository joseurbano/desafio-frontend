import React from "react";
import { List } from "antd";
import "antd/dist/antd.min.css";
import "./index.css";
import PokemonTypeColors from "./../../Config/pokemonTypeColors";
export default function ListPokemon(props) {
  return (
    <List
      className="list"
      dataSource={props.data}
      renderItem={(item) => {
        const TypeColor = PokemonTypeColors.find(
          (p) => p.type === item.types[0].type.name
        ).color;
        return (
          <div className="card" style={{ backgroundColor: TypeColor }}>
            <img
              alt={item.name}
              src={item.sprites.front_default}
              className="sprite-pokemon"
            />
            <div className="card-content">
              <div className="row">
                <h2 className="text-name">
                  {"#" + ("000" + item.id).slice(-3)}
                </h2>
                <h2 className="text-name">{" - " + item.name}</h2>
              </div>
              <div className="row">
                <h3 className="text-info">{"Quantidade de Habilidades:"}</h3>
                <h3 className="text-info">{item.abilities.length}</h3>
              </div>
              <div className="row">
                <h3 className="text-info">{"Tipo:"}</h3>
                {item.types.map((type, index) => {
                  //cor do background do tipo de pokemon
                  const backColor = PokemonTypeColors.find(
                    (p) => p.type === type.type.name
                  ).color;
                  return (
                    <h3
                      style={{
                        backgroundColor: backColor,
                        paddingInline: 8,
                        marginInline: 4,
                        borderRadius: 8,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      key={index}
                    >
                      {type.type.name}
                    </h3>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
