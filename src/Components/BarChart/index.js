import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function  BarChartPokemon(props) {
  return (
    <div>
      <h3 className="title">Quantidade de Pokemons por número de habilidades</h3>
      <BarChart
        width={400}
        height={300}
        data={props.data}
        barSize={50}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          name="Número de Habilidades"
          dataKey="name"
          scale="point"
          padding={{ left: 30, right: 5 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="1 1" />
        <Bar
          legendType="diamond"
          isAnimationActive
          name="Quantidade de pokemons"
          dataKey="value"
          fill="#a85632"
        />
      </BarChart>
    </div>
  );
}
