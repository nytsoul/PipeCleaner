import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Package, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";

function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    case "PROCESSING":
      return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
    case "SHIPPED":
      return "text-purple-600 bg-purple-100 dark:bg-purple-900/20";
    case "DELIVERED":
      return "text-green-600 bg-green-100 dark:bg-green-900/20";
    case "CANCELLED":
      return "text-red-600 bg-red-100 dark:bg-red-900/20";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "PENDING":
    case "PROCESSING":
      return <Clock className="h-4 w-4" />;
    case "SHIPPED":
      return <Package className="h-4 w-4" />;
    case "DELIVERED":
      return <CheckCircle2 className="h-4 w-4" />;
    case "CANCELLED":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

export default async function OrdersPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login?callbackUrl=/profile/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          product: {
            include: { images: true }
          }
        }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 border border-border rounded-2xl bg-card">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          <p className="text-muted-foreground">When you make a purchase, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-border rounded-2xl bg-card overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total</p>
                  <p className="font-bold">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>
                <div className="ml-auto">
                  <a 
                    href={`/api/orders/${order.id}/invoice`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                  >
                    <FileText className="h-4 w-4" />
                    Invoice
                  </a>
                </div>
              </div>

              <div className="p-6 divide-y divide-border">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1000&auto=format&fit=crop"} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-sm">
                      <div>
                        <p className="font-bold">{item.product.title}</p>
                        {item.variant && <p className="text-muted-foreground">Color: {item.variant}</p>}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
