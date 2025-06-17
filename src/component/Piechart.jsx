import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Warna tetap sesuai urutan sentimen: Positif, Netral, Negatif
const COLORS = {
  positif: '#82ca9d',
  negatif: '#ff6666',
  netral: '#ffc658'
};


export default class Piechart extends PureComponent {
  render() {
    // Hitung jumlah sentimen
    const countSentiment = this.props.data.reduce((acc, curr) => {
      acc[curr.Sentiment] = (acc[curr.Sentiment] || 0) + 1;
      return acc;
    }, {});

   
    const chartData = Object.entries(countSentiment).map(
      ([sentiment, count]) => ({
        name: sentiment, 
        jumlah: count,
      })
    );

    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              label={({ name }) => name}  
              outerRadius={80}
              fill="#8884d8"
              dataKey="jumlah"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} komentar`, `Sentimen ${name}`]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
