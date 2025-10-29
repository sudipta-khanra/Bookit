import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../api/client';
import ExperienceCard from '../components/ExperienceCard';
import type { Experience } from '../types';

export default function Home() {
  const [list, setList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchExperiences()
      .then((res) => setList(res))
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Explore experiences</h1>
        <p className="text-slate-600 mt-1">Pick a date, choose a slot, and book your adventure.</p>
      </div>

      {loading && <div className="py-16 text-center">Loading experiences...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((exp) => (
          <ExperienceCard key={exp._id} exp={exp} />
        ))}
      </div>
    </section>
  );
}
