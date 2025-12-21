import { useState } from "react";
import "./Pay.css";

export default function PayAdvanced() {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [loading, setLoading] = useState(false);
    const [showUpiOptions, setShowUpiOptions] = useState(false);
    const [upiId, setUpiId] = useState("");

    const totalAmount = 3065.64;

    // Load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle UPI Payment with custom flow
    const handleUpiPayment = async () => {
        setLoading(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load.");
            setLoading(false);
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            const response = await fetch("https://appsail-50037084678.development.catalystappsail.in/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: "INR",
                    userEmail: user.email || "customer@example.com",
                    userName: user.name || "Customer Name",
                }),
            });

            const order = await response.json();

            if (!order.success || !order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: "rzp_test_xxxxxxxxxxx", // Replace with your key
                amount: order.amount,
                currency: order.currency,
                name: "Your Company Name",
                description: "Web Development Package",
                order_id: order.id,
                method: "upi",
                
                // Pre-fill UPI ID if entered
                ...(upiId && {
                    prefill: {
                        vpa: upiId,
                    }
                }),

                config: {
                    display: {
                        hide: [
                            { method: 'card' },
                            { method: 'netbanking' },
                            { method: 'wallet' },
                            { method: 'paylater' },
                            { method: 'emi' }
                        ],
                        preferences: {
                            show_default_blocks: false
                        }
                    }
                },
                
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch("https://appsail-50037084678.development.catalystappsail.in/payment/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const result = await verifyResponse.json();

                        if (result.success) {
                            alert(`✅ Payment Successful!\n\nPayment ID: ${result.paymentId}`);
                            setShowUpiOptions(false);
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        alert("Error verifying payment.");
                    }
                },

                prefill: {
                    name: user.name || "Customer Name",
                    email: user.email || "customer@example.com",
                    contact: user.phone || "9999999999",
                },

                theme: {
                    color: "#667eea",
                },

                modal: {
                    ondismiss: function() {
                        setLoading(false);
                        setShowUpiOptions(false);
                        alert("Payment cancelled");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
            setLoading(false);

        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment.");
            setLoading(false);
        }
    };

    // Handle other payment methods
    const handleOtherPayment = async (method) => {
        setLoading(true);

        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load.");
            setLoading(false);
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            const response = await fetch("http://localhost:8000/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: "INR",
                    userEmail: user.email || "customer@example.com",
                    userName: user.name || "Customer Name",
                }),
            });

            const order = await response.json();

            if (!order.success || !order.id) {
                throw new Error("Failed to create order");
            }

            const options = {
                key: "rzp_test_xxxxxxxxxxx", 
                amount: order.amount,
                currency: order.currency,
                name: "Web Requesting Platform",
                description: "Web Development Package",
                order_id: order.id,
                method: method,
                
                handler: async function (response) {
                    try {
                        const verifyResponse = await fetch("https://appsail-50036846539.development.catalystappsail.in/payment/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const result = await verifyResponse.json();

                        if (result.success) {
                            alert(`✅ Payment Successful!\n\nPayment ID: ${result.paymentId}`);
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        alert("Error verifying payment.");
                    }
                },

                prefill: {
                    name: user.name || "Customer Name",
                    email: user.email || "customer@example.com",
                    contact: user.phone || "9999999999",
                },

                theme: {
                    color: "#667eea",
                },

                modal: {
                    ondismiss: function() {
                        setLoading(false);
                        alert("Payment cancelled");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
            setLoading(false);

        } catch (error) {
            console.error("Payment error:", error);
            alert("Failed to initiate payment.");
            setLoading(false);
        }
    };

    const handlePaymentClick = () => {
        if (!selectedMethod) {
            alert("Please select a payment method");
            return;
        }

        if (selectedMethod === "upi") {
            setShowUpiOptions(true);
        } else {
            handleOtherPayment(selectedMethod);
        }
    };

    return (
        <div>
            <div className="background-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="container2">
                <div className="header2">
                    <div className="icon2-wrapper2">
                        <svg className="icon2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3Z" fill="white"/>
                            <path d="M2 7H22" stroke="#667eea" strokeWidth="2"/>
                            <path d="M6 15H10" stroke="#667eea" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h1 id="ord">Complete Your Order</h1>
                    <p className="subtitle">Secure checkout with encryption</p>
                </div>

                <div className="order-summary">
                    <div className="summary-item">
                        <span>Subtotal</span>
                        <span>₹2,499.00</span>
                    </div>
                    <div className="summary-item">
                        <span>Web hosting</span>
                        <span>₹99.00</span>
                    </div>
                    <div className="summary-item">
                        <span>Domain setup</span>
                        <span>₹467.64</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹3,065.64</span>
                    </div>
                </div>

                {!showUpiOptions ? (
                    <>
                        <div className="payment-methods">
                            <div className="method-title">Select Payment Method</div>
                            <div className="methods-grid">
                                <button 
                                    className={`method-card ${selectedMethod === "card" ? "active" : ""}`}
                                    onClick={() => setSelectedMethod("card")}
                                >
                                    <div className="method-icon2">💳</div>
                                    <div className="method-name">Card</div>
                                </button>
                                <button 
                                    className={`method-card ${selectedMethod === "upi" ? "active" : ""}`}
                                    onClick={() => setSelectedMethod("upi")}
                                >
                                    <div className="method-icon2">📱</div>
                                    <div className="method-name">UPI</div>
                                </button>
                                <button 
                                    className={`method-card ${selectedMethod === "netbanking" ? "active" : ""}`}
                                    onClick={() => setSelectedMethod("netbanking")}
                                >
                                    <div className="method-icon2">🏦</div>
                                    <div className="method-name">Net Banking</div>
                                </button>
                            </div>
                        </div>

                        <button 
                            className="btn-proceed" 
                            onClick={handlePaymentClick}
                            disabled={loading}
                        >
                            <span className="btn-text">
                                {loading ? "Processing..." : "Proceed to Payment"}
                            </span>
                        </button>
                    </>
                ) : (
                    <div className="upi-options">
                        <div className="method-title">Enter UPI ID</div>
                        <input 
                            type="text" 
                            className="upi-input"
                            placeholder="example@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="upi-hint">Or scan QR code in the next step</p>
                        
                        <div className="upi-buttons">
                            <button 
                                className="btn-proceed" 
                                onClick={handleUpiPayment}
                                disabled={loading}
                            >
                                <span className="btn-text">
                                    {loading ? "Processing..." : "Pay with UPI"}
                                </span>
                            </button>
                            
                            <button 
                                className="btn-back"
                                onClick={() => setShowUpiOptions(false)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                )}

                <div className="secure-badge">
                    <svg className="lock-icon2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9V7Z" fill="currentColor"/>
                    </svg>
                    Secure SSL Encrypted Payment
                </div>
            </div>
        </div>
    );
}