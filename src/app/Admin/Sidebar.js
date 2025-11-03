import Link from "next/link";

export default function Sidebar({ setAction }) {
  return (
    <div className="fixed left-0 top-0 h-screen w-[300px] bg-gray-900 text-white shadow-lg flex flex-col p-5">
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-50 animate-line-move"></div>
      <h2 className="text-lg font-semibold mb-6 text-center">GOETVALVE ADMIN</h2>
      <nav className="space-y-4">
        <button onClick={() => setAction('add')} className="w-full text-left px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition">
          ➕ Add Item
        </button>
        <button onClick={() => setAction('edit')} className="w-full text-left px-4 py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition">
          ✏️ Edit Item
        </button>
        <button onClick={() => setAction('delete')} className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition">
          🗑 Delete Item
        </button>
         {/* New Next.js Link */}
        <Link
          href="/Admin/Dashboard"
          className="block w-full px-4 py-2 rounded-md bg-green-600 hover:bg-green-500 transition text-left"
        >
          📊 Dashboard
        </Link>
      </nav>
    </div>
  );
}

