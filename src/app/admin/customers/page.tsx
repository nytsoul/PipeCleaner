"use client";

import { useState, useEffect } from "react";
import { Search, Mail, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data
    setCustomers([
      { id: "1", name: "Alice Smith", email: "alice@example.com", role: "CUSTOMER", orders: 5, joined: "2023-01-15" },
      { id: "2", name: "Bob Johnson", email: "bob@example.com", role: "CUSTOMER", orders: 2, joined: "2023-03-22" },
      { id: "3", name: "Admin User", email: "admin@pipebloom.com", role: "ADMIN", orders: 0, joined: "2022-11-01" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-1">
          Manage your registered users and their roles.
        </p>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9 bg-background/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers.map((customer) => (
                <tr key={customer.id} className="bg-card/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    {customer.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      customer.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {customer.role === 'ADMIN' && <ShieldAlert className="h-3 w-3" />}
                      {customer.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 text-muted-foreground">{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
