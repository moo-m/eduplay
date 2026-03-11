import React from "react";

export default function BadgeCard({ title }) {
  return (
    <div className="mt-8 bg-yellow-100 border-4 border-yellow-400
                    p-6 rounded-3xl shadow-lg text-center animate-popIn">
      <div className="text-4xl mb-2">🎖</div>
      <h2 className="text-2xl font-bold text-yellow-700">
        {title}
      </h2>
    </div>
  );
}