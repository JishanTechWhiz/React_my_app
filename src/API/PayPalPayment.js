
// PayPalCheckout.js


import React, { useEffect, useState } from 'react';

const PayPalCheckout = () => {
  const [sdkReady, setSdkReady] = useState(false);

  // Load PayPal SDK dynamically
  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=Ab38jh-XrackK_T_QL5yJ0eLcoRNqR8FPwfVmy8EMvvLCI13ayC0La-8VD0XbBLtYjS-FBi4Mx6_4Dse"; // Replace with your PayPal client ID
      script.onload = () => setSdkReady(true);
      document.body.appendChild(script);
    };

    if (!sdkReady) loadPayPalScript();
  }, [sdkReady]);

  // Create order by calling the backend
  const createOrder = async () => {
    try {
      //const res = await fetch("http://localhost:5000/api/create-order", {
        const res = await fetch("https://react-app-backend-1.onrender.com/api/create-order", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      return data.id; // Order ID returned from backend
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Capture order by calling the backend on approval
  const onApprove = async (data) => {
    try {
      // const res = await fetch("http://localhost:5000/api/capture-order", {
        const res = await fetch("https://react-app-backend-1.onrender.com/api/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderID: data.orderID })
      });
      const captureData = await res.json();
      console.log("Payment successful:", captureData);
      alert("Payment successful!");
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  // Render PayPal button when SDK is loaded
  useEffect(() => {
    if (sdkReady && window.paypal) {
      window.paypal.Buttons({
        createOrder: createOrder,
        onApprove: onApprove
      }).render('#paypal-button-container');
    }
  }, [sdkReady]);

  return (
    <div>
      <h2>Pay with PayPal</h2>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PayPalCheckout;




