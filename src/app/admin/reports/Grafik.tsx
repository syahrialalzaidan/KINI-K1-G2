"use client";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    Sales: 400,
  },
  {
    name: "Feb",
    Sales: 300,
  },
  {
    name: "Mar",
    Sales: 200,
  },
  {
    name: "Apr",
    Sales: 278,
  },
  {
    name: "Mei",
    Sales: 189,
  },
  {
    name: "Jun",
    Sales: 239,
  },
  {
    name: "Jul",
    Sales: 349,
  },
  {
    name: "Aug",
    Sales: 349,
  },
  {
    name: "Sep",
    Sales: 549,
  },
  {
    name: "Oct",
    Sales: 449,
  },
  {
    name: "Nov",
    Sales: 249,
  },
  {
    name: "Dec",
    Sales: 149,
  },
];

const data2 = [
  {
    name : "1",
    Sales: 4
  },
  {
    name : "2",
    Sales: 5
  },
  {
    name : "3",
    Sales: 6
  },
  {
    name : "4",
    Sales: 4
  },
  {
    name : "5",
    Sales: 5
  },
  {
    name : "6",
    Sales: 3
  },
  {
    name : "7",
    Sales: 2
  },
  {
    name : "8",
    Sales: 1
  },
  {
    name : "9",
    Sales: 2
  },
  {
    name : "10",
    Sales: 3
  },
  {
    name : "11",
    Sales: 4
  },
  {
    name : "12",
    Sales: 5
  },
  {
    name : "13",
    Sales: 6
  },
  {
    name : "14",
    Sales: 4
  },
  {
    name : "15",
    Sales: 5
  },
  {
    name : "16",
    Sales: 3
  },
  {
    name : "17",
    Sales: 2
  },
  {
    name : "18",
    Sales: 1
  },
  {
    name : "19",
    Sales: 2
  },
  {
    name : "20",
    Sales: 3
  },
  {
    name : "21",
    Sales: 4
  },
  {
    name : "22",
    Sales: 5
  },
  {
    name : "23",
    Sales: 6
  },
  {
    name : "24",
    Sales: 4
  },
  {
    name : "25",
    Sales: 5
  },
  {
    name : "26",
    Sales: 3
  },
  {
    name : "27",
    Sales: 2
  },
  {
    name : "28",
    Sales: 1
  },
  {
    name : "29",
    Sales: 2
  },
  {
    name : "30",
    Sales: 3
  },
  {
    name : "31",
    Sales: 4
  },
]

interface GrafikProps {
  type : string
}

export default function Grafik(props: GrafikProps) {
  return (
    <ResponsiveContainer width="90%" aspect={3}>
      <AreaChart
        width={500}
        height={400}
        data={props.type == "year" ? data : data2}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Sales" stroke="#F588FC" fill="#F588FC" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
