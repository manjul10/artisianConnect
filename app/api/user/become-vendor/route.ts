import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "VENDOR" as any },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error upgrading to vendor:", error);
    return NextResponse.json(
      { error: "Failed to upgrade to vendor" },
      { status: 500 }
    );
  }
}
