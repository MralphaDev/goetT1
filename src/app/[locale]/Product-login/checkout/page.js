"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CheckoutWidget } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";
import { motion } from "framer-motion";

const client = createThirdwebClient({ clientId: "d325a9dc9b3866b2046a4377ca8cba63" });

export default function CheckoutPage() {
  const [step, setStep] = useState("info"); // info | payment | done
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCrypto, setShowCrypto] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [userData, setUserData] = useState({ email: "", identity: "" });
  const [orderNumber, setOrderNumber] = useState("");
  const [isMobile,setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // shared email + save logic
  const handlePurchaseComplete = async () => {
    const purchaseData = {
      name: userData.identity,
      email: userData.email,
      cart,
      total: totalPrice,
      orderNumber,
    };
    try {
      const saveRes = await fetch("/api/savePurchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });
      if (!saveRes.ok) throw new Error("Failed to save purchase");

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
    setPaymentCompleted(true);
    setStep("done");
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setOrderNumber(Math.floor(Math.random() * 100000));
    setStep("payment");
  };

  return (
    

    <div>
          {isMobile?(
          <div>
             <div className="font-sans min-h-screen w-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-black dark:to-gray-900 flex items-center justify-center px-4 py-8">
                <main className="w-full max-w-4xl flex flex-col gap-8">
                  <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Checkout
                  </h1>

                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <motion.div
                        className="flex flex-col gap-3 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-5 rounded-2xl shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {cart.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-none"
                          >
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                              {item.name}
                            </span>
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

                      {/* Payment Area */}
                      <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col gap-4 items-center">
                        {!showCrypto ? (
                          <>
                            {/* Email + Identity + PayPal */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
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
                                options={{
                                  "client-id":
                                    "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC",
                                  currency: "EUR",
                                }}
                              >
                                <PayPalButtons
                                  style={{ layout: "vertical", color: "black" }}
                                  createOrder={(data, actions) =>
                                    actions.order.create({
                                      purchase_units: [
                                        {
                                          amount: { value: totalPrice },
                                          description: `Order ${orderNumber}`,
                                        },
                                      ],
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

                            {/* Toggle to crypto */}
                            <p
                              onClick={() => setShowCrypto(true)}
                              className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4 cursor-pointer hover:underline"
                            >
                              Or pay with crypto
                            </p>
                          </>
                        ) : (
                          <>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                              Pay with Crypto
                            </h2>
                            <CheckoutWidget
                              client={client}
                              theme="light"
                              name={
                                cart.length === 1
                                  ? cart[0].name.split("|")[0].trim()
                                  : `${cart.length} items`
                              }
                              description={
                                cart.length === 1
                                  ? cart[0].name.split("|")[1]?.trim() || ""
                                  : cart.map((i) => `${i.name.split("|")[0]} x${i.quantity}`).join(", ")
                              }
                              currency="USD"
                              amount={(totalPrice / 0.86).toFixed(2)}
                              chain={defineChain(56)}
                              tokenAddress="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
                              seller="0xa5f75df6b746ab185c90628d13be1250d1bbde58"
                              showThirdwebBranding={false}
                              buttonLabel="Buy"
                              onSuccess={handlePurchaseComplete}

                            />
                            <button
                              onClick={() => setShowCrypto(false)}
                              className="mt-6 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                            >
                              Go back
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </main>
             </div>
          </div>)
          :
          (<div className="font-sans min-h-screen w-screen bg-gradient-to-b from-gray-100 to-gray-50 dark:from-black dark:to-gray-900 flex items-center justify-center px-6 py-12">
            <main className="w-full max-w-3xl flex flex-col gap-8">
              <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight">
                Checkout
              </h1>

              {cart.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Your cart is empty.
                </p>
              ) : step === "done" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-10 text-center"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    ✅ Thank you!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your order #{orderNumber} has been confirmed.
                  </p>
                </motion.div>
              ) : step === "info" ? (
                // STEP 1 – contact info
                <motion.form
                  onSubmit={handleInfoSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 bg-white/80 dark:bg-gray-900/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl"
                >
                  {["email", "identity"].map((f) => (
                    <input
                      key={f}
                      type={f === "email" ? "email" : "text"}
                      name={f}
                      value={userData[f]}
                      onChange={handleChange}
                      required
                      placeholder={f === "email" ? "Email" : "Identity / Name"}
                      className="px-5 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    />
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold shadow-lg hover:shadow-xl transition-transform duration-300 mt-2"
                  >
                    Continue to Payment
                  </button>
                </motion.form>
              ) : (
                // STEP 2 – choose gateway
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4"
                >
                  {!showCrypto && !showPayPal ? (
                    <>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        Choose your payment method
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setShowPayPal(true)}
                          className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow hover:scale-105 transition"
                        >
                          Pay with PayPal
                        </button>
                        <button
                          onClick={() => setShowCrypto(true)}
                          className="px-6 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold shadow hover:scale-105 transition"
                        >
                          Pay with Crypto
                        </button>
                      </div>
                    </>
                  ) : showPayPal ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AVUCxrYI-UFeGL-HHLjmZBCTn5qt7vB7I6HuXcaujVesJ7e09O5F1ZrxfjJFmXA1nqXGOQ9dhc4xuPYC",
                        currency: "EUR",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical", color: "black" }}
                        createOrder={(data, actions) =>
                          actions.order.create({
                            purchase_units: [
                              {
                                amount: { value: totalPrice },
                                description: `Order ${orderNumber}`,
                              },
                            ],
                          })
                        }
                        onApprove={async (data, actions) => {
                          await actions.order.capture();
                          await handlePurchaseComplete();
                        }}
                      />
                      <button
                        onClick={() => setShowPayPal(false)}
                        className="mt-4 text-sm text-gray-500 hover:underline"
                      >
                        ← Back
                      </button>
                    </PayPalScriptProvider>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
                        Pay with Crypto
                      </h2>
                      <CheckoutWidget
                        client={client}
                        theme="light"
                        name={
                          cart.length === 1
                            ? cart[0].name.split("|")[0].trim()
                            : `${cart.length} items`
                        }
                        description={
                          cart.length === 1
                            ? cart[0].name.split("|")[1]?.trim() || ""
                            : cart
                                .map(
                                  (i) =>
                                    `${i.name.split("|")[0].trim()} x${i.quantity}`
                                )
                                .join(", ")
                        }
                        currency="USD"
                        amount={(totalPrice / 0.86).toFixed(2)}
                        chain={defineChain(56)}
                        tokenAddress="0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
                        seller="0xa5f75df6b746ab185c90628d13be1250d1bbde58"
                        showThirdwebBranding={false}
                        buttonLabel="Buy"
                        onSuccess={handlePurchaseComplete}
                      />
                      <button
                        onClick={() => setShowCrypto(false)}
                        className="mt-4 text-sm text-gray-500 hover:underline"
                      >
                        ← Back
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </main>
          </div>)}
    </div>

  );
}
