"use client";

import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  LogOut,
  LayoutDashboard,
  Package,
  Star,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BecomeVendorModal } from "@/components/auth/BecomeVendorModal";
import useCartStore from "@/stores/useCartStore";

const TopBar = () => {
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBecomeVendorModalOpen, setIsBecomeVendorModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col">
        {/* Top Info Strip */}
        <div className="w-full bg-[#F8F8F8] py-3 border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center text-xs text-gray-500 font-sans">
            <span>Artisian Connect@gmail.com</span>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-teal-400">
                <Facebook className="w-3 h-3 fill-current" />
              </Link>
              <Link href="#" className="hover:text-teal-400">
                <Twitter className="w-3 h-3 fill-current" />
              </Link>
              <Link href="#" className="hover:text-teal-400">
                <Linkedin className="w-3 h-3 fill-current" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="w-full bg-white py-8">
          <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
            {/* Logo */}
            <div className="flex-1">
              <Link
                href="/"
                className="text-4xl font-bold tracking-tight font-serif text-[#1a202c]"
              >
                Artisian Connect.
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-[2] flex justify-center">
              <form
                onSubmit={handleSearch}
                className="relative w-full max-w-xl"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full py-3 pl-6 pr-12 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 placeholder-gray-400 text-sm bg-transparent font-sans"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Icons */}
            <div className="flex-1 flex justify-end items-center space-x-8">
              <div className="relative cursor-pointer group" onClick={openCart}>
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-teal-400 transition-colors" />
                  {mounted && getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-teal-400 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
              </div>
              <div className="cursor-pointer group">
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-teal-400 transition-colors" />
              </div>

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer border border-white hover:border-teal-400 py-2 px-4  rounded-lg group flex items-center gap-2 outline-none">
                      <span className="text-xs font-medium hidden md:block group-hover:text-teal-600 transition-colors">
                        {session.user.name}
                      </span>
                      <User className="w-6 h-6 text-teal-600 transition-colors" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/user/profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Manage My Account</span>
                    </DropdownMenuItem>
                    {/* Vendor Link */}
                    {session.user.role === "VENDOR" ? (
                      <DropdownMenuItem
                        onClick={() => router.push("/vendor/dashboard")}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Vendor Dashboard</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => setIsBecomeVendorModalOpen(true)}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Become a Vendor</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/orders")}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/wishlist")}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>My Wishlist & Followed Stores</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/reviews")}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      <span>My Reviews</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard/returns")}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      <span>My Returns & Cancellations</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div
                  className="cursor-pointer group"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <div className="flex items-center gap-2 text-gray-600 group-hover:text-teal-400 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="text-sm font-medium">Sign In</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <BecomeVendorModal
        isOpen={isBecomeVendorModalOpen}
        onClose={() => setIsBecomeVendorModalOpen(false)}
      />
    </>
  );
};

export default TopBar;
