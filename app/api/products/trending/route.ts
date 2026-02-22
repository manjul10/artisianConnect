import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateWilsonScore } from "@/lib/wilson-score";

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        stock: { gt: 0 },
      },
    });

    const sortedProducts = allProducts.sort((a, b) => {
      const scoreA = calculateWilsonScore(a.averageRating, a.totalRatings);
      const scoreB = calculateWilsonScore(b.averageRating, b.totalRatings);
      return scoreB - scoreA;
    });

    const trendingProducts = sortedProducts.slice(0, 2);

    return NextResponse.json(trendingProducts);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
