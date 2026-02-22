import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isHero: true,
        status: "ACTIVE",
        stock: { gt: 0 },
      },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching hero products:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero products" },
      { status: 500 },
    );
  }
}
