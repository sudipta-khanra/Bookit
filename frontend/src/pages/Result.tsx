import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const nav = useNavigate();
  const loc = useLocation();
  const st = (loc.state as any) || {};
  const success = st.success;

  if (success) {
    const booking = st.booking;
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-green-600">Booking Confirmed 🎉</h2>
        <p className="mt-4">Booking ID: <span className="font-mono">{booking?._id}</span></p>
        <p className="mt-2">We sent confirmation to <strong>{booking?.user?.email}</strong></p>
        <div className="mt-6">
          <button onClick={() => nav('/')} className="px-4 py-2 bg-primary text-white rounded-md">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold text-red-600">Booking Failed</h2>
      <p className="mt-4">{st.message || 'Something went wrong while booking. Try again.'}</p>
      <div className="mt-6">
        <button onClick={() => nav(-1)} className="px-4 py-2 bg-slate-700 text-white rounded-md">Back</button>
      </div>
    </div>
  );
}
