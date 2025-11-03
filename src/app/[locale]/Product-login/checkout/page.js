"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CheckoutWidget } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { motion } from "framer-motion";

const client = createThirdwebClient({ clientId: "d325a9dc9b3866b2046a4377ca8cba63" });

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [userData, setUserData] = useState({ email: "", identity: "" });
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const price = Number(String(item.price).replace(/[^0-9.]/g, "")) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);
    setShowPayPal(true);
  };

  function generateOrderNumber() {
    const timestamp = Date.now().toString();
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `GoetValve-${timestamp}-${randomChars}`;
  }

  if (paymentCompleted) {
    return (
      <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Thank You!</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your payment was successful. A confirmation email has been sent.
        </p>
        {orderNumber && (
          <p className="text-gray-900 dark:text-white font-mono mb-6">
            Order Number: <span className="font-bold">{orderNumber}</span>
          </p>
        )}
        <Link
          href="/"
          className="px-6 py-3 rounded bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen w-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-black dark:to-gray-900 flex items-center justify-center px-6 py-12">
      <main className="w-full max-w-7xl flex flex-col gap-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <motion.div
              className="flex flex-col gap-3 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-none"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{item.name}</span>
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {item.quantity} x {item.price}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg mt-4">
                <span>Total:</span>
                <span>{totalPrice}€</span>
              </div>
            </motion.div>

            {/* Checkout Section */}
            <div className="flex flex-row w-full gap-8">
              {/* PayPal & Form */}
              <div className="flex-1 bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                  {["email", "identity"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={userData[field]}
                      onChange={handleChange}
                      required
                      placeholder={field === "email" ? "Email" : "Identity / Name"}
                      className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 mt-2"
                  >
                    Confirm & Pay
                  </button>
                </form>

                {showPayPal && (
                  <PayPalScriptProvider
                    options={{ "client-id": "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC", currency: "EUR" }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical", color: "black" }}
                      createOrder={(data, actions) =>
                        actions.order.create({
                          purchase_units: [{ amount: { value: totalPrice }, description: `Order ${orderNumber}` }],
                        })
                      }
                      onApprove={async (data, actions) => {
                        await actions.order.capture();

                        const purchaseData = {
                          name: userData.identity,
                          email: userData.email,
                          cart: cart,
                          total: totalPrice,
                          orderNumber: orderNumber // ✅ include order number
                        };

                        try {
                          // save purchase
                          const saveRes = await fetch("/api/savePurchase", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(purchaseData),
                          });
                          if (!saveRes.ok) throw new Error("Failed to save purchase");

                          // send confirmation email
                          const emailRes = await fetch("/api/sendEmail", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(purchaseData),
                          });
                          if (!emailRes.ok) throw new Error("Email API failed");
                        } catch (err) {
                          console.error(err);
                        }

                        localStorage.removeItem("cart");
                        setCart([]);
                        setShowPayPal(false);
                        setPaymentCompleted(true);
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>

              {/* Crypto Payment */}
              <div className="flex-1 bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Pay with Crypto
                </h2>
                <CheckoutWidget
                  client={client}
                  theme="light"
                  name={cart.length === 1 ? cart[0].name.split("|")[0].trim() : `${cart.length} items`}
                  description={
                    cart.length === 1
                      ? cart[0].name.split("|")[1]?.trim() || ""
                      : cart.map((item) => `${item.name.split("|")[0].trim()} x${item.quantity}`).join(", ")
                  }
                  currency="USD"
                  amount={(totalPrice / 0.86).toFixed(2)}
                  chain={defineChain(56)}
                  tokenAddress="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
                  seller="0xa5f75df6b746ab185c90628d13be1250d1bbde58" //my recipient address
                  showThirdwebBranding={false}
                  buttonLabel="Buy"
                  onSuccess={() => {
                    setCart([]);
                    setPaymentCompleted(true);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
