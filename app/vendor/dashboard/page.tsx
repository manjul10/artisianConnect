"use client";
import React from "react";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import Charts, { SalesChannelChart } from "./components/Charts";
import TransactionsTable from "./components/TransactionsTable";

export default function DashboardPage() {
  return (
    <div className="pb-8">
      <DashboardHeader />
      <StatsCards />
      <Charts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>
        <div>
          <SalesChannelChart />
        </div>
      </div>
    </div>
  );
}
