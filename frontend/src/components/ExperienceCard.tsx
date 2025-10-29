import React from 'react';
import { Link } from 'react-router-dom';
import type { Experience } from '../types';

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="card">
      <Link to={`/experience/${exp._id}`}>
        <div className="h-44 md:h-56 w-full relative">
          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{exp.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{exp.shortDesc}</p>
            <div className="text-xs text-slate-400 mt-2">{exp.location} • {exp.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">From</div>
            <div className="font-bold text-lg">₹{exp.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
