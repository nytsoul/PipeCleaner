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
            variant: item.variant
          }))
        }
      }
    });

    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: amountInPaise,
        currency: "INR", // Assuming INR for Razorpay, but could be USD
        receipt: order.id,
      };

      const rzpOrder = await razorpay.orders.create(options);

      return NextResponse.json({
        id: rzpOrder.id,
        currency: rzpOrder.currency,
        amount: rzpOrder.amount,
        orderId: order.id
      });
    } else {
      // Mock mode
      return NextResponse.json({
        id: "mock_rzp_order_id",
        currency: "INR",
        amount: amountInPaise,
        orderId: order.id,
        mock: true
      });
    }
  } catch (error) {
    console.error("Razorpay API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
