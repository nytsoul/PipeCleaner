import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SITE_NAME } from "@/lib/constants";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderItems: {
          include: { product: true }
        },
        user: true
      }
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Only allow admin or the order owner to view the invoice
    if (session.user.role !== "ADMIN" && order.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const shippingAddress = order.shippingAddress 
      ? JSON.parse(order.shippingAddress) 
      : { fullName: "N/A", email: "N/A", address: "N/A", city: "N/A", postalCode: "N/A", country: "N/A" };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; }
          .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); font-size: 16px; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { margin: 0; color: #333; }
          .details-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          table th, table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          table th { background: #f8f8f8; font-weight: bold; }
          .totals { text-align: right; margin-top: 30px; }
          .totals p { margin: 5px 0; }
          .totals .grand-total { font-size: 1.2em; font-weight: bold; border-top: 2px solid #333; padding-top: 10px; margin-top: 10px; }
          .footer { text-align: center; color: #777; font-size: 0.9em; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
          @media print { .invoice-box { box-shadow: none; border: none; padding: 0; } }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <div class="header">
            <div>
              <h1>${SITE_NAME}</h1>
              <p>Handmade Pipe Cleaner Gifts</p>
            </div>
            <div style="text-align: right;">
              <h2>INVOICE</h2>
              <p><strong>Order #:</strong> ${order.id}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> ${order.paymentStatus}</p>
            </div>
          </div>

          <div class="details-section">
            <div>
              <h3>Bill To / Ship To:</h3>
              <p>
                <strong>${shippingAddress.fullName}</strong><br>
                ${shippingAddress.address}<br>
                ${shippingAddress.city}, ${shippingAddress.postalCode}<br>
                ${shippingAddress.country}<br>
                ${shippingAddress.email}
              </p>
            </div>
            <div style="text-align: right;">
              <h3>Payment Method:</h3>
              <p>${order.paymentMethod}</p>
              ${order.transactionId ? `<p><strong>Txn ID:</strong> ${order.transactionId}</p>` : ''}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Variant</th>
                <th>Price</th>
                <th>Qty</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td>${item.product.title}</td>
                  <td>${item.variant || '-'}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <p><strong>Subtotal:</strong> $${order.subtotal?.toFixed(2) || order.totalAmount.toFixed(2)}</p>
            ${order.discount ? `<p><strong>Discount:</strong> -$${order.discount.toFixed(2)}</p>` : ''}
            ${order.tax ? `<p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>` : ''}
            ${order.shipping ? `<p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>` : ''}
            <div class="grand-total">
              <p>Grand Total: $${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for shopping with ${SITE_NAME}! We hope you love your handmade gifts.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
        <script>
          // Auto-trigger print dialog for convenience
          // window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
