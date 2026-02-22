"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart, RefreshCw, Search } from "lucide-react";
import useCartStore from "@/stores/useCartStore";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        images: string[];
        stock: number;
        averageRating: number;
        totalRatings: number;
        category: {
            id: string;
            name: string;
            slug: string;
        };
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    const imageUrl =
        Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "https://picsum.photos/id/164/600/600";

    return (
        <Link href={`/products/${product.slug}`} className="group cursor-pointer block">
            {/* Image Container with Hover Overlay */}
            <div className="relative w-full aspect-square bg-[#F9F9F9] mb-4 overflow-hidden flex items-center justify-center rounded-lg">
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            useCartStore.getState().addItem({
                                productId: product.id,
                                name: product.name,
                                slug: product.slug,
                                price: product.price,
                                image: imageUrl,
                                stock: product.stock,
                            });
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-400 hover:text-white transition-colors"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-400 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-400 hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-teal-400 hover:text-white transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold text-sm">
                        ${product.price.toFixed(2)}
                    </span>
                    <div className="flex text-gray-200">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 fill-current ${i < Math.round(product.averageRating)
                                    ? "text-amber-400"
                                    : "text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <h3 className="text-gray-800 font-bold text-lg group-hover:text-teal-500 transition-colors">
                    {product.name}
                </h3>
                <span className="text-xs text-gray-400">{product.category.name}</span>
            </div>
        </Link>
    );
};

export default ProductCard;
