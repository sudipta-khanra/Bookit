import React, { useMemo, useState } from 'react';
import type { Slot } from '../types';

export default function SlotPicker({
  slots,
  onSelect
}: {
  slots: Slot[];
  onSelect: (slot: Slot) => void;
}) {
  const grouped = useMemo(() => {
    const map = new Map<string, Slot[]>();
    slots.forEach((s) => {
      const day = new Date(s.date).toDateString();
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(s);
    });
    return Array.from(map.entries());
  }, [slots]);

  const [selectedDate, setSelectedDate] = useState<string | null>(grouped[0]?.[0] ?? null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const handleSlotClick = (slot: Slot) => {
    if (slot.booked < slot.capacity) {
      setSelectedSlot(slot);
      onSelect(slot);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Date selector */}
      <div className="w-full md:w-1/3 bg-white rounded-xl p-3 shadow-sm">
        <div className="text-sm font-medium mb-2">Select date</div>
        <div className="flex flex-col gap-2">
          {grouped.map(([day]) => (
            <button
              key={day}
              onClick={() => {
                setSelectedDate(day);
                setSelectedSlot(null);
              }}
              className={`text-left p-2 rounded-md w-full transition-all ${
                selectedDate === day
                  ? 'bg-primary/10 ring-1 ring-primary font-medium text-primary'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Slot selector */}
      <div className="flex-1 bg-white rounded-xl p-3 shadow-sm">
        <div className="text-sm font-medium mb-2">Available slots</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {grouped
            .find(([d]) => d === selectedDate)?.[1]
            ?.map((slot) => {
              const soldOut = slot.booked >= slot.capacity;
              const isSelected = selectedSlot?._id === slot._id;

              return (
                <button
                  key={slot._id}
                  onClick={() => handleSlotClick(slot)}
                  disabled={soldOut}
                  className={`p-3 rounded-lg text-left border transition-all ${
                    soldOut
                      ? 'opacity-50 cursor-not-allowed border-red-200 bg-red-50'
                      : isSelected
                      ? 'ring-2 ring-primary bg-primary/5 border-primary'
                      : 'hover:shadow-md border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-slate-800">{slot.time}</div>
                      <div className="text-xs text-slate-500">
                        Seats left: {slot.capacity - slot.booked}
                      </div>
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        soldOut ? 'text-red-600' : isSelected ? 'text-primary' : 'text-slate-600'
                      }`}
                    >
                      {soldOut ? 'Sold out' : isSelected ? 'Selected' : 'Book'}
                    </div>
                  </div>
                </button>
              );
            }) ?? <div className="text-slate-500">No slots for this date</div>}
        </div>

        {/* Slot summary */}
        {selectedSlot && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/30 rounded-lg text-sm text-slate-800">
            <div><strong>Date:</strong> {selectedDate}</div>
            <div><strong>Time:</strong> {selectedSlot.time}</div>
            <div>
              <strong>Seats left:</strong> {selectedSlot.capacity - selectedSlot.booked}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
