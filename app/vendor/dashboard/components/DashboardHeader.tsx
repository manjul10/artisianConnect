"use client";
import React from "react";
import { Search, Bell, Heart, LogOut } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4 w-full md:w-auto">
        {/* Search */}
        {/* <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full border-none shadow-sm text-sm focus:ring-2 focus:ring-blue-100 outline-none placeholder-gray-400"
          />
        </div> */}

        {/* Date Filter (Mock) */}
        {/* <div className="hidden md:flex items-center bg-white rounded-[10px] px-3 py-2 shadow-sm cursor-pointer border border-transparent hover:border-gray-200">
          <span className="text-xs font-semibold text-gray-600 mr-2">
            This Month
          </span>
        </div> */}

        {/* Icons */}
        <div className="flex items-center space-x-3">
          {/* <button className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-500 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-blue-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button> */}
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-700">
                {session?.user?.name}
              </p>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 bg-teal-100 rounded-full shadow-sm text-gray-400 hover:text-blue-500 transition-colors overflow-hidden border border-gray-100 outline-none">
                  <div className="w-8 h-8 relative">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-600 font-bold">
                        {session?.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={async () => {
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          window.location.href = "/";
                        },
                      },
                    });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
