import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "mock_key", {
  apiVersion: "2026-06-24.dahlia",
});

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

    // In a real app, calculate exact amount from DB prices, not from client
    // For now, we trust totalAmount for simulation purposes
    const amountInCents = Math.round(totalAmount * 100);

    // Create Order in Database
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        paymentMethod: "STRIPE",
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

    if (process.env.STRIPE_SECRET_KEY) {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: {
          orderId: order.id,
        },
      });

      return NextResponse.json({ 
        clientSecret: paymentIntent.client_secret,
        orderId: order.id
      });
    } else {
      // Mock mode
      return NextResponse.json({ 
        clientSecret: "mock_secret",
        orderId: order.id,
        mock: true
      });
    }
  } catch (error) {
    console.error("Stripe API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
