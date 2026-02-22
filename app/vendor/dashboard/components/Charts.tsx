"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock Data
const salesData = [
  { name: "Week 1", sales: 30, traffic: 45 },
  { name: "", sales: 25, traffic: 35 },
  { name: "", sales: 35, traffic: 55 },
  { name: "Week 2", sales: 50, traffic: 40 },
  { name: "", sales: 40, traffic: 30 },
  { name: "", sales: 60, traffic: 50 },
  { name: "Week 3", sales: 55, traffic: 65 },
  { name: "", sales: 45, traffic: 35 },
  { name: "", sales: 30, traffic: 45 },
  { name: "Week 4", sales: 40, traffic: 30 },
  { name: "", sales: 50, traffic: 60 },
  { name: "Week 5", sales: 65, traffic: 70 },
];

const productData = [
  { name: "Samsung match", sales: 750 },
  { name: "Macbook Pro", sales: 650 },
  { name: "Samsung S24", sales: 580 },
  { name: "iPhone 15 Pro", sales: 520 },
  { name: "Apple Ipad (wifi)", sales: 480 },
  { name: "Boat Airdopes 311", sales: 420 },
];

const channelData = [
  { name: "WEBSITE", value: 40, color: "#3B82F6" },
  { name: "INSTAGRAM", value: 30, color: "#60A5FA" },
  { name: "WHATSAPP", value: 20, color: "#93C5FD" },
  { name: "OTHERS", value: 10, color: "#BFDBFE" },
];

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Sales Performance Chart */}
      <div className="bg-white p-6 rounded-[20px] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
            Sales Performance
          </h3>
          <button className="text-gray-400 hover:text-gray-600">
            <span className="text-xs border border-gray-200 rounded px-2 py-1">
              Weekly
            </span>
          </button>
        </div>
        <div className="h-[250px] w-full relative">
          {/* Overlay value */}
          <div className="absolute top-4 left-1/3 bg-white shadow-lg p-3 rounded-xl border border-gray-100 z-10">
            <p className="text-lg font-bold text-gray-900">
              $45,096 <span className="text-green-500 text-xs">▲</span>
            </p>
            <p className="text-xs text-gray-400">Total Sales</p>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="traffic"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Products Bar Chart */}
      <div className="bg-white p-6 rounded-[20px] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
            Top Selling Products
          </h3>
        </div>
        <div className="h-[250px] w-full py-2">
          <div className="flex flex-col space-y-3 justify-between h-full">
            {productData.map((item) => (
              <div key={item.name} className="flex items-center text-xs">
                <span className="w-28 text-gray-500 font-medium truncate pr-2">
                  {item.name}
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(item.sales / 800) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-[10px] text-gray-400 pl-28 pt-2">
              <span>0</span>
              <span>200</span>
              <span>400</span>
              <span>600</span>
              <span>700</span>
              <span>800</span>
            </div>
            <div className="text-center text-[10px] text-gray-400 uppercase tracking-wider">
              units ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SalesChannelChart = () => {
  return (
    <div className="bg-white p-6 rounded-[20px] shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
          Sales Channel
        </h3>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full">
          {channelData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
