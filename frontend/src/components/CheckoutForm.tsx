import React from 'react';

export default function CheckoutForm({
  name,
  email,
  phone,
  onChange
}: {
  name: string;
  email: string;
  phone?: string;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4 bg-white rounded-xl p-4 shadow-sm">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => onChange('name', e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => onChange('email', e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
      </div>
      <div>
        <label className="text-sm font-medium">Phone</label>
        <input value={phone || ''} onChange={(e) => onChange('phone', e.target.value)} className="mt-1 w-full p-2 border rounded-md" />
      </div>
    </div>
  );
}
