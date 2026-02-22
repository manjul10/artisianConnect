"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const TrendingMay = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const { data: trendingItems, isLoading } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const response = await axios.get("/api/products/trending");
      return response.data;
    },
  });

  const displayItems = trendingItems || [];

  return (
    <div className="w-full bg-white py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/3 flex flex-col items-start space-y-8">
            <h2 className="text-4xl font-bold text-[#1a202c] leading-tight font-serif">
              Trending Products <br /> of {currentMonth} {currentYear}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Road, intermixing without horn ran my we finally, changes upright,
              out it would on lady guest have right, design they which came
              could structure a made.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                className="rounded-none border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 py-6 uppercase tracking-wider text-xs font-bold transition-all min-w-[160px]"
              >
                Shop Now
              </Button>
            </div>
          </div>

          {/* Right: Products Grid */}
          <div className="w-full lg:w-2/3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : displayItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayItems.map((item: any) => (
                  <Link
                    href={`/search?query=${item.slug}`}
                    key={item.id}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    <div className="bg-[#F9F9F9] p-12 flex items-center justify-center mb-6 aspect-square relative rounded-md overflow-hidden">
                      <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={
                            item.images?.[0] ||
                            "https://picsum.photos/id/183/600/600"
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 mt-auto">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-900 font-bold text-lg">
                          ${item.price ? item.price.toFixed(2) : "0.00"}
                        </span>
                        <div className="flex text-amber-400 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < Math.round(item.averageRating || 0) ? "fill-current" : "text-gray-200 fill-current"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg group-hover:text-teal-400 transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64 text-gray-500">
                <p>No trending products configured yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingMay;
