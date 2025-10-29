import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import PriceSummary from '../components/PriceSummary';
import { validatePromo, createBooking } from '../api/client';
import type { Experience, Slot } from '../types';

export default function Checkout() {
  const nav = useNavigate();
  const loc = useLocation();
  const data = (loc.state as any) ?? null;
  const exp: Experience | undefined = data?.experience;
  const slot: Slot | undefined = data?.slot;

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!exp || !slot) {
    return <div className="text-center py-16">No booking data - go back to <button className="text-primary" onClick={() => nav('/')}>home</button>.</div>;
  }

  const handleChange = (f: string, v: string) => setForm((s) => ({ ...s, [f]: v }));

  const applyPromo = async (code: string) => {
    try {
      const res = await validatePromo(code, exp._id);
      if (res.success) {
        setDiscount(res.data.discount || 0);
        setPromoCode(code.toUpperCase());
        alert(`Promo applied: -₹${res.data.discount}`);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Invalid promo code');
    }
  };

  const handleConfirm = async () => {
    if (!form.name || !form.email) return alert('Please provide name and email.');
    setLoading(true);
    try {
      const payload = {
        experienceId: exp._id,
        slotDate: slot.date,
        slotTime: slot.time,
        user: { name: form.name, email: form.email, phone: form.phone },
        promoCode: promoCode || undefined
      };
      const res = await createBooking(payload);
      if (res.success) {
        nav('/result', { state: { success: true, booking: res.booking } });
      } else {
        nav('/result', { state: { success: false, message: res.message } });
      }
    } catch (err: any) {
      nav('/result', { state: { success: false, message: err?.response?.data?.message || 'Booking failed' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="card p-4">
          <div className="flex items-start gap-4">
            <img src={exp.image} alt={exp.title} className="w-28 h-20 object-cover rounded-md" />
            <div>
              <div className="font-semibold">{exp.title}</div>
              <div className="text-sm text-slate-500">{slot.time} • {new Date(slot.date).toDateString()}</div>
              <div className="text-sm text-slate-700 mt-2">₹{exp.price}</div>
            </div>
          </div>
        </div>

        <CheckoutForm name={form.name} email={form.email} phone={form.phone} onChange={handleChange} />
      </div>

      <div className="space-y-4">
        <PriceSummary price={exp.price} discount={discount} onApply={applyPromo} />
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <button onClick={handleConfirm} disabled={loading} className="w-full px-4 py-3 bg-accent text-white rounded-lg">
            {loading ? 'Processing...' : `Confirm booking • ₹${Math.max(0, exp.price - discount)}`}
          </button>
        </div>
      </div>
    </section>
  );
}
