import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const status = searchParams.get("status");

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      take: limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Map order fields to match frontend expectations
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customerName: order.user?.name || "Guest Customer",
      email: order.user?.email || "N/A",
      amount: order.totalAmount,
      status: order.status,
      date: order.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Orders API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
