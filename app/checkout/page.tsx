'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, Upload, X } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryZone, setDeliveryZone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const subtotal = 185000;

  const getDeliveryFee = () => {
    if (deliveryZone === 'abuja') return 5000;
    if (deliveryZone === 'outside-abuja') return 10000;
    if (deliveryZone === 'outside-nigeria') return 25000;
    return 0;
  };

  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
      const reader = new FileReader();
      reader.onload = (e) => setProofPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeProof = () => {
    setPaymentProof(null);
    setProofPreview(null);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/marketplace" className="border border-black p-2 hover:bg-gray-50">
              <ArrowLeft size={20} />
            </a>
            <Image src="/fmyd.png" alt="FMYD Marketplace" width={100} height={100} className="object-contain" />
          </div>
          <h1 className="text-lg md:text-xl font-black uppercase">Checkout</h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl font-black uppercase mb-6">Delivery & Payment</h2>

            {/* Customer Info */}
            <div className="border border-black p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Customer Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-black p-3 outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-black p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Delivery Details */}
            <div className="border border-black p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold mb-2">Delivery Radius</label>
                  <select
                    value={deliveryZone}
                    onChange={(e) => setDeliveryZone(e.target.value)}
                    className="w-full border border-black p-3 bg-white outline-none"
                    required
                  >
                    <option value="">Select Delivery Radius</option>
                    <option value="abuja">Within Abuja</option>
                    <option value="outside-abuja">Outside Abuja</option>
                    <option value="outside-nigeria">Outside Nigeria</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-2">Delivery Address</label>
                  <textarea
                    rows={5}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter full delivery address..."
                    className="w-full border border-black p-3 outline-none resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-black p-6">
              <h3 className="font-bold text-lg mb-5">Payment Method</h3>

              <div className="space-y-4">
                {/* Cash Payment */}
                <label
                  className={`block border p-4 cursor-pointer transition-all ${
                    paymentMethod === 'cash' ? 'border-green-600 bg-green-50' : 'border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <span className="font-bold">Cash Payment to Cashier</span>
                  </div>

                  {paymentMethod === 'cash' && (
                    <div className="mt-4 text-sm leading-7">
                      <p>
                        Pay cash directly to our cashier.
                      </p>
                      <p className="mt-2 text-green-600 font-medium">
                        ✅ No transfer needed.
                      </p>
                    </div>
                  )}
                </label>

                {/* Bank Transfer */}
                <label
                  className={`block border p-4 cursor-pointer transition-all ${
                    paymentMethod === 'transfer' ? 'border-green-600 bg-green-50' : 'border-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                    />
                    <span className="font-bold">Bank Transfer</span>
                  </div>

                  {paymentMethod === 'transfer' && (
                    <div className="mt-4 text-sm leading-7 space-y-4">
                      <p className="font-semibold">Transfer to the account below:</p>

                      <div className="border border-black p-4 bg-gray-50">
                        <p><strong>Bank Name:</strong> First Bank</p>
                        <p><strong>Account Name:</strong> FMYD Marketplace Ltd</p>
                        <p><strong>Account Number:</strong> 0123456789</p>
                      </div>

                      {/* Proof of Payment Upload */}
                      <div>
                        <p className="font-semibold mb-2">Upload Proof of Payment *</p>
                        <div className="border-2 border-dashed border-black p-6 text-center hover:bg-gray-50 transition">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="proof-upload"
                          />
                          <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center">
                            <Upload size={32} />
                            <p className="mt-2 font-medium">Click to upload receipt / screenshot</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, or PDF (max 5MB)</p>
                          </label>
                        </div>

                        {proofPreview && (
                          <div className="mt-4 relative border border-black p-2">
                            <img
                              src={proofPreview}
                              alt="Payment Proof"
                              className="max-h-48 mx-auto rounded"
                            />
                            <button
                              onClick={removeProof}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit sticky top-24">
            <div className="border border-black p-6">
              <h3 className="font-black uppercase text-lg mb-5">Order Summary</h3>

              <div className="border-b pb-4 mb-4">
                <p className="font-semibold">Samsung Galaxy A35 5G</p>
                <p className="text-sm mt-1">Qty: 1</p>
                <p className="font-bold mt-2">₦185,000</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between border-t border-black pt-3 font-black text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-green-600 text-white py-4 font-bold uppercase hover:bg-green-700 transition disabled:bg-gray-400"
                disabled={!paymentMethod || (paymentMethod === 'transfer' && !paymentProof)}
              >
                Confirm Order
              </button>

              <div className="mt-5 flex items-start gap-3 text-sm">
                <CheckCircle size={18} className="text-green-600 mt-1" />
                <p>Your order will be processed immediately after confirmation.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}