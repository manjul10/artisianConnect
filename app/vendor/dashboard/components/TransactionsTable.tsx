"use client";
import React from "react";
import { MoreHorizontal } from "lucide-react";

// Mock Data
const transactions = [
  {
    id: "#1001",
    date: "11/05/2019",
    product: "Iphone 15 Pro",
    customer: "Daniel McCarthy",
    amount: "$1,200",
    status: "Completed",
    statusColor: "text-green-500",
  },
  {
    id: "#1002",
    date: "12/05/2019",
    product: "Apple Macbook",
    customer: "Kane Williamson",
    amount: "$3,100",
    status: "Completed",
    statusColor: "text-orange-500",
  },
  {
    id: "#1003",
    date: "12/05/2019",
    product: "SamsungS23",
    customer: "Douglas Worthy",
    amount: "$1,400",
    status: "Completed",
    statusColor: "text-pink-500",
  }, // Status color mock match screenshot
  {
    id: "#1004",
    date: "12/05/2019",
    product: "Huawei Mate 30",
    customer: "John Cena",
    amount: "$899",
    status: "Completed",
    statusColor: "text-teal-500",
  },
];

const TransactionsTable = () => {
  return (
    <div className="bg-white p-6 rounded-[20px] shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
          Most Recent Transactions
        </h3>
        <button className="text-blue-500 text-xs font-bold hover:underline">
          View All &gt;&gt;
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs border-b border-gray-100">
              <th className="pb-3 font-medium pl-2">Date ↕</th>
              <th className="pb-3 font-medium">ID ↕</th>
              <th className="pb-3 font-medium">Product ↕</th>
              <th className="pb-3 font-medium">Customer ↕</th>
              <th className="pb-3 font-medium">Amount ↕</th>
              <th className="pb-3 font-medium">Order Status ↕</th>
              <th className="pb-3 font-medium text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map((t, i) => (
              <tr
                key={i}
                className="group hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
              >
                <td className="py-4 pl-2 font-medium text-gray-500">
                  {t.date}
                </td>
                <td className="py-4 font-medium text-gray-500">{t.id}</td>
                <td className="py-4 font-bold text-gray-900">{t.product}</td>
                <td className="py-4 font-medium text-gray-600">{t.customer}</td>
                <td className="py-4 font-bold text-gray-900">{t.amount}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${t.status === "Completed" ? "bg-green-400" : "bg-gray-400"}`}
                    ></div>{" "}
                    {/* Simply visual dot */}
                    <span className="text-gray-500 font-medium">
                      {t.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-right pr-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
