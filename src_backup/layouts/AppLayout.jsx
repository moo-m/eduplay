import React from "react";

export default function AppLayout({ header, children, footer }) {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      
      {/* Header */}
      {header && (
        <header className="w-full bg-gradient-to-r from-amber-200 to-orange-100 p-4 shadow-md flex justify-center items-center">
          {header}
        </header>
      )}

      {/* Main */}
      <main className="flex-1 px-4 sm:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      {footer && (
        <footer className="w-full bg-amber-200 p-3 text-center text-sm text-gray-700">
          {footer}
        </footer>
      )}
    </div>
  );
}