import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } =
    useContext(StoreContext);
  //cart items
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  //calcualtiong
  const { subtotal, shipping, tax, total } = calculateCartTotals(
    cartItems,
    quantities
  );

  return (
    <div className="container py-5" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px !important' }}>
      <h1 className="mb-5" style={{ color: '#fff', fontWeight: '700' }}>
        Your <span style={{ color: '#f5a623' }}>Shopping</span> Cart
      </h1>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                <i className="bi bi-cart-x" style={{ color: '#2a2a2a' }}></i>
              </div>
              <h3 style={{ color: '#8b8b8b' }}>Your cart is empty.</h3>
              <p style={{ color: '#6b6b6b' }}>Add some delicious food to get started!</p>
              <Link to="/explore" className="btn mt-3" style={{ backgroundColor: '#f5a623', color: '#000', borderRadius: '30px', padding: '10px 30px', fontWeight: '600' }}>
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="card mb-4" style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a', borderRadius: '16px' }}>
              <div className="card-body" style={{ padding: '24px' }}>
                {cartItems.map((food) => (
                  <div key={food.id} className="row cart-item mb-3 align-items-center">
                    <div className="col-md-3">
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2a2a' }}>
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="img-fluid"
                          style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title" style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '4px' }}>{food.name}</h5>
                      <p style={{ color: '#8b8b8b', fontSize: '0.85rem', marginBottom: '0' }}>Category: {food.category}</p>
                    </div>
                    <div className="col-md-2">
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm"
                          type="button"
                          onClick={() => decreaseQty(food.id)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            border: '1px solid #2a2a2a',
                            color: '#8b8b8b',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          <i className="bi bi-dash" style={{ fontSize: '0.8rem' }}></i>
                        </button>
                        <span style={{ color: '#fff', fontWeight: '600', minWidth: '24px', textAlign: 'center' }}>
                          {quantities[food.id]}
                        </span>
                        <button
                          className="btn btn-sm"
                          type="button"
                          onClick={() => increaseQty(food.id)}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            border: '1px solid #f5a623',
                            color: '#f5a623',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                          }}
                        >
                          <i className="bi bi-plus" style={{ fontSize: '0.8rem' }}></i>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="fw-bold" style={{ color: '#f5a623', fontSize: '1.1rem', marginBottom: '8px' }}>
                        &#8377;{(food.price * quantities[food.id]).toFixed(2)}
                      </p>
                      <button
                        className="btn btn-sm"
                        onClick={() => removeFromCart(food.id)}
                        style={{
                          border: '1px solid #ff4444',
                          color: '#ff4444',
                          backgroundColor: 'transparent',
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '0.8rem'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ff4444'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ff4444'; }}
                      >
                        <i className="bi bi-trash me-1"></i> Remove
                      </button>
                    </div>
                    <hr style={{ borderColor: '#2a2a2a', margin: '16px 0', opacity: 1 }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-start mb-4">
            <Link to="/explore" className="btn" style={{ border: '1px solid #2a2a2a', color: '#8b8b8b', borderRadius: '30px', padding: '10px 24px' }}>
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card cart-summary" style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a', borderRadius: '16px', position: 'sticky', top: '100px' }}>
            <div className="card-body" style={{ padding: '24px' }}>
              <h5 className="card-title mb-4" style={{ color: '#fff', fontWeight: '600', fontSize: '1.2rem' }}>
                Order Summary
              </h5>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#8b8b8b' }}>Subtotal</span>
                <span style={{ color: '#fff', fontWeight: '500' }}>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#8b8b8b' }}>Shipping</span>
                <span style={{ color: '#fff', fontWeight: '500' }}>&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: '#8b8b8b' }}>Tax</span>
                <span style={{ color: '#fff', fontWeight: '500' }}>&#8377;{tax.toFixed(2)}</span>
              </div>
              <hr style={{ borderColor: '#2a2a2a', opacity: 1 }} />
              <div className="d-flex justify-content-between mb-4">
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Total</strong>
                <strong style={{ color: '#f5a623', fontSize: '1.2rem' }}>
                  &#8377;{subtotal === 0 ? 0.0 : total.toFixed(2)}
                </strong>
              </div>
              <button
                className="btn w-100"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
                style={{
                  backgroundColor: cartItems.length === 0 ? '#2a2a2a' : '#f5a623',
                  color: cartItems.length === 0 ? '#6b6b6b' : '#000',
                  borderRadius: '30px',
                  padding: '14px',
                  fontWeight: '600',
                  fontSize: '1rem',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;