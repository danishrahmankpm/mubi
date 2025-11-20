
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch, type RootState } from "../state/Store";
import { removefromCart } from "../state/CartSlice";



export default function CheckoutPage({  logo = "Mubi",  }) {
  
  const cartItems=useSelector((state:RootState)=>state.cart.cart)
  const dispatch=useDispatch<AppDispatch>()
  const total=useSelector((state:RootState)=>state.cart.totalPrice)
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
      <div 
      key={item.id} 
      className="flex justify-between items-center py-4 border-b"
    >
      <div>
        <div className="font-medium">{item.title}</div>
        <div className="text-xs text-gray-500">{item.original_language}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="font-semibold">$9.99</div>

        {/* Trash Icon (Heroicons outline) */}
        <button className="hover:text-red-600 transition" onClick={()=>{dispatch(removefromCart(item.id))}}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h12m-9 3.75v6m6-6v6M9.75 4.5h4.5M4.5 7.5h15l-.75 12.75A2.25 2.25 0 0116.5 22.5h-9a2.25 2.25 0 01-2.25-2.25L4.5 7.5z" />
          </svg>
        </button>
  </div>
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
        <div className="font-semibold"></div>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <div>Estimated delivery and setup</div>
        <div className="text-gray-500">Included</div>
      </div>

      <div className="flex justify-between text-sm mt-2">
        <div>Estimated Total</div>
        <div className="font-semibold text-lg">{total}</div>
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
        <div className="max-w-6xl mx-auto text-xs">© Mubi</div>
      </footer>
    </div>
  );
}


