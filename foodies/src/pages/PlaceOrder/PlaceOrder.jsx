import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import { toast } from "react-toastify";
import { RAZORPAY_KEY } from "../../util/contants";
import {
  createOrder,
  deleteOrder,
  verifyPayment,
} from "../../service/orderService";
import { clearCartItems } from "../../service/cartService";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const orderData = {
      userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}, ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
      })),
      amount: total.toFixed(2),
      orderStatus: "Preparing",
    };

    try {
      const response = await createOrder(orderData, token);
      if (response.razorpayOrderId) {
        initiateRazorpayPayment(response);
      } else {
        toast.error("Unable to place order. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to place order. Please try again.");
    }
  };

  const initiateRazorpayPayment = (order) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "QuickBite",
      description: "Food order payment",
      order_id: order.razorpayOrderId,
      handler: verifyPaymentHandler,
      prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber,
      },
      theme: { color: "#f5a623" },
      modal: {
        ondismiss: deleteOrderHandler,
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPaymentHandler = async (razorpayResponse) => {
    const paymentData = {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
    };
    try {
      const success = await verifyPayment(paymentData, token);
      if (success) {
        toast.success("Payment successful.");
        await clearCart();
        navigate("/myorders");
      } else {
        toast.error("Payment failed. Please try again.");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const deleteOrderHandler = async (orderId) => {
    try {
      await deleteOrder(orderId, token);
    } catch (error) {
      toast.error("Something went wrong. Contact support.");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartItems(token, setQuantities);
    } catch (error) {
      toast.error("Error while clearing the cart.");
    }
  };

  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  return (
    <div className="container mt-4" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '80px' }}>
      <main>
        <div className="py-4 text-center">
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(245, 166, 35, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid rgba(245, 166, 35, 0.2)'
            }}
          >
            <img
              className="d-block mx-auto"
              src={assets.logo}
              alt="QuickBite"
              width="50"
              height="50"
              style={{ borderRadius: '12px' }}
            />
          </div>
          <h2 style={{ color: '#fff', fontWeight: '700' }}>Checkout</h2>
          <p style={{ color: '#8b8b8b' }}>Complete your order</p>
        </div>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <div 
              className="card mb-3" 
              style={{ 
                backgroundColor: '#111111', 
                border: '1px solid #2a2a2a',
                borderRadius: '16px',
                position: 'sticky',
                top: '100px'
              }}
            >
              <div className="card-body" style={{ padding: '24px' }}>
                <h4 className="d-flex justify-content-between align-items-center mb-4">
                  <span style={{ color: '#f5a623', fontWeight: '600' }}>Your cart</span>
                  <span 
                    className="badge rounded-pill"
                    style={{ backgroundColor: '#f5a623', color: '#000' }}
                  >
                    {cartItems.length}
                  </span>
                </h4>
                <ul className="list-group mb-3" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between lh-sm"
                      style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', color: '#fff' }}
                    >
                      <div>
                        <h6 className="my-0" style={{ color: '#fff', fontSize: '0.95rem' }}>{item.name}</h6>
                        <small style={{ color: '#8b8b8b' }}>
                          Qty: {quantities[item.id]}
                        </small>
                      </div>
                      <span style={{ color: '#f5a623', fontWeight: '500' }}>
                        &#8377;{item.price * quantities[item.id]}
                      </span>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
                    <div>
                      <span style={{ color: '#8b8b8b' }}>Shipping</span>
                    </div>
                    <span style={{ color: '#8b8b8b' }}>
                      &#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
                    <div>
                      <span style={{ color: '#8b8b8b' }}>Tax (10%)</span>
                    </div>
                    <span style={{ color: '#8b8b8b' }}>
                      &#8377;{tax.toFixed(2)}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: '#1a1a1a', borderColor: '#2a2a2a' }}>
                    <span style={{ color: '#fff', fontWeight: '600' }}>Total (INR)</span>
                    <strong style={{ color: '#f5a623', fontSize: '1.1rem' }}>&#8377;{total.toFixed(2)}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div 
              className="card" 
              style={{ 
                backgroundColor: '#111111', 
                border: '1px solid #2a2a2a',
                borderRadius: '16px'
              }}
            >
              <div className="card-body" style={{ padding: '24px' }}>
                <h4 className="mb-4" style={{ color: '#fff', fontWeight: '600' }}>Billing address</h4>
                <form className="needs-validation" onSubmit={onSubmitHandler}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label" style={{ color: '#8b8b8b' }}>
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="John"
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label" style={{ color: '#8b8b8b' }}>
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Doe"
                        value={data.lastName}
                        onChange={onChangeHandler}
                        name="lastName"
                        required
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label" style={{ color: '#8b8b8b' }}>
                        Email
                      </label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', borderRight: 'none', color: '#8b8b8b', borderRadius: '12px 0 0 12px' }}>@</span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Email"
                          required
                          name="email"
                          onChange={onChangeHandler}
                          value={data.email}
                          style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', borderLeft: 'none', color: '#fff', borderRadius: '0 12px 12px 0' }}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="phone" className="form-label" style={{ color: '#8b8b8b' }}>
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        placeholder="9876543210"
                        required
                        value={data.phoneNumber}
                        name="phoneNumber"
                        onChange={onChangeHandler}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="address" className="form-label" style={{ color: '#8b8b8b' }}>
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="1234 Main St"
                        required
                        value={data.address}
                        name="address"
                        onChange={onChangeHandler}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="state" className="form-label" style={{ color: '#8b8b8b' }}>
                        State
                      </label>
                      <select
                        className="form-select"
                        id="state"
                        required
                        name="state"
                        value={data.state}
                        onChange={onChangeHandler}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      >
                        <option value="">Choose...</option>
                        <option>Karnataka</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label" style={{ color: '#8b8b8b' }}>
                        City
                      </label>
                      <select
                        className="form-select"
                        id="city"
                        required
                        name="city"
                        value={data.city}
                        onChange={onChangeHandler}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      >
                        <option value="">Choose...</option>
                        <option>Banglore</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label" style={{ color: '#8b8b8b' }}>
                        Zip
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="zip"
                        placeholder="98745"
                        required
                        name="zip"
                        value={data.zip}
                        onChange={onChangeHandler}
                        style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff', borderRadius: '12px' }}
                      />
                    </div>
                  </div>
                  <hr className="my-4" style={{ borderColor: '#2a2a2a', opacity: 1 }} />
                  <button
                    className="w-100 btn btn-lg"
                    type="submit"
                    disabled={cartItems.length === 0}
                    style={{
                      backgroundColor: cartItems.length === 0 ? '#2a2a2a' : '#f5a623',
                      color: cartItems.length === 0 ? '#6b6b6b' : '#000',
                      borderRadius: '30px',
                      padding: '14px',
                      fontWeight: '600',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceOrder;