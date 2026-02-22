"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Type definition for creating a payment option
export type PaymentOptionFormValues = {
  type: string; // "DIGITAL_WALLET" | "CREDIT_CARD" | "DEBIT_CARD"
  provider: string; // "ESEWA" | "KHALTI" | "VISA" | "MASTERCARD"
  accountName: string;
  accountNumber: string;
  expiryDate?: string;
  isDefault: boolean;
};

export async function addPaymentOption(data: PaymentOptionFormValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // If setting as default, unset others first
  if (data.isDefault) {
    await prisma.paymentOption.updateMany({
      where: { userId: session.user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  await prisma.paymentOption.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  revalidatePath("/user/payment-options");
}

export async function deletePaymentOption(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.paymentOption.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/user/payment-options");
}

export async function setDefaultPaymentOption(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Unset current default
  await prisma.paymentOption.updateMany({
    where: { userId: session.user.id, isDefault: true },
    data: { isDefault: false },
  });

  // Set new default
  await prisma.paymentOption.update({
    where: { id, userId: session.user.id },
    data: { isDefault: true },
  });

  revalidatePath("/user/payment-options");
}

export async function getPaymentOptions() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return await prisma.paymentOption.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
