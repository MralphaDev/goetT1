"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [userPurchases, setUserPurchases] = useState([]);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [productSalesData, setProductSalesData] = useState([]);
  const [bestSellerData, setBestSellerData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bestSeller, setBestSeller] = useState("-");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/purchases");
        let data = await res.json();
        if (!Array.isArray(data)) data = [];

        setUserPurchases(data);

        if (data.length === 0) return;

        let revenue = 0;
        const productSales = {};
        const usersOverTime = {};
        const revenueOverTime = {};

        data.forEach((u) => {
          const date = u.date || new Date().toISOString().split("T")[0];
          usersOverTime[date] = (usersOverTime[date] || 0) + 1;

          const cart = Array.isArray(u.cart) ? u.cart : [];
          cart.forEach((item) => {
            const price = parseFloat((item.price || "0").replace("€*", "").trim()) || 0;
            const qty = item.quantity || 0;
            revenue += price * qty;

            if (!productSales[item.name]) productSales[item.name] = { quantity: 0, total: 0 };
            productSales[item.name].quantity += qty;
            productSales[item.name].total += price * qty;

            revenueOverTime[date] = (revenueOverTime[date] || 0) + price * qty;
          });
        });

        setTotalUsers(data.length);
        setTotalRevenue(revenue);

        const best = Object.keys(productSales).reduce((a, b) => {
          const qa = productSales[a]?.quantity || 0;
          const qb = productSales[b]?.quantity || 0;
          return qa > qb ? a : b;
        }, "-");
        setBestSeller(best);

        setUserGrowthData(
          Object.entries(usersOverTime).map(([date, count]) => ({ date, count }))
        );
        setRevenueData(
          Object.entries(revenueOverTime).map(([date, revenue]) => ({ date, revenue }))
        );
        setProductSalesData(
          Object.entries(productSales).map(([name, val]) => ({ name, ...val }))
        );
        setBestSellerData(
          Object.entries(productSales).map(([name, val]) => ({
            name,
            value: val.quantity || 0,
          }))
        );
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };

    fetchData();
  }, []);

  const maxQuantity = Math.max(...bestSellerData.map(p => p.value), 1);

  // Sidebar menu items
  const menuItems = [
    { label: "Total Users", id: "total-users" },
    { label: "Best Seller", id: "best-seller" },
    { label: "Revenue Over Time", id: "revenue" },
    { label: "Product Purchases", id: "product-purchases" },
    { label: "Best Sellers Leaderboard", id: "best-sellers" },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-white">
  {/* Sidebar */}
  <div className="w-72 bg-gray-50 shadow-lg rounded-r-3xl p-6 flex flex-col gap-6 relative overflow-hidden">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center gap-3 animate-pulse">
      <span>📊</span> GOETVALVE
    </h2>
    {menuItems.map((item) => (
      <a
        key={item.id}
        href={`#${item.id}`}
        className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-purple-50 hover:translate-x-2 transition-all text-lg font-medium shadow-sm"
      >
        <span>📝</span> {item.label}
      </a>
    ))}
  </div>

  {/* Main Content */}
  <div className="flex-1 p-10 space-y-12">
    <h1
      className="text-5xl mb-12 flex items-center gap-3"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.5px',
        color: '#1f1f1f',
      }}
    >
      <span>🏠</span> Admin Dashboard
    </h1>

    {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-8">
  {[
    { label: "Total Users", value: totalUsers, color: "#6b5cd5", id: "total-users", icon: "👥" },
    { label: "Best Seller", value: bestSeller, color: "#6b5cd5", id: "best-seller", icon: "🏆" },
    { label: "Revenue", value: `€${totalRevenue}`, color: "#6b5cd5", id: "revenue", icon: "💰" },
    {
      label: "Total Purchases",
      value: userPurchases.reduce((a, b) => a + (Array.isArray(b.cart) ? b.cart.length : 0), 0),
      color: "#6b5cd5",
      id: "product-purchases",
      icon: "🛒",
    },
  ].map((stat, i) => (
    <motion.div
      key={i}
      id={stat.id}
      className="bg-gray-100 rounded-3xl shadow-md p-6 flex flex-col items-center border-l-4 border-gray-300 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      <p className="text-gray-500 font-medium flex items-center gap-2 text-lg">
        <span>{stat.icon}</span> {stat.label}
      </p>

      {stat.id === "best-seller" && typeof stat.value === "string" && stat.value.includes("|") ? (
        // Split Best Seller into number and description
        (() => {
          const [num, desc] = stat.value.split("|").map((s) => s.trim());
          return (
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold" style={{ color: stat.color }}>{num}</span>
              <span className="text-gray-500 text-sm mt-1 text-center">{desc}</span>
            </div>
          );
        })()
      ) : (
        <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
      )}
    </motion.div>
  ))}
</div>


    {/* Charts */}
    <div className="grid grid-cols-2 gap-8">
      {/* User Growth */}
      <motion.div
        id="total-users"
        className="bg-gray-100 rounded-3xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <span>📈</span> User Growth
        </h2>
        {userGrowthData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: "#f9f9f9", color: "#333" }} />
              <Line type="monotone" dataKey="count" stroke="#6b5cd5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data yet</p>
        )}
      </motion.div>

      {/* Revenue Over Time */}
      <motion.div
        id="revenue"
        className="bg-gray-100 rounded-3xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <span>💵</span> Revenue Over Time
        </h2>
        {revenueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: "#f9f9f9", color: "#333" }} />
              <Line type="monotone" dataKey="revenue" stroke="#6b5cd5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data yet</p>
        )}
      </motion.div>

      {/* Product Purchases */}
      <motion.div
        id="product-purchases"
        className="bg-gray-100 rounded-3xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <span>🛒</span> Product Purchases
        </h2>
        {productSalesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productSalesData}>
              <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: "#f9f9f9", color: "#333" }} />
              <Bar dataKey="quantity" fill="#6b5cd5" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data yet</p>
        )}
      </motion.div>

      {/* Best Sellers */}
<motion.div
  id="best-sellers"
  className="bg-gray-100 rounded-3xl shadow-md p-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
    <span>🏆</span> Best Sellers
  </h2>
  {bestSellerData.length > 0 ? (
    <div className="space-y-3">
      {bestSellerData
        .sort((a, b) => b.value - a.value)
        .map((p, i) => {
          const widthPercent = (p.value / maxQuantity) * 100;
          const [code, desc] = p.name.split("|").map((s) => s.trim());
          return (
            <div key={i} className="flex flex-col bg-gray-50 rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-black font-bold">{code}</span>
                <div className="bg-gray-300 h-4 rounded-full flex-1 relative">
                  <div
                    className="bg-gradient-to-r from-[#4F46E5] via-[#10B981] to-[#F59E0B] h-4 rounded-full"
                    style={{ width: `${widthPercent}%` }}
                  ></div>
                </div>
                <span className="text-black font-bold">{p.value}</span>
              </div>
              {desc && (
                <p className="text-gray-500 text-sm break-words">{desc}</p>
              )}
            </div>
          );
        })}
    </div>
  ) : (
    <p className="text-gray-400">No data yet</p>
  )}
</motion.div>

    </div>
  </div>
</div>

  );
}
