
import React, { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../state/Store";



export default function CheckoutPage({  logo = "Mubi",  }) {
  
  const cartItems=useSelector((state:RootState)=>state.cart.cart)
  const [payment, setPayment] = useState("card");
  

  logo = "Mubi"
 

  

  

  

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <header className="bg-black text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-bold">{logo}</div>
          <div className="uppercase tracking-wider text-sm">Checkout</div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* LEFT (2/3): Cart Items List */}
  <section className="lg:col-span-2 space-y-4">
    <h2 className="text-lg font-semibold">Your Items</h2>

    
    {cartItems.map(item => (
      <div key={item.id} className="border rounded p-4 flex justify-between">
        <div>
          <div className="font-medium">{item.title}</div>
          <div className="text-xs text-gray-500">{item.original_language}</div>
        </div>
        <div className="font-semibold">${item.price}</div>
      </div>
    ))}

    <div className="flex items-center justify-between pt-4">
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded text-sm font-semibold"
      >
        Place Order
      </button>
    </div>
  </section>

  {/* RIGHT (1/3): Summary + Payment */}
  <aside className="lg:col-span-1 space-y-6">
    <div className="border rounded p-6 shadow-sm">
      <h3 className="text-sm font-semibold">CART SUMMARY</h3>

      <hr className="my-4" />

      <div className="flex justify-between text-sm">
        <div>Subtotal</div>
        <div className="font-semibold">$21.98</div>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <div>Estimated delivery and setup</div>
        <div className="text-gray-500">Included</div>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <div>Estimated Total</div>
        <div className="font-semibold text-lg">$21.98</div>
      </div>

      <div className="mt-6 text-xs text-gray-500 grid grid-cols-1 gap-4">
        <div className="flex items-start gap-3">
          <div>
            <div className="font-medium">100 DAY HOME TRIAL</div>
            <div className="text-xs text-gray-500">Try it at home for 100 days</div>
          </div>
        </div>
      </div>
    </div>

    <section>
      <h4 className="text-sm font-semibold mb-2">PAYMENT METHOD</h4>
      <div className="border rounded p-4 space-y-3">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={payment=== "card"}
            onChange={() => setPayment("card")}
          />
          <div className="text-sm">Credit Card — Secure and encrypted</div>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            checked={payment === "payover"}
            onChange={() => setPayment("payover")}
          />
          <div className="text-sm">Pay Over Time</div>
        </label>
      </div>
    </section>
  </aside>
</main>

      <footer className="bg-black text-white px-6 py-6 mt-auto">
        <div className="max-w-6xl mx-auto text-xs">© Your Company</div>
      </footer>
    </div>
  );
}


