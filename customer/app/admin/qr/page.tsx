"use client";

import { useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QRGenerator() {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCode, setQrCode] = useState('');
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000';

  const generateQR = async () => {
    try {
      const url = `http://${baseUrl}/table/${tableNumber}`;
      const qr = await QRCode.toDataURL(url);
      setQrCode(qr);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Enter table number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="max-w-xs"
              />
              <Button onClick={generateQR}>Generate QR Code</Button>
            </div>
            
            {qrCode && (
              <div className="mt-4">
                <img src={qrCode} alt={`QR Code for Table ${tableNumber}`} className="max-w-xs" />
                <p className="mt-2 text-sm text-gray-600">
                  Table {tableNumber} - Scan to order
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}