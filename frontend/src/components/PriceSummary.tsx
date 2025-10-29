import React from 'react';

export default function PriceSummary({
  price,
  discount = 0,
  onApply
}: {
  price: number;
  discount?: number;
  onApply: (code: string) => void;
}) {
  const [code, setCode] = React.useState('');
  const final = Math.max(0, price - (discount || 0));
  return (
    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
      <div className="text-sm text-slate-500">Price summary</div>
      <div className="flex items-center justify-between">
        <div>Base price</div>
        <div>₹{price}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Discount</div>
        <div>- ₹{discount}</div>
      </div>
      <div className="border-t pt-3 flex items-center justify-between font-semibold">
        <div>Total</div>
        <div>₹{final}</div>
      </div>

      <div className="mt-3">
        <div className="flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code" className="flex-1 p-2 border rounded-md" />
          <button onClick={() => onApply(code)} className="px-4 py-2 bg-primary text-white rounded-md">Apply</button>
        </div>
      </div>
    </div>
  );
}
