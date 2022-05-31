import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function BarChartPokemon(props) {
  return (
    <div style={{ minWidth: 300, flex: 1, height: 400 }}>
      <h3 className="title">{props.title}</h3>
      <ResponsiveContainer height="90%">
        <BarChart
          data={props.data}
          barSize={50}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 25,
          }}
        >
          <XAxis
            name="Número de Habilidades"
            dataKey="name"
            scale="point"
            padding={{ left: 30, right: 30 }}
          >
            <Label value="Nº de Habilidades" position="bottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Quantidade de Pokemons"
              position="center"
              dx={-16}
              angle={-90}
            />
          </YAxis>
          <Tooltip
            labelFormatter={(value) =>
              value + " Habilidade" + (value > 1 ? "s" : "")
            }
            formatter={(value) => value + " Pokemons"}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            isAnimationActive
            name="Quantidade de Pokemons"
            dataKey="value"
            fill="#a85632"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
