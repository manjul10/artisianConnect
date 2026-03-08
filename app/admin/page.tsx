"use client";

import React, { useEffect, useState } from "react";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";
import { getAdminStats } from "@/app/actions/admin";

interface DashboardStats {
    totalUsers: number;
    totalVendors: number;
    totalOrders: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadStats() {
            try {
                const result = await getAdminStats();
                if (result.success && result.stats) {
                    setStats(result.stats);
                } else {
                    setError(result.error || "Failed to load statistics");
                }
            } catch (err) {
                setError("An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                {error}
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Customers",
            value: stats?.totalUsers.toString() || "0",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Total Vendors",
            value: stats?.totalVendors.toString() || "0",
            icon: Package,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
        {
            title: "Total Orders",
            value: stats?.totalOrders.toString() || "0",
            icon: ShoppingCart,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "Total Revenue",
            value: `$${(stats?.totalRevenue || 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`,
            icon: DollarSign,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
        },
    ];

    return (
        <div className="space-y-6 flex flex-col items-center max-w-7xl mx-auto w-full">
            <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-900 font-sans">
                    Platform Analytics Overview
                </h1>
                <p className="text-gray-500 mt-1">
                    Check the stats of the platform
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                {statCards.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow"
                    >
                        <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
