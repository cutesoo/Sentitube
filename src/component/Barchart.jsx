import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default class Barchart extends PureComponent {
  render() {
    // Menghitung jumlah sentimen dari props.data
    const countSentiment = this.props.data.reduce((acc, curr) => {
      acc[curr.Sentiment] = (acc[curr.Sentiment] || 0) + 1;
      return acc;
    }, {});

    // Menyusun data dalam format yang bisa diterima BarChart
    const chartData = Object.entries(countSentiment).map(
      ([sentiment, count]) => ({
        sentiment,
        jumlah: count,
      })
    );

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="sentiment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
