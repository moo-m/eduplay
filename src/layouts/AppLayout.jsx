import React from "react";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">

      {/* Header */}
      <header className="w-full bg-gradient-to-r from-amber-200 to-orange-100 p-4 shadow-md flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900">
            من طرائف أشعب وجحا
          </h1>
          <h2 className="text-xl md:text-2xl text-orange-600 mt-1 font-semibold">
            طرفتي دليل فطنتي
          </h2>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 sm:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-amber-200 p-3 text-center text-sm text-gray-700">
        حقوق الطبع © 2026
      </footer>
    </div>
  );
}