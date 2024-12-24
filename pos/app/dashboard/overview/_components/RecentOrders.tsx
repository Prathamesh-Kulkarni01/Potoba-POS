import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const orders = [
  { id: '1001', customer: 'John Doe', total: '₹45.00', status: 'Completed', date: '2024-12-20' },
  { id: '1002', customer: 'Jane Smith', total: '₹67.50', status: 'Pending', date: '2024-12-21' },
  { id: '1003', customer: 'Mark Johnson', total: '₹30.00', status: 'Cancelled', date: '2024-12-22' },
  { id: '1004', customer: 'Emily Davis', total: '₹120.00', status: 'Completed', date: '2024-12-23' },
  { id: '1005', customer: 'Chris Brown', total: '₹89.99', status: 'Processing', date: '2024-12-23' },
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="px-4 py-2 font-medium">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.total}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded px-2 py-1 text-sm font-medium text-white ${
                        order.status === 'Completed'
                          ? 'bg-green-500'
                          : order.status === 'Pending'
                          ? 'bg-yellow-500'
                          : order.status === 'Processing'
                          ? 'bg-blue-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
