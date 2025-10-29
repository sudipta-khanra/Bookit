import React, { useEffect, useState } from "react";

interface ExperienceRef {
  _id: string;
  title?: string;
  price?: number;
  location?: string;
  image?: string;
}

interface Booking {
  _id: string;
  experienceId: string | ExperienceRef;
  slotDate: string;
  slotTime: string;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  price: number;
  promoApplied?: { code: string; discount: number } | null;
  status: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(Array.isArray(data) ? data : data.bookings || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center py-10 text-slate-600">Loading bookings...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-slate-800">
        All Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No bookings yet.</div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Experience</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Promo</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50">
                    {/* User */}
                    <td className="px-4 py-3">
                      <div className="font-medium">{b.user.name}</div>
                      <div className="text-xs text-gray-500">{b.user.email}</div>
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      {b.experienceId && typeof b.experienceId === "object" ? (
                        <>
                          {b.experienceId.image ? (
                            <img
                              src={b.experienceId.image}
                              alt={b.experienceId.title || "Experience"}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                              🖼️
                            </div>
                          )}
                          <div>
                            <div className="font-medium">
                              {b.experienceId.title || "(No title)"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {b.experienceId.location || ""}
                            </div>
                          </div>
                        </>
                      ) : (
                        <span>(No experience)</span>
                      )}
                    </td>

                    {/* Date & Time */}
                    <td className="px-4 py-3">
                      {new Date(b.slotDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{b.slotTime}</td>

                    {/* Price */}
                    <td className="px-4 py-3 font-medium text-gray-700">
                      ₹{b.price}
                    </td>

                    {/* Promo */}
                    <td className="px-4 py-3">
                      {b.promoApplied
                        ? `${b.promoApplied.code} (-₹${b.promoApplied.discount})`
                        : "—"}
                    </td>

                    {/* Status */}
                    <td
                      className={`px-4 py-3 font-medium ${
                        b.status === "confirmed"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {b.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid md:hidden gap-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white shadow-sm rounded-lg p-4 flex flex-col gap-3 border border-gray-100"
              >
                {/* Experience */}
                <div className="flex gap-3 items-center">
                  {b.experienceId && typeof b.experienceId === "object" ? (
                    <>
                      {b.experienceId.image ? (
                        <img
                          src={b.experienceId.image}
                          alt={b.experienceId.title || "Experience"}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                          🖼️
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {b.experienceId.title || "(No title)"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {b.experienceId.location || ""}
                        </div>
                      </div>
                    </>
                  ) : (
                    <span>(No experience)</span>
                  )}
                </div>

                {/* User */}
                <div className="text-sm text-slate-700">
                  <span className="font-medium">{b.user.name}</span>
                  <div className="text-xs text-slate-500">{b.user.email}</div>
                </div>

                {/* Date, Time & Price */}
                <div className="flex justify-between text-sm text-slate-600">
                  <div>
                    <div>{new Date(b.slotDate).toLocaleDateString()}</div>
                    <div className="text-xs text-slate-500">{b.slotTime}</div>
                  </div>
                  <div className="font-bold text-slate-900">₹{b.price}</div>
                </div>

                {/* Promo & Status */}
                <div className="flex justify-between items-center text-sm">
                  <div className="text-xs text-slate-500">
                    {b.promoApplied
                      ? `${b.promoApplied.code} (-₹${b.promoApplied.discount})`
                      : "No promo"}
                  </div>
                  <div
                    className={`text-xs font-semibold px-2 py-1 rounded-md ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
