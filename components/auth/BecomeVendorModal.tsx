"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Store } from "lucide-react";
import { useSession } from "@/lib/auth-client"; // Assuming this hook re-fetches session

interface BecomeVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BecomeVendorModal({ isOpen, onClose }: BecomeVendorModalProps) {
  // const { refetch } = useSession(); // If useSession supports refetch

  const becomeVendorMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/user/become-vendor");
      return response.data;
    },
    onSuccess: () => {
      // Refresh the page to update session and redirect logic
      window.location.href = "/vendor/dashboard";
    },
    onError: (error) => {
      console.error("Failed to become vendor:", error);
      alert("Something went wrong. Please try again.");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-teal-50 p-3 rounded-full mb-4">
            <Store className="h-6 w-6 text-teal-600" />
          </div>
          <DialogTitle className="text-center text-xl">
            Become a Seller
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Start selling your products on our platform today. Access the vendor
            dashboard to manage products, orders, and sales.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="text-sm text-gray-600 space-y-2 list-disc pl-8">
            <li>Create and manage unlimited products</li>
            <li>Track your orders and earnings</li>
            <li>Access detailed sales reports</li>
            <li>Customize your store profile</li>
          </ul>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={() => becomeVendorMutation.mutate()}
            disabled={becomeVendorMutation.isPending}
          >
            {becomeVendorMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm & Start Selling
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
