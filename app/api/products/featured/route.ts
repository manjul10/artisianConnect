import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
        status: "ACTIVE",
        stock: { gt: 0 },
      },
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
