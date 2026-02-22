import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Try to find by slug first, then by id
        let product = await prisma.product.findUnique({
            where: { slug: id },
            include: {
                category: {
                    select: { id: true, name: true, slug: true },
                },
                user: {
                    select: { id: true, name: true, image: true },
                },
                reviews: {
                    orderBy: { createdAt: "desc" },
                    take: 10,
                    include: {
                        user: {
                            select: { id: true, name: true, image: true },
                        },
                    },
                },
            },
        });

        if (!product) {
            product = await prisma.product.findUnique({
                where: { id },
                include: {
                    category: {
                        select: { id: true, name: true, slug: true },
                    },
                    user: {
                        select: { id: true, name: true, image: true },
                    },
                    reviews: {
                        orderBy: { createdAt: "desc" },
                        take: 10,
                        include: {
                            user: {
                                select: { id: true, name: true, image: true },
                            },
                        },
                    },
                },
            });
        }

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}
