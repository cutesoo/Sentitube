import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default class Barchart extends PureComponent {
  render() {
    // Hitung jumlah masing-masing sentimen
    const countSentiment = this.props.data.reduce((acc, curr) => {
      acc[curr.Sentiment] = (acc[curr.Sentiment] || 0) + 1;
      return acc;
    }, {});

    // Format data untuk BarChart
    const chartData = Object.entries(countSentiment).map(
      ([sentiment, count]) => ({
        sentiment,
        jumlah: count,
      })
    );

    // Map warna berdasarkan sentimen
    const COLORS = {
      positif: "#82ca9d", // hijau
      negatif: "#ff6666", // merah
      netral: "#ffc658",  // kuning
    };

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="sentiment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="jumlah">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.sentiment]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
