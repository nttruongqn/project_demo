import * as React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    //   legend: {
    //     position: 'left' as const,
    //   },
    title: {
      display: false,
      text: 'Thống kê chi tiết',
    },
  },
};

export interface IChartProps {
  labels: string[];
  countTransactionSuccess: number[];
  countTransactionCancellation: number[];
}

export function Chart({labels, countTransactionSuccess, countTransactionCancellation}: IChartProps) {
 
  const data = {
    labels,
    datasets: [
      {
        label: 'Số lượng đơn hàng thành công',
        data: countTransactionSuccess,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Số lượng đơn hàng bị hủy',
        data: countTransactionCancellation,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
