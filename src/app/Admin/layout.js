// app/admin/layout.js
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans" style={{
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`
    }}>
      {/* Optional: admin sidebar */}
      <main>
        {children}
      </main>
    </div>
  );
}
