import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { calculateCartTotals } from "../../util/cartUtils";

const Cart = () => {
  const navigate = useNavigate();
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } =
    useContext(StoreContext);

  const cartItems = foodList.filter((food) => Number(quantities[food.id]) > 0);
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);
  const isEmpty = cartItems.length === 0;

  const formatPrice = (amount) => `₹${Number(amount).toFixed(2)}`;

  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
        {/* Cart Items Column */}
        <div className="col-lg-8">
          {isEmpty ? (
            <div className="alert alert-info">
              Your cart is empty. <Link to="/">Start shopping</Link>
            </div>
          ) : (
            <div className="card mb-4">
              <div className="card-body">
                {cartItems.map((food) => {
                  const qty = Number(quantities[food.id]);
                  const itemTotal = food.price * qty;

                  return (
                    <div key={food.id} className="row cart-item align-items-center">
                      <div className="col-md-3 mb-2 mb-md-0">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="img-fluid rounded"
                          loading="lazy"
                        />
                      </div>
                      <div className="col-md-5 mb-2 mb-md-0">
                        <h5 className="card-title mb-1">{food.name}</h5>
                        <p className="text-muted small mb-0">
                          Category: {food.category}
                        </p>
                        <p className="fw-bold mb-0 d-md-none">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                      <div className="col-md-2 mb-2 mb-md-0">
                        <div className="input-group input-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => decreaseQty(food.id)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="form-control text-center quantity-input"
                            value={qty}
                            readOnly
                            min="1"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => increaseQty(food.id)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-md-end">
                        <p className="fw-bold mb-1 d-none d-md-block">
                          {formatPrice(itemTotal)}
                        </p>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(food.id)}
                          aria-label={`Remove ${food.name} from cart`}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                      <hr className="cart-divider" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <Link to="/" className="btn btn-outline-primary">
              <i className="bi bi-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="col-lg-4">
          <div className="card cart-summary">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>{isEmpty ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <hr className="my-3" />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="fs-5">{formatPrice(total)}</strong>
              </div>

              <button
                className="btn btn-primary w-100 py-2"
                disabled={isEmpty}
                onClick={() => navigate("/order")}
              >
                {isEmpty ? "Cart is Empty" : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;