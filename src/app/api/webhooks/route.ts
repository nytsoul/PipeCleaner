import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mock Webhook endpoint for testing purposes
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Example payload expected from Stripe/Razorpay or client mock
    const { orderId, paymentStatus, transactionId } = payload;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: paymentStatus || "PAID",
        status: "PROCESSING",
        transactionId: transactionId || "mock_txn_123"
      }
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
  }
}
