import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, totalAmount, shippingAddress } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Verify the user exists in the database (prevents FK violation on stale sessions)
    const userExists = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!userExists) {
      return NextResponse.json(
        { error: "Session expired. Please sign out and sign in again." },
        { status: 401 }
      );
    }

    // Verify all product IDs exist (prevents FK violation on stale cart data)
    const productIds: string[] = items.map((item: any) => item.id);
    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true }
    });
    if (existingProducts.length !== productIds.length) {
      const foundIds = new Set(existingProducts.map((p) => p.id));
      const missing = productIds.filter((id) => !foundIds.has(id));
      return NextResponse.json(
        { error: `Some cart items no longer exist: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const amountInPaise = Math.round(totalAmount * 100);

    // Create Order in Database
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentMethod: "RAZORPAY",
        paymentStatus: "PENDING",
        shippingAddress: JSON.stringify(shippingAddress),
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            variant: item.variant,
          })),
        },
      },
    });

    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: order.id,
      });

      return NextResponse.json({
        id: rzpOrder.id,
        currency: rzpOrder.currency,
        amount: rzpOrder.amount,
        orderId: order.id,
      });
    } else {
      // Mock mode (no Razorpay keys configured)
      return NextResponse.json({
        id: "mock_rzp_order_id",
        currency: "INR",
        amount: amountInPaise,
        orderId: order.id,
        mock: true,
      });
    }
  } catch (error) {
    console.error("Razorpay API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
