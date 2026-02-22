"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import {
  MapPin,
  Phone,
  User,
  Truck,
  CreditCard,
  ShoppingBag,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/useCartStore";

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const { data: session } = useSession();

  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingRegion, setShippingRegion] = useState("");
  const [note, setNote] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  // Fetch user addresses from Prisma
  const { data: addresses, isLoading: isAddressesLoading } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const res = await fetch("/api/user/addresses");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  // Auto-select ad
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress =
        addresses.find((addr: any) => addr.isDefaultShipping) || addresses[0];
      setSelectedAddressId(defaultAddress.id);
      setShippingName(defaultAddress.fullName);
      setShippingPhone(defaultAddress.phoneNumber);
      setShippingAddress(defaultAddress.address);
      setShippingRegion(defaultAddress.region);
    }
  }, [addresses, selectedAddressId]);

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 50 ? 0 : 5;
  const total = subtotal + shippingCost;

  const placeOrder = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            name: item.name,
            image: item.image,
            price: item.price,
          })),
          shippingName,
          shippingPhone,
          shippingAddress,
          shippingRegion,
          note: note || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }
      return res.json();
    },
    onSuccess: (order) => {
      clearCart();
      setOrderSuccess(order.orderNumber);
    },
  });

  const selectAddress = (addr: {
    id: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    region: string;
  }) => {
    setSelectedAddressId(addr.id);
    setShippingName(addr.fullName);
    setShippingPhone(addr.phoneNumber);
    setShippingAddress(addr.address);
    setShippingRegion(addr.region);
  };

  const isFormValid =
    shippingName && shippingPhone && shippingAddress && shippingRegion;

  // Success state
  if (orderSuccess) {
    return (
      <div className="w-full bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-2xl py-16 text-center">
          <CheckCircle2 className="w-20 h-20 text-teal-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 font-serif mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mb-2">
            Your order{" "}
            <span className="font-bold text-gray-800">{orderSuccess}</span> has
            been placed.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Payment method: Cash on Delivery. You&apos;ll pay when your order
            arrives.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/user/orders">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                View My Orders
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="w-full bg-gray-50 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-2xl py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 font-serif mb-2">
            Your cart is empty
          </h1>
          <p className="text-gray-400 mb-6">
            Add some products before checking out.
          </p>
          <Link href="/products">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-teal-500 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href="/products"
            className="hover:text-teal-500 transition-colors"
          >
            Products
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">Checkout</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 font-serif mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-teal-500" />
                Shipping Information
              </h2>

              {/* User details from Session */}
              {session?.user && (
                <div className="mb-6 p-4 rounded-lg bg-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Saved Addresses */}
              {addresses && addresses.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Select a delivery address
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map(
                      (addr: {
                        id: string;
                        fullName: string;
                        phoneNumber: string;
                        address: string;
                        region: string;
                        label: string;
                      }) => (
                        <button
                          key={addr.id}
                          onClick={() => selectAddress(addr)}
                          className={`text-left p-3.5 rounded-lg border text-sm transition-all ${
                            selectedAddressId === addr.id
                              ? "border-teal-400 bg-teal-50 ring-1 ring-teal-200"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-800">
                              {addr.fullName}
                            </p>
                            <span
                              className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                selectedAddressId === addr.id
                                  ? "bg-teal-100 text-teal-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {addr.label}
                            </span>
                          </div>
                          <p className="text-gray-500 text-xs">
                            {addr.address}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {addr.region} · {addr.phoneNumber}
                          </p>
                          {selectedAddressId === addr.id && (
                            <div className="flex items-center gap-1 mt-2 text-teal-600">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-medium">
                                Selected
                              </span>
                            </div>
                          )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Empty Addresses State */}
              {!isAddressesLoading &&
                (!addresses || addresses.length === 0) && (
                  <div className="text-center py-8 px-4 border rounded-lg border-dashed border-gray-300">
                    <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-gray-800 mb-1">
                      No addresses found
                    </h3>
                    <p className="text-xs text-gray-500 mb-5">
                      You don&apos;t have any shipping addresses saved. Please
                      add one to proceed.
                    </p>
                    <Link href="/user/address-book">
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-none">
                        Manage Address Book
                      </Button>
                    </Link>
                  </div>
                )}
            </div>

            {/* Order Note */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4">
                Order Note (Optional)
              </h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Any special instructions for your order?"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-teal-400 transition-colors resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-teal-500" />
                Payment Method
              </h2>
              <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-teal-400 bg-teal-50">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-teal-500 ml-auto" />
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-teal-500" />
                Order Summary ({getTotalItems()} items)
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative w-14 h-14 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-800 shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={
                      shippingCost === 0 ? "text-teal-600 font-medium" : ""
                    }
                  >
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {placeOrder.error && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {placeOrder.error.message}
                </div>
              )}

              <Button
                onClick={() => placeOrder.mutate()}
                disabled={!isFormValid || placeOrder.isPending}
                className="w-full h-12 mt-6 bg-teal-500 hover:bg-teal-600 text-white font-medium disabled:opacity-50"
              >
                {placeOrder.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order · $${total.toFixed(2)}`
                )}
              </Button>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                By placing this order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
