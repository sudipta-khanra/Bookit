import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExperience } from '../api/client';
import type { Experience, Slot } from '../types';
import SlotPicker from '../components/SlotPicker';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [exp, setExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchExperience(id)
      .then(setExp)
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!exp) return <div>Experience not found</div>;

  const handleContinue = () => {
    if (!selectedSlot) return alert('Please select a slot first.');
    nav('/checkout', {
      state: {
        experience: exp,
        slot: selectedSlot
      }
    });
  };

  return (
    <section className="space-y-6">
      <div className="card overflow-hidden">
        <img src={exp.image} alt={exp.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold">{exp.title}</h2>
          <p className="text-slate-600 mt-2">{exp.longDesc}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-500">{exp.location} • {exp.duration}</div>
            <div className="text-right">
              <div className="text-xs text-slate-500">From</div>
              <div className="font-bold text-lg">₹{exp.price}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SlotPicker slots={exp.slots.map(s => ({ ...s, date: new Date(s.date).toISOString() }))} onSelect={(slot) => setSelectedSlot(slot)} />
      </div>

      <div className="flex justify-end">
        <button onClick={handleContinue} className="px-6 py-3 bg-primary text-white rounded-lg shadow">
          Continue to checkout
        </button>
      </div>
    </section>
  );
}
